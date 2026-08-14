import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const maintenance = process.env.MAINTENANCE_MODE === "true";
  if (!maintenance) return NextResponse.next();

  const { pathname } = req.nextUrl;

  // Laisser passer : admin, API, fichiers statiques
  if (
    pathname.startsWith("/admin") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/logo") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // En mode maintenance : afficher une page simple
  return new NextResponse(
    `<!DOCTYPE html><html lang="fr"><head><meta charset="UTF-8"><title>NPIT Packing — Maintenance</title>
    <style>body{margin:0;font-family:sans-serif;display:flex;align-items:center;justify-content:center;min-height:100vh;background:#1B3266;color:#fff;text-align:center;padding:2rem}h1{font-size:2rem;margin-bottom:1rem}p{opacity:.7}</style></head>
    <body><div><h1>🔧 Site en maintenance</h1><p>Nous revenons très bientôt. Contactez-nous sur WhatsApp : +212 700-700585</p></div></body></html>`,
    { status: 503, headers: { "Content-Type": "text/html; charset=utf-8" } }
  );
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon|icon|apple-icon).*)"],
};
