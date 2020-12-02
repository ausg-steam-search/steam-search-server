import { Entity, PrimaryGeneratedColumn, Column, Index, JoinColumn, ManyToOne } from 'typeorm'
import { ObjectType, Field, Int } from '@nestjs/graphql'
import { buildWithPartialData } from 'src/utils/utils'
import { SteamGame } from './steam.game.entity'

@Entity({ name: 'SteamReview' })
@ObjectType()
export class SteamReview {
  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  id: number

  @JoinColumn()
  @ManyToOne((type) => SteamGame, { onDelete: 'CASCADE' })
  @Field((type) => SteamGame)
  steamGame: SteamGame

  @Column()
  @Index()
  @Field((type) => Int)
  steamGameId: number

  @Column()
  @Field((type) => Int)
  @Index({ unique: true })
  recommendationId: number

  @Column('text')
  @Field()
  review: string

  @Column()
  @Field((type) => Int)
  timestampCreatedAt: number

  @Column()
  @Field()
  votedUp: boolean

  @Column()
  @Field((type) => Int)
  votesUp: number

  @Column()
  @Field((type) => Int)
  votesFunny: number

  @Column()
  @Field()
  weightedVoteScore: string

  @Column()
  @Field((type) => Int)
  commentCount: number

  @Column()
  @Field()
  steamPurchase: boolean

  @Column()
  @Field()
  writtenDuringEarlyAccess: boolean

  public static buildWith(partialData: Partial<SteamReview>) {
    return buildWithPartialData(SteamReview, partialData)
  }
}
