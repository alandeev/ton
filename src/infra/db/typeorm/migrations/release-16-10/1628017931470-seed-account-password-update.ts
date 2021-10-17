import { MigrationInterface, QueryRunner } from 'typeorm'

export class seedAccountPasswordUpdate1628017931470 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    const permissionGroupInternal = await queryRunner.query('SELECT id FROM permission_group WHERE name = \'Administrador\'')

    const permissionGroupInternalId: string = permissionGroupInternal[0].id

    await queryRunner.query(`INSERT INTO permission (permission_group_id, subject, action) VALUES('${permissionGroupInternalId}','accountPassword', 'update');`)
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    const permissionGroupInternal = await queryRunner.query('SELECT id FROM permission_group WHERE name = \'Administrador\'')
    const permissionGroupInternalId: string = permissionGroupInternal[0].id

    const accountPasswordUpdatePermissionInternal = await queryRunner.query(`SELECT id FROM permission WHERE subject = 'accountPassword' and action = 'update' and permission_group_id = '${permissionGroupInternalId}';`)

    const accountPasswordUpdatePermissionInternalId: string = accountPasswordUpdatePermissionInternal[0]?.id

    accountPasswordUpdatePermissionInternalId && await queryRunner.query(`DELETE FROM public."permission" WHERE id= '${accountPasswordUpdatePermissionInternalId}';`)
  }
}
