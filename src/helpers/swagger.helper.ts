import { INestApplication } from '@nestjs/common';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { ApiBody, DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { extname } from 'path';

export const swaggerSetup = (app: INestApplication) => {
  const documentBuilder = new DocumentBuilder()
    .setTitle('NESTJS-BASE')
    .setDescription('nestjs-base')
    .setVersion('1.0')
    .setContact('Duong Duc Nam', 'https://namdd72.tech', 'nampt1999@gmail.com')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, documentBuilder);
  SwaggerModule.setup('api/docs', app, document);
};

export const ApiFile = (fileName: string = 'file'): MethodDecorator => (
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor,
) => {
  ApiBody({
    schema: {
      type: 'object',
      properties: {
        [fileName]: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })(target, propertyKey, descriptor);
};

export const ApiFiles = (fileName: string = 'files'): MethodDecorator => (
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor,
) => {
  ApiBody({
    type: 'multipart/form-data',
    required: true,
    schema: {
      type: 'object',
      properties: {
        [fileName]: {
          type: 'array',
          items: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    },
  })(target, propertyKey, descriptor);
};

export const MulterConfig: MulterOptions = {
  storage: diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
      // Generating a 32 random chars long string
      const randomName = Array(32)
        .fill(null)
        .map(() => Math.round(Math.random() * 16).toString(16))
        .join('');
      //Calling the callback passing the random name generated with the original extension name
      cb(null, `${randomName}${extname(file.originalname)}`);
    },
  }),
};
