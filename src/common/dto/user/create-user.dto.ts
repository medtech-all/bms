import { IsOptional, IsEmail, IsNotEmpty, MaxLength, IsString } from "class-validator"
import { ApiProperty } from "@nestjs/swagger"

export class UserDto {

    @IsNotEmpty()
    @MaxLength(50)
    @ApiProperty()
    firstName: string

    @IsNotEmpty()
    @MaxLength(50)
    @ApiProperty()
    lastName: string

    @IsNotEmpty()
    @MaxLength(50)
    @ApiProperty()
    username: string

    @IsNotEmpty()
    @ApiProperty()
    password: string

    @IsNotEmpty()
    @MaxLength(20)
    @ApiProperty()
    bankAccountNumber: string

    @IsNotEmpty()
    @MaxLength(12)
    @ApiProperty()
    phoneNumber: string

    @IsOptional()
    @IsEmail()
    @MaxLength(50)
    @ApiProperty()
    email?: string
}

