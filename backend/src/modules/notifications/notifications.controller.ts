import { Controller, Get, Patch, Param, UseGuards } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('notifications')
@UseGuards(JwtAuthGuard)
@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get('me')
  @ApiOperation({ summary: 'Hämta alla notifikationer för den inloggade användaren' })
  async getMyNotifications(@CurrentUser('id') userId: string) {
    return this.notificationsService.getMyNotifications(userId);
  }

  @Patch(':id/read')
  @ApiOperation({ summary: 'Markera en notifikation som läst' })
  async markAsRead(
    @Param('id') id: string,
    @CurrentUser('id') userId: string
  ) {
    return this.notificationsService.markAsRead(id, userId);
  }
}
