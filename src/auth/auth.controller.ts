import { Controller, Post, Body } from '@nestjs/common';
import { CreateUserDto } from 'src/common/dto/user/create-user.dto';
import { UserService } from 'src/common/providers/user/user.service';
import { HashingService } from './hashing.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JSendTransformInterceptor } from 'src/common/interceptors/JSendTransform.interceptor';
import { SerializeInterceptor } from 'src/common/interceptors/serializer.interceptor';
import { UserDto } from 'src/common/dto/user/user.dto';
import { UseInterceptors } from '@nestjs/common/decorators';

@Controller('auth')
@ApiTags("Auth")
export class AuthController {
    constructor(private readonly userService: UserService
        , private readonly hashingService: HashingService
    ) { }

    @Post('register')
    @ApiOperation({ summary: 'Create a new user' })
    @ApiResponse({ status: 201, description: 'User created successfully' })
    @ApiResponse({ status: 400, description: 'Bad Request' })
    @UseInterceptors(new SerializeInterceptor(UserDto))
    @UseInterceptors(JSendTransformInterceptor)
    async register(@Body() createUserDto: CreateUserDto) {
        let hashedPassword = await this.hashingService.hashPassword(createUserDto.password, 10)
        return { data: await this.userService.create({ ...createUserDto, password: hashedPassword }), status: "success", message: "Inserted" }
    }
}
