import { Controller, Get, Post, Param, Body, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { UserRole } from '@prisma/client';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('admin')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('stats')
  @ApiOperation({ summary: 'Hämta administrativ statistik för dashboard' })
  async getStats() {
    return this.adminService.getDashboardStats();
  }

  @Get('reported-reviews')
  @ApiOperation({ summary: 'Hämta alla recensioner markerade som misstänkt bedrägeri' })
  async getReportedReviews() {
    return this.adminService.getReportedReviews();
  }

  @Post('reviews/:id/resolve')
  @ApiOperation({ summary: 'Godkänn eller radera en rapporterad recension' })
  async resolveReview(
    @Param('id') reviewId: string,
    @Body('action') action: 'allow' | 'delete'
  ) {
    return this.adminService.resolveReview(reviewId, action);
  }
}
