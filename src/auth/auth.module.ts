import { Module } from '@nestjs/common';
import { HashingService } from './hashing.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/common/modules/user/user.module';
import { AuthService } from './auth.service';
import { IUserService } from 'src/common/interfaces/service/user.service.interface';
import { UserService } from 'src/common/providers/user/user.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import jwtConfig from './config/jwt.config';
import { ConfigModule } from '@nestjs/config';
import { RefreshTokenIdsStorage } from './refresh-token-ids.storage';
import { RedisConfigModule } from 'src/config/database/redis/config.module';
import { RedisConfigService } from 'src/config/database/redis/config.service';
import { UserRepository } from 'src/common/repositories/user.repository';

@Module({
    imports: [
        RedisConfigModule,
        JwtModule.registerAsync(jwtConfig.asProvider()),
        ConfigModule.forFeature(jwtConfig),
        UserModule
    ],
    providers: [HashingService, AuthService, JwtService, RefreshTokenIdsStorage, UserService, RedisConfigService],
    controllers: [AuthController],
})
export class AuthModule {

}
