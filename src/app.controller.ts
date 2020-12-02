import { Controller, Get } from '@nestjs/common'
import { AppService } from './app.service'
import { SteamApiService } from './modules/steam/steam.api.service'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello()
  }
}
