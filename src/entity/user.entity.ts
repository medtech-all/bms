import { Column, Unique, PrimaryGeneratedColumn, Entity } from "typeorm"
import { IsOptional, IsEmail, IsNotEmpty, MaxLength } from "class-validator"
import { BaseEntity } from "src/shared/Crud/entity/base.entity"

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
}