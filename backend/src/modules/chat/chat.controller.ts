import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { ChatService } from './chat.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('chat')
@UseGuards(JwtAuthGuard)
@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get('rooms')
  @ApiOperation({ summary: 'Hämta alla chatrum för den inloggade användaren' })
  async getRooms(@CurrentUser('id') userId: string) {
    return this.chatService.getRooms(userId);
  }

  @Get('rooms/:id/messages')
  @ApiOperation({ summary: 'Hämta meddelanden för ett specifikt chatrum' })
  async getMessages(
    @Param('id') roomId: string,
    @CurrentUser('id') userId: string
  ) {
    return this.chatService.getMessages(roomId, userId);
  }

  @Post('rooms/:id/messages')
  @ApiOperation({ summary: 'Skicka ett nytt meddelande i ett chatrum' })
  async sendMessage(
    @Param('id') roomId: string,
    @CurrentUser('id') userId: string,
    @Body('content') content: string
  ) {
    return this.chatService.sendMessage(roomId, userId, content);
  }
}
