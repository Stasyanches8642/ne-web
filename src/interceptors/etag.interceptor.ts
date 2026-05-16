import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import type { Request, Response } from 'express';
import * as crypto from 'crypto';

@Injectable()
export class EtagInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const ctx = context.switchToHttp();
    const req = ctx.getRequest<Request>();
    const res = ctx.getResponse<Response>();

    return next.handle().pipe(
      map((data: unknown) => {
        if (data && req.method === 'GET') {
          const hash = crypto
            .createHash('md5')
            .update(JSON.stringify(data))
            .digest('hex');
          const etag = `"${hash}"`;

          res.setHeader('ETag', etag);

          const ifNoneMatch = req.headers['if-none-match'];
          if (ifNoneMatch === etag) {
            res.status(304).end();
            return null;
          }
        }
        return data;
      }),
    );
  }
}
