import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

export const swaggerSetup = (app: INestApplication) => {
    const documentBuilder = new DocumentBuilder()
    .setTitle('NESTJS-BASE')
    .setDescription('nestjs-base')
    .setVersion('1.0')
    .setContact('Duong Duc Nam', 'https://namdd72.tech', 'nampt1999@gmail.com')
    .addBearerAuth()
    .build()
  const document = SwaggerModule.createDocument(app, documentBuilder);
  SwaggerModule.setup('api/docs', app, document);
}