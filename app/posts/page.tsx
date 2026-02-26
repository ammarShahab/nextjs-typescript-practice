import Link from "next/link";
import { connectDB } from "../lib/db";
import { Post } from "../lib/models/Post";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function PostPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    // redirect("/api/auth/signin");
    redirect("/signin");
  }

  const db = await connectDB();
  const posts = await db
    .collection<Post>("posts")
    .find()
    .sort({ createdAt: -1 })
    .toArray();
  return (
    <div>
      <div>
        <h1>All Posts</h1>
      </div>

      <div>
        {posts.length === 0 ? (
          <h3>No Posts Found</h3>
        ) : (
          posts.map((post) => (
            <div key={post._id.toString()} className="border p-3 mt-2">
              <div>
                <h3>{post.title}</h3>
                <p>{post.content}</p>
                <p>{post.author}</p>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="p-3 mt-2">
        <button className="bg-amber-500 p-2 rounded-2xl">
          <Link href="/posts/new">Create New Post</Link>
        </button>
      </div>
    </div>
  );
}
