import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class GetLeagueFilterDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  search: string;
}
