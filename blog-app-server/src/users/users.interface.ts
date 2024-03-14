export interface User {
  id?: string;
  fullName: string;
  birthdate?: Date;
  email: string;
  password: string;
  resetToken?: string;
  resetTokenExpiration?: Date
}

export interface UserLogin {
  id?: string;
  email: string;
  password: string;
}