import { Column, Unique, PrimaryGeneratedColumn, Entity, OneToMany, ManyToMany, OneToOne, ManyToOne } from "typeorm"
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
    @IsNotEmpty()
    name: string

    @Column()
    @MaxLength(20)
    @IsNotEmpty()
    floorNo: string

    @Column()
    @IsNotEmpty()
    buildingId: string

    @Column()
    @MaxLength(12)
    @IsOptional()
    phone: string

    @Column()
    @IsOptional()
    residentId: string

    @Column()
    owner: boolean

    @ManyToOne(() => User, (user) => user.units)
    user: User

    @OneToOne(() => UnitDetails, unitDetails => unitDetails.unitId)
    unitDetails: UnitDetails
}