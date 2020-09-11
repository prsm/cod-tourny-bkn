import { Team } from 'src/team/team.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  PrimaryColumn,
  Unique,
} from 'typeorm';

@Entity()
@Unique(['discordId'])
export class Player extends BaseEntity {
  @PrimaryColumn()
  discordId: string;

  @Column()
  username: string;

  @Column({ select: false })
  email: string;

  @Column()
  discriminator: string;

  @Column()
  verified: boolean;

  @Column()
  profilePictureUrl: string;

  @ManyToMany(
    () => Team,
    team => team.players,
  )
  teams: Team[];

  @ManyToMany(
    () => Team,
    team => team.pastPlayers,
  )
  pastTeams: Team[];
}
