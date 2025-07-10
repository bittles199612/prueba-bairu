import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request } from 'express';
import getRawBody from 'raw-body';

@Injectable()
export class RawBodyMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (req.originalUrl === '/api/stripe/webhook') {
      getRawBody(req)
        .then((buf) => {
          req.rawBody = buf;
          next();
        })
        .catch((err) => {
          next(err);
        });
    } else {
      next();
    }
  }
}
