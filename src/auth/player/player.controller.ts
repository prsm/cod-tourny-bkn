import { Controller, Delete, Get, Param, UseGuards } from '@nestjs/common';
import { AuthGuard, PassportModule } from '@nestjs/passport';
import { Player } from './player.entity';
import { PlayerService } from './player.service';

@Controller('players')
@UseGuards(AuthGuard('jwt'))
export class PlayerController {
  constructor(
    private playerService: PlayerService,
    private passportModule: PassportModule,
  ) {}

  @Get()
  async getAllPlayers(): Promise<Player[]> {
    return this.playerService.getAllPlayers();
  }

  @Get('/:id')
  async getPlayer(@Param('id') discordId: string): Promise<Player> {
    return this.playerService.getPlayer(discordId);
  }

  @Delete('/:id')
  async deletePlayer(@Param('id') discordId: string): Promise<void> {
    return this.playerService.deletePlayer(discordId);
  }
}
