
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Middleware function
export async function middleware(req: NextRequest) {
  const token = req.cookies.get("accessToken")?.value;
  //   token check
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

// Apply to routes you want to protect
export const config = {
  matcher: ["/dashboard/:path*"],
};
