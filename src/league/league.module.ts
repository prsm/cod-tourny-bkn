import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { LeagueController } from './league.controller';
import { LeagueService } from './league.service';

@Module({
  imports: [AuthModule],
  controllers: [LeagueController],
  providers: [LeagueService],
})
export class LeagueModule {}
