import { Controller, Get, Patch, Body, UseGuards, Param, Post, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  getMe(@CurrentUser('id') userId: string) {
    return this.usersService.findOne(userId);
  }

  @Patch('me')
  updateMe(
    @CurrentUser('id') userId: string,
    @Body() dto: UpdateUserDto
  ) {
    return this.usersService.update(userId, dto);
  }

  @Post('me/avatar')
  updateAvatar(
    @CurrentUser('id') userId: string,
    @Body('avatarUrl') avatarUrl: string
  ) {
    return this.usersService.updateAvatar(userId, avatarUrl);
  }

  @Get('me/gdpr/export')
  exportData(@CurrentUser('id') userId: string) {
    return this.usersService.exportGdprData(userId);
  }

  @Delete('me/gdpr/delete')
  deleteAccount(@CurrentUser('id') userId: string) {
    return this.usersService.deleteGdprAccount(userId);
  }

  @Get(':id')
  getUser(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }
}
export default UsersController;
