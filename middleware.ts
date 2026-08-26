import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const HTML = `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>NPIT Packing — Bientôt disponible</title>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      min-height: 100vh;
      background: #0f172a;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      color: #fff;
      overflow: hidden;
      position: relative;
    }
    /* Cercles décoratifs background */
    .bg-circle {
      position: absolute;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(61,170,181,0.15) 0%, transparent 70%);
      pointer-events: none;
    }
    .bg-circle-1 { width: 600px; height: 600px; top: -200px; left: -150px; }
    .bg-circle-2 { width: 500px; height: 500px; bottom: -200px; right: -100px; background: radial-gradient(circle, rgba(27,50,102,0.4) 0%, transparent 70%); }

    .card {
      position: relative;
      z-index: 10;
      text-align: center;
      padding: 3rem 2.5rem;
      max-width: 480px;
      width: 90%;
    }

    /* Logo / Badge */
    .logo-badge {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      background: rgba(255,255,255,0.07);
      border: 1px solid rgba(255,255,255,0.12);
      border-radius: 999px;
      padding: 8px 18px;
      margin-bottom: 2.5rem;
    }
    .logo-dot {
      width: 8px; height: 8px;
      border-radius: 50%;
      background: #3DAAB5;
      box-shadow: 0 0 8px #3DAAB5;
      animation: pulse 2s infinite;
    }
    .logo-text { font-size: 13px; font-weight: 600; letter-spacing: 0.08em; color: #94a3b8; text-transform: uppercase; }

    /* Box icon */
    .icon-wrap {
      width: 80px; height: 80px;
      margin: 0 auto 1.5rem;
      background: linear-gradient(135deg, #1B3266, #3DAAB5);
      border-radius: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 36px;
      box-shadow: 0 20px 40px rgba(61,170,181,0.25);
    }

    h1 {
      font-size: clamp(1.8rem, 5vw, 2.4rem);
      font-weight: 800;
      line-height: 1.2;
      margin-bottom: 1rem;
      background: linear-gradient(135deg, #fff 40%, #3DAAB5);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    p {
      color: #94a3b8;
      font-size: 1rem;
      line-height: 1.7;
      margin-bottom: 2.5rem;
    }

    /* Compteur visuel */
    .progress-bar {
      background: rgba(255,255,255,0.08);
      border-radius: 999px;
      height: 6px;
      margin-bottom: 0.6rem;
      overflow: hidden;
    }
    .progress-fill {
      height: 100%;
      width: 75%;
      background: linear-gradient(90deg, #1B3266, #3DAAB5);
      border-radius: 999px;
      animation: load 2s ease-in-out;
    }
    .progress-label { font-size: 12px; color: #64748b; margin-bottom: 2.5rem; }

    /* WhatsApp CTA */
    .wa-btn {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      background: #25D366;
      color: #fff;
      font-weight: 700;
      font-size: 0.95rem;
      text-decoration: none;
      padding: 14px 28px;
      border-radius: 999px;
      transition: transform 0.2s, box-shadow 0.2s;
      box-shadow: 0 8px 24px rgba(37,211,102,0.3);
      margin-bottom: 2rem;
    }
    .wa-btn:hover { transform: translateY(-2px); box-shadow: 0 12px 28px rgba(37,211,102,0.4); }
    .wa-btn svg { width: 20px; height: 20px; fill: #fff; }

    /* Contact info */
    .contact-row {
      display: flex;
      justify-content: center;
      gap: 1.5rem;
      flex-wrap: wrap;
    }
    .contact-item {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 13px;
      color: #64748b;
    }
    .contact-item span { color: #94a3b8; }

    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.4; }
    }
    @keyframes load {
      from { width: 0%; }
      to { width: 75%; }
    }
  </style>
</head>
<body>
  <div class="bg-circle bg-circle-1"></div>
  <div class="bg-circle bg-circle-2"></div>

  <div class="card">
    <div class="logo-badge">
      <div class="logo-dot"></div>
      <span class="logo-text">NPIT Packing — Maroc</span>
    </div>

    <div class="icon-wrap">📦</div>

    <h1>Notre site arrive bientôt</h1>
    <p>
      Nous préparons quelque chose d'exceptionnel pour vous.<br />
      En attendant, contactez-nous directement sur WhatsApp pour vos commandes d'emballages.
    </p>

    <div class="progress-bar">
      <div class="progress-fill"></div>
    </div>
    <p class="progress-label">Lancement imminent — 75% complété</p>

    <a
      href="https://wa.me/212700700585?text=Bonjour%20NPIT%20Packing%20%F0%9F%91%8B%2C%20je%20suis%20int%C3%A9ress%C3%A9(e)%20par%20vos%20produits%20d%27emballage.%20Pouvez-vous%20m%27aider%20%3F"
      class="wa-btn"
      target="_blank"
    >
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
      Commander sur WhatsApp
    </a>

    <div class="contact-row">
      <div class="contact-item">📱 <span>+212700700585</span></div>
      <div class="contact-item">✉️ <span>contact@npitpacking.com</span></div>
    </div>
  </div>
</body>
</html>`;

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // En développement local → tout passer normalement
  if (process.env.NODE_ENV === "development") {
    return NextResponse.next();
  }

  // Laisser passer : admin, API, assets Next.js, favicons, SVGs
  if (
    pathname.startsWith("/admin") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.includes(".") // fichiers statiques (.svg, .png, .ico…)
  ) {
    return NextResponse.next();
  }

  // Toutes les autres routes → Coming Soon
  return new NextResponse(HTML, {
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
