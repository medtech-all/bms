import { createParamDecorator, ExecutionContext } from "@nestjs/common";


export const CurrentUser = createParamDecorator(
    (data: never, context: ExecutionContext) => {
        let request = context.switchToHttp().getRequest()
        const currentUser = request.user
        return currentUser
    }
)