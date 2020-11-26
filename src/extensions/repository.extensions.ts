import { ObjectLiteral, FindConditions, DeepPartial } from 'typeorm'
import { Repository } from 'typeorm/repository/Repository'

export interface FindOrCreateOptions<Entity extends ObjectLiteral> {
  where: FindConditions<Entity>
  defaults?: FindConditions<Entity>
}

declare module 'typeorm' {
  interface Repository<Entity extends ObjectLiteral> {
    findOrCreate(findOrCreateOptions: FindOrCreateOptions<Entity>): Promise<[Entity, boolean]>

    createAndSave(entityLike: DeepPartial<Entity>): Promise<Entity>
  }
}

Repository.prototype.findOrCreate = async function <Entity>(
  findOrCreateOptions: FindOrCreateOptions<Entity>,
): Promise<[Entity, boolean]> {
  let entity = await this.findOne({
    where: findOrCreateOptions.where,
  })

  const created = !entity

  if (!entity) {
    entity = {
      ...findOrCreateOptions.where,
      ...findOrCreateOptions.defaults,
    } as Entity
    await this.save(entity)

    const newEntity = await this.findOne({
      where: findOrCreateOptions.where,
    })

    // where 문에 기본키가 존재하면 newEntity는 없다.
    if (newEntity) entity = newEntity
  }

  return [entity, created]
}

Repository.prototype.createAndSave = async function <Entity>(entityLike: DeepPartial<Entity>) {
  let entity: Entity = this.create(entityLike)

  entity = await this.save(entity)

  return entity
}
