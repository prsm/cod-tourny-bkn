import { InternalServerErrorException } from '@nestjs/common';
import { IDiscordUser } from 'src/player/interfaces/discord-user.interface';
import { EntityRepository, Repository } from 'typeorm';
import { Player } from './player.entity';

@EntityRepository(Player)
export class PlayerRepository extends Repository<Player> {
  async discordLogin(userProfile: IDiscordUser): Promise<IDiscordUser> {
    const {
      discordId,
      username,
      email,
      discriminator,
      verified,
      profilePictureUrl,
    } = userProfile;

    const user = await this.findOne(
      { discordId: discordId },
      { relations: ['teams'] },
    );

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
    player.teams = [];
    player.profilePictureUrl = profilePictureUrl;

    try {
      return player.save();
    } catch (error) {
      throw new InternalServerErrorException(
        `Contact quest1onmark#1337 with the following message: DiscordLogin::PSQL::${error.code}`,
      );
    }
  }
}
