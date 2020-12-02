import { Injectable } from '@nestjs/common'
import { Cron } from '@nestjs/schedule'
import { steamReviewAxios } from 'src/utils/utils.axios'
import { ISteamGame, ISteamReview } from './steam.interface'

@Injectable()
export class SteamApiService {
  constructor() {}

  // @Cron('*/3 * * * * *')
  public async scheduleGame() {
    const APP_ID = 945360
    const { data } = await steamReviewAxios.get(`/api/appdetails?appids=${APP_ID}&language=korean`)

    const game = data[APP_ID.toString()].data as ISteamGame
    console.log(game)
  }

  // https://store.steampowered.com
  // @Cron('*/3 * * * * *')
  private async scheduleReview() {
    const { data } = await steamReviewAxios.get(`/appreviews/945360?json=1&language=korean`)

    const reviews = data.reviews as ISteamReview[]
    console.log(reviews[0].author)
  }
}
