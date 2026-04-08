import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import type { Request, Response } from 'express';

@Injectable()
export class TimingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(TimingInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const start = Date.now();
    const contextType = context.getType();

    if (contextType === 'http') {
      const req = context.switchToHttp().getRequest<Request>();
      const res = context.switchToHttp().getResponse<Response>();
      const url = req.url;
      const isMvc = !url.startsWith('/api/') && !url.startsWith('/graphql');

      res.on('finish', () => {
        const elapsed = Date.now() - start;
        this.logger.log(`${req.method} ${url} — ${elapsed}ms`);
      });

      return next.handle().pipe(
        map((data: unknown) => {
          const elapsed = Date.now() - start;

          if (isMvc) {
            if (data && typeof data === 'object') {
              return {
                ...(data as Record<string, unknown>),
                serverElapsedMs: elapsed,
              };
            }
            return data;
          } else {
            if (!res.headersSent) {
              res.setHeader('X-Elapsed-Time', `${elapsed}ms`);
            }
            return data;
          }
        }),
      );
    }

    return next.handle().pipe(
      tap(() => {
        const elapsed = Date.now() - start;
        this.logger.log(`GraphQL — ${elapsed}ms`);
      }),
    );
  }
}
