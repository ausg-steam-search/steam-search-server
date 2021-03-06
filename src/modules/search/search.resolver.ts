import { Resolver, Query, Args, Int, Mutation } from '@nestjs/graphql'
import { SearchService } from './search.service'

@Resolver()
export class SearchResolver {
  constructor(private readonly searchService: SearchService) {}

  /*********************************************************** Query *********************************************************
  ============================================================================================================================
  ***************************************************************************************************************************/

  @Query((returns) => String)
  public async hello() {
    return 'hello world!'
  }

  /********************************************************* Mutation ********************************************************
  ============================================================================================================================
  ***************************************************************************************************************************/
}
