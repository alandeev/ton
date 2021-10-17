import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'
export class addRoleToPermissonGroup1627384996497 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn('permission_group', new TableColumn({
      name: 'role',
      type: 'numeric',
      isNullable: true,
      default: 1
    }))

    await queryRunner.query('UPDATE permission_group SET role = DEFAULT')

    await queryRunner.changeColumn('permission_group', 'role', new TableColumn({
      name: 'role',
      type: 'numeric',
      default: 1
    }))
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('permission_group', 'role')
  }
}
