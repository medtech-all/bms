import { Controller, Get, Post, Body, UseFilters, BadRequestException, UseInterceptors } from '@nestjs/common';
import { IUserService } from 'src/common/interfaces/user.service.interface';
import { CreateUserDto } from 'src/common/dto/user/create-user.dto';
import { ApiTags, ApiExcludeEndpoint } from '@nestjs/swagger';
import { JSendTransformInterceptor } from 'src/common/interceptors/JSendTransform.interceptor';
import { SerializeInterceptor } from 'src/common/interceptors/serializer.interceptor';
import { UserDto } from 'src/common/dto/user/user.dto';
import { User } from 'src/entity/user.entity';
import { UserService } from 'src/common/providers/user/user.service';

@Controller('user')
@ApiTags("User")
export class UserController {
    constructor(
        private readonly userService: UserService,
    ) { }


    @Post()
    @ApiExcludeEndpoint()
    async createUser(@Body() createUserDto: CreateUserDto) {
        return await this.userService.create({ ...createUserDto });
    }

    @Get()
    @UseInterceptors(new SerializeInterceptor(UserDto))
    @UseInterceptors(JSendTransformInterceptor)
    async getUsers() {
        return { data: await this.userService.find(), status: "success", message: "value prepared" }
    }
}
