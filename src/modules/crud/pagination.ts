import { Field, Int, ObjectType } from '@nestjs/graphql'
import { ClassType } from 'class-transformer/ClassTransformer'

export interface IPagination<T> {
  readonly items: T[]
  readonly total: number
}

export const PaginatedResponse = <TItem>(TItemClass: ClassType<TItem>) => {
  @ObjectType({ isAbstract: true })
  abstract class PaginatedResponseClass {

    @Field((type) => [TItemClass])

    items: TItem[]

    @Field((type) => Int)
    total: number
  }
  return PaginatedResponseClass as ClassType<IPagination<TItem>>
}
