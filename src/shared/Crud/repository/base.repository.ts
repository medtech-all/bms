import { DeepPartial, Repository } from 'typeorm';
import { BaseEntity } from '../entity/base.entity';
import { IRepository } from './base.repository.interface';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export abstract class BaseRepository<T extends BaseEntity> {
    constructor(
        // @Inject("IRepository")
        private readonly repository: IRepository<T>
    ) { }

    async find(): Promise<T[]> {
        return await this.repository.find();
    }

    async findById(id: string): Promise<T> {
        return await this.repository.findOneById(id);
    }

    async findOneById(id: string): Promise<T> {
        return await this.repository.findOneById(id);
    }

    async create(data: DeepPartial<T>): Promise<T> {
        const entity = await this.repository.create(data);
        return await this.repository.save(entity);
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

    async save(data: Partial<T>): Promise<T> {
        return await this.repository.save(data)
    }
}
