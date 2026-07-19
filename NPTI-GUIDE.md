# NPTI Packing — Guide complet du projet

## Informations générales

- **Société** : NPTI – New Pact Industry and Trade
- **Division** : NPTI Packing (emballage)
- **Marque commerciale** : N-NOUMA / نعومة
- **Stack** : Next.js 14 + Firebase + Cloudinary + Vercel
- **Palette** : Navy `#1B3266` + Teal `#3DAAB5` + Gold `#C8A46E`

---

## Accès & Mots de passe

| Service | URL | Identifiants |
|---|---|---|
| Site local | `http://localhost:300X` | — |
| Admin dashboard | `/admin` | `npit2026` |
| Firebase | console.firebase.google.com | compte Google |
| Cloudinary | cloudinary.com | compte email |
| Vercel (à faire) | vercel.com | compte GitHub |

---

## Variables d'environnement (.env.local)

```env
# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyCGxThmSVYFTkHCSaFvwLPxG_M3SmBChq4
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=npit-packaging.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=npit-packaging
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=npit-packaging.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=121396899688
NEXT_PUBLIC_FIREBASE_APP_ID=1:121396899688:web:8cec1507f11094980db0dd

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=dndglxfeu
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=npit_products

# Admin
NEXT_PUBLIC_ADMIN_PASSWORD=npit2026

# WhatsApp (à remplir — format: 212XXXXXXXXX)
NEXT_PUBLIC_WHATSAPP_NUMBER=212600000000

# Resend email (optionnel)
RESEND_API_KEY=
ADMIN_EMAIL=
```

> ⚠️ Ne jamais committer ce fichier sur GitHub — il est dans .gitignore

---

## Structure des fichiers

```
papier-emballage-ma/
├── app/
│   ├── page.tsx              → Accueil
│   ├── layout.tsx            → Layout global (Navbar + Footer)
│   ├── globals.css           → Styles + classes utilitaires
│   ├── not-found.tsx         → Page 404
│   ├── catalogue/page.tsx    → Catalogue filtrable
│   ├── produits/[slug]/
│   │   ├── page.tsx          → Server component (SEO)
│   │   └── ProduitDetail.tsx → UI interactive
│   ├── devis/page.tsx        → Formulaire devis gros
│   ├── contact/page.tsx      → Page contact
│   ├── a-propos/page.tsx     → À propos
│   ├── admin/
│   │   ├── page.tsx          → Dashboard commandes
│   │   └── produits/page.tsx → Gestion produits (CMS)
│   └── api/devis/route.ts    → API devis → Firebase + email
├── components/
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── ProductCard.tsx
│   ├── FloatingWhatsApp.tsx
│   └── AdminGuard.tsx        → Auth partagée admin
├── lib/
│   ├── firebase.ts           → Config Firebase
│   ├── cloudinary.ts         → Helper URL Cloudinary
│   └── produits.ts           → Données démo + fonctions Firestore
├── types/index.ts            → Types TypeScript
├── public/
│   └── placeholder-product.svg
└── tailwind.config.ts        → Couleurs NPTI custom
```

---

## Firebase — Collections Firestore

### Collection `devis`
```
{
  nom: string,
  telephone: string,
  ville: string,
  produit: string,
  quantite: number,
  message: string,
  statut: "en-attente" | "confirmee" | "livree",
  createdAt: Timestamp
}
```

### Collection `produits`
```
{
  nom: string,           // ex: "Cellophane Transparent"
  nomAr: string,         // ex: "سولوفان شفاف"
  slug: string,          // ex: "cellophane-transparent"
  categorie: "cellophane" | "serviettes" | "papier-cuisson" | "sacs",
  description: string,
  images: string[],      // Cloudinary public IDs
  prixDetail: number,
  prixGros: number,
  seuilGros: number,     // quantité min pour prix gros
  unite: string,         // "rouleau" | "paquet" | "unité" | "kg"
  disponible: boolean,
  vedette: boolean,      // affiché sur la page d'accueil
  createdAt: Timestamp
}
```

### Règles Firestore actuelles
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /devis/{document} {
      allow read, write: if true;
    }
    match /produits/{document} {
      allow read, write: if true;
    }
  }
}
```

---

## Cloudinary

- **Cloud name** : `dndglxfeu`
- **Dossier produits** : `npit/`
- **Upload preset** : `npit_products` (unsigned)
- **Format URL** : `https://res.cloudinary.com/dndglxfeu/image/upload/w_400,f_auto,q_auto/[public_id]`

### Ajouter une photo produit
1. Cloudinary → Media Library → dossier `npit`
2. Upload la photo
3. Le Public ID sera `npit/nom-de-la-photo`
4. Ou utiliser directement l'admin dashboard → Produits → Upload

---

## Admin Dashboard

### Accès
URL : `votre-site.com/admin`
Mot de passe : `npit2026` (changeable dans `.env.local` → `NEXT_PUBLIC_ADMIN_PASSWORD`)

### Fonctionnalités
**Onglet Commandes :**
- Stats : total devis, en attente, confirmées, cette semaine
- Tableau des devis avec filtre par statut
- Changement de statut direct (En attente → Confirmée → Livrée)
- Bouton WhatsApp pour contacter le client directement

**Onglet Produits :**
- Liste tous les produits Firestore
- Ajouter un produit avec : photo (upload Cloudinary), nom FR/AR, catégorie, prix détail/gros, seuil gros, unité, disponibilité, vedette
- Modifier un produit existant
- Supprimer un produit
- Les produits ajoutés apparaissent immédiatement dans le catalogue

---

## Lancer le projet en local

```bash
# Installer les dépendances
npm install

# Démarrer le serveur de développement
npm run dev

# Build production
npm run build
```

---

## Déploiement Vercel (à faire)

### Étape 1 — GitHub
```bash
git remote add origin https://github.com/TON-COMPTE/npti-packing.git
git branch -M main
git push -u origin main
```

### Étape 2 — Vercel
1. vercel.com → "Add New Project"
2. Importer le repo GitHub `npti-packing`
3. Framework : Next.js (détecté automatiquement)
4. **Ajouter toutes les variables d'environnement** (copier depuis `.env.local`)
5. Deploy → URL générée automatiquement

### Étape 3 — Domaine custom (optionnel)
- Vercel Dashboard → Settings → Domains → ajouter `npti-packing.ma`

---

## Ce qui reste à faire

- [ ] Mettre le vrai numéro WhatsApp dans `.env.local` → `NEXT_PUBLIC_WHATSAPP_NUMBER=212XXXXXXXXX`
- [ ] Uploader les photos produits dans Cloudinary (dossier `npit`)
- [ ] Ajouter les vrais produits depuis `/admin/produits`
- [ ] Déployer sur Vercel
- [ ] Configurer Resend pour recevoir les devis par email (optionnel)
- [ ] Domaine personnalisé `npti-packing.ma` (optionnel)

---

## Commandes utiles

```bash
# Voir les logs du serveur
cat /tmp/nextjs.log

# Rebuild après modif
npm run build

# Vérifier les types TypeScript
npx tsc --noEmit
```

---

*NPTI – New Pact Industry and Trade © 2026*
