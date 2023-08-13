import { Controller, Post, Body } from '@nestjs/common';
import { CreateUserDto } from 'src/common/dto/user/create-user.dto';
import { UserService } from 'src/common/providers/user/user.service';
import { HashingService } from './hashing.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
    constructor(private readonly userService: UserService
        , private readonly hashingService: HashingService
    ) { }

    @Post('register')
    @ApiOperation({ summary: 'Create a new user' })
    @ApiResponse({ status: 201, description: 'User created successfully' })
    @ApiResponse({ status: 400, description: 'Bad Request' })
    async register(@Body() createUserDto: CreateUserDto) {
        let hashedPassword = await this.hashingService.hashPassword(createUserDto.password, 10)
        return await this.userService.create({ ...createUserDto, password: hashedPassword })
    }
}
