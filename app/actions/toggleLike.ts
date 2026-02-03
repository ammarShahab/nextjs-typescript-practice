"use server";

import { ObjectId } from "mongodb";
import { connectDB } from "../lib/db";

export async function toggleLike(id: string, currentIsLiked: boolean) {
  const db = await connectDB();

  // Increment or decrement likes based on current state
  const incrementValue = currentIsLiked ? -1 : 1;
  await db
    .collection("posts")
    .updateOne({ _id: new ObjectId(id) }, { $inc: { likes: incrementValue } });

  // Return the new like state
  return !currentIsLiked;
}
