import { Controller, Get, Post, Body, UseGuards, BadRequestException, UseInterceptors, Session, Inject, HttpStatus, Param } from '@nestjs/common';
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
import CustomResponse from 'src/common/providers/custom-response/custom-response.service';
import { CustomMessages } from 'src/common/constants/custom-messages';

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
        return new CustomResponse(HttpStatus.OK, CustomMessages.VALUE_PREPARED, await this.userService.findAll());
    }

    @Post("/:userId")
    @UseGuards(AuthGuard)
    @UseInterceptors(new SerializeInterceptor(UserDto))
    async getUser(@Param("userId") userId: string) {
        return new CustomResponse(HttpStatus.OK, CustomMessages.VALUE_PREPARED, await this.userService.findById(userId));
    }
}
