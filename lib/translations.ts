export type Lang = "fr" | "ar";

export const TR: Record<string, Record<Lang, string>> = {
  // ── Langue ──
  "lang.toggle":           { fr: "عربي",      ar: "FR" },

  // ── Navbar ──
  "nav.home":              { fr: "Accueil",           ar: "الرئيسية" },
  "nav.catalogue":         { fr: "Catalogue",          ar: "الكتالوج" },
  "nav.gros":              { fr: "Commande Gros",      ar: "طلب بالجملة" },
  "nav.about":             { fr: "À propos",           ar: "من نحن" },
  "nav.contact":           { fr: "Contact",            ar: "اتصل بنا" },
  "nav.devis":             { fr: "Devis gratuit",      ar: "طلب سعر مجاني" },
  "nav.allCats":           { fr: "Toutes les catégories", ar: "جميع الفئات" },
  "nav.seeAll":            { fr: "Voir tout",          ar: "عرض الكل" },

  // ── Announcement bar ──
  "ann.delivery":          { fr: "🚚 Livraison dans tout le Maroc",       ar: "🚚 توصيل في جميع أنحاء المغرب" },
  "ann.whatsapp":          { fr: "📞 Commander par WhatsApp →",            ar: "→ 📞 اطلب عبر واتساب" },
  "ann.promo":             { fr: "⭐ Prix spéciaux pour commandes gros",   ar: "⭐ أسعار خاصة للطلبات بالجملة" },

  // ── Homepage ──
  "home.categories":       { fr: "Nos Catégories",              ar: "فئاتنا" },
  "home.byFamily":         { fr: "Par Familles",                ar: "حسب الفئات" },
  "home.byTrade":          { fr: "Par Métiers",                 ar: "حسب المهنة" },
  "home.new":              { fr: "Nouveautés",                  ar: "جديد" },
  "home.bestsellers":      { fr: "Meilleures ventes",           ar: "الأكثر مبيعاً" },
  "home.viewAll":          { fr: "Voir tous les produits",      ar: "عرض جميع المنتجات" },
  "home.services":         { fr: "Nos Services",                ar: "خدماتنا" },
  "home.reviews":          { fr: "Ce que disent nos clients",   ar: "ما يقوله عملاؤنا" },
  "home.reviewsSub":       { fr: "Ils nous font confiance pour leur emballage professionnel", ar: "يثقون بنا لتوفير التغليف المهني" },
  "home.cta":              { fr: "Vous commandez en grande quantité ?",    ar: "تريد الطلب بكميات كبيرة؟" },
  "home.ctaSub":           { fr: "Bénéficiez de tarifs préférentiels pour les commandes gros. Devis gratuit sous 24h.", ar: "استفد من أسعار مفضلة للطلبات الكبيرة. عرض سعر مجاني خلال 24 ساعة." },
  "home.ctaBtn":           { fr: "Demander un devis gratuit",  ar: "طلب عرض سعر مجاني" },

  // ── Services ──
  "svc.quality":           { fr: "Qualité garantie",        ar: "جودة مضمونة" },
  "svc.qualitySub":        { fr: "Produits conformes aux normes alimentaires", ar: "منتجات مطابقة للمعايير الغذائية" },
  "svc.range":             { fr: "Large gamme",              ar: "تشكيلة واسعة" },
  "svc.rangeSub":          { fr: "Des milliers de références d'emballage", ar: "آلاف من مراجع التغليف" },
  "svc.return":            { fr: "Retrait & Échange",        ar: "استرجاع وتبادل" },
  "svc.returnSub":         { fr: "Retour ou échange produit facilité", ar: "إرجاع أو تبادل المنتجات بسهولة" },
  "svc.support":           { fr: "Service après-vente",      ar: "خدمة ما بعد البيع" },
  "svc.supportSub":        { fr: "Assistance client dédiée via WhatsApp", ar: "دعم العملاء المخصص عبر واتساب" },

  // ── Popup activité ──
  "popup.title":           { fr: "Votre secteur d'activité ?",               ar: "ما هو قطاع نشاطكم؟" },
  "popup.sub":             { fr: "On sélectionne les emballages faits pour vous", ar: "نختار لكم التغليف المناسب لمهنتكم" },
  "popup.online":          { fr: "En ligne",                                 ar: "متصل" },
  "popup.skip":            { fr: "Voir tous les produits sans filtre →",     ar: "← عرض جميع المنتجات بدون تصفية" },

  // ── Activités (noms) ──
  "act.restaurant":        { fr: "Restaurant",    ar: "مطعم" },
  "act.cafe":              { fr: "Café",          ar: "مقهى" },
  "act.snack":             { fr: "Snack",         ar: "سناك" },
  "act.patisserie":        { fr: "Pâtisserie",    ar: "حلوياتية" },
  "act.boucherie":         { fr: "Boucherie",     ar: "جزارة" },
  "act.traiteur":          { fr: "Traiteur",      ar: "خدمة طعام" },
  "act.hotel":             { fr: "Hôtel",         ar: "فندق" },

  // ── ProductCard ──
  "card.detail":           { fr: "Détail",        ar: "مفرد" },
  "card.gros":             { fr: "Gros",          ar: "جملة" },
  "card.from":             { fr: "À partir de",   ar: "ابتداءً من" },
  "card.unavailable":      { fr: "Indisponible",  ar: "غير متوفر" },
  "card.new":              { fr: "Nouveau",        ar: "جديد" },
  "card.promo":            { fr: "Promo",          ar: "تخفيض" },
  "card.bestseller":       { fr: "Top vente",      ar: "الأكثر مبيعاً" },

  // ── Catalogue ──
  "cat.productsFor":       { fr: "Produits pour",              ar: "منتجات لـ" },
  "cat.adapted":           { fr: "Sélection adaptée à votre activité", ar: "تشكيلة مناسبة لنشاطكم" },
  "cat.showAll":           { fr: "Tout afficher",              ar: "عرض الكل" },
  "cat.loading":           { fr: "Chargement…",               ar: "جاري التحميل…" },
  "cat.results":           { fr: "résultat",                   ar: "نتيجة" },
  "cat.results_plural":    { fr: "résultats",                  ar: "نتائج" },
  "cat.empty":             { fr: "Aucun produit dans cette catégorie.", ar: "لا توجد منتجات في هذه الفئة." },
  "cat.allProducts":       { fr: "Tous les produits",          ar: "جميع المنتجات" },
  "cat.ourProducts":       { fr: "Nos Produits",               ar: "منتجاتنا" },
  "cat.search":            { fr: "Rechercher des produits",    ar: "البحث عن منتجات" },
  "cat.filter":            { fr: "Filtrer",                    ar: "تصفية" },
  "cat.sort.default":      { fr: "Tri par défaut",             ar: "الترتيب الافتراضي" },
  "cat.sort.az":           { fr: "Nom A → Z",                  ar: "الاسم أ ← ي" },
  "cat.sort.za":           { fr: "Nom Z → A",                  ar: "الاسم ي ← أ" },
  "cat.sort.new":          { fr: "Nouveautés",                 ar: "الأحدث" },

  // ── Footer ──
  "footer.tagline":        { fr: "Pôle emballage de NPIT — New Pact Industry and Trade. Vente d'emballages professionnels au détail et en gros, partout au Maroc.", ar: "قطب التغليف في NPIT — بيع التغليف المهني بالمفرد والجملة في جميع أنحاء المغرب." },
  "footer.categories":     { fr: "Catégories",         ar: "الفئات" },
  "footer.info":           { fr: "Informations",        ar: "معلومات" },
  "footer.contact":        { fr: "Contact",             ar: "اتصل بنا" },
  "footer.about":          { fr: "À propos",            ar: "من نحن" },
  "footer.delivery":       { fr: "Politique de livraison", ar: "سياسة التوصيل" },
  "footer.legal":          { fr: "Mentions légales",    ar: "الإشعار القانوني" },
  "footer.quote":          { fr: "Demander un devis",   ar: "طلب سعر" },
  "footer.location":       { fr: "Maroc — Livraison nationale", ar: "المغرب — توصيل وطني" },
  "footer.rights":         { fr: "Tous droits réservés", ar: "جميع الحقوق محفوظة" },
};

export function t(key: string, lang: Lang): string {
  return TR[key]?.[lang] ?? key;
}
