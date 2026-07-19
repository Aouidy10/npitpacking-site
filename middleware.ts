import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const maintenance = process.env.MAINTENANCE_MODE === "true";
  if (!maintenance) return NextResponse.next();

  const { pathname } = req.nextUrl;

  // Laisser passer : admin, API, coming-soon lui-même, fichiers statiques
  if (
    pathname.startsWith("/admin") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/coming-soon") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/logo") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL("/coming-soon", req.url));
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon|icon|apple-icon).*)"],
};
