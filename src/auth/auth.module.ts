import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PlayerController } from './player/player.controller';
import { PlayerRepository } from './player/player.repository';
import { PlayerService } from './player/player.service';
import { DiscordStrategy } from './strategy/discord.strategy';
import { JwtStrategy } from './strategy/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([PlayerRepository]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: configService.get('JWT_EXPIRES_IN') },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController, PlayerController],
  providers: [
    JwtStrategy,
    DiscordStrategy,
    AuthService,
    PlayerService,
    PassportModule,
  ],
  exports: [PassportModule, JwtStrategy],
})
export class AuthModule {}
