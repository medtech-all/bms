import { DeepPartial } from 'typeorm';
import { BaseEntity } from '../entity/base.entity';
import { IRepository } from '../repository/base.repository.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class BaseService<T extends BaseEntity> {
    constructor(private readonly repository: IRepository<T>) { }

    async find(): Promise<T[]> {
        return this.repository.find();
    }

    async findById(id: string): Promise<T> {
        return this.repository.findById(id);
    }

    async findOne(where: any): Promise<T> {
        return await this.repository.findOne(where)
    }

    async create(data: DeepPartial<T>): Promise<T> {
        return this.repository.create(data);
    }

    async update(id: string, data: Partial<T>): Promise<T> {
        return this.repository.update(id, data);
    }

    async delete(id: string): Promise<void> {
        return this.repository.delete(id);
    }
}
