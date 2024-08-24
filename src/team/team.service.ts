/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Team } from './entity/team.entity';
import { TeamMember } from './entity/team-member.entity';
import { CreateTeamDto } from './dto/create-team.dto';
import { CreateTeamMemberDto } from './dto/create-team-member.dto';

@Injectable()
export class TeamService {
  constructor(
    @InjectRepository(Team)
    private teamRepository: Repository<Team>,
    @InjectRepository(TeamMember)
    private teamMemberRepository: Repository<TeamMember>,
  ) {}

  createTeam(createTeamDto: CreateTeamDto) {
    const team = this.teamRepository.create(createTeamDto);
    return this.teamRepository.save(team);
  }

  async createTeamMember(createTeamMemberDto: CreateTeamMemberDto) {
    // Fetch the Team entity using the team ID from the DTO
    const team = await this.teamRepository.findOne({
      where: { id: createTeamMemberDto.team },
    });
  
    // Ensure the team exists before proceeding
    if (!team) {
      throw new Error('Team not found');
    }
  
    // Create the TeamMember with the fetched team entity
    const teamMember = this.teamMemberRepository.create({
      ...createTeamMemberDto,
      team, // Assign the full team entity instead of just the ID
    });
  
    return this.teamMemberRepository.save(teamMember);
  }
  

  findAllTeams() {
    return this.teamRepository.find({ relations: ['members'] });
  }

  findTeamMembers(teamId: number) {
    return this.teamMemberRepository.find({ where: { team: { id: teamId } }, relations: ['team'] });
  }
}
