/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entity/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TeamMember } from 'src/team/entity/team-member.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  async create(createTaskDto: CreateTaskDto) {
    const assignee = await this.taskRepository.manager.findOne(TeamMember, {
      where: { id: createTaskDto.assignee },
    });
    
    if (!assignee) {
      throw new Error('Assignee not found');
    }

    const task = this.taskRepository.create({ ...createTaskDto, assignee });
    return this.taskRepository.save(task);
  }

  findAll() {
    return this.taskRepository.find({ relations: ['assignee'] });
  }

  findOne(id: number) {
    return this.taskRepository.findOne({
      where: { id },
      relations: ['assignee'],
    });
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    let assignee = null;
    if (updateTaskDto.assignee) {
      assignee = await this.taskRepository.manager.findOne(TeamMember, {
        where: { id: updateTaskDto.assignee },
      });
      
      if (!assignee) {
        throw new Error('Assignee not found');
      }
    }

    const updateData = { ...updateTaskDto, assignee };
    return this.taskRepository.update(id, updateData);
  }

  remove(id: number) {
    return this.taskRepository.delete(id);
  }
}

