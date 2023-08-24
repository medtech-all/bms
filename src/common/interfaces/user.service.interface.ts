import { User } from "src/entity/user.entity";
import { IService } from "src/shared/Crud/interface/base.service.interface";
export interface IUserService extends IService<User> {

    create(user: any): any;

    find(): any;

    findOne(userId: string): any;

    findByUsernameAndEmail(email: string, username: string): any;

    findByUsername(username: string): any;
}