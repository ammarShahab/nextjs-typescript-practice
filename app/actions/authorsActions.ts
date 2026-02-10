"use server";

import { revalidatePath } from "next/cache";
import { connectDB } from "../lib/db";
import { Authors } from "../lib/models/Author";
import { redirect } from "next/navigation";

export default async function authorsActions(
  initialState: object,
  formData: FormData,
) {
  const author_Name = formData.get("author_Name") as string;
  const birth_year = formData.get("birth_year") as string;
  const categories = formData.get("categories") as string;

  const authorInfo: Authors = {
    author_Name,
    birth_year,
    categories: categories.split(","),
  };

  console.log(authorInfo);

  try {
    const db = await connectDB();
    const authors = await db
      .collection("authors")
      .insertOne({ ...authorInfo, created_at: new Date() });

    console.log(authors);

    // redirect("/revalidate/revalidateauthorsbypath");
    return { success: true, message: "Authors created successfully" };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Authors creation failed" };
  }
}
