import { InternalServerErrorException } from '@nestjs/common';
import { DiscordUserDto } from 'src/auth/dto/discord-user.dto';
import { IDiscordUser } from 'src/auth/interfaces/discord-user.interface';
import { EntityRepository, Repository } from 'typeorm';
import { Player } from './player.entity';

@EntityRepository(Player)
export class PlayerRepository extends Repository<Player> {
  // async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
  //   const {
  //     username,
  //     password,
  //     firstname,
  //     lastname,
  //     discordTag,
  //   } = authCredentialsDto;

  //   // const salt = await bcrypt.genSalt();
  //   // user.password = await this.hashPassword(password, salt);

  //   const player = new Player();
  //   player.username = username;
  //   player.password = password;
  //   player.firstname = firstname;
  //   player.lastname = lastname;
  //   player.discordTag = discordTag;
  //   // user.salt = salt;

  //   try {
  //     await player.save();
  //   } catch (error) {
  //     console.log('PlayerRepository -> error', error);
  //     if (error.code == 23505) {
  //       throw new ConflictException('Player already exists');
  //     } else {
  //       throw new InternalServerErrorException();
  //     }
  //   }
  // }

  async discordLogin(discordUserDto: DiscordUserDto): Promise<IDiscordUser> {
    const {
      discordId,
      username,
      email,
      discriminator,
      verified,
      profilePictureUrl,
    } = discordUserDto.user;
    console.log('PlayerRepository -> discordUserDto.user', discordUserDto.user);

    const user = await this.findOne({ discordId: discordId });

    if (user) {
      return discordUserDto.user;
    }

    const player = new Player();
    player.discordId = discordId;
    player.username = username;
    player.email = email;
    player.discriminator = discriminator;
    player.verified = verified;
    player.profilePictureUrl = profilePictureUrl;

    try {
      player.save();
      return discordUserDto.user;
    } catch (error) {
      throw new InternalServerErrorException(
        `Contact quest1onmark#1337 with the following message: DiscordLogin::PSQL::${error.code}`,
      );
    }
  }

  async getAllPlayers(): Promise<Player[]> {
    return this.find();
  }
}
