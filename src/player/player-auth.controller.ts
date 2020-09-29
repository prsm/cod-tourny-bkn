import {
  Body,
  Controller,
  Get,
  Post,
  Redirect,
  ValidationPipe,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { LoginDto } from './dto/login.dto';
import { IAccessToken } from './interfaces/access-token.interface';
import { IRedirect } from './interfaces/redirect.interface';
import { PlayerAuthService } from './player-auth.service';

@Controller('/auth')
export class PlayerAuthController {
  constructor(
    private authService: PlayerAuthService,
    private configService: ConfigService,
  ) {}

  @Get('/discord')
  @Redirect(`https://league.pr1sm.gg`)
  discordRedirect(): IRedirect {
    const clientId = this.configService.get('DISCORD_CLIENT_ID');
    const redirectUrl = this.configService.get('DISCORD_CALLBACK_URL');

    const url = `https://discord.com/api/oauth2/authorize?client_id=${encodeURI(
      clientId,
    )}&redirect_uri=${encodeURI(
      redirectUrl,
    )}&response_type=code&scope=identify%20email%20guilds.join`;

    return { url };
  }

  @Post('login')
  async discordLogin(
    @Body(ValidationPipe) loginDto: LoginDto,
  ): Promise<IAccessToken> {
    return this.authService.discordLogin(loginDto);
  }
}
