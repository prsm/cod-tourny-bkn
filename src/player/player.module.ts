import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { JwtStrategy } from 'src/auth/strategy/jwt.strategy';
import { PlayerAuthController } from './player-auth.controller';
import { PlayerAuthService } from './player-auth.service';
import { PlayerController } from './player.controller';
import { PlayerRepository } from './player.repository';
import { PlayerService } from './player.service';

@Module({
  imports: [TypeOrmModule.forFeature([PlayerRepository]), AuthModule],
  controllers: [PlayerController, PlayerAuthController],
  providers: [PlayerService, JwtStrategy, PlayerAuthService],
  exports: [PlayerService],
})
export class PlayerModule {}
