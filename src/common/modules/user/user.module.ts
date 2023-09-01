import { Module } from '@nestjs/common';
import { UserController } from 'src/common/controllers/user/user.controller';
import { UserService } from 'src/common/providers/user/user.service';
import { IUserService } from 'src/common/interfaces/user.service.interface';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { UserRepository } from 'src/common/repositories/user.repository';
import { IRepository } from 'src/shared/Crud/repository/base.repository.interface';
import { CurrentUserInterceptor } from 'src/common/interceptors/user/current-user.interceptor';

@Module({
    imports: [
        TypeOrmModule.forFeature([User, UserRepository]),
    ],
    controllers: [UserController],
    providers: [
        UserService,
        UserRepository,
        CurrentUserInterceptor
    ],
    exports: [UserService],
})
export class UserModule { }
