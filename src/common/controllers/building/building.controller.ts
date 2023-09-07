import { Body, Controller, Get, Post, Query, UseInterceptors, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JSendTransformInterceptor } from 'src/common/interceptors/JSendTransform.interceptor';
import { BuildingService } from 'src/common/providers/building/building.service';
import { createBuildingDto } from 'src/common/dto/building/create-building.dto';
import { ApiParam } from '@nestjs/swagger';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { User } from 'src/entity/user.entity';

@Controller('building')
@ApiTags("Building")
export class BuildingController {

    constructor(private readonly buildingService: BuildingService) { }

    @Get()
    @UseInterceptors(JSendTransformInterceptor)
    async getBuildings(@Query() query: string) {
        return { data: await this.buildingService.find(), status: "success", message: "value prepared" }
    }

    @Post()
    async createBuilding(
        @Body() createBuildingDto: createBuildingDto,
        @CurrentUser() currentUser: User
    ) {
        console.log(currentUser);

        return null

        // return { data: await this.buildingService.create(createBuildingDto), status: "success", message: "value prepared" }
    }

    @Get("/:buildingId")
    @ApiParam({ name: "identifier", required: true })
    @UseInterceptors(JSendTransformInterceptor)
    async getBuildingById(@Param("buildingId") buildingId: string) {
        return { data: await this.buildingService.findById(buildingId), status: "success", message: "value prepared" }
    }


}
