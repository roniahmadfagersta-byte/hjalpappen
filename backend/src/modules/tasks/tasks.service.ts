import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskStatus, ApplicationStatus } from '@prisma/client';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async create(creatorId: string, dto: CreateTaskDto) {
    const { deadline, ...data } = dto;
    return this.prisma.task.create({
      data: {
        ...data,
        deadline: deadline ? new Date(deadline) : null,
        creatorId,
        status: TaskStatus.OPEN
      }
    });
  }

  async findAll(filters: {
    search?: string;
    category?: string;
    status?: string;
    city?: string;
    minPrice?: number;
    maxPrice?: number;
    lat?: number;
    lng?: number;
    radiusKm?: number;
  }) {
    const whereClause: any = {};

    if (filters.status) {
      whereClause.status = filters.status as TaskStatus;
    } else {
      whereClause.status = TaskStatus.OPEN;
    }

    if (filters.search) {
      whereClause.OR = [
        { title: { contains: filters.search, mode: 'insensitive' } },
        { description: { contains: filters.search, mode: 'insensitive' } }
      ];
    }

    if (filters.city) {
      whereClause.city = { contains: filters.city, mode: 'insensitive' };
    }

    if (filters.minPrice) {
      whereClause.budgetMin = { gte: filters.minPrice };
    }

    if (filters.maxPrice) {
      whereClause.budgetMax = { lte: filters.maxPrice };
    }

    // Geographic bounding box approximation if lat/lng is provided
    if (filters.lat && filters.lng && filters.radiusKm) {
      const radiusDeg = filters.radiusKm / 111; // 1 degree is roughly 111 km
      whereClause.latitude = {
        gte: filters.lat - radiusDeg,
        lte: filters.lat + radiusDeg
      };
      whereClause.longitude = {
        gte: filters.lng - radiusDeg,
        lte: filters.lng + radiusDeg
      };
    }

    return this.prisma.task.findMany({
      where: whereClause,
      include: {
        creator: {
          select: { id: true, firstName: true, lastName: true, avatarUrl: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });
  }

  async findOne(id: string) {
    const task = await this.prisma.task.findUnique({
      where: { id },
      include: {
        creator: {
          select: { id: true, firstName: true, lastName: true, avatarUrl: true, averageRating: true }
        },
        assignee: {
          select: { id: true, firstName: true, lastName: true, avatarUrl: true }
        },
        applications: {
          include: {
            applicant: {
              select: { id: true, firstName: true, lastName: true, avatarUrl: true, averageRating: true }
            }
          }
        }
      }
    });
    if (!task) throw new NotFoundException(`Task with ID ${id} not found`);
    return task;
  }

  async update(id: string, dto: UpdateTaskDto) {
    const { deadline, ...data } = dto;
    return this.prisma.task.update({
      where: { id },
      data: {
        ...data,
        deadline: deadline ? new Date(deadline) : undefined
      }
    });
  }

  // Submit proposal/apply for task
  async apply(taskId: string, applicantId: string, coverLetter: string, proposedPrice: number) {
    const task = await this.findOne(taskId);
    if (task.status !== TaskStatus.OPEN) {
      throw new BadRequestException('Cannot apply to a task that is not open');
    }

    return this.prisma.taskApplication.create({
      data: {
        taskId,
        applicantId,
        coverLetter,
        proposedPrice,
        status: ApplicationStatus.PENDING
      }
    });
  }

  // Assign task to a specific applicant
  async assign(taskId: string, creatorId: string, applicantId: string) {
    const task = await this.findOne(taskId);
    if (task.creatorId !== creatorId) {
      throw new BadRequestException('Only the task creator can assign the task');
    }

    // Accept application
    await this.prisma.taskApplication.update({
      where: {
        taskId_applicantId: { taskId, applicantId }
      },
      data: {
        status: ApplicationStatus.ACCEPTED,
        respondedAt: new Date()
      }
    });

    // Reject other applications
    await this.prisma.taskApplication.updateMany({
      where: {
        taskId,
        applicantId: { not: applicantId }
      },
      data: {
        status: ApplicationStatus.REJECTED,
        respondedAt: new Date()
      }
    });

    // Update task status
    return this.prisma.task.update({
      where: { id: taskId },
      data: {
        status: TaskStatus.ASSIGNED,
        assigneeId: applicantId
      }
    });
  }

  // Mark task as completed by worker/assignee
  async complete(taskId: string, assigneeId: string) {
    const task = await this.findOne(taskId);
    if (task.assigneeId !== assigneeId) {
      throw new BadRequestException('Only the assigned worker can mark the task as completed');
    }

    return this.prisma.task.update({
      where: { id: taskId },
      data: {
        status: TaskStatus.COMPLETED,
        completedAt: new Date()
      }
    });
  }

  // Delete/moderation
  async remove(id: string) {
    return this.prisma.task.delete({
      where: { id }
    });
  }
}
export default TasksService;
