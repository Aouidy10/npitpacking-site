import Link from "next/link";

const BANNERS = [
  {
    tag:   "Nouveauté",
    titre: "Des emballages pour vos besoins et ceux de la planète.",
    cta:   "Découvrir",
    href:  "/catalogue?cat=emballage-biodegradable",
    bg:    "#7a6448",
    accent:"#c4a96b",
    deco:  "eco",
  },
  {
    tag:   "Best-seller",
    titre: "Un emballage aussi frais que votre produit !",
    cta:   "Voir le catalogue",
    href:  "/catalogue?cat=emballage-alimentaire",
    bg:    "#2d7e8a",
    accent:"#4db8c8",
    deco:  "cup",
  },
  {
    tag:   "Gros & Détail",
    titre: "Une qualité digne de confiance.",
    cta:   "Demander un devis",
    href:  "/devis",
    bg:    "#b06050",
    accent:"#d4907e",
    deco:  "box",
  },
];

/* Formes décoratives SVG par carte */
function Deco({ type, accent }: { type: string; accent: string }) {
  if (type === "eco") return (
    <svg viewBox="0 0 160 160" className="w-full h-full" fill="none">
      <circle cx="110" cy="80" r="70" fill={accent} opacity=".18" />
      <circle cx="130" cy="50" r="40" fill={accent} opacity=".22" />
      <rect x="60" y="55" width="70" height="85" rx="8" fill="white" opacity=".13" />
      <rect x="72" y="42" width="46" height="15" rx="7" fill="white" opacity=".18" />
      <ellipse cx="95" cy="100" rx="28" ry="10" fill={accent} opacity=".25" />
    </svg>
  );
  if (type === "cup") return (
    <svg viewBox="0 0 160 160" className="w-full h-full" fill="none">
      <circle cx="105" cy="75" r="65" fill={accent} opacity=".18" />
      <path d="M65 45 L75 135 H115 L125 45 Z" rx="6" fill="white" opacity=".15" />
      <rect x="62" y="40" width="66" height="12" rx="6" fill="white" opacity=".2" />
      <ellipse cx="95" cy="135" rx="22" ry="6" fill={accent} opacity=".3" />
      <circle cx="120" cy="55" r="18" fill={accent} opacity=".2" />
    </svg>
  );
  return (
    <svg viewBox="0 0 160 160" className="w-full h-full" fill="none">
      <circle cx="110" cy="80" r="65" fill={accent} opacity=".18" />
      <rect x="50" y="60" width="90" height="70" rx="8" fill="white" opacity=".13" />
      <rect x="50" y="55" width="90" height="18" rx="6" fill="white" opacity=".2" />
      <circle cx="130" cy="40" r="28" fill={accent} opacity=".22" />
      <rect x="65" y="80" width="60" height="8" rx="4" fill="white" opacity=".15" />
      <rect x="65" y="95" width="40" height="8" rx="4" fill="white" opacity=".12" />
    </svg>
  );
}

export default function PromoBanners() {
  return (
    <section className="bg-white border-b border-gray-100">
      <div className="container-main py-8">
        <div className="grid md:grid-cols-3 gap-5">
          {BANNERS.map((b) => (
            <Link
              key={b.href}
              href={b.href}
              className="group relative rounded-2xl overflow-hidden flex min-h-[220px] hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
              style={{ background: b.bg }}
            >
              {/* Contenu texte */}
              <div className="relative z-10 flex flex-col justify-between p-7 flex-1">
                <div>
                  <span
                    className="inline-block text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full mb-4"
                    style={{ background: b.accent, color: "rgba(255,255,255,0.95)" }}
                  >
                    {b.tag}
                  </span>
                  <h3 className="text-white font-bold text-lg leading-snug max-w-[160px]">
                    {b.titre}
                  </h3>
                </div>
                <span className="flex items-center gap-1.5 text-white/80 text-sm font-semibold group-hover:text-white group-hover:gap-2.5 transition-all mt-4 w-fit border-b border-white/30 pb-0.5">
                  {b.cta} <span className="text-base">»</span>
                </span>
              </div>

              {/* Déco visuelle droite */}
              <div className="relative w-32 flex-shrink-0 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 scale-110 group-hover:scale-125 transition-transform duration-500 opacity-90">
                  <Deco type={b.deco} accent={b.accent} />
                </div>
              </div>

              {/* Cercle décoratif fond */}
              <div
                className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full opacity-10"
                style={{ background: b.accent }}
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
