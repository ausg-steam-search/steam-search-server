import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { GraphQLModule } from '@nestjs/graphql'
import { ScheduleModule } from '@nestjs/schedule'
import { APP_FILTER } from '@nestjs/core'
import { BaseExceptionFilter } from './utils/utils.exception.filter'
import './extensions/repository.extensions' // Repository Extension 적용
import './extensions/array.extensions'

import { AppController } from './app.controller'
import { AppService } from './app.service'
import { SearchModule } from './modules/search/search.module'
import { SteamModule } from './modules/steam/steam.module'

const bDev = process.env.NODE_ENV === 'development'

@Module({
  imports: [
    TypeOrmModule.forRoot({ timezone: '+09:00' }),
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      context: ({ req }) => ({ req }),
      playground: bDev,
      debug: bDev,
    }),
    ScheduleModule.forRoot(),
    SearchModule,
    SteamModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: BaseExceptionFilter,
    },
  ],
})
export class AppModule {}
