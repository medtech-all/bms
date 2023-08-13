import { UseInterceptors, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common'
import { Observable } from 'rxjs'
import { map } from "rxjs/operators"
import { plainToInstance } from "class-transformer"

export class SerializeInterceptor implements NestInterceptor {

    constructor(private readonly dto: any) {
    }

    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        // running before the handler
        return next.handle().pipe(
            map((data: any) => {
                //  running before response sent out
                let result = plainToInstance(this.dto, data.data, {
                    excludeExtraneousValues: true
                })
                return { ...data, data: result }
            })
        )

    }
}