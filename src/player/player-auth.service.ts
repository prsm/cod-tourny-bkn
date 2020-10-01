import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import fetch from 'node-fetch';
import { IJwt } from 'src/auth/jwt.interface';
import { IDiscordUser } from 'src/player/interfaces/discord-user.interface';
import { LoginDto } from './dto/login.dto';
import { IDiscordAccessToken } from './interfaces/access-token.discord.interface';
import { IAccessToken } from './interfaces/access-token.interface';
import { IDiscordProfile } from './interfaces/discord-profile.interface';
import { PlayerRepository } from './player.repository';

@Injectable()
export class PlayerAuthService {
  constructor(
    private configService: ConfigService,
    private playerRepository: PlayerRepository,
    private jwtService: JwtService,
  ) {}

  async discordLogin(loginDto: LoginDto): Promise<IAccessToken> {
    const { code } = loginDto;
    const token: IDiscordAccessToken = await this.fetchAccessToken(code);
    const userProfile: IDiscordUser = await this.fetchDiscordUserData(
      token.token_type,
      token.access_token,
    );

    if (!userProfile.verified) {
      throw new UnauthorizedException('Discord account not verified');
    }

    // await this.addUserToGuild(userProfile.discordId, token.access_token);

    const user = await this.playerRepository.discordLogin(userProfile);

    const rawToken: IJwt = {
      discordId: user.discordId,
      username: user.username,
    };

    const accessToken = await this.jwtService.signAsync(rawToken);
    return { accessToken };
  }

  // private async addUserToGuild(userId: string, accessToken: string) {
  //   await fetch(
  //     `https://discord.com/api/guilds/274249720736514048/members/${userId}`,
  //     {
  //       method: 'PUT',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Authorization: `Bot ${this.configService.get('DISCORD_BOT_TOKEN')}`,
  //       },
  //       body: JSON.stringify({
  //         access_token: accessToken,
  //       }),
  //     },
  //   );
  // }

  private async fetchDiscordUserData(tokenType: string, accessToken: string) {
    const answer = await fetch('https://discord.com/api/users/@me', {
      method: 'GET',
      headers: {
        Authorization: `${tokenType} ${accessToken}`,
      },
    });

    const discordProfile: IDiscordProfile = await answer.json();
    const user = this.parseUserData(discordProfile);
    return user;
  }

  private parseUserData(discordProfile: IDiscordProfile): IDiscordUser {
    const {
      id,
      avatar,
      username,
      email,
      discriminator,
      verified,
    } = discordProfile;

    let profilePictureUrl: string = undefined;
    if (discordProfile.avatar) {
      profilePictureUrl = `https://cdn.discordapp.com/avatars/${id}/${avatar}`;
    }

    const user: IDiscordUser = {
      discordId: id,
      username: username,
      email: email,
      discriminator: discriminator,
      verified: verified,
      profilePictureUrl,
    };

    return user;
  }

  private async fetchAccessToken(code: string): Promise<IDiscordAccessToken> {
    const answer = await fetch('https://discord.com/api/v6/oauth2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: this.configService.get('DISCORD_CLIENT_ID'),
        client_secret: this.configService.get('DISCORD_CLIENT_SECRET'),
        grant_type: 'authorization_code',
        code,
        redirect_uri: this.configService.get('DISCORD_CALLBACK_URL'),
        scope: 'identify email guilds.join',
      }),
    });

    const token = await answer.json();
    return token;
  }
}
