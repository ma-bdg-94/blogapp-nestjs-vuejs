import { Module, Logger } from '@nestjs/common';
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
import { UsersModule } from './users/users.module';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { MailerModule } from '@nestjs-modules/mailer';

import * as dotenv from 'dotenv';
dotenv.config();

const mailerLogger = new Logger('MailerService');

@Module({
  imports: [
    PublicationsModule,
    MongooseModule.forRoot(process?.env?.MONGO_URI),
    UsersModule,
    AuthModule,
    MailerModule.forRootAsync({
      useFactory: () => ({
        transport: {
          service: 'hotmail',
          auth: {
            user: 'boudagga94@hotmail.fr',
            pass: 'narutouzumaki',
          },
        },
        defaults: {
          from: 'boudagga94@hotmail.fr',
        },
        logger: mailerLogger
      }),
    }),
  ],
  controllers: [
    AppController,
    UsersController,
    PublicationsController,
    ProfileController,
    AuthController,
  ],
  providers: [
    AppService,
    PublicationsService,
    UsersService,
    ProfileService,
    AuthService,
  ],
})
export class AppModule {}
