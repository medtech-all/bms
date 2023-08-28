import { Column, Unique, PrimaryGeneratedColumn, Entity, OneToMany, ManyToMany, OneToOne } from "typeorm"
import { IsOptional, IsEmail, IsNotEmpty, MaxLength } from "class-validator"
import { BaseEntity } from "src/shared/Crud/entity/base.entity"
import { User } from "./user.entity"
import { UnitDetails } from "./unit-details.entity"


@Entity()
export class Unit extends BaseEntity {
    @PrimaryGeneratedColumn("increment")
    unitId: string

    @Column()
    @MaxLength(20)
    name: string

    @Column()
    @MaxLength(20)
    floorNo: string

    @Column()
    buildingId: string

    @Column()
    @MaxLength(12)
    phone: string

    @Column()
    residentId: string

    @Column()
    owner: boolean

    @ManyToMany(() => User, (user) => user.units)
    user: User

    @OneToOne(() => UnitDetails, unitDetails => unitDetails.unitId)
    unitDetails: UnitDetails
}