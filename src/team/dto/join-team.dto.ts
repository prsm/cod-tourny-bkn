import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class JoinTeamDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(8)
  joinCode: string;
}
