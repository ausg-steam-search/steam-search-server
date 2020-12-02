import { Injectable } from '@nestjs/common'
import { Cron } from '@nestjs/schedule'
import { steamReviewAxios } from 'src/utils/utils.axios'
import { SteamGame } from './steam.game.entity'
import { SteamGameRepository } from './steam.game.repository'
import { ISteamGame, ISteamReview } from './steam.interface'
import { delay } from 'src/utils/utils'

@Injectable()
export class SteamApiService {
  constructor(private readonly steamGameRepository: SteamGameRepository) {}

  // @Cron('*/3 * * * * *')
  public async scheduleGame() {
    for (let appId = 1720; appId < 1000000; appId += 10) {
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
        await delay(300)
      }
    }
  }

  // https://store.steampowered.com
  // @Cron('*/3 * * * * *')
  private async scheduleReview() {
    const { data } = await steamReviewAxios.get(`/appreviews/945360?json=1&language=korean`)

    const reviews = data.reviews as ISteamReview[]
    console.log(reviews[0].author)
  }
}
