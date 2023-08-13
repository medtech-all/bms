import { Injectable } from '@nestjs/common';
import { IUserService } from 'src/common/interfaces/user.service.interface';
import { CreateUserDto } from 'src/common/dto/user/create-user.dto';
import { InjectRepository } from "@nestjs/typeorm"
import { User } from 'src/entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService implements IUserService {

    constructor(
        @InjectRepository(User)
        private readonly userRepo: Repository<User>) {
    }

    async create(createUserDto: CreateUserDto): Promise<User> {
        let user = this.userRepo.create({ ...createUserDto })
        return await this.userRepo.save(user)
    }
    async find(): Promise<User[]> {
        return await this.userRepo.find()
    }
}
