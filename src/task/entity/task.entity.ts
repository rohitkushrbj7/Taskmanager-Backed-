/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { TeamMember } from 'src/team/entity/team-member.entity';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @Column()
  dueDate: Date;

  @Column({ default: 'pending' })
  status: string;

  @ManyToOne(() => TeamMember, (teamMember) => teamMember.tasks)
  assignee: TeamMember;
}
