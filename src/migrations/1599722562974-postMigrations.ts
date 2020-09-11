import { MigrationInterface, QueryRunner } from 'typeorm';

export class postMigrations1599722562974 implements MigrationInterface {
  name = 'postMigrations1599722562974';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "team" ("id" SERIAL NOT NULL, "creatorId" character varying NOT NULL, "name" character varying NOT NULL, CONSTRAINT "UQ_cf461f5b40cf1a2b8876011e1e1" UNIQUE ("name"), CONSTRAINT "PK_f57d8293406df4af348402e4b74" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "player" ("discordId" character varying NOT NULL, "username" character varying NOT NULL, "email" character varying NOT NULL, "discriminator" character varying NOT NULL, "verified" boolean NOT NULL, "profilePictureUrl" character varying NOT NULL, CONSTRAINT "UQ_93ba121bb90426b8f154099b971" UNIQUE ("discordId"), CONSTRAINT "PK_93ba121bb90426b8f154099b971" PRIMARY KEY ("discordId"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "league" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "from" character varying NOT NULL, "till" character varying NOT NULL, "createdAt" character varying NOT NULL, CONSTRAINT "UQ_110716368f5130cdc669dacea42" UNIQUE ("name"), CONSTRAINT "PK_0bd74b698f9e28875df738f7864" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "player_teams_team" ("playerDiscordId" character varying NOT NULL, "teamId" integer NOT NULL, CONSTRAINT "PK_b9aed3ee5eeaedfe024c8f6dfa1" PRIMARY KEY ("playerDiscordId", "teamId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_9f81d26b5ace2ab6e53b6c0d8d" ON "player_teams_team" ("playerDiscordId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_45045650ab02d5ff1a5b387a76" ON "player_teams_team" ("teamId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "player_past_teams_team" ("playerDiscordId" character varying NOT NULL, "teamId" integer NOT NULL, CONSTRAINT "PK_f24ad0bfba822938b8412006882" PRIMARY KEY ("playerDiscordId", "teamId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_0c7564c80394f913be5c5435f9" ON "player_past_teams_team" ("playerDiscordId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_15e7b8770b4ecd0632b159113e" ON "player_past_teams_team" ("teamId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "player_teams_team" ADD CONSTRAINT "FK_9f81d26b5ace2ab6e53b6c0d8dc" FOREIGN KEY ("playerDiscordId") REFERENCES "player"("discordId") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "player_teams_team" ADD CONSTRAINT "FK_45045650ab02d5ff1a5b387a76b" FOREIGN KEY ("teamId") REFERENCES "team"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "player_past_teams_team" ADD CONSTRAINT "FK_0c7564c80394f913be5c5435f93" FOREIGN KEY ("playerDiscordId") REFERENCES "player"("discordId") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "player_past_teams_team" ADD CONSTRAINT "FK_15e7b8770b4ecd0632b159113e4" FOREIGN KEY ("teamId") REFERENCES "team"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "player_past_teams_team" DROP CONSTRAINT "FK_15e7b8770b4ecd0632b159113e4"`,
    );
    await queryRunner.query(
      `ALTER TABLE "player_past_teams_team" DROP CONSTRAINT "FK_0c7564c80394f913be5c5435f93"`,
    );
    await queryRunner.query(
      `ALTER TABLE "player_teams_team" DROP CONSTRAINT "FK_45045650ab02d5ff1a5b387a76b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "player_teams_team" DROP CONSTRAINT "FK_9f81d26b5ace2ab6e53b6c0d8dc"`,
    );
    await queryRunner.query(`DROP INDEX "IDX_15e7b8770b4ecd0632b159113e"`);
    await queryRunner.query(`DROP INDEX "IDX_0c7564c80394f913be5c5435f9"`);
    await queryRunner.query(`DROP TABLE "player_past_teams_team"`);
    await queryRunner.query(`DROP INDEX "IDX_45045650ab02d5ff1a5b387a76"`);
    await queryRunner.query(`DROP INDEX "IDX_9f81d26b5ace2ab6e53b6c0d8d"`);
    await queryRunner.query(`DROP TABLE "player_teams_team"`);
    await queryRunner.query(`DROP TABLE "league"`);
    await queryRunner.query(`DROP TABLE "player"`);
    await queryRunner.query(`DROP TABLE "team"`);
  }
}
