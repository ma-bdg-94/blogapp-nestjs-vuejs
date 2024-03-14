import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Put, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ForgotPasswordDTO, LoginUserDTO, RegisterUserDTO, UpdatePasswordDTO } from 'src/users/users.dto';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('')
  loginUser(@Body() loginUserDTO: LoginUserDTO) {
    return this.authService.loginUser(loginUserDTO);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('new')
  registerUser(@Body() registerUserDTO: RegisterUserDTO) {
    return this.authService.registerUser(registerUserDTO);
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get('')
  getAuthenticatedUser(@Request() req): any {
    return this.authService.getAuthenticatedUser(req?.user?.id)
  }

  @HttpCode(HttpStatus.OK)
  @Put('password')
  requestPasswordChange(@Body() forgotPasswordDTO: ForgotPasswordDTO) {
    return this.authService.requestPasswordChange(forgotPasswordDTO);
  }

  @HttpCode(HttpStatus.OK)
  @Put('password/reset/:token')
  updatePassword(@Param('token') token: any, @Body() updatePasswordDTO: UpdatePasswordDTO) {
    return this.authService.updatePassword(token, updatePasswordDTO);
  }
}
