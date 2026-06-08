import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { TaskStatus, UserRole } from '@prisma/client';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  async getDashboardStats() {
    const totalUsers = await this.prisma.user.count();
    const totalTasks = await this.prisma.task.count();
    const totalCompletedTasks = await this.prisma.task.count({
      where: { status: TaskStatus.COMPLETED }
    });

    const paymentsAgg = await this.prisma.payment.aggregate({
      _sum: {
        amount: true,
        platformFee: true
      }
    });

    const totalRevenue = paymentsAgg._sum.amount || 0;
    const totalCommission = paymentsAgg._sum.platformFee || 0;

    // Get role distribution
    const roleStats = await this.prisma.user.groupBy({
      by: ['role'],
      _count: true
    });

    const roleDistribution = roleStats.reduce((acc, curr) => {
      acc[curr.role] = curr._count;
      return acc;
    }, {} as Record<string, number>);

    return {
      totalUsers,
      totalTasks,
      totalCompletedTasks,
      totalRevenue,
      totalCommission,
      roleDistribution
    };
  }

  async getReportedReviews() {
    return this.prisma.review.findMany({
      where: { isFraudSuspected: true },
      include: {
        author: { select: { id: true, firstName: true, lastName: true } },
        target: { select: { id: true, firstName: true, lastName: true } },
        task: { select: { id: true, title: true } }
      },
      orderBy: { createdAt: 'desc' }
    });
  }

  async resolveReview(reviewId: string, action: 'allow' | 'delete') {
    if (action === 'delete') {
      return this.prisma.review.delete({
        where: { id: reviewId }
      });
    }

    return this.prisma.review.update({
      where: { id: reviewId },
      data: {
        isFraudSuspected: false,
        isPublic: true
      }
    });
  }
}
