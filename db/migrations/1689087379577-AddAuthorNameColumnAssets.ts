import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddAuthorNameColumnAssets1689087379577
  implements MigrationInterface
{
  name = 'AddAuthorNameColumnAssets1689087379577';

  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE assets ADD COLUMN author_name longtext;',
    );
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE assets DROP COLUMN author_name;`); // reverts things made in "up" method
  }
}
