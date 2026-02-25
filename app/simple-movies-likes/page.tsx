import Link from "next/link";
import { connectDB } from "../lib/db";
import MovieLikeButton from "../component/MovieLikeButton";

export default async function ShowMovies() {
  const db = await connectDB();
  const moviesCollection = await db.collection("movies").find().toArray();
  // console.log(moviesCollection);

  return (
    <div className="max-w-5xl mx-auto">
      <button className="mt-2 mb-2">
        <Link
          className="bg-blue-400 text-white p-2 rounded-xl"
          href="/simple-movies-likes/new"
        >
          Create Movies Data
        </Link>
      </button>
      <div>
        <h3>Show All Movies</h3>
        <div>
          {moviesCollection.map((movie) => (
            <div
              key={movie._id.toString()}
              className="grid grid-cols-1 sm:grid-cols-4 border"
            >
              <h3>Title: {movie.title}</h3>
              <p>
                Genre:
                {movie.genres.map((genre: string[], index: number) => (
                  <span key={index + 1}>{genre},</span>
                ))}
              </p>
              <div className="flex gap-3">
                <p>Likes: {movie.likes}</p>
                <MovieLikeButton
                  movieId={movie._id.toString()}
                  initialLikes={movie.likes}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
