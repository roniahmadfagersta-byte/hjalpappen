import { Controller, Get, Post, Body, Param, Query, UseGuards } from '@nestjs/common';
import { AdsService } from './ads.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('ads')
@Controller('ads')
export class AdsController {
  constructor(private readonly adsService: AdsService) {}

  @Get('active')
  @ApiOperation({ summary: 'Hämta alla aktiva annonser (valfritt filtrerade på stad)' })
  async getActiveAds(@Query('city') city?: string) {
    return this.adsService.getActiveAds(city);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  @ApiOperation({ summary: 'Hämta den inloggade annonsörens egna annonser' })
  async getMyAds(@CurrentUser('id') userId: string) {
    return this.adsService.getMyAds(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({ summary: 'Skapa en ny annons' })
  async createAd(
    @CurrentUser('id') advertiserId: string,
    @Body() body: any
  ) {
    return this.adsService.createAd(advertiserId, body);
  }

  @Post(':id/impression')
  @ApiOperation({ summary: 'Registrera en visning för en annons' })
  async trackImpression(@Param('id') id: string) {
    return this.adsService.trackImpression(id);
  }

  @Post(':id/click')
  @ApiOperation({ summary: 'Registrera ett klick på en annons' })
  async trackClick(@Param('id') id: string) {
    return this.adsService.trackClick(id);
  }
}
