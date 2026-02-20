"use server";

import { connectDB } from "../lib/db";
import { ObjectId } from "mongodb";

export async function toggleMovieLike(movieId: string, likesCount: number) {
  try {
    const db = await connectDB();
    const moviesCollections = await db.collection("movies");
    const id = movieId;
    const filter = { _id: new ObjectId(id) };
    const updateDoc = {
      $set: {
        likes: likesCount,
      },
    };

    const result = await moviesCollections.updateOne(filter, updateDoc);
    console.log("Matched documents:", result.matchedCount);
    console.log("Modified documents:", result.modifiedCount);
  } catch (error) {
    console.log(error);
  }
}
