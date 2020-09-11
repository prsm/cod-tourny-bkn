import { Player } from 'src/player/player.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity()
@Unique(['name'])
export class Team extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  creatorId: string;

  @Column()
  name: string;

  @Column({ select: false })
  joinCode: string;

  @Column()
  dispanded: boolean;

  @ManyToMany(
    () => Player,
    player => player.teams,
    {
      eager: true,
    },
  )
  @JoinTable()
  players: Player[];

  @ManyToMany(
    () => Player,
    player => player.pastTeams,
    {
      eager: true,
    },
  )
  @JoinTable()
  pastPlayers: Player[];
}
