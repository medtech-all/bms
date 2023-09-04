import { HttpStatus, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from 'src/common/dto/user/create-user.dto';
import { User } from 'src/entity/user.entity';
import { HashingService } from './hashing.service';
import { UserService } from 'src/common/providers/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigType } from '@nestjs/config';
import jwtConfig from './config/jwt.config';
import { ActiveUserData } from './interfaces/active-user-data.interface';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { randomUUID } from 'crypto';
import {
    InvalidateRefreshTokenError,
    RefreshTokenIdsStorage,
} from './refresh-token-ids.storage';
import CustomError from 'src/common/providers/custom-error/custom-error.service';


@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly hashingService: HashingService,
        private readonly jwtService: JwtService,
        @Inject(jwtConfig.KEY)
        private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
        private readonly refreshTokenIdsStorage: RefreshTokenIdsStorage
    ) {
    }

    async register(createUserDto: CreateUserDto) {
        let user = await this.userExists(createUserDto.email, createUserDto.username)
        if (user) {
            throw new CustomError(
                HttpStatus.BAD_REQUEST,
                'username, nationalCode or phoneNumber is Exists',
            );
        }
        let hashedPassword = await this.hashingService.hashPassword(createUserDto.password, 10)
        return await this.userService.create({ ...createUserDto, password: hashedPassword })
    }

    async userExists(email: string, username: string): Promise<User> {
        return await this.userService.findByUsernameAndEmail(email, username)
    }

    async login(username: string, password: string) {
        let user = await this.validateUser(username, password)
        if (!user) {
            return { data: null, status: "failed", message: "Unauthorized" }
        }

        let token = await this.generateTokens(user)
        return token
    }

    async validateUser(username: string, password: string): Promise<User> {
        let user = await this.userService.findByUsername(username)
        if (!user || !await this.hashingService.comparePasswords(password, user.password)) {
            throw new CustomError(HttpStatus.UNAUTHORIZED, 'Invalid login');
        }
        return user
    }

    async refreshTokens(refreshTokenDto: RefreshTokenDto) {
        try {
            const { id, refreshTokenId } = await this.jwtService.verifyAsync<
                Pick<ActiveUserData, 'id'> & { refreshTokenId: string }
            >(refreshTokenDto.refreshToken, {
                audience: this.jwtConfiguration.audience,
                secret: this.jwtConfiguration.secret,
                issuer: this.jwtConfiguration.issuer,
            });

            const user = await this.userService.findById(id);

            const isValid = await this.refreshTokenIdsStorage.validate(
                user.id,
                refreshTokenId,
            );

            if (isValid) {
                await this.refreshTokenIdsStorage.invalidate(user.id);
            } else {
                throw new Error('Refresh token is Invalid.');
            }

            return this.generateTokens(user);
        } catch (error) {
            if (error instanceof InvalidateRefreshTokenError) {
                throw new UnauthorizedException('Access denied');
            }
            throw new UnauthorizedException();
        }
    }

    async generateTokens(user: any) {
        const refreshTokenId = randomUUID();
        const [accessToken, refreshToken] = await Promise.all([
            this.signToken<Partial<ActiveUserData>>(
                user.id,
                this.jwtConfiguration.accessTokenExpireIn,
                {
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                },
            ),
            this.signToken(user.id, this.jwtConfiguration.refreshTokenExpireIn, {
                refreshTokenId,
            }),
        ]);
        await this.refreshTokenIdsStorage.insert(user.id, refreshTokenId);
        return { accessToken, refreshToken };
    }

    private async signToken<T>(userId: string, expiresIn: number, payload?: T) {
        return this.jwtService.signAsync(
            {
                id: userId,
                ...payload,
            },
            {
                audience: this.jwtConfiguration.audience,
                secret: this.jwtConfiguration.secret,
                issuer: this.jwtConfiguration.issuer,
                expiresIn,
            },
        );
    }


}
