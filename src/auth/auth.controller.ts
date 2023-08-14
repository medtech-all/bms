import { Controller, Post, Body } from '@nestjs/common';
import { CreateUserDto } from 'src/common/dto/user/create-user.dto';
import { UserService } from 'src/common/providers/user/user.service';
import { HashingService } from './hashing.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JSendTransformInterceptor } from 'src/common/interceptors/JSendTransform.interceptor';
import { SerializeInterceptor } from 'src/common/interceptors/serializer.interceptor';
import { UserDto } from 'src/common/dto/user/user.dto';
import { UseInterceptors } from '@nestjs/common/decorators';
import { IUserService } from 'src/common/interfaces/user.service.interface';
import { AuthService } from './auth.service';

@Controller('auth')
@ApiTags("Auth")
export class AuthController {
    constructor(private readonly authService: AuthService
        , private readonly hashingService: HashingService
    ) { }

    @Post('register')
    @ApiOperation({ summary: 'Create a new user' })
    @UseInterceptors(new SerializeInterceptor(UserDto))
    @UseInterceptors(JSendTransformInterceptor)
    async register(@Body() createUserDto: CreateUserDto) {
        let user = await this.authService.register(createUserDto)
        if (!user) {
            return { data: null, status: "Bad Request", message: "Username or email is already taken" }
        }
        return { data: user, status: "success", message: "Inserted" }
    }
}
