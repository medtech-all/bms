import { Module } from '@nestjs/common';
import { HashingService } from './hashing.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/common/modules/user/user.module';
import { AuthService } from './auth.service';

@Module({
    imports: [UserModule],
    providers: [HashingService, AuthService],
    controllers: [AuthController]
})
export class AuthModule {

}
