import { Module } from '@nestjs/common';
import { PlayerModule } from 'src/player/player.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { DiscordStrategy } from './discord.strategy';

@Module({
  imports: [PlayerModule],
  controllers: [AuthController],
  providers: [AuthService, DiscordStrategy],
})
export class AuthModule {}
