import { BaseEntity, Column, Entity, PrimaryColumn, Unique } from 'typeorm';

@Entity()
@Unique(['discordId'])
export class Player extends BaseEntity {
  @PrimaryColumn()
  discordId: string;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  discriminator: string;

  @Column()
  verified: boolean;

  @Column()
  profilePictureUrl: string;
}
