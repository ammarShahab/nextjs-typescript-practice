"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import Loading from "./Loading";

export default function SignIn() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (session) {
    return (
      <div>
        <p>{session?.user?.name}</p>
        <button onClick={() => signOut()}>SignOut</button>
      </div>
    );
  }
  return (
    <div>
      <button onClick={() => signIn("google")}>SignIn With Google</button>
    </div>
  );
}
