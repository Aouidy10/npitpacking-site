import Link from "next/link";
import { PackageSearch } from "lucide-react";

export default function NotFound() {
  return (
    <div className="container-main py-24 flex flex-col items-center text-center gap-6">
      <div className="bg-nauma-teal-50 text-nauma-600 p-5 rounded-2xl">
        <PackageSearch className="w-10 h-10" />
      </div>
      <h1 className="text-3xl font-bold text-gray-800">Page introuvable</h1>
      <p className="text-gray-500 max-w-sm">
        Cette page n&apos;existe pas ou a été déplacée. Retournez au catalogue pour parcourir nos produits.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 mt-2">
        <Link href="/catalogue" className="btn-primary">
          Voir le catalogue
        </Link>
        <Link href="/" className="btn-outline">
          Retour à l&apos;accueil
        </Link>
      </div>
    </div>
  );
}
