import { Column, Unique, PrimaryGeneratedColumn, Entity, OneToMany, OneToOne } from "typeorm"
import { IsOptional, IsEmail, IsNotEmpty, MaxLength } from "class-validator"
import { BaseEntity } from "src/shared/Crud/entity/base.entity"
import { Unit } from "./unit.entity"

@Entity()
export class UnitDetails extends BaseEntity {
    @PrimaryGeneratedColumn("increment")
    unitDetailId: number

    @Column()
    unitId: number

    @Column()
    numberOfResidents: number

    @Column()
    size: number

    @OneToOne(() => Unit, unit => unit.unitId)
    unit: Unit
}