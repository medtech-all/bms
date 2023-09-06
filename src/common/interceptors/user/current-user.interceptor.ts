import { NestInterceptor, ExecutionContext, CallHandler, Injectable } from "@nestjs/common";
import { UserService } from "src/common/providers/user/user.service";

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
    constructor(private readonly userService: UserService) { }

    async intercept(context: ExecutionContext, handler: CallHandler) {

        const request = context.switchToHttp().getRequest()
        const { userId } = request.session || {};

        return handler.handle()
    }
}