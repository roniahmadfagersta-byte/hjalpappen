import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT', 3000);
  const frontendUrl = configService.get<string>('FRONTEND_URL', 'http://localhost:5173');

  // Global prefix
  app.setGlobalPrefix('api');

  // CORS
  app.enableCors({
    origin: [frontendUrl, 'http://localhost:3000'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  // Global pipes
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // Global filters
  app.useGlobalFilters(new HttpExceptionFilter());

  // Global interceptors
  app.useGlobalInterceptors(new TransformInterceptor());

  // Swagger
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Marknadsplats API')
    .setDescription('API för den svenska marknadsplatsen – Marknadsplats')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('auth', 'Autentisering och registrering')
    .addTag('users', 'Användarprofiler')
    .addTag('tasks', 'Uppgifter / Jobb')
    .addTag('reviews', 'Recensioner')
    .addTag('payments', 'Betalningar')
    .addTag('chat', 'Chatt')
    .addTag('notifications', 'Notifikationer')
    .addTag('ads', 'Annonser')
    .addTag('crm', 'CRM / Företagsprospekt')
    .addTag('admin', 'Administration')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(port);
  logger.log(`🚀 Marknadsplats backend körs på: http://localhost:${port}`);
  logger.log(`📚 Swagger-dokumentation: http://localhost:${port}/api/docs`);
}

bootstrap();
