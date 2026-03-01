import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export default async function proxy(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  const pathName = req.nextUrl.pathname;

  // Redirect logged-in users away from signin/signup
  if (
    token &&
    (pathName.startsWith("/signin") || pathName.startsWith("/signup"))
  ) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // Not logged in → redirect to signin
  if (!token && pathName.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  // Logged in but not admin → block admin sub-route only
  if (
    token &&
    pathName.startsWith("/dashboard/admin") &&
    token.role !== "admin"
  ) {
    return NextResponse.redirect(new URL("/", req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/signin", "/signup"],
};
