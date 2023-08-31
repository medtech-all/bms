import { Column, Unique, PrimaryGeneratedColumn, Entity, ManyToMany, ManyToOne, OneToMany } from "typeorm"
import { IsOptional, IsEmail, IsNotEmpty, MaxLength, Max } from "class-validator"
import { BaseEntity } from "src/shared/Crud/entity/base.entity"
import { type } from "os"
import { User } from "./user.entity"

@Entity()
@Unique(["buildingId"])
export class Building extends BaseEntity {

    @PrimaryGeneratedColumn("uuid")
    buildingId: string

    @Column()
    @MaxLength(50)
    @IsNotEmpty()
    name: string

    @Column()
    @MaxLength(150)
    @IsOptional()
    address: string

    @Column()
    @IsOptional()
    complexId: string

    @Column()
    @IsNotEmpty()
    managerId: string

    @Column()
    @IsNotEmpty()
    createdBy: string

    @ManyToOne(() => User, (user) => user.buildings)
    manager: User;

}