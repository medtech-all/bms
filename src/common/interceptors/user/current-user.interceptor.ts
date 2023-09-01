import { NestInterceptor, ExecutionContext, CallHandler, Injectable } from "@nestjs/common";
import { UserService } from "src/common/providers/user/user.service";


@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
    constructor(private readonly userService: UserService) { }

    async intercept(context: ExecutionContext, handler: CallHandler) {
        const request = context.switchToHttp().getRequest()
        const { userId } = request.session || {};
        console.log("session", request.session);

        console.log(userId);

        if (userId) {
            const user = await this.userService.findById(userId)
            request.currentUser = user
        }
        return handler.handle()
    }
}