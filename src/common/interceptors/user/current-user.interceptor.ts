import { NestInterceptor, ExecutionContext, CallHandler, Injectable, Inject } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "src/common/providers/user/user.service";

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
    constructor(private readonly userService: UserService,
        private readonly jwtService: JwtService) { }

    async intercept(context: ExecutionContext, handler: CallHandler) {

        const request = context.switchToHttp().getRequest()
        const token = request.session.token
        let currentUser = this.jwtService.decode(token.accessToken)
        request.currentUser = currentUser
        return handler.handle()
    }
}