import Link from "next/link";
import SignIn from "./SignIn";

export default function Navbar() {
  return (
    <nav className="flex gap-6 justify-center items-center">
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
      <SignIn />
    </nav>
  );
}
