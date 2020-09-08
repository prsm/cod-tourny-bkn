import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { Player } from 'src/auth/player.entity';

@Controller('leagues')
export class LeagueController {
  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getAllLeagues(@GetUser() user: Player): Promise<void> {
    return;
  }

  @Post()
  async createNewLeague(): Promise<void> {
    return;
  }
}
