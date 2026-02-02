import { ObjectId } from "mongodb";

export interface Post {
  _id?: ObjectId;
  title: string;
  content: string;
  author: string;
  createdAt: Date;
  updatedAt?: Date;
  likes: number;
  likedBy?: string[]; // Optional: to track which users liked the post
}

export interface CreatePostInput {
  title: string;
  content: string;
  author: string;
  likes: number;
}

export interface FormState {
  success: boolean;
  id?: string;
  message?: string;
}
