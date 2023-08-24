import { Injectable } from '@nestjs/common';
import { IUserService } from 'src/common/interfaces/user.service.interface';
import { CreateUserDto } from 'src/common/dto/user/create-user.dto';
import { InjectRepository } from "@nestjs/typeorm"
import { User } from 'src/entity/user.entity';
import { Repository } from 'typeorm';
import { UserRepository } from 'src/common/repositories/user.repository';
import { BaseService } from 'src/shared/Crud/service/base.service';

@Injectable()
export class UserService extends BaseService<User> {

    constructor(
        private readonly userRepo: UserRepository
    ) {
        super(userRepo);
    }

    async create(createUserDto: CreateUserDto): Promise<User> {
        let user = await this.userRepo.create({ ...createUserDto })
        return await this.userRepo.save(user)
    }

    async findOne(userId: string): Promise<User> {
        return await this.userRepo.findOne({ where: { userId } })
    }

    async findByUsernameAndEmail(email: string = undefined, username: string = undefined): Promise<User> {
        return await this.userRepo.findOne({ email, username })
    }

    async findByUsername(username: string) {
        return await this.userRepo.findOne({ username })
    }

    async find(): Promise<User[]> {
        return await super.findAll()
    }
}
