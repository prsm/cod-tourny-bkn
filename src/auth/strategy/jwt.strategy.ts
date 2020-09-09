import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Player } from 'src/auth/player/player.entity';
import { IDiscordUser } from '../interfaces/discord-user.interface';
import { PlayerRepository } from '../player/player.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(PlayerRepository)
    private playerRepository: PlayerRepository,
    private configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  async validate(payload: IDiscordUser): Promise<Player> {
    const { discordId } = payload;
    const player = await this.playerRepository.findOne({ discordId });

    if (!player) {
      throw new UnauthorizedException();
    }

    return player;
  }
}
