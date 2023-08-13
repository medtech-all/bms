// jsend-transform.interceptor.ts

import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface JSendResponse<T> {
    statusCode: number;
    status: 'success' | 'fail' | 'error';
    message?: string;
    data?: T;
}

@Injectable()
export class JSendTransformInterceptor<T>
    implements NestInterceptor<T, JSendResponse<T>> {
    intercept(
        context: ExecutionContext,
        next: CallHandler,
        customStatus: 'success' | 'fail' | 'error' = 'success',
        customStatusCode?: number,
        customMessage?: string,
    ): Observable<JSendResponse<T>> {
        return next.handle().pipe(
            map((data) => ({
                statusCode: customStatusCode || context.switchToHttp().getResponse().statusCode,
                status: data.status,
                message: data.message,
                data: data.data,
            })),
        );
    }
}
