import { Injectable } from '@nestjs/common';
import { BuildingRepository } from 'src/common/repositories/building.repository';
import { Building } from 'src/entity/building.entity';
import { BaseService } from 'src/shared/Crud/service/base.service';

@Injectable()
export class BuildingService extends BaseService<Building>{
    constructor(
        private readonly buildingRepo: BuildingRepository
    ) {
        super(buildingRepo)
    }
}
