import { Controller, Get, Post, Body, UseFilters, BadRequestException, UseInterceptors } from '@nestjs/common';
import { IUserService } from 'src/common/interfaces/user.service.interface';
import { UserDto } from 'src/common/dto/user/create-user.dto';
import { ApiTags, ApiExcludeEndpoint } from '@nestjs/swagger';
import { JSendTransformInterceptor } from 'src/common/interceptors/JSendTransform.interceptor';

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
    @UseInterceptors(JSendTransformInterceptor)
    async getUsers() {
        return { data: await this.userService.find(), status: "success", message: "value prepared" }
    }
}
