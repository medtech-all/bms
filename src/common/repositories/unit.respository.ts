import { BaseRepository } from 'src/shared/Crud/repository/base.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Unit } from 'src/entity/unit.entity';
import { IUnitRepository } from '../interfaces/repository/unit.repository.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UnitRepository extends BaseRepository<Unit> implements IUnitRepository {
    constructor(
        @InjectRepository(Unit)
        repository: IUnitRepository) {
        super(repository);
    }
}