import { Repository } from 'typeorm';
import { User } from 'src/entity/user.entity';  // Import your TypeORM entity
import { BaseRepository } from 'src/shared/Crud/repository/base.repository';
import { IRepository } from 'src/shared/Crud/repository/base.repository.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Building } from 'src/entity/building.entity';

export class BuildingRepository extends BaseRepository<Building> implements IRepository<Building>{
    constructor(
        @InjectRepository(Building)
        repository: Repository<Building>) {
        super(repository);
    }
}