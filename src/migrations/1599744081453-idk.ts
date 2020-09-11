import { MigrationInterface, QueryRunner } from 'typeorm';

export class idk1599744081453 implements MigrationInterface {
  name = 'idk1599744081453';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "player_teams_team" DROP CONSTRAINT "FK_9f81d26b5ace2ab6e53b6c0d8dc"`,
    );
    await queryRunner.query(
      `ALTER TABLE "player_past_teams_team" DROP CONSTRAINT "FK_0c7564c80394f913be5c5435f93"`,
    );
    await queryRunner.query(
      `ALTER TABLE "player" ADD CONSTRAINT "UQ_93ba121bb90426b8f154099b971" UNIQUE ("discordId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "player_teams_team" ADD CONSTRAINT "FK_9f81d26b5ace2ab6e53b6c0d8dc" FOREIGN KEY ("playerDiscordId") REFERENCES "player"("discordId") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "player_past_teams_team" ADD CONSTRAINT "FK_0c7564c80394f913be5c5435f93" FOREIGN KEY ("playerDiscordId") REFERENCES "player"("discordId") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "player_past_teams_team" DROP CONSTRAINT "FK_0c7564c80394f913be5c5435f93"`,
    );
    await queryRunner.query(
      `ALTER TABLE "player_teams_team" DROP CONSTRAINT "FK_9f81d26b5ace2ab6e53b6c0d8dc"`,
    );
    await queryRunner.query(
      `ALTER TABLE "player" DROP CONSTRAINT "UQ_93ba121bb90426b8f154099b971"`,
    );
    await queryRunner.query(
      `ALTER TABLE "player_past_teams_team" ADD CONSTRAINT "FK_0c7564c80394f913be5c5435f93" FOREIGN KEY ("playerDiscordId") REFERENCES "player"("discordId") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "player_teams_team" ADD CONSTRAINT "FK_9f81d26b5ace2ab6e53b6c0d8dc" FOREIGN KEY ("playerDiscordId") REFERENCES "player"("discordId") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }
}
