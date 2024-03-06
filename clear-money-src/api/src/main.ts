import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './frameworks/error-handling/filters/AllExceptionsFilter';
import { SwaggerModule } from '@nestjs/swagger';
import { Swagger_configuration } from './configuration/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new AllExceptionsFilter());
  Swagger_configuration(app);
  await app.listen(3000);
}
bootstrap();
