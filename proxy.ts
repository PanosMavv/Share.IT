// app/proxy.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Middleware to redirect logged-in users away from /login
export async function proxy(req: NextRequest) {
  const url = req.nextUrl.clone();

  // next-auth stores the session token in a cookie named "next-auth.session-token"
  const token = req.cookies.get("next-auth.session-token");

  // If user is logged in and tries to access /login, redirect to home
  if (token && url.pathname.startsWith("/login")) {
    url.pathname = "/"; // redirect to home
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login"],
};