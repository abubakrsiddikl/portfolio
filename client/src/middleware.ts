import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Middleware function
export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });

  //   token check
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  //  Role-based route protection
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/dashboard") && token.role !== "ADMIN") {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  return NextResponse.next();
}

// Apply to routes you want to protect
export const config = {
  matcher: ["/dashboard/:path*"],
};
