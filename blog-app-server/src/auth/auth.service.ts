import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { compare, hash } from 'bcryptjs';
import { User, UserLogin } from 'src/users/users.interface';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { isAlpha, isEmail, isOldEnough, isValidPassword } from 'src/utils';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    @InjectModel('User')
    private readonly userModel: Model<User>,
  ) {}

  async loginUser(userData: any): Promise<any> {
    const user = await this.userService.findOneByEmail(userData?.email);
    const passwordMatch = await compare(userData?.password, user?.password);

    if (!user || passwordMatch === false) {
      throw new HttpException(
        {
          statusCode: HttpStatus.NOT_FOUND,
          error: 'Could not find user with those credentials',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    if (!userData?.email) {
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          error: 'Email address is missing!',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!userData?.password) {
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          error: 'Password is missing!',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const payload = { id: user?.id, email: user?.email };
    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }

  async registerUser(userData: any): Promise<any> {
    const { fullName, birthdate, email } = userData;
    const user = await this.userService.findOneByEmail(userData?.email);

    if (user) {
      throw new HttpException(
        {
          statusCode: HttpStatus.CONFLICT,
          error: 'Already existing user with those credentials',
        },
        HttpStatus.CONFLICT,
      );
    }

    if (!userData?.fullName) {
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          error: 'Full name is missing!',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!isAlpha(userData?.fullName)) {
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          error: 'We need a real full name, no symbols or numbers',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!userData?.birthdate) {
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          error: 'Birthdate is missing!',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!isOldEnough(userData?.birthdate)) {
      throw new HttpException(
        {
          statusCode: HttpStatus.FORBIDDEN,
          error: 'Restricted to people older than 13 years!',
        },
        HttpStatus.FORBIDDEN,
      );
    }

    if (!userData?.email) {
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          error: 'Email address is missing!',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!isEmail(userData?.email)) {
      throw new HttpException(
        {
          statusCode: HttpStatus.FORBIDDEN,
          error: 'Wrong email format!',
        },
        HttpStatus.FORBIDDEN,
      );
    }

    if (!userData?.password) {
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          error: 'Password is missing!',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!isValidPassword(userData?.password, 8)) {
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          error:
            'Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one symbol!',
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
      accessToken: await this.jwtService.signAsync(payload),
    };
  }

  async getAuthenticatedUser(id: any): Promise<any> {
    return this.userModel.findOne({ _id: id });
  }
}
