import {
  DeepPartial,
  DeleteResult,
  EntityManager,
  EntityTarget,
  FindConditions,
  FindOneOptions,
  getManager,
  getRepository,
  ObjectID,
  ObjectLiteral,
  QueryRunner,
  Repository,
  SaveOptions,
  SelectQueryBuilder,
  UpdateResult
} from 'typeorm'
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity'

export class BaseRepository<Entity extends ObjectLiteral> {
  private readonly repository: Repository<Entity>
  private readonly manager: EntityManager

  constructor (private readonly entityClass: EntityTarget<Entity>) {
    this.repository = getRepository<Entity>(entityClass)
    this.manager = getManager()
  }

  async save<T extends DeepPartial<Entity>>(
    entity: T,
    options?: SaveOptions
  ): Promise<Entity> {
    const repositoryEntity = this.repository.create(entity)

    return await this.manager.save(repositoryEntity, options)
  }

  async saveAll<T extends DeepPartial<Entity>>(
    entity: T[],
    options?: SaveOptions
  ): Promise<Entity[]> {
    const repositoryEntity = this.repository.create(entity)

    return await this.repository.save(repositoryEntity, options)
  }

  async update (
    criteria: string | string[] | number | number[] | Date | Date[] | ObjectID | ObjectID[] | FindConditions<Entity>,
    partialEntity: QueryDeepPartialEntity<Entity>
  ): Promise<UpdateResult> {
    return await this.repository.update(criteria, partialEntity)
  }

  async delete (criteria: string | string[] | number | number[] | Date | Date[] | ObjectID | ObjectID[] | FindConditions<Entity>): Promise<DeleteResult> {
    return await this.repository.delete(criteria)
  }

  async findById (id: string, options?: FindOneOptions<Entity>): Promise<Entity | undefined> {
    return await this.repository.findOne(id)
  }

  from (alias?: string, queryRunner?: QueryRunner): SelectQueryBuilder<Entity> {
    return this.repository.createQueryBuilder(alias, queryRunner)
  }

  queryRunner (): QueryRunner {
    return this.repository.queryRunner
  }
}
