import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Player } from 'src/player/player.entity';
import { PlayerService } from 'src/player/player.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { GetTeamFilterDto } from './dto/get-team-filter.dto';
import { JoinCodeResponseDto } from './dto/join-code-response.dto';
import { JoinTeamDto } from './dto/join-team.dto';
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

  async joinTeam(
    teamId: number,
    userId: string,
    joinDto: JoinTeamDto,
  ): Promise<void> {
    const player = await this.playerService.getPlayer(userId);
    return this.teamRepository.joinTeam(teamId, player, joinDto);
  }

  async leaveTeam(teamId: number, user: Player): Promise<void> {
    const player = await this.playerService.getPlayer(user.discordId);
    return this.teamRepository.leaveTeam(teamId, player);
  }

  async getJoinCode(
    teamId: number,
    userId: string,
  ): Promise<JoinCodeResponseDto> {
    const team = await this.getTeam(teamId);
    if (userId !== team.creatorId) {
      throw new UnauthorizedException(
        'Only the creator of the team may access the JoinCode',
      );
    }

    return this.teamRepository.getJoinCode(teamId);
  }

  async dispandTeam(teamId: number, userId: string): Promise<void> {
    return this.teamRepository.dispandTeam(teamId, userId);
  }
}
