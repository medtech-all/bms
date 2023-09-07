import { User } from "src/entity/user.entity";
import { IRepository } from "src/shared/Crud/repository/base.repository.interface";
import { DeepPartial, Repository } from "typeorm";

export interface IUserRepository {
    find(): Promise<User[]>;
    findById(id: string): Promise<User>;
    findOneById(id: string): Promise<User>;
    create(data: DeepPartial<User>): Promise<User>;
    update(id: string, data: Partial<User>): Promise<User>;
    delete(id: string): Promise<void>;
    findOne(where: any): Promise<User>
    save(data: Partial<User>): Promise<User>
}