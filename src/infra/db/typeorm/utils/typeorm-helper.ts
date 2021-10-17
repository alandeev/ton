import { Connection, createConnection, EntityTarget, getConnection, Repository } from 'typeorm'

export class TypeormHelper<T> {
  private connection: Connection

  constructor (connectionName?: string) {
    const connection = getConnection(connectionName)
    if (connection) {
      this.connection = connection
    } else {
      createConnection(connectionName)
        .then((connection) => {
          this.connection = connection
        })
        .catch((error) => {
          throw new Error(error)
        })
    }
  }

  static async createConnection (connectionname?: string): Promise<Connection> {
    return await createConnection(connectionname)
  }

  static async close (connectionName?: string): Promise<void> {
    await getConnection(connectionName).close()
  }

  static async clear (connectionName: string): Promise<void> {
    const connection = getConnection(connectionName)
    const entities = connection.entityMetadatas

    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    entities.forEach(async (entity) => {
      const repository = connection.getRepository(entity.name)
      await repository.query(`DELETE FROM ${entity.tableName}`)
    })
  }

  getRepository (repositoryName: EntityTarget<T>, connectionName?: string): Repository<T> {
    return this.connection.getRepository(repositoryName)
  }
}
