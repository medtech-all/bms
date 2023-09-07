import { Inject, Injectable } from '@nestjs/common';
import { IBuildingRepository } from 'src/common/interfaces/repository/building.repository.interface';
import { BuildingRepository } from 'src/common/repositories/building.repository';
import { Building } from 'src/entity/building.entity';
import { BaseService } from 'src/shared/Crud/service/base.service';

@Injectable()
export class BuildingService extends BaseService<Building>{
    constructor(
        @Inject("IBuildingRepository")
        private readonly buildingRepo: IBuildingRepository
    ) {
        super(buildingRepo)
    }
}
