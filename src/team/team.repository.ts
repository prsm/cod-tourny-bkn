import {
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as srs from 'secure-random-string';
import { Player } from 'src/player/player.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateTeamDto } from './dto/create-team.dto';
import { GetTeamFilterDto } from './dto/get-team-filter.dto';
import { JoinCodeResponseDto } from './dto/join-code-response.dto';
import { JoinTeamDto } from './dto/join-team.dto';
import { Team } from './team.entity';

@EntityRepository(Team)
export class TeamRepository extends Repository<Team> {
  async createTeam(user: Player, createTeamDto: CreateTeamDto): Promise<Team> {
    const { name } = createTeamDto;

    const team = new Team();
    team.creatorId = user.discordId;
    team.name = name;
    team.players = [];
    team.players.push(user);
    team.dispanded = false;
    const joinCode: string = srs({ alphanumeric: true, length: 8 });
    team.joinCode = joinCode.toLowerCase();

    try {
      return team.save();
    } catch (error) {
      console.log('TeamRepository -> error', error);
      if (error.code == 23505) {
        throw new ConflictException('Team with the same name already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async getTeams(filterDto: GetTeamFilterDto): Promise<Team[]> {
    const { name } = filterDto;
    const query = this.createQueryBuilder('team');

    if (name) {
      query.andWhere('team.name LIKE :name', { name: `%${name}%` });
    }

    return query.getMany();
  }

  async getJoinCode(teamid: number): Promise<JoinCodeResponseDto> {
    const temp = await this.findOne(teamid, {
      select: ['joinCode'],
    });

    return { joinCode: temp.joinCode };
  }

  async joinTeam(
    teamId: number,
    user: Player,
    joinDto: JoinTeamDto,
  ): Promise<void> {
    const { joinCode } = joinDto;
    const team = await this.findOne(teamId);

    if (!team) {
      throw new NotFoundException();
    }
    const temp = await this.getJoinCode(teamId);
    team.joinCode = temp.joinCode;

    if (!team) {
      throw new NotFoundException();
    }

    if (team.dispanded) {
      throw new ConflictException('Cannot join a dispanded team');
    }

    if (joinCode !== team.joinCode) {
      throw new UnauthorizedException('JoinCode not provided or invalid');
    }

    const playerAlreadyInTeam = team.players.find(
      player => player.discordId === user.discordId,
    );

    const playerFromPast = team.pastPlayers.find(
      player => player.discordId === user.discordId,
    );

    if (playerAlreadyInTeam) {
      throw new ConflictException('Player already in selected team');
    }

    if (playerFromPast) {
      team.pastPlayers = team.pastPlayers.filter(
        player => player.discordId !== user.discordId,
      );
    }

    team.players.push(user);
    team.save();
  }

  async leaveTeam(teamId: number, user: Player): Promise<void> {
    const team = await this.findOne(teamId);
    if (!team) {
      throw new NotFoundException();
    }
    const playerInTeam = team.players.find(
      player => player.discordId === user.discordId,
    );

    const playerAlreadyLeft = team.pastPlayers.find(
      player => player.discordId === user.discordId,
    );
    if (user.discordId === team.creatorId) {
      throw new ConflictException(
        'Team creator may not leave the team, only dispand it',
      );
    } else if (!playerInTeam && !playerAlreadyLeft) {
      throw new ConflictException('Player was never in selected team');
    } else if (playerAlreadyLeft) {
      throw new ConflictException('Player already left');
    } else {
      team.players = team.players.filter(
        player => player.discordId !== user.discordId,
      );
    }

    team.pastPlayers.push();

    if (playerAlreadyLeft) {
      throw new ConflictException('Player already in selected team');
    }
  }

  async dispandTeam(teamId: number, userId: string): Promise<void> {
    const team = await this.findOne(teamId);
    if (!team) {
      throw new NotFoundException();
    }
    if (userId !== team.creatorId) {
      throw new UnauthorizedException(
        'Only the creator of the team can dispand it',
      );
    }

    const currentPlayers = team.players;
    team.players = [];
    currentPlayers.forEach(player => {
      team.pastPlayers.push(player);
    });

    team.dispanded = true;
    await team.save();
  }
}
