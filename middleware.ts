// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("session")?.value;
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/dashboard") || pathname.startsWith("/admin")) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    try {
      const decoded = Buffer.from(token, "base64").toString();
      const user = JSON.parse(decoded);

      if (pathname.startsWith("/admin") && user.role !== "admin") {
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }

      if (user.exp && user.exp < Date.now()) {
        return NextResponse.redirect(new URL("/login", request.url));
      }
    } catch {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  if (pathname === "/login" || pathname === "/register") {
    if (token) {
      try {
        const decoded = Buffer.from(token, "base64").toString();
        const user = JSON.parse(decoded);
        
        if (!user.exp || user.exp > Date.now()) {
          return NextResponse.redirect(new URL("/dashboard", request.url));
        }
      } catch {
        // Invalid token, allow access
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*", "/login", "/register"],
};