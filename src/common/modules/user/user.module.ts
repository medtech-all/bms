import { Module } from '@nestjs/common';
import { UserController } from 'src/common/controllers/user/user.controller';
import { UserService } from 'src/common/providers/user/user.service';
import { IUserService } from 'src/common/interfaces/user.service.interface';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { UserRepository } from 'src/common/repositories/user.repository';
import { CrudService } from 'src/shared/Crud/crud.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([User, UserRepository]),
    ],
    controllers: [UserController],
    providers: [
        UserService,
        { provide: IUserService, useClass: UserService },
        {
            provide: CrudService,
            useFactory: (repository: UserRepository) => {
                return new CrudService<User>(repository);
            },
            inject: [UserRepository],
        },],
    exports: [UserService, IUserService, CrudService],
})
export class UserModule { }
