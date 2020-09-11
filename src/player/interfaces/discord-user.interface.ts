export interface IDiscordUser {
  discordId: string;
  username: string;
  email: string;
  discriminator: string;
  verified: boolean;
  profilePictureUrl: string;
}
