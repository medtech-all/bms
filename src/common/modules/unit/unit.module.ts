import { Controller, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UnitController } from 'src/common/controllers/unit/unit.controller';
import { UnitService } from 'src/common/providers/unit/unit.service';
import { UnitRepository } from 'src/common/repositories/unit.respository';
import { Unit } from 'src/entity/unit.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Unit]), JwtModule],
    providers: [UnitService, UnitRepository,
        { provide: "IUnitRepository", useClass: UnitRepository },
        { provide: "IUnitService", useClass: UnitService }
    ],
    controllers: [UnitController],
    exports: ['IUnitRepository', 'IUnitService', UnitService, UnitRepository]
})
export class UnitModule { }
