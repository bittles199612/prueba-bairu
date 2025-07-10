import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import bodyParser, { json, raw, urlencoded } from 'body-parser';
import * as express from 'express';
import {
  Request as ExpressRequest,
  Response as ExpressResponse,
  NextFunction,
} from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser: false,
    logger: ['error', 'warn'],
  });

  // app.use('/api/stripe/webhook', raw({ type: 'application/json' }));
  // app.use((req: ExpressRequest, res: ExpressResponse, next: NextFunction) => {
  //   if (req.originalUrl === '/api/stripe/webhook') {
  //     next();
  //   } else {
  //     json()(req, res, next);
  //   }
  // });
  app.use(
    bodyParser.json({
      verify: function (req: ExpressRequest, res: ExpressResponse, buf) {
        const url = req.originalUrl;
        if (url.startsWith('/api/stripe/webhook')) {
          req.rawBody = buf.toString();
        }
      },
    }),
  );
  // app.use((req: ExpressRequest, res: ExpressResponse, next: NextFunction) => {
  //   if (req.originalUrl === '/api/stripe/webhook') return next();
  //   json()(req, res, next);
  // });
  // app.use(urlencoded({ extended: true }));
  // app.use(express.json());
  // app.use(json());
  app.use(urlencoded({ extended: true }));

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
