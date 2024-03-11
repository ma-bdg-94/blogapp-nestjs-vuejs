import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { compare, hash } from 'bcryptjs';
import { User, UserLogin } from 'src/users/users.interface';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    @InjectModel('User')
    private readonly userModel: Model<User>,
  ) {}

  async validateUser(email: string, password: string) {
    let user = await this.userService.findOneByEmail(email);

    if (!user) {
      const response: any = {
        success: false,
        status: 'NOT FOUND',
        data: null,
        errors: [
          {
            message: 'Cannot find user with this data!',
            field: ['email', 'password'],
          },
        ],
      };

      return JSON.stringify(response, null, 2);
    }

    let passwordMatch = await compare(password, user?.password);
    if (passwordMatch === false) {
      const response: any = {
        success: false,
        status: 'NOT FOUND',
        data: null,
        errors: [
          {
            message: 'Cannot find user with this data!',
            field: ['email', 'password'],
          },
        ],
      };

      return JSON.stringify(response, null, 2);
    }

    const successResponse: any = {
      success: true,
      status: 'OK',
      data: { message: 'User authenticated sucessfully!', user },
      errors: null,
    };

    return JSON.stringify(successResponse, null, 2);
  }

  async loginUser(userData: any): Promise<any> {
    const user = await this.userService.findOneByEmail(userData?.email);
    const passwordMatch = await compare(userData?.password, user?.password)

    if (!user || passwordMatch === false) {
      throw new HttpException(
        {
          statusCode: HttpStatus.NOT_FOUND,
          error: 'Could not find user with those credentials',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    const payload = { id: user?.id, email: user?.email }
    return {
      accessToken: await this.jwtService.signAsync(payload)
    }
  }

  async registerUser(userData: any): Promise<any> {
    const { fullName, birthdate, email } = userData
    const user = await this.userService.findOneByEmail(userData?.email);

    if (user) {
      console.log(user)
      throw new HttpException(
        {
          statusCode: HttpStatus.CONFLICT,
          error: 'Already existing user with those credentials',
        },
        HttpStatus.CONFLICT,
      );
    }

    const rounds: number = parseInt(process.env.BCRYPTJS_ROUNDS!) || 10;
    const encyptedPassword: string = await hash(userData?.password, rounds);

    const newUser = new this.userModel({
      fullName,
      birthdate,
      email,
      password: encyptedPassword
    })
    await newUser.save()

    const payload = { id: user?.id, email: user?.email }
    return {
      accessToken: await this.jwtService.signAsync(payload)
    }
  }

  async getAuthenticatedUser(id: any): Promise<any> {
    return this.userModel.findOne({ _id: id })
  }
}
