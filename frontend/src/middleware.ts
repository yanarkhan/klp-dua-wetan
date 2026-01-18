import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const DEV_BYPASS = process.env.NEXT_PUBLIC_DEV_BYPASS_AUTH === "true";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (DEV_BYPASS) {
    if (pathname.startsWith("/admin")) {
      return NextResponse.next();
    }

    if (pathname.startsWith("/beranda") || pathname.startsWith("/laporan")) {
      return NextResponse.next();
    }
  }

  const token = request.cookies.get("auth_token")?.value;
  if (!token) {
    if (
      pathname.startsWith("/admin") ||
      pathname.startsWith("/beranda") ||
      pathname.startsWith("/laporan")
    ) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  if (pathname.startsWith("/admin")) {
    try {
      const payload = JSON.parse(
        Buffer.from(token!.split(".")[1], "base64").toString(),
      );

      if (payload.tipe_user !== "ADMIN") {
        return NextResponse.redirect(new URL("/beranda", request.url));
      }
    } catch (error) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  if (pathname === "/beranda" || pathname === "/laporan") {
    try {
      const payload = JSON.parse(
        Buffer.from(token!.split(".")[1], "base64").toString(),
      );

      if (payload.tipe_user === "ADMIN") {
        return NextResponse.redirect(new URL("/admin", request.url));
      }
    } catch {
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/beranda/:path*", "/laporan/:path*"],
};
