"use server";

import { revalidatePath } from "next/cache";
import { connectDB } from "../lib/db";
import { CreatePostInput, FormState } from "../lib/models/Post";

export default async function useFormStatCreatePost(
  prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const author = formData.get("author") as string;

  if (!title || !content || !author) {
    return {
      success: false,
      message: "All fields are required",
    };
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
    return {
      success: true,
      id: result.insertedId.toString(),
      message: "Post created successfully",
    };
  } catch (error) {
    console.error("Failed to create post:", error);
    return {
      success: false,
      message: "Failed to create post. Please try again.",
    };
  }
}
