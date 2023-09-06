import { CreateUserDto } from '../../dto/user/create-user.dto';
import { User } from '../../../entity/user.entity';
import { IService } from "../../../shared/Crud/interface/base.service.interface"


export interface IUserService extends IService<User> {

    findByUsernameAndEmail(email: string, username: string): Promise<User | undefined>;
    findByUsername(username: string): Promise<User | undefined>;

}