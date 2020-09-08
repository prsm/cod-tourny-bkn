import { Controller, Get, UseGuards } from '@nestjs/common';
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
    console.log('ayy');
    return this.playerService.getAllPlayers();
  }
}
