import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Player } from './player.entity';
import { PlayerRepository } from './player.repository';

@Injectable()
export class PlayerService {
  constructor(
    @InjectRepository(PlayerRepository)
    private playerRepository: PlayerRepository,
  ) {}
  // async signUp(authCredentialsDto: AuthCredentialsDto) {}

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
