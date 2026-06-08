import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { ProspectStatus } from '@prisma/client';

@Injectable()
export class CrmService {
  constructor(private prisma: PrismaService) {}

  async createProspect(ownerId: string, data: any) {
    return this.prisma.companyProspect.create({
      data: {
        ...data,
        ownerId
      }
    });
  }

  async getProspects(ownerId: string) {
    return this.prisma.companyProspect.findMany({
      where: { ownerId },
      orderBy: { updatedAt: 'desc' }
    });
  }

  async getProspect(id: string, ownerId: string) {
    const prospect = await this.prisma.companyProspect.findFirst({
      where: { id, ownerId }
    });
    if (!prospect) throw new NotFoundException('Prospekt hittades inte.');
    return prospect;
  }

  async updateProspect(id: string, ownerId: string, data: any) {
    await this.getProspect(id, ownerId);

    const updateData: any = { ...data };
    if (data.status === ProspectStatus.WON && !data.convertedAt) {
      updateData.convertedAt = new Date();
    }

    return this.prisma.companyProspect.update({
      where: { id },
      data: updateData
    });
  }

  async deleteProspect(id: string, ownerId: string) {
    await this.getProspect(id, ownerId);
    return this.prisma.companyProspect.delete({
      where: { id }
    });
  }
}
