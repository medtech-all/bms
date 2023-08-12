import { Controller, Get, Post, Body, UseFilters, BadRequestException } from '@nestjs/common';
import { IUserService } from 'src/common/interfaces/user.service.interface';
import { UserDto } from 'src/common/dto/user/create-user.dto';
import { ApiOperation, ApiResponse, ApiTags, ApiExcludeEndpoint } from '@nestjs/swagger';
import { HttpExceptionFilter } from 'src/common/filters/http-exception.filter';

@Controller('user')
@ApiTags("User")
export class UserController {
    constructor(
        private readonly userService: IUserService
    ) { }


    @Post()
    @ApiExcludeEndpoint()
    async createUser(@Body() createUserDto: UserDto) {
        return await this.userService.create({ ...createUserDto });
    }

    @Get()
    async getUsers() {
        return await this.userService.find()
    }
}
