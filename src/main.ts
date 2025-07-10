import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { Express, Request, Response } from 'express';
import * as express from 'express';

// interface RequestWithRawBody extends Request {
//   rawBody: Buffer;
// }

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser: false,
    logger: ['error', 'warn'],
  });
  // app.use(
  //   json({
  //     verify: (
  //       request: RequestWithRawBody,
  //       response: Response,
  //       buffer: Buffer,
  //     ) => {
  //       if (request.url === '/webhook' && Buffer.isBuffer(buffer)) {
  //         request.rawBody = Buffer.from(buffer);
  //       }
  //       return true;
  //     },
  //   }),
  // );
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
