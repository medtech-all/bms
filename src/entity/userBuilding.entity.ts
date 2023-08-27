import { Column, Unique, PrimaryGeneratedColumn, Entity, ManyToMany } from "typeorm"
import { IsOptional, IsEmail, IsNotEmpty, MaxLength, Max } from "class-validator"
import { BaseEntity } from "src/shared/Crud/entity/base.entity"
import { Building } from "./building.entity"
import { User } from "./user.entity"

@Entity()

export class UserBuilding extends BaseEntity {
    @PrimaryGeneratedColumn("increment")
    userBuildingId: string

    @Column()
    userId: string

    @Column()
    buildingId: string

    @Column()
    role: string
    Buildings: any

    @ManyToMany(type => Building, building => building.buildingId)
    building: Building

    @ManyToMany(type => User, user => user.userId)
    user: User

}
