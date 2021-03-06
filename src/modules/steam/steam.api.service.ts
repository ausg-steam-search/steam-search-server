import { Injectable } from '@nestjs/common'
import { Cron } from '@nestjs/schedule'
import { steamReviewAxios } from 'src/utils/utils.axios'
import { SteamGame } from './steam.game.entity'
import { SteamGameRepository } from './steam.game.repository'
import { ISteamGame, ISteamReview } from './steam.interface'
import { delay } from 'src/utils/utils'
import { SteamReview } from './steam.review.entity'

@Injectable()
export class SteamApiService {
  constructor(private readonly steamGameRepository: SteamGameRepository) {}

  /**
   * 주기적으로 게임 리뷰를 받아와 DB 적재
   */
  @Cron('0 * * * * *')
  private async scheduleFetchReviews_0() {
    await this.fetchReviews({ skip: 0, take: 200 })
  }
  @Cron('15 * * * * *')
  private async scheduleFetchReviews_1() {
    await this.fetchReviews({ skip: 200, take: 200 })
  }
  @Cron('30 * * * * *')
  private async scheduleFetchReviews_2() {
    await this.fetchReviews({ skip: 400, take: 200 })
  }
  @Cron('45 * * * * *')
  private async scheduleFetchReviews_3() {
    await this.fetchReviews({ skip: 600, take: 200 })
  }

  private async fetchReviews({ skip, take }: { skip: number; take: number }) {
    const { items: games } = await this.steamGameRepository.findAll({ skip, take })

    await Promise.all(
      games.map(async (game) => {
        const { data } = await steamReviewAxios.get(
          `/appreviews/${game.appId}?json=1&language=korean`,
        )
        const reviews = data.reviews as ISteamReview[]

        await Promise.all(
          reviews.map(async (review) => {
            try {
              const steamReview = SteamReview.buildWith({
                recommendationId: review.recommendationid,
                review: review.review,
                commentCount: review.comment_count,
                steamGameId: game.id,
                steamPurchase: review.steam_purchase,
                timestampCreatedAt: review.timestamp_created,
                votedUp: review.voted_up,
                votesUp: review.votes_up,
                votesFunny: review.votes_funny,
                weightedVoteScore: review.weighted_vote_score,
                writtenDuringEarlyAccess: review.written_during_early_access,
              })

              await this.steamGameRepository.saveSteamReview(steamReview)
            } catch (e) {
              // console.error(e)
            }
          }),
        )
      }),
    )
  }

  // @Cron('30 52 19 * * *')
  private async scheduleGame() {
    console.log('SCHE')
    for (let appId = 578080; appId < 945361; appId += 10) {
      try {
        const { data } = await steamReviewAxios.get(
          `/api/appdetails?appids=${appId}&language=korean`,
        )
        const game = data[appId.toString()].data as ISteamGame

        if (game) {
          const {
            about_the_game,
            background,
            detailed_description,
            header_image,
            name,
            short_description,
            website,
          } = game

          const steamGame = SteamGame.buildWith({
            appId,
            aboutTheGame: about_the_game ?? '',
            background: background ?? '',
            detailDescription: detailed_description ?? '',
            headerImage: header_image,
            name,
            shortDescription: short_description ?? '',
            website: website ?? '',
          })
          await this.steamGameRepository.save(steamGame)
        }
      } catch (e) {
        console.error(e.message)
        await delay(200)
      }
    }
  }
}
