import { Injectable } from '@nestjs/common'
import { Cron } from '@nestjs/schedule'
import { steamReviewAxios } from 'src/utils/utils.axios'
import { ISteamReview } from './steam.interface'

@Injectable()
export class SteamApiService {
  constructor() {}

  @Cron('*/3 * * * * *')
  private async schedule() {
    const { data } = await steamReviewAxios.get(`/945360?json=1&language=korean`)

    const reviews = data.reviews as ISteamReview[]
    console.log(reviews[0].author)
  }
}
