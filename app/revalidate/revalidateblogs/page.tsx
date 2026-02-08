import Link from "next/link";

type Blogs = {
  _id: string;
  title: string;
  description: string;
  author: string;
};

export default async function RevalidateByTime() {
  // const [blogsCollections, setBlogsCollections] = useState<Blogs[]>([]);
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/revalidateblogs`,
    {
      cache: "force-cache",
      next: {
        revalidate: 20,
      },
    },
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch Blogs: ${res.status}`);
  }
  const blogs: Blogs[] = await res.json();
  console.log("blogs", blogs);

  /*  useEffect(() => {
    async function fetchBlogs() {
      try {
        const res = await fetch("/api/revalidateblogs", {
          cache: "force-cache",
          next: {
            revalidate: 20,
          },
        });
        const blogs = await res.json();
        setBlogsCollections(blogs);
      } catch (error) {
        console.log(error);
      }
    }
    fetchBlogs();
  }, []); */
  return (
    <div>
      <h3>Time Based Revalidation Revalidate Blogs</h3>
      <div>
        {blogs.map((blog) => (
          <div key={blog._id} className="grid grid-cols-4 gap-2 border">
            <h3>{blog.title}</h3>
            <p>{blog.description}</p>
            <p>{blog.author}</p>
          </div>
        ))}
      </div>
      <div>
        <Link
          href="/revalidate/revalidateblogs/new"
          className="bg-cyan-500 rounded-xl p-1.5"
        >
          Create New Blog
        </Link>
      </div>
    </div>
  );
}
