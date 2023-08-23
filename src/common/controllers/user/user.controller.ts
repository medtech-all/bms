import { Controller, Get, Post, Body, UseFilters, BadRequestException, UseInterceptors } from '@nestjs/common';
import { IUserService } from 'src/common/interfaces/user.service.interface';
import { CreateUserDto } from 'src/common/dto/user/create-user.dto';
import { ApiTags, ApiExcludeEndpoint } from '@nestjs/swagger';
import { JSendTransformInterceptor } from 'src/common/interceptors/JSendTransform.interceptor';
import { SerializeInterceptor } from 'src/common/interceptors/serializer.interceptor';
import { UserDto } from 'src/common/dto/user/user.dto';
import { CrudService } from 'src/shared/Crud/crud.service';
import { User } from 'src/entity/user.entity';

@Controller('user')
@ApiTags("User")
export class UserController {
    constructor(
        private readonly userService: IUserService,
        private readonly crudService: CrudService<User>
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
