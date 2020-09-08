import {
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { CreateLeagueDto } from './dto/create-league.dto';
import { GetLeagueFilterDto } from './dto/get-league-filter.dto';
import { PatchLeagueDto } from './dto/patch-league.dto';
import { League } from './league.entity';

@EntityRepository(League)
export class LeagueRepository extends Repository<League> {
  async createNewLeague(createLeagueDto: CreateLeagueDto): Promise<League> {
    const { name, description, from, till } = createLeagueDto;

    const league = new League();
    league.name = name;
    league.description = description;
    league.from = from;
    league.till = till;
    league.createdAt = new Date().toISOString();

    try {
      await league.save();
      return league;
    } catch (error) {
      if (error.code == 23505) {
        throw new ConflictException('League with the same name already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async getLeagueById(leagueId: number): Promise<League> {
    const league = await this.findOne({ id: leagueId });
    if (!league) {
      throw new NotFoundException();
    }

    return league;
  }

  async getLeagues(filterDto: GetLeagueFilterDto): Promise<League[]> {
    const { search } = filterDto;
    const query = this.createQueryBuilder('league');

    if (search) {
      query.andWhere(
        '(league.name LIKE :search OR league.description LIKE :search)',
        { search: `%${search}%` },
      );
    }

    const tasks = await query.getMany();
    return tasks;
  }

  async patchLeague(
    leagueId: number,
    patchDto: PatchLeagueDto,
  ): Promise<League> {
    const { description, from, till } = patchDto;
    const league = await this.getLeagueById(leagueId);

    if (description) {
      league.description = description;
    }

    if (from) {
      league.from = from;
    }

    if (till) {
      league.till = till;
    }

    await league.save();

    return league;
  }
}
