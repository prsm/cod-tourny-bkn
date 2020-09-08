import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { LeagueController } from './league.controller';
import { LeagueRepository } from './league.repository';
import { LeagueService } from './league.service';

@Module({
  imports: [TypeOrmModule.forFeature([LeagueRepository]), AuthModule],
  controllers: [LeagueController],
  providers: [LeagueService],
})
export class LeagueModule {}
