import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Player } from 'src/player/player.entity';
import { PlayerRepository } from 'src/player/player.repository';
import { IJwt } from '../jwt.interface';

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

  async validate(payload: IJwt): Promise<Player> {
    const { discordId } = payload;
    const player = await this.playerRepository.findOne({ discordId });

    if (!player) {
      throw new UnauthorizedException();
    }

    return player;
  }
}
