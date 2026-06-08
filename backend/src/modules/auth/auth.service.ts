import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  BadRequestException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { PrismaService } from '../../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { UserRole } from '@prisma/client';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  // ─── Registration ───────────────────────────────────────────────────

  async register(dto: RegisterDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: dto.email.toLowerCase() },
    });

    if (existingUser) {
      throw new ConflictException('En användare med denna e-postadress finns redan.');
    }

    if (dto.phone) {
      const existingPhone = await this.prisma.user.findUnique({
        where: { phone: dto.phone },
      });
      if (existingPhone) {
        throw new ConflictException('Detta telefonnummer är redan registrerat.');
      }
    }

    const passwordHash = await bcrypt.hash(dto.password, 12);

    const user = await this.prisma.user.create({
      data: {
        email: dto.email.toLowerCase(),
        passwordHash,
        firstName: dto.firstName,
        lastName: dto.lastName,
        phone: dto.phone,
        role: dto.role || UserRole.CUSTOMER,
        gdprConsentAt: new Date(),
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        createdAt: true,
      },
    });

    const tokens = await this.generateTokens(user.id, user.email, user.role);

    this.logger.log(`Ny användare registrerad: ${user.email}`);

    return {
      user,
      ...tokens,
    };
  }

  // ─── Login ──────────────────────────────────────────────────────────

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email.toLowerCase() },
    });

    if (!user || !user.passwordHash) {
      throw new UnauthorizedException('Ogiltig e-postadress eller lösenord.');
    }

    if (!user.isActive) {
      throw new UnauthorizedException('Kontot är inaktiverat. Kontakta support.');
    }

    const isPasswordValid = await bcrypt.compare(dto.password, user.passwordHash);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Ogiltig e-postadress eller lösenord.');
    }

    // Check 2FA if enabled
    if (user.twoFactorEnabled) {
      if (!dto.twoFactorCode) {
        return {
          requires2FA: true,
          message: 'Ange din tvåfaktorsautentiseringskod.',
        };
      }
      const is2FAValid = await this.verify2FACode(user.id, dto.twoFactorCode);
      if (!is2FAValid) {
        throw new UnauthorizedException('Ogiltig 2FA-kod.');
      }
    }

    // Update last login
    await this.prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
    });

    const tokens = await this.generateTokens(user.id, user.email, user.role);

    return {
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        avatarUrl: user.avatarUrl,
      },
      ...tokens,
    };
  }

  // ─── Google OAuth ───────────────────────────────────────────────────

  async validateGoogleUser(googleUser: {
    googleId: string;
    email: string;
    firstName: string;
    lastName: string;
    avatarUrl: string | null;
  }) {
    let user = await this.prisma.user.findUnique({
      where: { googleId: googleUser.googleId },
    });

    if (!user) {
      // Check if user exists with same email
      user = await this.prisma.user.findUnique({
        where: { email: googleUser.email.toLowerCase() },
      });

      if (user) {
        // Link Google account to existing user
        user = await this.prisma.user.update({
          where: { id: user.id },
          data: {
            googleId: googleUser.googleId,
            avatarUrl: user.avatarUrl || googleUser.avatarUrl,
            isEmailVerified: true,
          },
        });
      } else {
        // Create new user
        user = await this.prisma.user.create({
          data: {
            email: googleUser.email.toLowerCase(),
            googleId: googleUser.googleId,
            firstName: googleUser.firstName,
            lastName: googleUser.lastName,
            avatarUrl: googleUser.avatarUrl,
            isEmailVerified: true,
            role: UserRole.CUSTOMER,
            gdprConsentAt: new Date(),
          },
        });
      }
    }

    return user;
  }

  async googleLogin(user: any) {
    const tokens = await this.generateTokens(user.id, user.email, user.role);

    await this.prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
    });

    return {
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        avatarUrl: user.avatarUrl,
      },
      ...tokens,
    };
  }

  // ─── Phone Verification (OTP) ──────────────────────────────────────

  async sendOtp(phone: string) {
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    const user = await this.prisma.user.findUnique({ where: { phone } });
    if (!user) {
      throw new NotFoundException('Inget konto hittat med detta telefonnummer.');
    }

    await this.prisma.user.update({
      where: { id: user.id },
      data: { otpCode, otpExpires },
    });

    // In production, send SMS via provider (46elks, Twilio, etc.)
    this.logger.log(`OTP skickad till ${phone}: ${otpCode} (visas bara i utvecklingsläge)`);

    return { message: 'Verifieringskod skickad via SMS.' };
  }

  async verifyPhone(phone: string, code: string) {
    const user = await this.prisma.user.findUnique({ where: { phone } });

    if (!user) {
      throw new NotFoundException('Inget konto hittat med detta telefonnummer.');
    }

    if (!user.otpCode || !user.otpExpires) {
      throw new BadRequestException('Ingen verifieringskod har begärts.');
    }

    if (new Date() > user.otpExpires) {
      throw new BadRequestException('Verifieringskoden har utgått. Begär en ny.');
    }

    if (user.otpCode !== code) {
      throw new BadRequestException('Ogiltig verifieringskod.');
    }

    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        phoneVerified: true,
        otpCode: null,
        otpExpires: null,
      },
    });

    return { message: 'Telefonnumret har verifierats.' };
  }

  // ─── Forgot / Reset Password ───────────────────────────────────────

  async forgotPassword(email: string) {
    const user = await this.prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (!user) {
      // Don't reveal if user exists
      return { message: 'Om kontot finns skickas ett återställningsmail.' };
    }

    const token = uuidv4();
    const expires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        passwordResetToken: token,
        passwordResetExpires: expires,
      },
    });

    // In production: send email with reset link
    this.logger.log(`Lösenordsåterställning för ${email}: token=${token}`);

    return { message: 'Om kontot finns skickas ett återställningsmail.' };
  }

  async resetPassword(token: string, newPassword: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        passwordResetToken: token,
        passwordResetExpires: { gt: new Date() },
      },
    });

    if (!user) {
      throw new BadRequestException('Ogiltig eller utgången återställningslänk.');
    }

    const passwordHash = await bcrypt.hash(newPassword, 12);

    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        passwordHash,
        passwordResetToken: null,
        passwordResetExpires: null,
      },
    });

    return { message: 'Lösenordet har återställts. Du kan nu logga in.' };
  }

  // ─── 2FA ────────────────────────────────────────────────────────────

  async enable2FA(userId: string) {
    // Generate a simple TOTP-like secret (in production use speakeasy or similar)
    const secret = uuidv4().replace(/-/g, '').substring(0, 16).toUpperCase();

    await this.prisma.user.update({
      where: { id: userId },
      data: {
        twoFactorSecret: secret,
        twoFactorEnabled: true,
      },
    });

    return {
      secret,
      message: 'Tvåfaktorsautentisering har aktiverats.',
    };
  }

  async disable2FA(userId: string) {
    await this.prisma.user.update({
      where: { id: userId },
      data: {
        twoFactorSecret: null,
        twoFactorEnabled: false,
      },
    });

    return { message: 'Tvåfaktorsautentisering har inaktiverats.' };
  }

  private async verify2FACode(userId: string, code: string): Promise<boolean> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { twoFactorSecret: true },
    });

    if (!user?.twoFactorSecret) return false;

    // Simplified TOTP verification: in production use a real TOTP library
    // Here we accept the secret itself as a valid code for demo purposes
    // or a time-based 6-digit code derived from the secret
    const timeStep = Math.floor(Date.now() / 30000);
    const expectedCode = (
      parseInt(user.twoFactorSecret, 36) % 1000000 + timeStep % 1000000
    ).toString().slice(-6);

    return code === expectedCode || code === user.twoFactorSecret;
  }

  // ─── Token Refresh ─────────────────────────────────────────────────

  async refreshTokens(refreshToken: string) {
    try {
      const payload = this.jwtService.verify(refreshToken, {
        secret: this.configService.get<string>('jwt.refreshSecret'),
      });

      const user = await this.prisma.user.findUnique({
        where: { id: payload.sub },
      });

      if (!user || !user.isActive) {
        throw new UnauthorizedException('Ogiltig refresh-token.');
      }

      return this.generateTokens(user.id, user.email, user.role);
    } catch {
      throw new UnauthorizedException('Ogiltig eller utgången refresh-token.');
    }
  }

  // ─── Token Generation ──────────────────────────────────────────────

  private async generateTokens(userId: string, email: string, role: string) {
    const payload = { sub: userId, email, role };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('jwt.secret'),
        expiresIn: this.configService.get<string>('jwt.expiresIn'),
      }),
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('jwt.refreshSecret'),
        expiresIn: this.configService.get<string>('jwt.refreshExpiresIn'),
      }),
    ]);

    return { accessToken, refreshToken };
  }
}
