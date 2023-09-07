import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BuildingController } from 'src/common/controllers/building/building.controller';
import { BuildingService } from 'src/common/providers/building/building.service';
import { BuildingRepository } from 'src/common/repositories/building.repository';
import { Building } from 'src/entity/building.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Building])],
    providers: [BuildingService, BuildingRepository, { provide: "IBuildingRepository", useClass: BuildingRepository }],
    controllers: [BuildingController],
    exports: [BuildingService, "IBuildingRepository"]
})
export class BuildingModule {

}
