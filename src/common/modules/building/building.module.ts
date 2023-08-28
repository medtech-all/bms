import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Building } from 'src/entity/building.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Building])]
})
export class BuildingModule { }
