import {MigrationInterface, QueryRunner} from "typeorm";

export class postrefactor1599809184341 implements MigrationInterface {
    name = 'postrefactor1599809184341'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "team_players_player" ("teamId" integer NOT NULL, "playerDiscordId" character varying NOT NULL, CONSTRAINT "PK_8ef7e58d0986fb361298c8c23b0" PRIMARY KEY ("teamId", "playerDiscordId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_03530e45522b82c6ae46d825dd" ON "team_players_player" ("teamId") `);
        await queryRunner.query(`CREATE INDEX "IDX_1492749a46548ba1435f83f5c6" ON "team_players_player" ("playerDiscordId") `);
        await queryRunner.query(`CREATE TABLE "team_past_players_player" ("teamId" integer NOT NULL, "playerDiscordId" character varying NOT NULL, CONSTRAINT "PK_cec2fe55abebfa2090a87dcaa6a" PRIMARY KEY ("teamId", "playerDiscordId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_137fe8f9c95587a90a6c13688e" ON "team_past_players_player" ("teamId") `);
        await queryRunner.query(`CREATE INDEX "IDX_9d3c543a985da71aa37beaf656" ON "team_past_players_player" ("playerDiscordId") `);
        await queryRunner.query(`ALTER TABLE "team_players_player" ADD CONSTRAINT "FK_03530e45522b82c6ae46d825dd1" FOREIGN KEY ("teamId") REFERENCES "team"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "team_players_player" ADD CONSTRAINT "FK_1492749a46548ba1435f83f5c65" FOREIGN KEY ("playerDiscordId") REFERENCES "player"("discordId") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "team_past_players_player" ADD CONSTRAINT "FK_137fe8f9c95587a90a6c13688e0" FOREIGN KEY ("teamId") REFERENCES "team"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "team_past_players_player" ADD CONSTRAINT "FK_9d3c543a985da71aa37beaf6568" FOREIGN KEY ("playerDiscordId") REFERENCES "player"("discordId") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "team_past_players_player" DROP CONSTRAINT "FK_9d3c543a985da71aa37beaf6568"`);
        await queryRunner.query(`ALTER TABLE "team_past_players_player" DROP CONSTRAINT "FK_137fe8f9c95587a90a6c13688e0"`);
        await queryRunner.query(`ALTER TABLE "team_players_player" DROP CONSTRAINT "FK_1492749a46548ba1435f83f5c65"`);
        await queryRunner.query(`ALTER TABLE "team_players_player" DROP CONSTRAINT "FK_03530e45522b82c6ae46d825dd1"`);
        await queryRunner.query(`DROP INDEX "IDX_9d3c543a985da71aa37beaf656"`);
        await queryRunner.query(`DROP INDEX "IDX_137fe8f9c95587a90a6c13688e"`);
        await queryRunner.query(`DROP TABLE "team_past_players_player"`);
        await queryRunner.query(`DROP INDEX "IDX_1492749a46548ba1435f83f5c6"`);
        await queryRunner.query(`DROP INDEX "IDX_03530e45522b82c6ae46d825dd"`);
        await queryRunner.query(`DROP TABLE "team_players_player"`);
    }

}
