import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); // Cho phép Frontend truy cập
  app.useGlobalPipes(new ValidationPipe()); // Kích hoạt class-validator
  await app.listen(3000);
}
bootstrap();
