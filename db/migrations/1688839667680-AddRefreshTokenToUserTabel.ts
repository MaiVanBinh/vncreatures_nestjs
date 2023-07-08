import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddRefreshTokenToUserTabel1688839667680
  implements MigrationInterface
{
  name = 'AddRefreshTokenToUserTabel1688839667680';
  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE users ADD COLUMN refresh_token longtext;',
    );
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE users DROP COLUMN refresh_token;`); // reverts things made in "up" method
  }
}
