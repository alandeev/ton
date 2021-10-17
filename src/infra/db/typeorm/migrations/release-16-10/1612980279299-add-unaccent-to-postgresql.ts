import { MigrationInterface, QueryRunner } from 'typeorm'

export class addUnaccentToPostgresql1612980279299 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS unaccent ;')
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP EXTENSION unaccent;')
  }
}
