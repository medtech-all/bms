import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeepPartial, Repository } from "typeorm";
import { User } from "src/entity/user.entity";
import { UserRepository } from "src/common/repositories/user.repository";
@Injectable()
export class CrudService<T> {
    constructor(
        @InjectRepository(UserRepository)
        private readonly repository: Repository<T>,
    ) { }

    async findAll(): Promise<T[]> {
        return this.repository.find();
    }

    async findOneById(id: any): Promise<T | undefined> {
        return this.repository.findOne(id);
    }

    async create(data: Partial<T>): Promise<T> {
        const entity = this.repository.create(data as DeepPartial<T>);
        return this.repository.save(entity);
    }

    async update(id: any, data: Partial<any>): Promise<T | undefined> {
        await this.repository.update(id, data);
        return this.findOneById(id);
    }

    async delete(id: any): Promise<boolean> {
        const result = await this.repository.delete(id);
        return result.affected === 1;
    }
}