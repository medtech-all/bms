import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeepPartial, Entity, Repository } from "typeorm";

@Injectable()
export class CrudService<T> {
    constructor(
        @InjectRepository(Entity)
        private readonly repository: Repository<T>
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

    async update(id: any, data: Partial<any>): Promise<any | undefined> {
        await this.repository.update(id, data);
        return this.findOneById(id);
    }

    async delete(id: any): Promise<boolean> {
        const result = await this.repository.delete(id);
        return result.affected === 1;
    }
}