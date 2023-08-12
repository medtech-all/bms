import { Module } from '@nestjs/common';
import { HashingService } from './hashing.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/common/modules/user/user.module';

@Module({
    imports: [UserModule],
    providers: [HashingService],
    controllers: [AuthController]
})
export class AuthModule {

}
