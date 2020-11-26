import { Catch, ExceptionFilter, ArgumentsHost, HttpException } from '@nestjs/common'
import { GraphQLError } from 'graphql'
import { Request, Response } from 'express'

@Catch()
export class BaseExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    if (exception instanceof GraphQLError) {
      console.error(exception.message, exception.stack)
    } else if (exception instanceof HttpException) {
      const ctx = host.switchToHttp()
      const response = ctx.getResponse<Response>()
      const request = ctx.getRequest<Request>()
      const status = exception.getStatus()

      console.error(exception.message, exception.getStatus())
      console.error(exception.getResponse())

      response.status(status).json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
      })
    } else {
      console.error(exception)

      throw new GraphQLError('에러가 발생했습니다.')
    }
  }
}
