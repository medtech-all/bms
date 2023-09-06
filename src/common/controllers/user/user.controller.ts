import { Controller, Get, Post, Body, UseGuards, BadRequestException, UseInterceptors, Session, Inject } from '@nestjs/common';
import { IUserService } from 'src/common/interfaces/service/user.service.interface';
import { CreateUserDto } from 'src/common/dto/user/create-user.dto';
import { ApiTags, ApiExcludeEndpoint, ApiBearerAuth } from '@nestjs/swagger';
import { JSendTransformInterceptor } from 'src/common/interceptors/JSendTransform.interceptor';
import { SerializeInterceptor } from 'src/common/interceptors/serializer.interceptor';
import { UserDto } from 'src/common/dto/user/user.dto';
import { UserService } from 'src/common/providers/user/user.service';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { User } from 'src/entity/user.entity';
import { AuthGuard } from 'src/common/guards/auth.guard';

@ApiBearerAuth()
@Controller('user')
@ApiTags("User")
export class UserController {
    constructor(
        @Inject("IUserService")
        private readonly userService: IUserService,
    ) { }


    @Post()
    @ApiExcludeEndpoint()
    async createUser(@Body() createUserDto: CreateUserDto) {
        return await this.userService.create({ ...createUserDto });
    }

    @Get()
    @UseGuards(AuthGuard)
    @UseInterceptors(new SerializeInterceptor(UserDto))
    async getUsers(
        @Session() session: any,
        @CurrentUser() currentUser: User
    ) {
        return await this.userService.findAll()
    }
}
