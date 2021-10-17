import { MigrationInterface, QueryRunner } from 'typeorm'
import bcrypt from 'bcrypt'
import { v4 as uuid } from 'uuid'

export class seedStartup1605813011333 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    const permissionGroupId = uuid()
    await queryRunner.query(`INSERT INTO permission_group (id, name) VALUES('${permissionGroupId}', 'Administrador');`)

    await queryRunner.query(`INSERT INTO permission (permission_group_id, subject, action) VALUES('${permissionGroupId}','account', 'read');`)
    await queryRunner.query(`INSERT INTO permission (permission_group_id, subject, action) VALUES('${permissionGroupId}','account', 'create');`)
    await queryRunner.query(`INSERT INTO permission (permission_group_id, subject, action) VALUES('${permissionGroupId}','account', 'update');`)
    await queryRunner.query(`INSERT INTO permission (permission_group_id, subject, action) VALUES('${permissionGroupId}','account', 'update');`)
    await queryRunner.query(`INSERT INTO permission (permission_group_id, subject, action) VALUES('${permissionGroupId}','permissionGroup', 'read');`)
    await queryRunner.query(`INSERT INTO permission (permission_group_id, subject, action) VALUES('${permissionGroupId}','permissionGroup', 'create');`)
    await queryRunner.query(`INSERT INTO permission (permission_group_id, subject, action) VALUES('${permissionGroupId}','permissionGroup', 'update');`)
    await queryRunner.query(`INSERT INTO permission (permission_group_id, subject, action) VALUES('${permissionGroupId}','permissionGroup', 'delete');`)
    await queryRunner.query(`INSERT INTO permission (permission_group_id, subject, action) VALUES('${permissionGroupId}','permission', 'read');`)
    await queryRunner.query(`INSERT INTO permission (permission_group_id, subject, action) VALUES('${permissionGroupId}','permission', 'create');`)
    await queryRunner.query(`INSERT INTO permission (permission_group_id, subject, action) VALUES('${permissionGroupId}','permission', 'update');`)
    await queryRunner.query(`INSERT INTO permission (permission_group_id, subject, action) VALUES('${permissionGroupId}','permission', 'delete');`)

    const entityId = uuid()
    await queryRunner.query(`INSERT INTO entity (id, is_default) VALUES('${entityId}', true);`)
    const accountId = uuid()
    const password = await bcrypt.hash('admin', 12)
    await queryRunner.query(`INSERT INTO account (id, entity_id, name, email, password, first_login, about, permission_group_id) VALUES('${accountId}', '${entityId}', 'Admin', 'admin@email.com', '${password}' , true, 'Administrador', '${permissionGroupId}');`)
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
  }
}
