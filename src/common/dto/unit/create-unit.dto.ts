import { IsOptional, IsEmail, IsNotEmpty, MaxLength, IsString } from "class-validator"
import { ApiProperty } from "@nestjs/swagger"

export class CreateUnitDto {

    @IsNotEmpty()
    @MaxLength(20)
    @ApiProperty()
    name: string

    @IsNotEmpty()
    @MaxLength(20)
    @ApiProperty()
    floorNo: string

    @IsNotEmpty()
    @ApiProperty()
    buildingId: string

    @ApiProperty()
    @IsOptional()
    @MaxLength(12)
    phone: string

    @ApiProperty()
    @IsOptional()
    residentId: string

    @IsNotEmpty()
    @MaxLength(12)
    @ApiProperty()
    owner: string
}

