import { InternalServerErrorException } from '@nestjs/common';
import { DiscordUserDto } from 'src/auth/dto/discord-user.dto';
import { IDiscordUser } from 'src/auth/interfaces/discord-user.interface';
import { EntityRepository, Repository } from 'typeorm';
import { Player } from './player.entity';

@EntityRepository(Player)
export class PlayerRepository extends Repository<Player> {
  async discordLogin(discordUserDto: DiscordUserDto): Promise<IDiscordUser> {
    const {
      discordId,
      username,
      email,
      discriminator,
      verified,
      profilePictureUrl,
    } = discordUserDto.user;

    const user = await this.findOne({ discordId: discordId });

    if (user) {
      user.username = username;
      user.email = email;
      user.discriminator = discriminator;
      user.verified = verified;
      user.profilePictureUrl = profilePictureUrl;

      await user.save();

      return { ...user };
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
}
