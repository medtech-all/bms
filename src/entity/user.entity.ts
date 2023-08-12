import { Column, Unique, PrimaryGeneratedColumn, Entity } from "typeorm"
import { IsOptional, IsEmail, IsNotEmpty, Max } from "class-validator"


@Entity()
@Unique(['username', 'email']) // Define the unique constraint

export class User {
    @PrimaryGeneratedColumn("uuid")
    userId: string

    @Column()
    @IsNotEmpty()
    @Max(50, { message: "Long firstName" })
    firstName: string

    @Column()
    @IsNotEmpty()
    @Max(50, { message: "Long lastName" })
    lastName: string

    @Column()
    @IsNotEmpty()
    @Max(50, { message: "Long username" })
    username: string

    @Column()
    @IsNotEmpty()
    password: string

    @Column()
    @IsNotEmpty()
    @Max(20, { message: "Long bank number" })
    bankAccountNumber: string

    @Column()
    @IsNotEmpty()
    @Max(12, { message: "Long phone number" })
    phoneNumber: string

    @Column()
    @IsOptional()
    @IsEmail()
    @Max(50, { message: "Long email" })
    email?: string
}