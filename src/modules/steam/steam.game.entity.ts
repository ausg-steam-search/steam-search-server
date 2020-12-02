import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { ObjectType, Field, Int } from '@nestjs/graphql'
import { buildWithPartialData } from 'src/utils/utils'

@Entity({ name: 'SteamGame' })
@ObjectType()
export class SteamGame {
  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  id: number

  @Column()
  @Field((type) => Int)
  appId: number

  @Column()
  @Field()
  name: string

  @Column('text')
  @Field()
  detailDescription: string

  @Column('text')
  @Field()
  aboutTheGame: string

  @Column()
  @Field()
  shortDescription: string

  @Column()
  @Field()
  headerImage: string

  @Column()
  @Field()
  website: string

  @Column()
  @Field()
  background: string

  public static buildWith(partialData: Partial<SteamGame>) {
    return buildWithPartialData(SteamGame, partialData)
  }
}
