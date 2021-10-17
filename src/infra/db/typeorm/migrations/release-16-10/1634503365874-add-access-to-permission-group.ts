import { MigrationInterface, QueryRunner } from 'typeorm'

export class addAccessToPermissionGroup1634503365874 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    const permissionGroup = await queryRunner.query('SELECT id, name FROM permission_group WHERE name = \'Administrador\'')
    const permissionGroupId: string = permissionGroup[0]?.id

    await queryRunner.query(`INSERT INTO permission (permission_group_id, subject, action) VALUES('${permissionGroupId}','access', 'read');`)
    await queryRunner.query(`INSERT INTO permission (permission_group_id, subject, action) VALUES('${permissionGroupId}','access', 'create');`)
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    const permissionRead = await queryRunner.query('SELECT id FROM permission WHERE subject = \'access\' and action = \'read\';')
    const permissionCreate = await queryRunner.query('SELECT id FROM permission WHERE subject = \'access\' and action = \'create\';')
    const permissionReadId: string = permissionRead[0]?.id
    const permissionCreateId: string = permissionCreate[0]?.id

    permissionReadId && await queryRunner.query(`DELETE FROM public."permission" WHERE id= '${permissionReadId}';`)
    permissionCreateId && await queryRunner.query(`DELETE FROM public."permission" WHERE id= '${permissionCreateId}';`)
  }
}
