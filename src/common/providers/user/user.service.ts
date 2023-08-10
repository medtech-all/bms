import { Injectable } from '@nestjs/common';
import { IUserService } from 'src/common/interfaces/user.service.interface';
@Injectable()
export class UserService implements IUserService {
    find(): any {
        return "return all users"
    }
}
