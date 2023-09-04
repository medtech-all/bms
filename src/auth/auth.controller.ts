import { Controller, Post, Body, UseInterceptors, Session, HttpStatus } from '@nestjs/common';
import { CreateUserDto } from 'src/common/dto/user/create-user.dto';
import { ApiOperation, ApiProperty, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JSendTransformInterceptor } from 'src/common/interceptors/JSendTransform.interceptor';
import { SerializeInterceptor } from 'src/common/interceptors/serializer.interceptor';
import { UserDto } from 'src/common/dto/user/user.dto';
import { AuthService } from './auth.service';
import { LoginDto } from 'src/common/dto/user/login.dto';
import CustomResponse from 'src/common/providers/custom-response/custom-response.service';
import { CustomMessages } from 'src/common/constants/custom-messages';
import CustomError from 'src/common/providers/custom-error/custom-error.service';

@Controller('auth')
@ApiTags("Auth")
export class AuthController {
    constructor(private readonly authService: AuthService,
    ) { }

    @Post('register')
    @ApiOperation({ summary: 'Create a new user' })
    @UseInterceptors(new SerializeInterceptor(UserDto))
    @UseInterceptors(JSendTransformInterceptor)
    async register(@Body() createUserDto: CreateUserDto): Promise<CustomResponse | CustomError> {
        let user = await this.authService.register(createUserDto)
        return new CustomResponse(HttpStatus.OK, CustomMessages.USER_CREATED, user);
    }

    @Post("login")
    async login(@Body() loginDto: LoginDto,
        @Session() session: any
    ) {
        let token = await this.authService.login(loginDto.username, loginDto.password)

        return new CustomResponse(
            HttpStatus.OK,
            CustomMessages.LOGIN_SUCCESSFULLY,
            token,
        );
    }

    @Post("logout")
    @ApiOperation({ summary: "User logout" })
    async logout(@Session() session: any) {
        session.userId = null
    }

}
