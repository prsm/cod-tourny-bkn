import {MigrationInterface, QueryRunner} from "typeorm";

export class teamchanges1599811743346 implements MigrationInterface {
    name = 'teamchanges1599811743346'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "team" ADD "joinCode" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "team" ADD "dispanded" boolean NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "team" DROP COLUMN "dispanded"`);
        await queryRunner.query(`ALTER TABLE "team" DROP COLUMN "joinCode"`);
    }

}
