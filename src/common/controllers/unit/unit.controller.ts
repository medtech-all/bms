import { Controller, Get, Post, Body, UseGuards, BadRequestException, UseInterceptors, Session, Inject, HttpStatus, Param } from '@nestjs/common';
import { IUserService } from 'src/common/interfaces/service/user.service.interface';
import { CreateUserDto } from 'src/common/dto/user/create-user.dto';
import { ApiTags, ApiExcludeEndpoint, ApiBearerAuth } from '@nestjs/swagger';
import { JSendTransformInterceptor } from 'src/common/interceptors/JSendTransform.interceptor';
import { SerializeInterceptor } from 'src/common/interceptors/serializer.interceptor';
import { UserDto } from 'src/common/dto/user/user.dto';
import { UserService } from 'src/common/providers/user/user.service';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { User } from 'src/entity/user.entity';
import { AuthGuard } from 'src/common/guards/auth.guard';
import CustomResponse from 'src/common/providers/custom-response/custom-response.service';
import { CustomMessages } from 'src/common/constants/custom-messages';
import { IUnitService } from 'src/common/interfaces/service/unit.service.interface';

@Controller('unit')
@ApiBearerAuth()
@ApiTags("Unit")
export class UnitController {

    constructor(
        @Inject("IUnitService")
        private readonly unitService: IUnitService) { }


    @UseGuards(AuthGuard)
    @Get()
    async getUnits() {
        return new CustomResponse(HttpStatus.OK, CustomMessages.VALUE_PREPARED, await this.unitService.find());
    }
}
