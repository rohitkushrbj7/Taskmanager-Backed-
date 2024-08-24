/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post,  } from '@nestjs/common';
// import { Request } from 'express';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/updateuser.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private userService : UserService){} // dependency injection
  @Get()
  getUsers(){

    return  this.userService.get();
  }

@Post()
  store(@Body() createUserDto:CreateUserDto){
    
    return this.userService.create(createUserDto);
  }

  @Patch('/:userId')
  update(@Body() updateUserDto:UpdateUserDto ,@Param('userId',ParseIntPipe)  userId : number){
    
    return this.userService.update(updateUserDto, userId);
  }

  @Get('/:userId')
  getUser(@Param('userId',ParseIntPipe)  userId : number){
      return this.userService.show(userId);
  }

  @Delete('/:userId')
  deleteUser(@Param('userId',ParseIntPipe)  userId:number){
      return this.userService.delete(userId);
  }
}
