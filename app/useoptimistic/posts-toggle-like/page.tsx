import LikeButton from "@/app/component/LikeButton";
import { connectDB } from "@/app/lib/db";

export default async function LikePage() {
  const db = await connectDB();
  const posts = await db.collection("posts").find().toArray();
  // console.log("Posts: ", posts);

  return (
    <div>
      <h3>Post Page with Likes</h3>
      <div>
        {posts.map((post) => (
          <div className="mt-2.5 border p-2" key={post._id.toString()}>
            <h3>Title: {post.title}</h3>
            <p>Content: {post.content}</p>
            <p>Author: {post.author}</p>
            <p>Likes: {post.likes}</p>
            <LikeButton postId={post._id.toString()} />
          </div>
        ))}
      </div>
    </div>
  );
}
