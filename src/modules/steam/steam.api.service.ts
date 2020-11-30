import { Injectable } from '@nestjs/common'
import { Cron } from '@nestjs/schedule';

@Injectable()
export class SteamApiService {
  constructor() {}

  @Cron('0 0 4 * * *')
  private async schedule() {}
}
