import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 1. Cấu hình CORS chuẩn cho Production
  app.enableCors({
    // Thay dấu '*' bằng link Frontend Vercel của bạn (nếu đã có link)
    // Ví dụ: origin: 'https://my-frontend-app.vercel.app',
    // Nếu chưa có link hoặc muốn test tiện thì để mảng như dưới (chấp nhận cả localhost và vercel)
    origin: [
      'http://localhost:5173',
      'http://localhost:3000',
      'https://ia06-web-23120279.vercel.app', // <-- Thay link thật của bạn vào đây sau khi deploy
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  app.useGlobalPipes(new ValidationPipe());

  // 2. SỬA CỔNG (QUAN TRỌNG): Lấy cổng từ môi trường hoặc mặc định 3000
  const port = process.env.PORT || 3000;

  // '0.0.0.0' giúp ứng dụng lắng nghe mọi IP (cần thiết cho một số nền tảng deploy như Render/Docker)
  await app.listen(port, '0.0.0.0');

  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
