import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { SteamApiService } from './steam.api.service'
import { SteamGameRepository } from './steam.game.repository'

@Module({
  imports: [TypeOrmModule.forFeature([SteamGameRepository])],
  providers: [SteamApiService],
  exports: [SteamApiService],
})
export class SteamModule {}
