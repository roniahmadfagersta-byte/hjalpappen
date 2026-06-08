import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { ScheduleModule } from '@nestjs/schedule';
import { APP_GUARD } from '@nestjs/core';
import configuration from './config/configuration';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { TasksModule } from './modules/tasks/tasks.module';
import { ReviewsModule } from './modules/reviews/reviews.module';
import { PaymentsModule } from './modules/payments/payments.module';
import { ChatModule } from './modules/chat/chat.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { AdsModule } from './modules/ads/ads.module';
import { CrmModule } from './modules/crm/crm.module';
import { AiModule } from './modules/ai/ai.module';
import { GeoModule } from './modules/geo/geo.module';
import { AdminModule } from './modules/admin/admin.module';

@Module({
  imports: [
    // Configuration
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),

    // Rate limiting
    ThrottlerModule.forRoot([
      {
        name: 'short',
        ttl: 1000,   // 1 second
        limit: 10,
      },
      {
        name: 'medium',
        ttl: 10000,  // 10 seconds
        limit: 50,
      },
      {
        name: 'long',
        ttl: 60000,  // 1 minute
        limit: 200,
      },
    ]),

    // Scheduled tasks
    ScheduleModule.forRoot(),

    // Core
    PrismaModule,

    // Feature modules
    AuthModule,
    UsersModule,
    TasksModule,
    ReviewsModule,
    PaymentsModule,
    ChatModule,
    NotificationsModule,
    AdsModule,
    CrmModule,
    AiModule,
    GeoModule,
    AdminModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
