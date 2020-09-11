import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import * as srs from 'secure-random-string';
import { Player } from 'src/player/player.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateTeamDto } from './dto/create-team.dto';
import { GetTeamFilterDto } from './dto/get-team-filter.dto';
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
}
