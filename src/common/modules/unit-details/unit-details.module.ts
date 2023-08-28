import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UnitDetails } from 'src/entity/unit-details.entity';

@Module({
    imports: [TypeOrmModule.forFeature([UnitDetails])]

})
export class UnitDetailsModule { }
