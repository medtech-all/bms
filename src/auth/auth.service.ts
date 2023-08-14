import { Body, Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/common/dto/user/create-user.dto';
import { UserService } from 'src/common/providers/user/user.service';
import { User } from 'src/entity/user.entity';
import { HashingService } from './hashing.service';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService,
        private readonly hashingService: HashingService,
    ) { }

    async register(@Body() createUserDto: CreateUserDto) {
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
}
