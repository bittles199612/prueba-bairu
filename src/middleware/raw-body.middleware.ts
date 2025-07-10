import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request } from 'express';
import getRawBody from 'raw-body';

@Injectable()
export class RawBodyMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    if (req.originalUrl === '/api/stripe/webhook' && req.method === 'POST') {
      try {
        const raw = await getRawBody(req, {
          length: req.headers['content-length'],
          limit: '1mb',
          //   encoding: 'utf-8',
        });
        req.rawBody = raw;
        next();
      } catch (error) {
        console.error('Error leyendo rawbody:', error);
        next(error);
      }
    } else {
      next();
    }
  }
}
