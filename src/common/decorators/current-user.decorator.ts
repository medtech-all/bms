import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

export const CurrentUser = createParamDecorator(
    (data: never, context: ExecutionContext) => {
        let request = context.switchToHttp().getRequest()
        const token = request.session.token
        let currentUser = request.currentUser
        return currentUser
    }
)