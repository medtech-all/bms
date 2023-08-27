import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/common/dto/user/create-user.dto';
import { User } from 'src/entity/user.entity';
import { HashingService } from './hashing.service';
import { IUserService } from 'src/common/interfaces/user.service.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/common/providers/user/user.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly hashingService: HashingService,
    ) {
    }

    async register(createUserDto: CreateUserDto) {
        let user = await this.userExists(createUserDto.email, createUserDto.username)
        if (user) {
            return null
        }
        let hashedPassword = await this.hashingService.hashPassword(createUserDto.password, 10)
        return await this.userService.create({ ...createUserDto, password: hashedPassword })
    }

    async userExists(email: string, username: string): Promise<User> {
        return await this.userService.findByUsernameAndEmail(email, username)
    }

    async login(username: string, password: string) {
        let user = await this.userService.findByUsername(username)
        if (!user) {
            return { data: null, message: "Invalid username or password", status: "fail" }
        } else if (!await this.hashingService.comparePasswords(password, user.password)) {
            return { data: null, message: "Invalid username or password", status: "fail" }
        }
        return { data: user, message: "Logged in successfully", status: "success" }
    }
}
