
import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Request } from 'express';
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private readonly jwtService: JwtService) { }
    async canActivate(context: ExecutionContext): Promise<boolean> {

        let request = context.switchToHttp().getRequest()
        const token = this.extractTokenFromHeader(request);
        if (!token) {
            return false
        }

        const payload = await this.jwtService.verifyAsync(
            token,
            {
                secret: process.env.JWT_SECRET
            }
        );
        request["user"] = payload
        return true
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}