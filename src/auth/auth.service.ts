import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PlayerRepository } from 'src/player/player.repository';
import { DiscordUserDto } from './dto/discord-user.dto';
import { IDiscordUser } from './interfaces/discord-user.interface';

@Injectable()
export class AuthService {
  constructor(private playerRepository: PlayerRepository) {}

  // async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
  //   return this.playerRepository.signUp(authCredentialsDto);
  // }

  async discordLogin(discordUserDto: DiscordUserDto): Promise<IDiscordUser> {
    if (!discordUserDto.user && !discordUserDto.user.username) {
      throw new UnauthorizedException('No data received from Discord');
    } else if (!discordUserDto.user.verified) {
      throw new UnauthorizedException('Discord user not verified');
    } else {
      return this.playerRepository.discordLogin(discordUserDto);
    }
  }
}
