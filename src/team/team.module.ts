import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { PlayerModule } from 'src/player/player.module';
import { PlayerRepository } from 'src/player/player.repository';
import { PlayerService } from 'src/player/player.service';
import { TeamController } from './team.controller';
import { TeamRepository } from './team.repository';
import { TeamService } from './team.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([TeamRepository, PlayerRepository]),
    PlayerModule,
    AuthModule,
  ],
  providers: [TeamService, PlayerService],
  controllers: [TeamController],
})
export class TeamModule {}
