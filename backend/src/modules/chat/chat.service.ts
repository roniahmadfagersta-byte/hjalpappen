import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ChatService {
  constructor(private prisma: PrismaService) {}

  async getRooms(userId: string) {
    return this.prisma.chatRoom.findMany({
      where: {
        participants: {
          some: { userId }
        }
      },
      include: {
        participants: {
          include: {
            user: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                avatarUrl: true,
                role: true
              }
            }
          }
        },
        messages: {
          orderBy: { createdAt: 'desc' },
          take: 1
        }
      }
    });
  }

  async getMessages(roomId: string, userId: string) {
    // Verify user is participant
    const isParticipant = await this.prisma.chatParticipant.findUnique({
      where: {
        chatRoomId_userId: {
          chatRoomId: roomId,
          userId
        }
      }
    });

    if (!isParticipant) {
      throw new NotFoundException('Chat room not found or access denied');
    }

    return this.prisma.chatMessage.findMany({
      where: { chatRoomId: roomId },
      include: {
        sender: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            avatarUrl: true
          }
        }
      },
      orderBy: { createdAt: 'asc' }
    });
  }

  async sendMessage(roomId: string, senderId: string, content: string) {
    const isParticipant = await this.prisma.chatParticipant.findUnique({
      where: {
        chatRoomId_userId: {
          chatRoomId: roomId,
          userId: senderId
        }
      }
    });

    if (!isParticipant) {
      throw new BadRequestException('Sender is not a participant of this chat room');
    }

    return this.prisma.chatMessage.create({
      data: {
        chatRoomId: roomId,
        senderId,
        content
      },
      include: {
        sender: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            avatarUrl: true
          }
        }
      }
    });
  }

  async createRoom(taskId: string, creatorId: string, assigneeId: string) {
    const existingRoom = await this.prisma.chatRoom.findUnique({
      where: { taskId }
    });

    if (existingRoom) {
      return existingRoom;
    }

    return this.prisma.chatRoom.create({
      data: {
        taskId,
        participants: {
          create: [
            { userId: creatorId },
            { userId: assigneeId }
          ]
        }
      }
    });
  }
}
