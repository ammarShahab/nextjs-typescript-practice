import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export default async function proxy(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  const pathName = req.nextUrl.pathname;

  if (
    token &&
    (pathName.startsWith("/signin") || pathName.startsWith("/signup"))
  ) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (pathName.startsWith("/dashboard")) {
    if (!token) {
      return NextResponse.redirect(new URL("/signin", req.url));
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/signin", "/signup"],
};
