import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { CrmService } from './crm.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('crm')
@UseGuards(JwtAuthGuard)
@Controller('crm')
export class CrmController {
  constructor(private readonly crmService: CrmService) {}

  @Get()
  @ApiOperation({ summary: 'Hämta alla prospekt tilldelade den inloggade säljaren/användaren' })
  async getProspects(@CurrentUser('id') userId: string) {
    return this.crmService.getProspects(userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Hämta ett specifikt prospekt' })
  async getProspect(
    @Param('id') id: string,
    @CurrentUser('id') userId: string
  ) {
    return this.crmService.getProspect(id, userId);
  }

  @Post()
  @ApiOperation({ summary: 'Skapa ett nytt företagsprospekt' })
  async createProspect(
    @CurrentUser('id') userId: string,
    @Body() body: any
  ) {
    return this.crmService.createProspect(userId, body);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Uppdatera ett prospekt' })
  async updateProspect(
    @Param('id') id: string,
    @CurrentUser('id') userId: string,
    @Body() body: any
  ) {
    return this.crmService.updateProspect(id, userId, body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Ta bort ett prospekt' })
  async deleteProspect(
    @Param('id') id: string,
    @CurrentUser('id') userId: string
  ) {
    return this.crmService.deleteProspect(id, userId);
  }
}
