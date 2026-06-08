import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { AdStatus, UserRole } from '@prisma/client';

@Injectable()
export class AdsService {
  constructor(private prisma: PrismaService) {}

  async createAd(advertiserId: string, data: any) {
    const user = await this.prisma.user.findUnique({ where: { id: advertiserId } });
    if (!user || (user.role !== UserRole.BUSINESS && user.role !== UserRole.ADMIN)) {
      throw new ForbiddenException('Endast företag eller administratörer kan skapa annonser.');
    }

    return this.prisma.advertisement.create({
      data: {
        ...data,
        advertiserId
      }
    });
  }

  async getActiveAds(city?: string) {
    const whereClause: any = {
      status: AdStatus.ACTIVE,
      OR: [
        { endsAt: null },
        { endsAt: { gte: new Date() } }
      ]
    };

    if (city) {
      whereClause.targetCities = {
        has: city
      };
    }

    return this.prisma.advertisement.findMany({
      where: whereClause,
      orderBy: { createdAt: 'desc' }
    });
  }

  async getMyAds(advertiserId: string) {
    return this.prisma.advertisement.findMany({
      where: { advertiserId },
      orderBy: { createdAt: 'desc' }
    });
  }

  async trackImpression(adId: string) {
    return this.prisma.advertisement.update({
      where: { id: adId },
      data: {
        impressions: { increment: 1 }
      }
    });
  }

  async trackClick(adId: string) {
    const ad = await this.prisma.advertisement.findUnique({ where: { id: adId } });
    if (!ad) throw new NotFoundException('Annons hittades inte.');

    const newClicks = ad.clicks + 1;
    const newImpressions = ad.impressions || 1;
    const ctr = (newClicks / newImpressions) * 100;

    return this.prisma.advertisement.update({
      where: { id: adId },
      data: {
        clicks: newClicks,
        ctr
      }
    });
  }
}
