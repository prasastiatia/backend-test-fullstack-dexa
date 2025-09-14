import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
dotenv.config();
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { ExceptionInterceptor } from './common/interceptors/exception.interceptor';

async function bootstrap() {
  console.log('JWT Secret:', process.env.JWT_SECRET);
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);


  // Enable CORS
  app.enableCors({
    origin: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });

  // Global Validation Pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: false,
      transform: true,
    }),
  );

  // Global Interceptors
  app.useGlobalInterceptors(
    new LoggingInterceptor(),
    new ExceptionInterceptor(),
    new TransformInterceptor(),
  );

  // API Prefix
  app.setGlobalPrefix('/api/hr/backend-dexa');

  const port = configService.get('PORT') || process.env.APP_PORT;
  await app.listen(port);
  console.log(
    `🚀 Application is running on: http://localhost:${port}/api/hr/backend-dexa`,
  );
}

bootstrap();
