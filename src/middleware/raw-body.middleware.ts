import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request } from 'express';

@Injectable()
export class RawBodyMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (req.originalUrl === '/api/stripe/webhook') {
      req.setEncoding('utf-8');
      //   req.rawBody = '';
      //   req.on('data', (chunk) => {
      //     req.rawBody += chunk;
      //   });
      req.on('end', () => next());
    } else {
      next();
    }
  }
}
