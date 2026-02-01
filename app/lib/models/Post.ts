import { ObjectId } from "mongodb";

export interface Post {
  _id?: ObjectId;
  title: string;
  content: string;
  author: string;
  createdAt: Date;
  updatedAt?: Date;
}

export interface CreatePostInput {
  title: string;
  content: string;
  author: string;
}

export interface FormState {
  success: boolean;
  id?: string;
  message?: string;
}
