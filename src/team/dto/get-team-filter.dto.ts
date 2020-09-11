import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class GetTeamFilterDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name: string;
}
