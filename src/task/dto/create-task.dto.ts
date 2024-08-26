/* eslint-disable prettier/prettier */
import { IsString, IsNotEmpty, IsDateString } from 'class-validator';
import { IsNotPastDate } from 'src/customevalidation';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  description: string;

  @IsDateString()
  @IsNotPastDate({
    message: 'Due date must not be in the past',
  })
  @IsNotEmpty()
  dueDate: string; 

  @IsString()
  status: string;

  @IsNotEmpty()
  assignee: number; 
}
