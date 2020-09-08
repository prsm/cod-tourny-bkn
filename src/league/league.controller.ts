import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateLeagueDto } from './dto/create-league.dto';
import { GetLeagueFilterDto } from './dto/get-league-filter.dto';
import { PatchLeagueDto } from './dto/patch-league.dto';
import { League } from './league.entity';
import { LeagueService } from './league.service';

@UseGuards(AuthGuard('jwt'))
@Controller('leagues')
export class LeagueController {
  constructor(private leagueService: LeagueService) {}

  @Get()
  async getLeagues(
    @Query(ValidationPipe) filterDto: GetLeagueFilterDto,
  ): Promise<League[]> {
    return this.leagueService.getLeagues(filterDto);
  }

  @Get('/:id')
  async getLeagueById(
    @Param('id', ParseIntPipe) leagueId: number,
  ): Promise<League> {
    return this.leagueService.getLeagueById(leagueId);
  }

  @Post()
  async createNewLeague(
    @Body(ValidationPipe) createLeagueDto: CreateLeagueDto,
  ): Promise<League> {
    return this.leagueService.createNewLeague(createLeagueDto);
  }

  @Patch('/:id')
  async patchLeague(
    @Param('id', ParseIntPipe) leagueId: number,
    @Body(ValidationPipe) patchDto: PatchLeagueDto,
  ): Promise<League> {
    return this.leagueService.patchLeague(leagueId, patchDto);
  }

  @Delete('/:id')
  async deleteLeague(
    @Param('id', ParseIntPipe) leagueId: number,
  ): Promise<void> {
    return this.leagueService.deleteLeague(leagueId);
  }
}
