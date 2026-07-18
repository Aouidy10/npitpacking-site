const props = {
  viewBox: "0 0 100 100",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 3,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  className: "w-full h-full",
};

export function EmballageAlimentaireIcon() {
  return (
    <svg {...props}>
      {/* Tray / barquette */}
      <path d="M10 35 L22 72 L78 72 L90 35 Z" />
      <line x1="10" y1="35" x2="90" y2="35" />
      <path d="M22 72 Q50 80 78 72" />
      {/* Fork */}
      <line x1="60" y1="14" x2="60" y2="32" />
      <line x1="55" y1="14" x2="55" y2="24" />
      <line x1="65" y1="14" x2="65" y2="24" />
      <path d="M55 24 Q60 28 65 24" />
      {/* Spoon */}
      <path d="M76 14 Q84 14 84 22 Q84 30 76 31" />
      <line x1="76" y1="31" x2="76" y2="46" />
    </svg>
  );
}

export function EmballageBiodegradableIcon() {
  return (
    <svg {...props}>
      {/* Box */}
      <rect x="15" y="42" width="70" height="42" rx="3" />
      {/* Box flaps */}
      <path d="M15 42 L30 22 L70 22 L85 42" />
      <line x1="50" y1="22" x2="50" y2="42" />
      {/* Leaf */}
      <path d="M50 18 Q62 6 50 0 Q38 6 50 18" />
      <line x1="50" y1="0" x2="50" y2="18" />
    </svg>
  );
}

export function HygieneIcon() {
  return (
    <svg {...props}>
      {/* Soap dispenser body */}
      <rect x="28" y="38" width="44" height="48" rx="6" />
      {/* Pump neck */}
      <rect x="44" y="22" width="12" height="18" rx="4" />
      {/* Pump head */}
      <path d="M36 22 Q44 22 44 28" />
      {/* Bubbles */}
      <circle cx="74" cy="35" r="5" />
      <circle cx="82" cy="24" r="3.5" />
      <circle cx="70" cy="22" r="2.5" />
      {/* Label line on bottle */}
      <line x1="34" y1="58" x2="66" y2="58" />
      <line x1="34" y1="66" x2="66" y2="66" />
    </svg>
  );
}

export function PapierIcon() {
  return (
    <svg {...props}>
      {/* Paper roll cylinder */}
      <ellipse cx="50" cy="28" rx="30" ry="10" />
      <ellipse cx="50" cy="72" rx="30" ry="10" />
      <line x1="20" y1="28" x2="20" y2="72" />
      <line x1="80" y1="28" x2="80" y2="72" />
      {/* Inner core */}
      <ellipse cx="50" cy="28" rx="12" ry="4" />
      <line x1="38" y1="28" x2="38" y2="72" />
      <line x1="62" y1="28" x2="62" y2="72" />
      <ellipse cx="50" cy="72" rx="12" ry="4" />
      {/* Paper tail */}
      <path d="M62 56 Q75 64 72 78" />
    </svg>
  );
}

export function PlastiqueIcon() {
  return (
    <svg {...props}>
      {/* Roll core */}
      <rect x="8" y="26" width="22" height="48" rx="11" />
      {/* Film sheet */}
      <path d="M30 32 L88 18" />
      <path d="M30 68 L88 82" />
      <line x1="88" y1="18" x2="88" y2="82" />
      {/* Film layers */}
      <line x1="72" y1="14" x2="72" y2="86" strokeDasharray="5 4" />
      {/* Film texture lines */}
      <path d="M52 20 Q60 24 68 20" />
      <path d="M52 76 Q60 80 68 76" />
    </svg>
  );
}

export function VerreCristalIcon() {
  return (
    <svg {...props}>
      {/* Glass bowl */}
      <path d="M22 18 L36 58 L64 58 L78 18 Z" />
      <path d="M22 18 Q50 28 78 18" />
      {/* Liquid line */}
      <path d="M30 40 Q50 46 70 40" />
      {/* Stem */}
      <line x1="50" y1="58" x2="50" y2="80" />
      {/* Base */}
      <line x1="30" y1="80" x2="70" y2="80" />
      <path d="M30 80 Q50 86 70 80" />
    </svg>
  );
}
