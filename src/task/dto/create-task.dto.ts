/* eslint-disable prettier/prettier */
import { IsString, IsNotEmpty, IsDateString } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  description: string;

  @IsDateString()
  @IsNotEmpty()
  dueDate: string; 

  @IsString()
  status: string;

  @IsNotEmpty()
  assignee: number; 
}
