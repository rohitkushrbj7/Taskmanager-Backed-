/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { IsEmailAlreadyExistConstraint } from 'src/emailvalidation';

@Module({
  controllers: [UserController],
  providers: [UserService,IsEmailAlreadyExistConstraint],
  exports:[UserService], 
  imports:[TypeOrmModule.forFeature([User])]
})
export class UserModule {}
