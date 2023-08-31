import { IsOptional, IsEmail, IsNotEmpty, MaxLength, IsString } from "class-validator"
import { ApiProperty } from "@nestjs/swagger"

export class createBuildingDto {
    @IsString()
    @IsNotEmpty()
    name: string

    @IsString()
    @IsOptional()
    address: string

    @IsString()
    @IsOptional()
    complexId: string

}