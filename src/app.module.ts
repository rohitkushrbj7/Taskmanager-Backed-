/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { UserModule } from './user/user.module';
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./user/entity/user.entity";
// import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { ProfileModule } from './profile/profile.module';
import { TaskModule } from './task/task.module';
import { TeamModule } from './team/team.module';
import { Task } from "./task/entity/task.entity";
import { Team } from "./team/entity/team.entity";
import { TeamMember } from "./team/entity/team-member.entity";


@Module({
  controllers: [AppController,],
  imports: [UserModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: 'Rohitk@2525',
      database: 'taskmanager',
      entities: [User,Task,Team,TeamMember],
      // synchronize: true,
    }),
    AuthModule,
    ProfileModule,
    TaskModule,
    TeamModule,
  ],
})
export class AppModule {}