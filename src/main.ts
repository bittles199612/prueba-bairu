import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import bodyParser, { json, raw, urlencoded } from 'body-parser';
import {
  Request as ExpressRequest,
  Response as ExpressResponse,
  NextFunction,
} from 'express';
import express, { Express, Request, Response } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser: false,
    logger: ['error', 'warn'],
  });

  const expressApp = app.getHttpAdapter().getInstance() as Express;

  expressApp.use(
    express.json({
      verify: (req: Request, res, buf) => {
        if (req.originalUrl.startsWith('/api/stripe/webhook')) {
          req.rawBody = buf; // ← necesario para Stripe
        }
      },
    }),
  );

  const configService = app.get(ConfigService);
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
