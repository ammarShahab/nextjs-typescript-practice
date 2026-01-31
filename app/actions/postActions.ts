"use server";

import { revalidatePath } from "next/cache";
import { connectDB } from "../lib/db";
import { CreatePostInput } from "../lib/models/Post";

export default async function createPost(formData: FormData) {
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const author = formData.get("author") as string;

  if (!title || !content || !author) {
    throw new Error("All fields are required");
  }

  const posts: CreatePostInput = {
    title,
    content,
    author,
  };

  try {
    const db = await connectDB();
    const result = await db
      .collection("posts")
      .insertOne({ ...posts, createdAt: new Date() });
    console.log("Post created with ID:", result.insertedId);
    revalidatePath("/posts");
    // return { success: true, id: result.insertedId.toString() };
  } catch (error) {
    console.log(error);
    throw new Error("Failed to create Posts");
  }
}
