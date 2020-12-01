import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { LoggerService } from './logger/logger.service';
// import { AllExceptionsFilter } from './shared/exception.filter';
import * as helmet from 'helmet';
// import * as csurf from 'csurf';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new LoggerService(),
    cors: true,
  });

  app
    .setGlobalPrefix('api/v1')
    // .useGlobalFilters(new AllExceptionsFilter())
    .useGlobalPipes(new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }))
    .use(helmet());
    // .use(csurf());

  const schemes = process.env.NODE_ENV === 'developement' ? 'http' : 'https';
  const options = new DocumentBuilder()
    .setBasePath('api/v1')
    .setTitle(`${process.env.APP_NAME}`)
    .setDescription(`${process.env.APP_NAME} API description`)
    .setVersion('1.0')
    .addBearerAuth('Authorization', 'header', 'apiKey')
    .setSchemes(schemes)
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api/v1/doc', app, document);
  app.enableCors({ exposedHeaders: 'X-Total-Count' });
  await app.listen(`${process.env.PORT}`).then(() => { console.info(`listen on port: ${process.env.PORT}`); });
}

bootstrap();
