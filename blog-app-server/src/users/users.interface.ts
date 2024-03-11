export interface User {
  id?: string;
  fullName: string;
  birthdate?: Date;
  email: string;
  password: string;
}

export interface UserLogin {
  id?: string;
  email: string;
  password: string;
}