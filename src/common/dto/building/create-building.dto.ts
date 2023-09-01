import { IsOptional, IsEmail, IsNotEmpty, MaxLength, IsString } from "class-validator"
import { ApiProperty } from "@nestjs/swagger"

export class createBuildingDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    name: string

    @IsString()
    @IsOptional()
    @ApiProperty()
    address: string

    @IsString()
    @IsOptional()
    @ApiProperty()
    complexId: string

}