import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import getRawBody from 'raw-body';
// import RequestWithRawBody from '../stripeWebhook/requestWithRawBody.interface';
import { json, raw } from 'body-parser';
// @Injectable()
// export class RawBodyMiddleware implements NestMiddleware {
//   async use(
//     req: Request & { rawBody?: Buffer },
//     res: Response,
//     next: NextFunction,
//   ) {
//     if (req.originalUrl.includes('/stripe/webhook') && req.method === 'POST') {
//       try {
//         const raw = await getRawBody(req, {
//           length: req.headers['content-length'],
//           limit: '1mb',
//         });
//         req.rawBody = raw;
//         next();
//       } catch (err: unknown) {
//         console.error('Error al obtener rawBody:', err);
//         next(err);
//       }
//     } else {
//       next();
//     }
//   }
// }

interface RequestWithRawBody extends Request {
  rawBody: Buffer;
}

function rawBodyMiddleware() {
  return json({
    verify: (
      request: RequestWithRawBody,
      response: Response,
      buffer: Buffer,
    ) => {
      if (request.url === '/webhook' && Buffer.isBuffer(buffer)) {
        request.rawBody = Buffer.from(buffer);
      }
      return true;
    },
  });
}

export default rawBodyMiddleware;
