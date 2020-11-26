import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { SearchService } from './search.service'
import { SearchResolver } from './search.resolver'

@Module({
  imports: [TypeOrmModule.forFeature([])],
  providers: [SearchResolver, SearchService],
  exports: [SearchService],
})
export class SearchModule {}
