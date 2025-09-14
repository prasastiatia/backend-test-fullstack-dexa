import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ExceptionInterceptor implements NestInterceptor {
  private readonly logger = new Logger(ExceptionInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();

    return next.handle().pipe(
      catchError((error) => {
        this.logger.error(`🔥 Exception in ${request.method} ${request.url}`, {
          error: error.message,
          stack: error.stack,
          userId: request.user?.id,
        });

        let status = HttpStatus.INTERNAL_SERVER_ERROR;
        let message = 'Internal server error';
        let errors: string[] = [];

        if (error instanceof HttpException) {
          status = error.getStatus();
          const response = error.getResponse();

          if (typeof response === 'string') {
            message = response;
          } else if (typeof response === 'object' && response !== null) {
            message = (response as any).message || message;
            errors = (response as any).message
              ? Array.isArray((response as any).message)
                ? (response as any).message
                : [(response as any).message]
              : [];
          }
        }

        const httpException = new HttpException(error.response, status);
        return throwError(() => httpException);
      }),
    );
  }
}
