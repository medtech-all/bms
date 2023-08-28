import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Unit } from 'src/entity/unit.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Unit])]
})
export class UnitModule { }
