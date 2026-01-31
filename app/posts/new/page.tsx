import createPost from "@/app/actions/postActions";

export default async function NewPostPage() {
  return (
    <div className="max-w-6xl mx-auto">
      <h3>Create New Post</h3>
      <div className="p-5">
        <form action={createPost} className="flex flex-col border-2 p-3">
          <div>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              placeholder="Title"
              className="w-full"
            />
          </div>
          <div>
            <label htmlFor="content">Content</label>
            <textarea name="content" placeholder="Content" className="w-full" />
          </div>
          <div>
            <label htmlFor="author">Author</label>
            <input
              type="text"
              name="author"
              placeholder="Author"
              className="w-full"
            />
          </div>
          <button type="submit">Create Post</button>
        </form>
      </div>
    </div>
  );
}
