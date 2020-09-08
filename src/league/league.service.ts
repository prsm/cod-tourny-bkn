import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateLeagueDto } from './dto/create-league.dto';
import { GetLeagueFilterDto } from './dto/get-league-filter.dto';
import { PatchLeagueDto } from './dto/patch-league.dto';
import { League } from './league.entity';
import { LeagueRepository } from './league.repository';

@Injectable()
export class LeagueService {
  constructor(
    @InjectRepository(LeagueRepository)
    private leagueRepository: LeagueRepository,
  ) {}

  async getLeagues(filterDto: GetLeagueFilterDto): Promise<League[]> {
    return this.leagueRepository.getLeagues(filterDto);
  }

  async getLeagueById(leagueId: number): Promise<League> {
    return this.leagueRepository.getLeagueById(leagueId);
  }

  async createNewLeague(createLeagueDto: CreateLeagueDto): Promise<League> {
    return this.leagueRepository.createNewLeague(createLeagueDto);
  }

  async patchLeague(
    leagueId: number,
    patchDto: PatchLeagueDto,
  ): Promise<League> {
    return this.leagueRepository.patchLeague(leagueId, patchDto);
  }

  async deleteLeague(leagueId: number): Promise<void> {
    const result = await this.leagueRepository.delete(leagueId);
    if (result.affected === 0) {
      throw new NotFoundException(`League with ID "${leagueId}" not found`);
    }
  }
}
