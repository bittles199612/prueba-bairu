import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import dotenv from 'dotenv';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import * as express from 'express';

dotenv.config();
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn'],
    rawBody: true,
  });

  const configService = app.get(ConfigService);

  // app.use('/api/stripe/webhook', bodyParser.raw({ type: 'application/json' }));
  // app.use(
  //   '/api/stripe/webhook',
  //   express.raw({ type: 'application/json' }), // 👈 Necesario en Railway y producción
  // );

  app.enableCors({
    origin: true,
    methods: 'GET, HEAD, PUT, PATCH, POST, DELETE, OPTIONS',
    credentials: true,
  });

  app.setGlobalPrefix(configService.get('PATH_SUBDOMAIN') || 'api');
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  const port = configService.get<string>('PORT') || '3000';
  await app.listen(port);
  console.log(`conectado en el servidor ${port}`);
}

void bootstrap();
