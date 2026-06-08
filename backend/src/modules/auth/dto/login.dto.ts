import { IsEmail, IsString, MinLength, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'anna@example.com' })
  @IsEmail({}, { message: 'Ange en giltig e-postadress' })
  email: string;

  @ApiProperty({ example: 'MinSäkraLösenord123!' })
  @IsString()
  @MinLength(1, { message: 'Lösenord krävs' })
  password: string;

  @ApiPropertyOptional({ example: '123456', description: '2FA-kod om aktiverat' })
  @IsOptional()
  @IsString()
  twoFactorCode?: string;
}

export class RefreshTokenDto {
  @ApiProperty()
  @IsString()
  refreshToken: string;
}

export class ForgotPasswordDto {
  @ApiProperty({ example: 'anna@example.com' })
  @IsEmail({}, { message: 'Ange en giltig e-postadress' })
  email: string;
}

export class ResetPasswordDto {
  @ApiProperty()
  @IsString()
  token: string;

  @ApiProperty({ example: 'NyttSäkertLösenord123!' })
  @IsString()
  @MinLength(8, { message: 'Lösenordet måste vara minst 8 tecken' })
  newPassword: string;
}
