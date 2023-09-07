
import { Unit } from "src/entity/unit.entity";
import { DeepPartial, Repository } from "typeorm";


export interface IUnitRepository {
    find(): Promise<Unit[]>;
    findById(id: string): Promise<Unit>;
    findOneById(id: string): Promise<Unit>;
    create(data: DeepPartial<Unit>): Promise<Unit>;
    update(id: string, data: Partial<Unit>): Promise<Unit>;
    delete(id: string): Promise<void>;
    findOne(where: any): Promise<Unit>
    save(data: Partial<Unit>): Promise<Unit>
}