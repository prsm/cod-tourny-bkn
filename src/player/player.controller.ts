import { Controller, Delete, Get, Param, Req, UseGuards } from '@nestjs/common';
import { AuthGuard, PassportModule } from '@nestjs/passport';
import { DiscordUserDto } from './dto/discord-user.dto';
import { Player } from './player.entity';
import { PlayerService } from './player.service';

@Controller()
export class PlayerController {
  constructor(
    private playerService: PlayerService,
    private passportModule: PassportModule,
  ) {}

  @Get('/auth/discord')
  @UseGuards(AuthGuard('discord'))
  async discordAuth(): Promise<void> {
    return;
  }

  @Get('/auth/discord/redirect')
  @UseGuards(AuthGuard('discord'))
  async discordAuthRedirect(
    @Req() discordUserDto: DiscordUserDto,
  ): Promise<{ accessToken: string }> {
    return this.playerService.discordLogin(discordUserDto);
  }

  @Get('/players')
  @UseGuards(AuthGuard('jwt'))
  async getAllPlayers(): Promise<Player[]> {
    return this.playerService.getAllPlayers();
  }

  @Get('/players/:id')
  @UseGuards(AuthGuard('jwt'))
  async getPlayer(@Param('id') discordId: string): Promise<Player> {
    return this.playerService.getPlayer(discordId);
  }

  @Delete('/players/:id')
  @UseGuards(AuthGuard('jwt'))
  async deletePlayer(@Param('id') discordId: string): Promise<void> {
    return this.playerService.deletePlayer(discordId);
  }
}
