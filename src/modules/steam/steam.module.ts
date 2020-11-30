import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { SteamApiService } from './steam.api.service'

@Module({
  imports: [TypeOrmModule.forFeature([])],
  providers: [SteamApiService],
  exports: [SteamApiService],
})
export class SteamModule {}
