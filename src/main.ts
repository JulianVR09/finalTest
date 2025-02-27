import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    })
  );

  const config = new DocumentBuilder()
    .setTitle('SimulacroMySQL')
    .setDescription('')
    .setVersion('1.0')
    .build();

    const documnet = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api-docs', app, documnet)

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
