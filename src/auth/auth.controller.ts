import { Controller, Post, Body, UseInterceptors, Session } from '@nestjs/common';
import { CreateUserDto } from 'src/common/dto/user/create-user.dto';
import { ApiOperation, ApiProperty, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JSendTransformInterceptor } from 'src/common/interceptors/JSendTransform.interceptor';
import { SerializeInterceptor } from 'src/common/interceptors/serializer.interceptor';
import { UserDto } from 'src/common/dto/user/user.dto';
import { AuthService } from './auth.service';
import { LoginDto } from 'src/common/dto/user/login.dto';

@Controller('auth')
@ApiTags("Auth")
export class AuthController {
    constructor(private readonly authService: AuthService
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

    @Post("login")
    async login(@Body() loginDto: LoginDto,
        @Session() session: any
    ) {
        let user = await this.authService.login(loginDto.username, loginDto.password)
        if (user.data) {
            session.userId = user.data.id
            session.username = user.data.username
        }
        return user
    }

}
