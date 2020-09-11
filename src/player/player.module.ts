import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { DiscordStrategy } from 'src/auth/strategy/discord.strategy';
import { JwtStrategy } from 'src/auth/strategy/jwt.strategy';
import { PlayerController } from './player.controller';
import { PlayerRepository } from './player.repository';
import { PlayerService } from './player.service';

@Module({
  imports: [TypeOrmModule.forFeature([PlayerRepository]), AuthModule],
  controllers: [PlayerController],
  providers: [PlayerService, DiscordStrategy, JwtStrategy],
  exports: [PlayerService],
})
export class PlayerModule {}
