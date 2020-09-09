import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-discord';
import {} from 'passport-jwt';
import { IDiscordCallback } from '../interfaces/discord-callback.interface';
import { IDiscordProfile } from '../interfaces/discord-profile.interface';
import { IDiscordUser } from '../interfaces/discord-user.interface';

@Injectable()
export class DiscordStrategy extends PassportStrategy(Strategy, 'discord') {
  constructor(private configService: ConfigService) {
    super({
      clientID: configService.get('DISCORD_CLIENT_ID'),
      clientSecret: configService.get('DISCORD_CLIENT_SECRET'),
      callbackURL: configService.get('DISCORD_CALLBACK_URL'),
      scope: ['email', 'identify'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: IDiscordProfile,
    cb: IDiscordCallback,
  ): Promise<void> {
    let profilePictureUrl: string = undefined;
    if (profile.avatar) {
      profilePictureUrl = `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}`;
    }
    const user: IDiscordUser = {
      discordId: profile.id,
      username: profile.username,
      email: profile.email,
      discriminator: profile.discriminator,
      verified: profile.verified,
      profilePictureUrl,
    };
    cb(undefined, user);
  }
}
