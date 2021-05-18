require('dotenv').config();

import config from '$config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { swaggerSetup } from '$helpers/swagger.helper';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  swaggerSetup(app);

  await app.listen(config.ENV.SERVER_PORT || 3000);
}
bootstrap();
