import { Schema } from 'mongoose';
import { User } from './users.interface';

export const UserSchema = new Schema<User>(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    birthdate: {
      type: Date,
      default: new Date(),
    }
  }, {
    timestamps: true
  }
);
