import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { GraphQLModule } from '@nestjs/graphql'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthTokenMiddleware } from './modules/auth/auth.token.middleware'
import { UserModule } from './modules/user/user.module'
import { DeliveryTemplateModule } from './modules/delivery.template/delivery.template.module'
import { AuthModule } from './modules/auth/auth.module'
import { APP_FILTER } from '@nestjs/core'
import { BaseExceptionFilter } from './utils/utils.exception.filter'
import './extensions/repository.extensions' // Repository Extension 적용
import './extensions/array.extensions'
import { CommonModule } from './modules/common/common.module'
import { ProductModule } from './modules/product/product.module'
import { OrderModule } from './modules/order/order.module'
import { ProductGroupModule } from './modules/product.group/product.group.module'
import { CartModule } from './modules/cart/cart.module'
import { ScheduleModule } from '@nestjs/schedule'
import { SnsModule } from './modules/sns/sns.module'

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
    UserModule,
    AuthModule,
    ProductModule,
    ProductGroupModule,
    DeliveryTemplateModule,
    CommonModule,
    OrderModule,
    CartModule,
    SnsModule,
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
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthTokenMiddleware).forRoutes({ path: 'graphql', method: RequestMethod.POST })
  }
}
