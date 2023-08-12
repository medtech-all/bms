import { IsOptional, IsEmail, IsNotEmpty, Max, IsString } from "class-validator"
import { ApiProperty } from "@nestjs/swagger"

export class UserDto {

    @IsNotEmpty()
    @Max(50, { message: "Long firstName" })
    @ApiProperty()
    firstName: string

    @IsNotEmpty()
    @Max(50, { message: "Long lastName" })
    lastName: string

    @IsNotEmpty()
    @Max(50, { message: "Long username" })
    username: string

    @IsNotEmpty()
    password: string

    @IsNotEmpty()
    @Max(20, { message: "Long bank number" })
    bankAccountNumber: string

    @IsNotEmpty()
    @Max(12, { message: "Long phone number" })
    phoneNumber: string

    @IsOptional()
    @IsEmail()
    @Max(50, { message: "Long email" })
    email?: string
}

