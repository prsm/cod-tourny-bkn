import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Player } from 'src/player/player.entity';
import { PlayerService } from 'src/player/player.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { GetTeamFilterDto } from './dto/get-team-filter.dto';
import { Team } from './team.entity';
import { TeamRepository } from './team.repository';

@Injectable()
export class TeamService {
  constructor(
    @InjectRepository(TeamRepository)
    private teamRepository: TeamRepository,
    @Inject(PlayerService)
    private playerService: PlayerService,
  ) {}

  async createTeam(user: Player, createTeamDto: CreateTeamDto): Promise<Team> {
    const player = await this.playerService.getPlayer(user.discordId);
    return this.teamRepository.createTeam(player, createTeamDto);
  }

  async getTeam(id: number): Promise<Team> {
    return await this.teamRepository.findOne({ id });
  }

  async getTeams(filterDto: GetTeamFilterDto): Promise<Team[]> {
    return this.teamRepository.getTeams(filterDto);
  }
}
