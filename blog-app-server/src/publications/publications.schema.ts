import { Schema, model } from 'mongoose';
import { Publication } from './interfaces/publication.interface';

export const PublicationSchema = new Schema<Publication>(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    lastEdit: {
      type: Date,
      default: new Date(),
    },
    createdAt: {
      type: Date,
      default: new Date(),
    },
    numberLikes: {
      type: Number,
    },
    numberDislikes: {
      type: Number,
    },
  }
);
