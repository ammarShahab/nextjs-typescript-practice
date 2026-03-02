"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function ErrorPage() {
  const errorMessages: Record<string, string> = {
    OAuthSignin: "Try signing with a different account.",
    OAuthCallback: "Try signing with a different account.",
    OAuthCreateAccount: "Try signing with a different account.",
    EmailCreateAccount: "Try signing with a different account.",
    Callback: "Try signing with a different account.",
    EmailSignin: "Check your email address.",
    OAuthAccountNotLinked:
      "To confirm your identity, sign in with the same account you used originally.",
    CredentialsSignin:
      "Sign in failed. Check the details you provided are correct.",
    default: "Unable to sign in.",
  };

  const searchParams = useSearchParams();
  const errorCode = searchParams.get("error") ?? "default";
  const errorMessage = errorMessages[errorCode] ?? errorMessages.default;

  return (
    <div className="max-w-5xl mx-auto space-y-4">
      <div className="flex flex-col gap-4 justify-center items-center border border-amber-900">
        <h3 className="text-center">Authentication Error</h3>
        <p className="text-center font-bold text-red-600">{errorMessage}</p>
      </div>
      <div className="flex gap-4">
        <Link className="rounded-xl bg-neutral-900 text-white" href="/signin">
          Go To Sign In
        </Link>
        <Link className="rounded-xl bg-neutral-900 text-white" href="/">
          Go To Home
        </Link>
      </div>
    </div>
  );
}
