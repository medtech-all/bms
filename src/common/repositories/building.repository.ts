import { Repository } from 'typeorm';
import { User } from 'src/entity/user.entity';  // Import your TypeORM entity
import { BaseRepository } from 'src/shared/Crud/repository/base.repository';
import { IRepository } from 'src/shared/Crud/repository/base.repository.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Building } from 'src/entity/building.entity';
import { IBuildingRepository } from '../interfaces/repository/building.repository.interface';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class BuildingRepository extends BaseRepository<Building> implements IBuildingRepository {
    constructor(
        @InjectRepository(Building)
        repository: IBuildingRepository) {
        super(repository);
    }
}