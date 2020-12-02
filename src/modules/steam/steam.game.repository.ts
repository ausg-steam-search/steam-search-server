import { AbstractRepository, DeepPartial, EntityRepository, FindConditions } from 'typeorm'
import { removeNullOrUndefinedFromObject } from 'src/utils/utils'
import { IPagination } from '../crud/pagination'
import { SteamGame } from './steam.game.entity'
import { SteamReview } from './steam.review.entity'

export interface SteamGameFindOneOptions {
  id?: number
}

export interface SteamGameFindAllOptions {
  skip?: number
  take?: number
}

@EntityRepository(SteamGame)
export class SteamGameRepository extends AbstractRepository<SteamGame> {
  public async findOne(options: SteamGameFindOneOptions = {}) {
    const { id } = options
    if (Object.keys(removeNullOrUndefinedFromObject(options)).length === 0) return null

    const qb = this.repository.createQueryBuilder('SteamGame')

    if (id) qb.andWhere('SteamGame.id = :id', { id })

    return qb.getOne()
  }

  public async findAll(options: SteamGameFindAllOptions = {}): Promise<IPagination<SteamGame>> {
    const { skip, take } = options

    const qb = this.repository.createQueryBuilder('SteamGame')

    qb.skip(skip ?? 0)
    qb.take(take ?? 20)

    qb.orderBy('SteamGame.id', 'DESC')

    const [items, total] = await qb.getManyAndCount()

    return { items, total }
  }

  public async save(entity: DeepPartial<SteamGame>) {
    return this.repository.save(entity)
  }

  public async saveSteamReview(entity: DeepPartial<SteamReview>) {
    const steamReviewRepository = this.manager.getRepository(SteamReview)
    return steamReviewRepository.save(entity)
  }

  public async delete(criteria: number | number[] | FindConditions<SteamGame>) {
    await this.repository.delete(criteria)
  }
}
