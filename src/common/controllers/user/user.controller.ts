import { Controller, Get, Post, Body } from '@nestjs/common';
import { IUserService } from 'src/common/interfaces/user.service.interface';
import { UserDto } from 'src/common/dto/user/create-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('user')
@ApiTags("User")
export class UserController {
    constructor(
        private readonly userService: IUserService
    ) { }

    @ApiOperation({ summary: 'Create a new user' })
    @ApiResponse({ status: 201, description: 'User created successfully' })
    @Post()
    async createUser(@Body() createUserDto: UserDto) {
        return await this.userService.create({ ...createUserDto });
    }

    @Get()
    async getUsers() {
        return await this.userService.find()
    }
}
