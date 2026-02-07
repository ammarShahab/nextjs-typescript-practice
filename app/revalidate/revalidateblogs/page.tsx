"use client";

import { useEffect, useState } from "react";

type Blogs = {
  _id: string;
  title: string;
  description: string;
  author: string;
};

export default function RevalidateByPath() {
  const [blogsCollections, setBlogsCollections] = useState<Blogs[]>([]);
  useEffect(() => {
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
  }, []);
  return (
    <div>
      <h3>Time Based Revalidation Revalidate Blogs</h3>
      <div>
        {blogsCollections.map((blog) => (
          <div key={blog._id} className="grid grid-cols-4 gap-2 border">
            <h3>{blog.title}</h3>
            <p>{blog.description}</p>
            <p>{blog.author}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
