import { MigrationInterface, QueryRunner, Table, TableForeignKey, TableUnique } from 'typeorm'

export class createTableAccount1603911069860 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'account',
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
            type: 'uuid'
          },
          {
            name: 'permission_group_id',
            type: 'uuid'
          },
          {
            name: 'name',
            type: 'varchar',
            length: '200'
          },
          {
            name: 'about',
            type: 'varchar',
            length: '500'
          },
          {
            name: 'documenty',
            type: 'varchar',
            length: '18',
            isNullable: true
          },
          {
            name: 'email',
            type: 'varchar',
            length: '150'
          },
          {
            name: 'phone',
            type: 'varchar',
            length: '25',
            isNullable: true
          },
          {
            name: 'password',
            type: 'varchar',
            length: '500'
          },
          {
            name: 'first_login',
            type: 'boolean',
            default: true
          },
          {
            name: 'enabled',
            type: 'boolean',
            default: true
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()'
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()'
          }
        ]
      })
    )

    await queryRunner.createForeignKey(
      'account',
      new TableForeignKey({
        name: 'account_entity_fk',
        columnNames: ['entity_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'entity'
      })
    )

    await queryRunner.createForeignKey(
      'account',
      new TableForeignKey({
        name: 'account_permission_group_fk',
        columnNames: ['permission_group_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'permission_group'
      })
    )

    await queryRunner.createUniqueConstraint('account', new TableUnique({
      columnNames: ['email']
    }))
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('account')
  }
}
