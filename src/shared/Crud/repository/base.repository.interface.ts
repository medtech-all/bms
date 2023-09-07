import { DeepPartial } from 'typeorm';
import { BaseEntity } from '../entity/base.entity';

export interface IRepository<T extends BaseEntity> {
    find(): Promise<T[]>;
    findById(id: string): Promise<T>;
    findOneById(id: string): Promise<T>;
    create(data: DeepPartial<T>): Promise<T>;
    update(id: string, data: Partial<T>): Promise<T>;
    delete(id: string): Promise<void>;
    findOne(where: any): Promise<T>
    save(data: Partial<T>): Promise<T>
}
