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
import { GetUser } from 'src/player/get-user.decorator';
import { Player } from 'src/player/player.entity';
import { CreateTeamDto } from './dto/create-team.dto';
import { GetTeamFilterDto } from './dto/get-team-filter.dto';
import { Team } from './team.entity';
import { TeamService } from './team.service';

@Controller('teams')
@UseGuards(AuthGuard('jwt'))
export class TeamController {
  constructor(private teamService: TeamService) {}
  @Get('/')
  async getTeams(
    @Query(ValidationPipe) filterDto: GetTeamFilterDto,
  ): Promise<Team[]> {
    return this.teamService.getTeams(filterDto);
  }

  @Get('/:id')
  async getTeam(@Param('id', ParseIntPipe) teamId: number): Promise<Team> {
    return this.teamService.getTeam(teamId);
  }

  @Post('/')
  async createTeam(
    @GetUser(ValidationPipe) user: Player,
    @Body() createTeamDto: CreateTeamDto,
  ): Promise<Team> {
    return this.teamService.createTeam(user, createTeamDto);
  }

  @Patch('/:id/join')
  async joinTeam() {}

  @Patch('/:id/leave')
  async leaveTeam() {}

  @Delete('/:id')
  async dispandTeam() {}
}
