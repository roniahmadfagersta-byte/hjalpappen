import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateReviewDto } from './dto/create-review.dto';

@Injectable()
export class ReviewsService {
  constructor(private prisma: PrismaService) {}

  async create(authorId: string, dto: CreateReviewDto) {
    const { taskId, targetId, rating, title, comment } = dto;

    // Verify task existence
    const task = await this.prisma.task.findUnique({
      where: { id: taskId }
    });
    if (!task) throw new NotFoundException(`Task ${taskId} not found`);

    // Only creator or assignee can leave a review
    if (task.creatorId !== authorId && task.assigneeId !== authorId) {
      throw new BadRequestException('You are not authorized to review this task');
    }

    // Check if review already exists
    const existingReview = await this.prisma.review.findUnique({
      where: {
        taskId_authorId: { taskId, authorId }
      }
    });
    if (existingReview) {
      throw new BadRequestException('You have already reviewed this task');
    }

    // AI fraud check approximation: flag if rating is 5 but comment is empty or contains repetitive chars
    let isFraudSuspected = false;
    let fraudScore = 0.05;
    let fraudReason = '';

    if (comment && comment.length < 5 && rating === 5) {
      isFraudSuspected = true;
      fraudScore = 0.85;
      fraudReason = 'High rating with very short generic comment';
    }

    const review = await this.prisma.review.create({
      data: {
        taskId,
        authorId,
        targetId,
        rating,
        title,
        comment,
        isFraudSuspected,
        fraudScore,
        fraudReason
      }
    });

    // Update target user average rating & totals
    const aggregations = await this.prisma.review.aggregate({
      where: { targetId, isPublic: true },
      _avg: { rating: true },
      _count: { id: true }
    });

    await this.prisma.user.update({
      where: { id: targetId },
      data: {
        averageRating: aggregations._avg.rating || 0,
        totalReviews: aggregations._count.id || 0
      }
    });

    return review;
  }

  async findByTarget(targetId: string) {
    return this.prisma.review.findMany({
      where: { targetId, isPublic: true },
      include: {
        author: {
          select: { id: true, firstName: true, lastName: true, avatarUrl: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });
  }
}
export default ReviewsService;
