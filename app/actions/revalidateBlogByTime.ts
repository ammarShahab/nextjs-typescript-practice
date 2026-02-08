"use server";

import { connectDB } from "../lib/db";
import { Blog, BlogState } from "../lib/models/Blogs";

export async function revalidateBlogByTime(
  initialState: any,
  formData: FormData,
): Promise<BlogState> {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const author = formData.get("author") as string;

  const blogs: Blog = {
    title,
    description,
    author,
  };

  try {
    const db = await connectDB();
    const blogsCollections = await db
      .collection("blogs")
      .insertOne({ ...blogs, created_at: new Date() });

    return { success: true, message: "Blogs Created Successfully" };
  } catch (error) {
    return {
      success: false,
      message: "Failed to create blog",
    };
  }
}
