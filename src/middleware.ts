import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Array of public routes
const publicRoutes = [
  "/hospital/login",
  "/hospital/register",
  "/forgot-password",
  "/admin/login",
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the requested path is a public route
  if (publicRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  // Check for the presence of an access token in the request cookies
  const accessToken = request.cookies.get("accessToken");

  // If there's no access token, redirect to the login page
  if (!accessToken) {
    return NextResponse.redirect(new URL("/hospital/login", request.url));
  }

  // If there's an access token, allow the request to proceed
  return NextResponse.next();
}

// Configure which routes the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all routes except for:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. /static (inside /public)
     * 4. all root files inside /public (e.g. /favicon.ico)
     */
    "/((?!api|_next|static|.*\\..*|_vercel).*)",
  ],
};
