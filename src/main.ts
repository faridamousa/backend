import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const options = {
    swaggerOptions: {
      authAction: {
        defaultBearerAuth: {
          name: 'Bearer',
          schema: {
            description: 'Default',
            type: 'http',
            in: 'header',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          },
          value: 'thisIsASampleBearerAuthToken123',
        },
      },
    },
  };
  const config = new DocumentBuilder()
    //.setTitle()
    .addBearerAuth(undefined, 'Bearer')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('bookstore', app, document, options);

  await app.listen(3000);
}
bootstrap();
