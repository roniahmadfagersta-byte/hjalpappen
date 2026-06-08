import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        skills: {
          include: { skill: true }
        }
      }
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email }
    });
  }

  async update(id: string, dto: UpdateUserDto) {
    const { skills, ...data } = dto;

    // Optional skills linkage update
    if (skills) {
      // Clear current associations
      await this.prisma.userSkill.deleteMany({
        where: { userId: id }
      });

      // Insert new ones
      for (const skillSlug of skills) {
        const foundSkill = await this.prisma.skill.findUnique({
          where: { slug: skillSlug }
        });
        if (foundSkill) {
          await this.prisma.userSkill.create({
            data: {
              userId: id,
              skillId: foundSkill.id
            }
          });
        }
      }
    }

    return this.prisma.user.update({
      where: { id },
      data,
      include: {
        skills: {
          include: { skill: true }
        }
      }
    });
  }

  async updateAvatar(id: string, avatarUrl: string) {
    return this.prisma.user.update({
      where: { id },
      data: { avatarUrl }
    });
  }

  async updateRatings(userId: string) {
    const aggregations = await this.prisma.review.aggregate({
      where: { targetId: userId, isPublic: true },
      _avg: { rating: true },
      _count: { id: true }
    });

    return this.prisma.user.update({
      where: { id: userId },
      data: {
        averageRating: aggregations._avg.rating || 0,
        totalReviews: aggregations._count.id || 0
      }
    });
  }

  // GDPR export data dump
  async exportGdprData(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        skills: true,
        createdTasks: true,
        assignedTasks: true,
        reviewsGiven: true,
        reviewsReceived: true,
        paymentsSent: true,
        paymentsReceived: true
      }
    });
    if (!user) throw new NotFoundException(`User with ID ${id} not found`);

    await this.prisma.user.update({
      where: { id },
      data: { gdprDataExportedAt: new Date() }
    });

    return user;
  }

  // GDPR delete/anonymize user account
  async deleteGdprAccount(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id }
    });
    if (!user) throw new NotFoundException(`User with ID ${id} not found`);

    // We anonymize instead of full row delete to preserve ledger tracking for payouts
    return this.prisma.user.update({
      where: { id },
      data: {
        firstName: 'Anonymiserad',
        lastName: 'Användare',
        email: `deleted-${id}@marknad.se`,
        phone: null,
        passwordHash: null,
        avatarUrl: null,
        bio: null,
        isActive: false,
        deletionRequestedAt: new Date()
      }
    });
  }
}
export default UsersService;
