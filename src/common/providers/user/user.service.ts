import { Inject, Injectable } from '@nestjs/common';
import { IUserService } from 'src/common/interfaces/service/user.service.interface';
import { CreateUserDto } from 'src/common/dto/user/create-user.dto';
import { InjectRepository } from "@nestjs/typeorm"
import { User } from 'src/entity/user.entity';
import { Repository } from 'typeorm';
import { UserRepository } from 'src/common/repositories/user.repository';
import { BaseService } from 'src/shared/Crud/service/base.service';
import { IUserRepository } from 'src/common/interfaces/repository/user.repository.interface';

@Injectable()
export class UserService extends BaseService<User> implements IUserService {

    constructor(
        @Inject("IUserRepository")
        private readonly userRepo: IUserRepository
    ) {
        super(userRepo);
    }

    async create(createUserDto: CreateUserDto): Promise<User> {
        let user = await this.userRepo.create({ ...createUserDto })
        return await this.userRepo.save(user)
    }

    async findOne(userId: string): Promise<User> {
        return await super.findById(userId)
    }

    async findById(userId: string): Promise<User> {
        return await super.findById(userId)
    }

    async findByUsernameAndEmail(email: string = undefined, username: string = undefined): Promise<User> {
        return await this.userRepo.findOne({ email, username })
    }

    async findByUsername(username: string) {
        return await super.findOne({ username })
    }

    async find(): Promise<User[]> {
        return await super.find()
    }
}
