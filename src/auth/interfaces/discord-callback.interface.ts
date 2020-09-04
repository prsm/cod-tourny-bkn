import { IDiscordUser } from './discord-user.interface';

export interface IDiscordCallback {
  (error: Error, discordUser: IDiscordUser);
}
