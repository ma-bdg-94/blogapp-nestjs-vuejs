import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { PublicationsController } from './publications/publications.controller';
import { ProfileController } from './profile/profile.controller';
import { PublicationsService } from './publications/publications.service';
import { UsersService } from './users/users.service';
import { ProfileService } from './profile/profile.service';
import { PublicationsModule } from './publications/publications.module';
import { MongooseModule } from '@nestjs/mongoose';

import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [PublicationsModule, MongooseModule.forRoot(process?.env?.MONGO_URI)],
  controllers: [
    AppController,
    UsersController,
    PublicationsController,
    ProfileController,
  ],
  providers: [AppService, PublicationsService, UsersService, ProfileService],
})
export class AppModule {}
