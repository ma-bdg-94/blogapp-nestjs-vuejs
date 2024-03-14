import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { compare, hash } from 'bcryptjs';
import { User, UserLogin } from 'src/users/users.interface';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { MailerService } from '@nestjs-modules/mailer';
import { Model } from 'mongoose';
import * as crypto from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly mailerService: MailerService,
    private readonly jwtService: JwtService,
    @InjectModel('User')
    private readonly userModel: Model<User>,
  ) {}

  private generateResetToken(): string {
    const fragment_1: string = crypto.randomBytes(8).toString('hex');
    const fragment_2: string = crypto.randomBytes(8).toString('hex');
    const fragment_3: string = crypto.randomBytes(8).toString('hex');
    return `${fragment_1}-${fragment_2}-${fragment_3}`;
  }

  private isOldEnough(dateString: string): boolean {
    const birthDate = new Date(dateString);
    const today = new Date();

    // Calculate the age
    const age = today.getFullYear() - birthDate.getFullYear();

    // Check if the birthday has occurred this year
    const hasBirthdayOccurred =
      today.getMonth() > birthDate.getMonth() ||
      (today.getMonth() === birthDate.getMonth() &&
        today.getDate() >= birthDate.getDate());

    // Adjust age based on birthday occurrence
    const adjustedAge = hasBirthdayOccurred ? age : age - 1;

    // Check if the adjusted age is greater than or equal to 13
    return adjustedAge >= 13;
  }

  private isAlpha(str: string): boolean {
    var regex = /^[a-zA-Z\-\s.]+$/;
    return regex.test(str);
  }

  private isEmail(str: string): boolean {
    var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(str);
  }

  private isValidPassword(str: string, len: number): boolean {
    const hasSymbol = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(str);
    const hasDigit = /\d/.test(str);
    const hasUpperCase = /[A-Z]/.test(str);
    const hasLowerCase = /[a-z]/.test(str);
    const longEnough = str?.length >= len;

    return hasSymbol && hasDigit && hasUpperCase && hasLowerCase && longEnough;
  }

  async loginUser(userData: any): Promise<any> {
    const user = await this.userService.findOneByEmail(userData?.email);
    const passwordMatch = await compare(userData?.password, user?.password);

    if (!user || passwordMatch === false) {
      throw new HttpException(
        {
          success: false,
          data: undefined,
          error: {
            status: HttpStatus.BAD_REQUEST,
            message: 'Could not find user with those credentials!',
          },
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!userData?.email) {
      throw new HttpException(
        {
          success: false,
          data: undefined,
          error: {
            status: HttpStatus.BAD_REQUEST,
            message: 'Email address is missing!',
          },
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!userData?.password) {
      throw new HttpException(
        {
          success: false,
          data: undefined,
          error: {
            status: HttpStatus.BAD_REQUEST,
            message: 'Password is missing!',
          },
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const payload = { id: user?.id, email: user?.email };
    return {
      success: true,
      error: undefined,
      data: {
        status: HttpStatus.OK,
        message: 'User authenticated successfully',
        accessToken: await this.jwtService.signAsync(payload),
      },
    };
  }

  async registerUser(userData: any): Promise<any> {
    const { fullName, birthdate, email } = userData;
    const user = await this.userService.findOneByEmail(userData?.email);

    if (user) {
      throw new HttpException(
        {
          success: false,
          data: undefined,
          error: {
            status: HttpStatus.CONFLICT,
            message: 'Already existing user with those credentials',
          },
        },
        HttpStatus.CONFLICT,
      );
    }

    if (!userData?.fullName) {
      throw new HttpException(
        {
          success: false,
          data: undefined,
          error: {
            status: HttpStatus.BAD_REQUEST,
            message: 'Full name is missing!',
          },
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!this.isAlpha(userData?.fullName)) {
      throw new HttpException(
        {
          success: false,
          data: undefined,
          error: {
            status: HttpStatus.BAD_REQUEST,
            message: 'We need a real full name, no symbols or numbers!',
          },
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!userData?.birthdate) {
      throw new HttpException(
        {
          success: false,
          data: undefined,
          error: {
            status: HttpStatus.BAD_REQUEST,
            message: 'Birthdate is missing!',
          },
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!this.isOldEnough(userData?.birthdate)) {
      throw new HttpException(
        {
          success: false,
          data: undefined,
          error: {
            status: HttpStatus.BAD_REQUEST,
            message: 'Restricted to people older than 13 years!',
          },
        },
        HttpStatus.FORBIDDEN,
      );
    }

    if (!userData?.email) {
      throw new HttpException(
        {
          success: false,
          data: undefined,
          error: {
            status: HttpStatus.BAD_REQUEST,
            message: 'Email address is missing!',
          },
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!this.isEmail(userData?.email)) {
      throw new HttpException(
        {
          success: false,
          data: undefined,
          error: {
            status: HttpStatus.BAD_REQUEST,
            message: 'Wrong email format!',
          },
        },
        HttpStatus.FORBIDDEN,
      );
    }

    if (!userData?.password) {
      throw new HttpException(
        {
          success: false,
          data: undefined,
          error: {
            status: HttpStatus.BAD_REQUEST,
            message: 'Password is missing!',
          },
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!this.isValidPassword(userData?.password, 8)) {
      throw new HttpException(
        {
          success: false,
          data: undefined,
          error: {
            status: HttpStatus.BAD_REQUEST,
            message:
              'Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one symbol!',
          },
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const rounds: number = parseInt(process.env.BCRYPTJS_ROUNDS!) || 10;
    const encyptedPassword: string = await hash(userData?.password, rounds);

    const newUser = new this.userModel({
      fullName,
      birthdate,
      email,
      password: encyptedPassword,
    });
    await newUser.save();

    const payload = { id: user?.id, email: user?.email };
    return {
      success: true,
      error: undefined,
      data: {
        status: HttpStatus.CREATED,
        message: 'User registered successfully',
        accessToken: await this.jwtService.signAsync(payload),
        user: newUser,
      },
    };
  }

  async getAuthenticatedUser(id: any): Promise<any> {
    const user = await this.userModel.findOne({ _id: id });

    if (!user) {
      throw new HttpException(
        {
          success: false,
          data: undefined,
          error: {
            status: HttpStatus.NOT_FOUND,
            message: 'Could not find user data!',
          },
        },
        HttpStatus.NOT_FOUND,
      );
    }

    return {
      success: true,
      error: undefined,
      data: {
        status: HttpStatus.OK,
        message: 'User data retrieved successfully!',
        user,
      },
    };
  }

  async requestPasswordChange(passwordData: any): Promise<any> {
    const user = await this.userService.findOneByEmail(passwordData?.email);

    if (!user) {
      throw new HttpException(
        {
          success: false,
          data: undefined,
          error: {
            status: HttpStatus.NOT_FOUND,
            message: 'Could not find user with this email address!',
          },
        },
        HttpStatus.NOT_FOUND,
      );
    }

    const resetToken = this.generateResetToken();
    await this.userService.updateResetToken(passwordData?.email, resetToken);

    const resetLink = `http://localhost:5173/password/reset/${resetToken}`;
    await this.mailerService.sendMail({
      to: passwordData.email,
      subject: 'Password Reset Request',
      html: `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Password Reset</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              background-color: #f4f4f4;
              margin: 0;
              padding: 0;
            }
            .container {
              max-width: 600px;
              margin: 20px auto;
              padding: 20px;
              background-color: #fff;
              border-radius: 8px;
              box-shadow: 0 0 10px rgba(0,0,0,0.1);
            }
            .header {
              background-color: #002642;
              color: #fff;
              padding: 15px;
              text-align: center;
              border-top-left-radius: 8px;
              border-top-right-radius: 8px;
            }
            .header h1 {
              margin: 0;
              font-size: 24px;
            }
            .content {
              padding: 20px 0;
            }
            .content p {
              margin: 0;
              color: #333;
            }
            .button {
              display: inline-block;
              background-color: #840032;
              color: #e59500 !important;
              text-decoration: none;
              padding: 10px 20px;
              border-radius: 5px;
              margin-top: 20px;
            }
            .footer {
              margin-top: 20px;
              text-align: center;
              color: #777;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Blog-App</h1>
            </div>
            <div class="content">
              <p>Hello,</p>
              <p>You've requested to reset your password for Blog-App. Please click the button below to reset your password.</p>
              <a href="${resetLink}" class="button">Reset Password</a>
            </div>
            <div class="footer">
              <p>If you didn't request this, you can safely ignore this email.</p>
              <p>&copy; 2024 Blog-App. All rights reserved.</p>
            </div>
          </div>
        </body>
      </html>
    `,
    });

    return {
      success: true,
      error: undefined,
      data: {
        status: HttpStatus.OK,
        message: 'Recovery email is sent successfully!',
        passwordToken: resetToken,
      },
    };
  }

  async updatePassword(resetToken: string, passwordData: any): Promise<any> {
    const user = await this.userService.findOneByResetToken(resetToken);

    if (!user || user?.resetTokenExpiration?.getTime() < new Date().getTime()) {
      throw new HttpException(
        {
          success: false,
          data: undefined,
          error: {
            status: HttpStatus.BAD_REQUEST,
            message: 'Invalid or expired token!',
          },
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    if (passwordData?.password !== passwordData?.passwordRe) {
      throw new HttpException(
        {
          success: false,
          data: undefined,
          error: {
            status: HttpStatus.BAD_REQUEST,
            message: 'Passwords do not match!',
          },
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const rounds: number = parseInt(process.env.BCRYPTJS_ROUNDS!) || 10;
    const encyptedPassword: string = await hash(passwordData?.password, rounds);

    await this.userService.updatePassword(resetToken, encyptedPassword);

    return {
      success: true,
      error: undefined,
      data: {
        status: HttpStatus.OK,
        message: 'Password updated successfully!',
        user,
      },
    };
  }
}
