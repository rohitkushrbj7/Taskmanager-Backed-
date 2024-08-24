/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { TeamService } from './team.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { CreateTeamMemberDto } from './dto/create-team-member.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('teams')
@UseGuards(AuthGuard('jwt'))
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Post()
  createTeam(@Body() createTeamDto: CreateTeamDto) {
    return this.teamService.createTeam(createTeamDto);
  }

  @Post(':teamId/members')
  createTeamMember(
    @Param('teamId') teamId: string,
    @Body() createTeamMemberDto: CreateTeamMemberDto,
  ) {
    createTeamMemberDto.team = +teamId;
    return this.teamService.createTeamMember(createTeamMemberDto);
  }

  @Get()
  findAllTeams() {
    return this.teamService.findAllTeams();
  }

  @Get(':teamId/members')
  findTeamMembers(@Param('teamId') teamId: string) {
    return this.teamService.findTeamMembers(+teamId);
  }
}
