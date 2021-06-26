require('dotenv').config();

import config from '$config';
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { swaggerSetup } from '$helpers/swagger.helper';
import { ClassSerializerInterceptor, Logger, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '$guards/auth.guard';
import { HttpExceptionFilter } from '$helpers/httpExceptionFilter.helper';

const logger = new Logger('NestApplication');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  const reflector = app.get(Reflector);
  app.useGlobalGuards(new AuthGuard(reflector));
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector));

  swaggerSetup(app);

  await app.listen(config.ENV.SERVER_PORT, () => {
    logger.log(
      `=========== 🕵  Server️ running on http://localhost:${config.ENV.SERVER_PORT} ===========‍`,
    );
  });
}
bootstrap();
