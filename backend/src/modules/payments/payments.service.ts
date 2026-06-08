import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { PaymentStatus, TaskStatus, InvoiceStatus } from '@prisma/client';

@Injectable()
export class PaymentsService {
  constructor(private prisma: PrismaService) {}

  async create(payerId: string, dto: CreatePaymentDto) {
    const { taskId, amount, method } = dto;

    const task = await this.prisma.task.findUnique({
      where: { id: taskId },
      include: { creator: true, assignee: true }
    });
    if (!task) throw new NotFoundException(`Task ${taskId} not found`);
    if (!task.assigneeId) throw new BadRequestException('Task must be assigned before payment');

    // Commission logic: 10% platform fee, rest goes to worker
    const commissionRate = 0.10;
    const platformFee = amount * commissionRate;
    const netAmount = amount - platformFee;

    // Create payment ledger row
    const payment = await this.prisma.payment.create({
      data: {
        taskId,
        payerId,
        payeeId: task.assigneeId,
        amount,
        platformFee,
        commissionRate,
        netAmount,
        method,
        status: PaymentStatus.COMPLETED,
        externalPaymentId: `${method.toLowerCase()}-tx-${Date.now()}`,
        paidAt: new Date()
      }
    });

    // Recalculate assignee statistics
    await this.prisma.user.update({
      where: { id: task.assigneeId },
      data: {
        completedTasksCount: { increment: 1 }
      }
    });

    // Update task status
    await this.prisma.task.update({
      where: { id: taskId },
      data: { status: TaskStatus.COMPLETED }
    });

    // Generate Invoice PDF mock and model row
    const vatRate = 0.25; // 25% VAT in Sweden
    const vatAmount = amount * (vatRate / (1 + vatRate)); // Calculate VAT from total gross amount
    const invoiceNumber = `INV-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 14); // 14 days due date

    await this.prisma.invoice.create({
      data: {
        invoiceNumber,
        paymentId: payment.id,
        senderId: task.assigneeId,
        receiverId: payerId,
        amount: amount - vatAmount,
        vatRate,
        vatAmount,
        totalAmount: amount,
        status: InvoiceStatus.PAID,
        dueDate,
        paidAt: new Date(),
        senderName: `${task.assignee?.firstName} ${task.assignee?.lastName}`,
        receiverName: `${task.creator.firstName} ${task.creator.lastName}`
      }
    });

    return payment;
  }

  async findMyPayments(userId: string) {
    return this.prisma.payment.findMany({
      where: {
        OR: [{ payerId: userId }, { payeeId: userId }]
      },
      include: {
        task: true,
        invoice: true
      },
      orderBy: { createdAt: 'desc' }
    });
  }
}
export default PaymentsService;
