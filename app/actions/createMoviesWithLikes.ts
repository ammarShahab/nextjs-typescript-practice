"use server";

import { connectDB } from "../lib/db";

interface MoviesFormState {
  success: boolean;
  message: string;
}

export default async function createMoviesWithLikes(
  prevState: MoviesFormState,
  formData: FormData,
): Promise<MoviesFormState> {
  const title = formData.get("title") as string;
  const genres = formData.get("genres") as string;
  const convertedGenres = genres.split(",") as string[];
  const likes = 0 as number;

  const moviesData = {
    title,
    genres: convertedGenres,
    likes,
  };

  console.log("Movies Data", moviesData);

  try {
    const db = await connectDB();
    await db.collection("movies").insertOne(moviesData);
    return { success: true, message: "Movies Data Created Successfully" };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Failed to Create Movies Data" };
  }
}
