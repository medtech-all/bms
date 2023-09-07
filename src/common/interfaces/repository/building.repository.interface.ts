
import { Building } from "src/entity/building.entity";
import { DeepPartial, Repository } from "typeorm";


export interface IBuildingRepository {
    find(): Promise<Building[]>;
    findById(id: string): Promise<Building>;
    findOneById(id: string): Promise<Building>;
    create(data: DeepPartial<Building>): Promise<Building>;
    update(id: string, data: Partial<Building>): Promise<Building>;
    delete(id: string): Promise<void>;
    findOne(where: any): Promise<Building>
    save(data: Partial<Building>): Promise<Building>
}