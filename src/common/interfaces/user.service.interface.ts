import { CreateUserDto } from '../dto/user/create-user.dto';
import { User } from '../../entity/user.entity';

export interface IUserService {
    create(user: CreateUserDto): Promise<User>;
    find(): Promise<User[]>;
    findOne(userId: string): Promise<User | undefined>;
    findByUsernameAndEmail(email: string, username: string): Promise<User | undefined>;
    findByUsername(username: string): Promise<User | undefined>;
}