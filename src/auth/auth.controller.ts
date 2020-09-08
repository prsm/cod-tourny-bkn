import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { DiscordUserDto } from './dto/discord-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // @Post('/signup')
  // async signUp(
  //   @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
  // ): Promise<void> {
  //   return this.authService.signUp(authCredentialsDto);
  // }

  @Get('/discord')
  @UseGuards(AuthGuard('discord'))
  async discordAuth(): Promise<void> {
    return;
  }

  @Get('/discord/redirect')
  @UseGuards(AuthGuard('discord'))
  async discordAuthRedirect(
    @Req() discordUserDto: DiscordUserDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.discordLogin(discordUserDto);
  }
}
