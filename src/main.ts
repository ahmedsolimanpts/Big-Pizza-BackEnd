import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.enableCors({ origin: '*' });
  const config = new DocumentBuilder()
    .setTitle('BigPizza BackEnd')
    .setDescription('The Docs For Big Pizza Backend System')
    .setVersion('1.0')
    .addTag('#BigPizza')
    .build();
  const document = SwaggerModule.createDocument(app, config, {
    include: [AuthModule, UsersModule],
  });
  SwaggerModule.setup('swagger', app, document);
  const PORT = 3000 || process.env.PORT;
  await app.listen(PORT);
}
bootstrap();
