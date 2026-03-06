import { getServerSession } from "next-auth";
import Link from "next/link";
import { authOptions } from "../api/auth/[...nextauth]/route";
import SignOutButton from "./SignOutButton";
import { redirect } from "next/navigation";

export default async function Navbar() {
  const session = await getServerSession(authOptions);

  return (
    <nav className="flex gap-4 justify-center items-center text-[12px]">
      <Link href="/">Home</Link>
      <Link href="/posts">Posts</Link>
      <Link href="/simple-movies-likes">Simple Movies Likes</Link>
      <Link href="/useformstatus-posts/new">Use Form Status</Link>
      <Link href="/useoptimistic">Use Optimistic</Link>
      <Link href="/revalidate">Revalidate</Link>
      <Link href="/errorhandleproducts">Error Handling For Products</Link>
      <Link href="/lazy-loading">Lazy-Loading</Link>
      <Link href="/lazy-loading-ext-lib">
        Lazy-Loading with external library
      </Link>
      {session?.user?.email && <Link href="/dashboard">Dashboard</Link>}
      {session?.user?.email && (
        <Link href="/image-upload-form">Image Upload</Link>
      )}
      {session ? (
        <div>
          <p className="text-[11px]">{session?.user?.name}</p>
          <SignOutButton />
        </div>
      ) : (
        <Link href="/signin">
          <button
            type="button"
            className="px-8 py-2 font-semibold border rounded dark:border-gray-800 dark:text-gray-800"
          >
            Sign In
          </button>
        </Link>
      )}
    </nav>
  );
}
