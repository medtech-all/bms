import { Module } from '@nestjs/common';
import { HashingService } from './hashing.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/common/modules/user/user.module';
import { AuthService } from './auth.service';
import { IUserService } from 'src/common/interfaces/user.service.interface';
import { UserService } from 'src/common/providers/user/user.service';

@Module({
    imports: [UserModule],
    providers: [HashingService, AuthService],
    controllers: [AuthController]
})
export class AuthModule {

}
