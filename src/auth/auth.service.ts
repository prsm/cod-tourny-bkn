import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { DiscordUserDto } from './dto/discord-user.dto';
import { PlayerRepository } from './player.repository';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(PlayerRepository)
    private playerRepository: PlayerRepository,
    private jwtService: JwtService,
  ) {}

  // async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
  //   return this.playerRepository.signUp(authCredentialsDto);
  // }

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
}
