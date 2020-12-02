import { Controller, Get } from '@nestjs/common'
import { AppService } from './app.service'
import { SteamApiService } from './modules/steam/steam.api.service'

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly steamApiService: SteamApiService,
  ) {}

  @Get()
  getHello(): string {
    this.steamApiService.scheduleGame()
    return this.appService.getHello()
  }
}
