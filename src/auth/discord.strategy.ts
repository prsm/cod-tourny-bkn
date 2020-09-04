import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-discord';
import {} from 'passport-jwt';
import { IDiscordCallback } from './interfaces/discord-callback.interface';
import { IDiscordProfile } from './interfaces/discord-profile.interface';
import { IDiscordUser } from './interfaces/discord-user.interface';

@Injectable()
export class DiscordStrategy extends PassportStrategy(Strategy, 'discord') {
  constructor() {
    super({
      clientID: '751144644229726268',
      clientSecret: '3VuJQoIj6KRzYQSWgfpQeeTgk7X7d4Ew',
      callbackURL: 'http://localhost:3000/auth/discord/redirect',
      scope: ['email', 'identify'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: IDiscordProfile,
    cb: IDiscordCallback,
  ): Promise<void> {
    const user: IDiscordUser = {
      discordId: profile.id,
      username: profile.username,
      email: profile.email,
      discriminator: profile.discriminator,
      verified: profile.verified,
      profilePictureUrl: `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}`,
      accessToken,
      refreshToken,
      fetchedAt: profile.fetchedAt,
    };
    cb(undefined, user);
  }
}
