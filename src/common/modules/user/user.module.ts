import { Module } from '@nestjs/common';
import { UserController } from 'src/common/controllers/user/user.controller';
import { UserService } from 'src/common/providers/user/user.service';
import { IUserService } from 'src/common/interfaces/user.service.interface';

@Module({
    controllers: [UserController],
    providers: [UserService, { provide: IUserService, useClass: UserService }],
    exports: [UserService]
})
export class UserModule { }
