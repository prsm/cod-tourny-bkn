import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class AuthCredentialsDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;

  @IsString()
  @MinLength(8)
  @MaxLength(100)
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'Password must contain both an uppercase and lowercase char, a number and a special character',
  })
  password: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  firstname: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  lastname: string;

  @IsString()
  @MinLength(6)
  @Matches(/.*#[0-9]{4}/, {
    message: 'Discord Tag is invalid',
  })
  discordTag: string;
}
