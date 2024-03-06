export interface Publication {
  id?: string;
  title: string;
  content: string;
  image: string;
  createdAt?: Date;
  lastEdit?: Date;
  numberLikes: number;
  numberDislikes: number;
}