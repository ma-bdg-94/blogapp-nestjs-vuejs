export class RegisterUserDTO {
  readonly fullName: string;
  readonly birthdate: string;
  readonly email: string;
  readonly password: number;
}

export class LoginUserDTO {
  readonly email: string;
  readonly password: string;
}

export class ForgotPasswordDTO {
  readonly email: string;
}

export class UpdatePasswordDTO {
  readonly password: number;
}
