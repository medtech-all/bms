import { Column, Unique, PrimaryGeneratedColumn, Entity, OneToMany } from "typeorm"
import { IsOptional, IsEmail, IsNotEmpty, MaxLength } from "class-validator"
import { BaseEntity } from "src/shared/Crud/entity/base.entity"
import { Building } from "./building.entity"
import { Unit } from "./unit.entity"

@Entity()
@Unique(['username', 'email']) // Define the unique constraint

export class User extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    userId: string

    @Column()
    @IsNotEmpty()
    @MaxLength(50)
    firstName: string

    @Column()
    @IsNotEmpty()
    @MaxLength(50)
    lastName: string

    @Column()
    @IsNotEmpty()
    @MaxLength(50)
    username: string

    @Column()
    @IsNotEmpty()
    password: string

    @Column()
    @IsNotEmpty()
    @MaxLength(20)
    bankAccountNumber: string

    @Column()
    @IsNotEmpty()
    @MaxLength(12)
    phoneNumber: string

    @Column()
    @IsOptional()
    @IsEmail()
    @MaxLength(50)
    email?: string

    // Define the Many-to-One relationship with Building
    @OneToMany(() => Building, (building) => building.managerId)
    buildings: Building[];

    @OneToMany(() => Unit, (unit) => unit.residentId)
    units: Unit[]

}