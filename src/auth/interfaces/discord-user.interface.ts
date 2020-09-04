export interface IDiscordUser {
  discordId: string;
  username: string;
  email: string;
  discriminator: string;
  verified: boolean;
  profilePictureUrl: string;
  accessToken: string;
  refreshToken: string;
  fetchedAt: Date;
}
