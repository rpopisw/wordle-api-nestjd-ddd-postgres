import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('wordless')
    .setDescription('The wordless API description')
    .setVersion('1.0')
    .addTag('wordless')

  const documentBuild = config.build();
  
  const document = SwaggerModule.createDocument(app, documentBuild);

  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: {
      docExpansion: 'none',
      filter: true,
      showRequestDuration: true,
    }
  });
  await app.listen(process.env.PORT);
}
bootstrap();
