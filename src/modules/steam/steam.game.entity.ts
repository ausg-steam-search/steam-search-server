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

  @Column('text')
  @Field()
  shortDescription: string

  @Column({ default: '' })
  @Field()
  headerImage: string

  @Column({ default: '' })
  @Field()
  website: string

  @Column({ default: '' })
  @Field()
  background: string

  public static buildWith(partialData: Partial<SteamGame>) {
    return buildWithPartialData(SteamGame, partialData)
  }
}
