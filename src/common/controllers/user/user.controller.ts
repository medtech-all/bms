import { Controller, Get } from '@nestjs/common';
import { IUserService } from 'src/common/interfaces/user.service.interface';

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: IUserService
    ) { }

    @Get()
    getUsers() {
        return this.userService.find()
    }
}
