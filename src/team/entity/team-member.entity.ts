/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Team } from './team.entity';
import { Task } from 'src/task/entity/task.entity';

@Entity()
export class TeamMember {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Team, (team) => team.members)
  team: Team;

  @OneToMany(() => Task, (task) => task.assignee)
  tasks: Task[];
}
