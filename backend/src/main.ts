import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 1. CORS: Cho phép Credentials và link Frontend
  app.enableCors({
    origin: process.env.ALLOWED_ORIGINS
      ? process.env.ALLOWED_ORIGINS.split(',')
      : true,
    credentials: true, // Quan trọng để không bị lỗi CORS khi gửi Token
  });

  app.useGlobalPipes(new ValidationPipe());

  // 2. PORT: Bắt buộc phải dùng process.env.PORT
  await app.listen(process.env.PORT || 3000, '0.0.0.0');
}
bootstrap();
