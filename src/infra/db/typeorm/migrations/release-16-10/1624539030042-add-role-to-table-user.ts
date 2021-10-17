import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export class addRoleToTableUser1624539030042 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn('account', new TableColumn({
      name: 'role',
      type: 'numeric',
      isNullable: true,
      default: 1
    }))

    await queryRunner.query('UPDATE account SET role = DEFAULT')

    await queryRunner.changeColumn('account', 'role', new TableColumn({
      name: 'role',
      type: 'numeric',
      default: 1
    }))
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('account', 'role')
  }
}
