"use client";

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SignOutButton() {
  const router = useRouter();
  const handleSignOut = async () => {
    const data = await signOut({ callbackUrl: "/" });
    // const data = await signOut({ redirect: false, callbackUrl: "/" });
    router.push(data.url);
    router.refresh();
  };
  return (
    <div>
      <button
        className="font-bold"
        // onClick={() => signOut({ callbackUrl: "/" })}
        onClick={handleSignOut}
      >
        SignOut
      </button>
    </div>
  );
}
