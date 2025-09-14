import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();

    return next.handle().pipe(
      map((data) => {
        // Jika data sudah dalam format ResponseDto, return as is
        // if (data instanceof ResponseDto) {
        //   data.path = request.url;
        //   return data;
        // }

        // Transform data ke format standar
        // const response = new ResponseDto(true, 'Operation successful', data);
        // response.path = request.url;
        return data;
      }),
    );
  }
}
