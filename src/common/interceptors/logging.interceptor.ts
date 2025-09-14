import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { method, url, body, user } = request;
    const startTime = Date.now();

    this.logger.log(`📥 ${method} ${url}`, {
      method,
      url,
      body: method !== 'GET' ? body : undefined,
      userId: user?.id,
    });

    return next.handle().pipe(
      tap({
        next: (response) => {
          const duration = Date.now() - startTime;
          this.logger.log(`✅ ${method} ${url} - ${duration}ms`, {
            method,
            url,
            duration,
            statusCode: 200,
            userId: user?.id,
          });
        },
        error: (error) => {
          const duration = Date.now() - startTime;
          this.logger.error(`❌ ${method} ${url} - ${duration}ms`, {
            method,
            url,
            duration,
            error: error.message,
            userId: user?.id,
          });
        },
      }),
    );
  }
}
