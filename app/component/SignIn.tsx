"use client";
import { signIn, signOut, useSession } from "next-auth/react";

export default function SignIn() {
  const { data: session } = useSession();
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
