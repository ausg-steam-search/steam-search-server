import './dotenv'
import { NestFactory } from '@nestjs/core'
import { GraphQLError } from 'graphql'
import { ValidationPipe } from '@nestjs/common'
import { useContainer, ValidationError } from 'class-validator'
import { AppModule } from './app.module'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const options = new DocumentBuilder()
    .setTitle('Steam Search API Documents')
    .setDescription('Steam Search API Documents')
    .setVersion('0.1')
    .build()

  const document = SwaggerModule.createDocument(app, options)

  SwaggerModule.setup('api', app, document)

  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors: ValidationError[]) =>
        new GraphQLError(Object.values(errors[0].constraints)[0]),
    }),
  )
  // Validation 에 Dependency Injection 하기위함.
  useContainer(app.select(AppModule), { fallbackOnErrors: true })

  app.enableCors()

  await app.listen(3005)
}
bootstrap()
