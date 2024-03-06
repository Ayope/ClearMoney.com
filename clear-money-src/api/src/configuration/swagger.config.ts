import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function Swagger_configuration(app: INestApplication): void {
    const SwaggerConfig = new DocumentBuilder()
        .setTitle('Clear-Money API')
        .setDescription('The Clear-Money API is an API for managing personal finances using NestJS.')
        .setVersion('1.0')
        .build();

    const document = SwaggerModule.createDocument(app, SwaggerConfig);
    SwaggerModule.setup('api', app, document);
}