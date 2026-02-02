"use server";

import { ObjectId } from "mongodb";
import { connectDB } from "../lib/db";

export async function toggleLike(id: ObjectId, currentIsLiked: boolean) {
  const db = await connectDB();

  // Increment or decrement likes based on current state
  const incrementValue = currentIsLiked ? -1 : 1;
  await db
    .collection("posts")
    .updateOne({ _id: id }, { $inc: { likes: incrementValue } });

  // Return the new like state
  return !currentIsLiked;
}
