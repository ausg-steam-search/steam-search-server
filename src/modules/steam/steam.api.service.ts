import { Injectable } from '@nestjs/common'
import { Cron } from '@nestjs/schedule'
import { steamReviewAxios } from 'src/utils/utils.axios'
import { SteamGame } from './steam.game.entity'
import { ISteamGame, ISteamReview } from './steam.interface'

@Injectable()
export class SteamApiService {
  constructor() {}

  // @Cron('*/3 * * * * *')
  public async scheduleGame() {
    for (let appId = 10; appId < 1000000; appId+=10) {
      try{
        const { data } = await steamReviewAxios.get(`/api/appdetails?appids=${appId}&language=korean`)
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
            aboutTheGame: about_the_game,
            background,
            detailDescription: detailed_description,
            headerImage: header_image,
            name,
            shortDescription: short_description,
            website,
          })
          console.log(steamGame)
        }
      }catch(e){
        console.error(e.message)
        console.error(e.status)
        console.error(e.statusCode)
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
