import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersService } from 'src/users/users.service';
import { MailerModule } from '@nestjs-modules/mailer';

import * as dotenv from 'dotenv';
dotenv.config();

const jwtSecret: string = process.env?.JWT_SECRET || 'Not_Secret_Now';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: jwtSecret,
      signOptions: { expiresIn: '2h' },
    }),
    
  ],
  providers: [AuthService, JwtService, UsersService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
