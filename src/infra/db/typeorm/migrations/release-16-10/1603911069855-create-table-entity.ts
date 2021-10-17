import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm'

export class createTableEntity1603911069855 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'entity',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()'
          },
          {
            name: 'entity_id',
            type: 'uuid',
            isNullable: true
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()'
          },
          {
            name: 'is_default',
            type: 'boolean',
            default: false
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()'
          }
        ]
      })
    )

    await queryRunner.query('create unique index on entity (is_default) where is_default = true;')

    await queryRunner.createForeignKey(
      'entity',
      new TableForeignKey({
        name: 'entity_entity_fk',
        columnNames: ['entity_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'entity'
      })
    )
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('entity')
  }
}
