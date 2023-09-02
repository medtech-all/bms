import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configuration } from './config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { UserModule } from './common/modules/user/user.module';
import { AuthModule } from './auth/auth.module';
import { JSendTransformInterceptor } from './common/interceptors/JSendTransform.interceptor';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { BuildingModule } from './common/modules/building/building.module';
import { UnitModule } from './common/modules/unit/unit.module';
import { UnitDetailsModule } from './common/modules/unit-details/unit-details.module';
import { CurrentUserInterceptor } from './common/interceptors/user/current-user.interceptor';
import { AuthGuard } from './common/gurads/auth.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) => ({
        ...config.get<TypeOrmModuleOptions>('db')
      }),
      inject: [ConfigService]
    }),
    UserModule,
    AuthModule,
    BuildingModule,
    UnitModule,
    UnitDetailsModule,
  ],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: CurrentUserInterceptor
    }
  ],
})
export class AppModule { }
