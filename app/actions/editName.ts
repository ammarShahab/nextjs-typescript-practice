"use server";

import { connectDB } from "../lib/db";

export default async function editName(newName: string) {
  console.log(newName);
  // We should update the document regardless of current name (assuming there's only one document)
  // Or find the existing document first
  const filter = {}; // Empty filter to match any document (assuming collection has only one user)
  const updatedName = {
    $set: {
      name: newName,
      updated: new Date(),
    },
  };

  try {
    const db = await connectDB();
    const result = await db
      .collection("username")
      .updateOne(filter, updatedName, { upsert: true });

    if (result.upsertedCount === 1 || result.modifiedCount === 1) {
      return newName;
    }
    throw new Error("No changes made to the name");
  } catch (error) {
    console.error("Failed to update name:", error);
    throw error;
  }
}
