import { DeepPartial, Repository } from 'typeorm';
import { BaseEntity } from '../entity/base.entity';
import { IRepository } from './base.repository.interface';

export abstract class BaseRepository<T extends BaseEntity> {
    constructor(private readonly repository: Repository<T>) { }

    async findAll(): Promise<T[]> {
        return this.repository.find();
    }

    async findById(id: any): Promise<T> {
        return this.repository.findOne(id);
    }

    async create(data: Partial<T>): Promise<T> {
        const entity = this.repository.create();
        return this.repository.save(entity);
    }

    async update(id: any, data: Partial<T>): Promise<T> {
        await this.repository.update(id, data);
        return this.findById(id);
    }

    async delete(id: any): Promise<void> {
        await this.repository.delete(id);
    }

    async findOne(where: any): Promise<T> {
        return await this.repository.findOne({ where: where })
    }

    async save(data: DeepPartial<T>): Promise<T> {
        return await this.repository.save(data)
    }
}
