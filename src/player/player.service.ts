import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { DiscordUserDto } from './dto/discord-user.dto';
import { Player } from './player.entity';
import { PlayerRepository } from './player.repository';

@Injectable()
export class PlayerService {
  constructor(
    @InjectRepository(PlayerRepository)
    private playerRepository: PlayerRepository,
    private jwtService: JwtService,
  ) {}

  async discordLogin(
    discordUserDto: DiscordUserDto,
  ): Promise<{ accessToken: string }> {
    if (!discordUserDto.user && !discordUserDto.user.username) {
      throw new UnauthorizedException('No data received from Discord');
    } else if (!discordUserDto.user.verified) {
      throw new UnauthorizedException('Discord user not verified');
    } else {
      const discordUser = await this.playerRepository.discordLogin(
        discordUserDto,
      );
      const accessToken = await this.jwtService.signAsync(discordUser);
      return { accessToken };
    }
  }

  async getAllPlayers(): Promise<Player[]> {
    return this.playerRepository.find();
  }

  async getPlayer(discordId: string): Promise<Player> {
    const player = await this.playerRepository.findOne({ discordId });
    if (!player) {
      throw new NotFoundException();
    }

    return player;
  }

  async deletePlayer(discordId: string): Promise<void> {
    const result = await this.playerRepository.delete(discordId);
    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID "${discordId}" not found`);
    }
  }
}
