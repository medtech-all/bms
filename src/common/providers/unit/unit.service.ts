import { Inject, Injectable } from '@nestjs/common';
import { IUnitRepository } from 'src/common/interfaces/repository/unit.repository.interface';
import { IUnitService } from 'src/common/interfaces/service/unit.service.interface';
import { Unit } from 'src/entity/unit.entity';
import { BaseService } from 'src/shared/Crud/service/base.service';

@Injectable()
export class UnitService extends BaseService<Unit> implements IUnitService {
    constructor(
        @Inject("IUnitRepository")
        private readonly unitRepo: IUnitRepository
    ) {
        super(unitRepo)
    }
}
