import { Injectable } from '@nestjs/common';
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
    return this.playerRepository.getAllPlayers();
  }
}
