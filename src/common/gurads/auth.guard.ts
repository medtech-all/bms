
import { CanActivate, ExecutionContext } from "@nestjs/common";

export class AuthGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> {

        let request = context.switchToHttp().getRequest()
        let userId = request.session.userId
        return !!userId
    }
}