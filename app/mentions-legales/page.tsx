import { Metadata } from "next";
import { Shield } from "lucide-react";

export const metadata: Metadata = {
  title: "Mentions légales — NPIT Packing Maroc",
  description: "Mentions légales et informations juridiques de NPIT Packing, division de NPIT.",
};

export default function MentionsLegalesPage() {
  return (
    <div className="bg-white">

      {/* ── Hero ── */}
      <section className="bg-nauma-600 text-white">
        <div className="container-main py-14 text-center">
          <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-5">
            <Shield className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold mb-3">Mentions légales</h1>
          <p className="text-blue-100 text-sm">Dernière mise à jour : juillet 2026</p>
        </div>
      </section>

      <div className="container-main py-14">
        <div className="max-w-3xl space-y-10">

          <Section titre="1. Éditeur du site">
            <p>Le site <strong>npitpacking.ma</strong> est édité par :</p>
            <ul className="mt-3 space-y-1">
              <li><span className="text-gray-400">Raison sociale :</span> <strong>NPIT</strong> (Division NPITPACKING)</li>
              <li><span className="text-gray-400">Marque :</span> N-NOUMA</li>
              <li><span className="text-gray-400">Forme juridique :</span> Société à Responsabilité Limitée (SARL)</li>
              <li><span className="text-gray-400">Siège social :</span> Maroc</li>
              <li><span className="text-gray-400">Email :</span> contact@npitpacking.com</li>
              <li><span className="text-gray-400">WhatsApp :</span> +212700700585</li>
            </ul>
          </Section>

          <Section titre="2. Hébergement">
            <p>Ce site est hébergé par :</p>
            <ul className="mt-3 space-y-1">
              <li><span className="text-gray-400">Société :</span> Vercel Inc.</li>
              <li><span className="text-gray-400">Adresse :</span> 340 Pine Street, Suite 701, San Francisco, CA 94104, États-Unis</li>
              <li><span className="text-gray-400">Site :</span> vercel.com</li>
            </ul>
          </Section>

          <Section titre="3. Propriété intellectuelle">
            <p>
              L&apos;ensemble du contenu de ce site (textes, images, logos, graphismes, icônes) est la propriété exclusive de NPIT ou de ses partenaires, et est protégé par les lois marocaines et internationales relatives à la propriété intellectuelle.
            </p>
            <p className="mt-3">
              Toute reproduction, distribution, modification ou utilisation de tout ou partie du contenu du site sans autorisation écrite préalable est strictement interdite.
            </p>
          </Section>

          <Section titre="4. Données personnelles">
            <p>
              Les données personnelles collectées via les formulaires de devis (nom, téléphone, email, adresse) sont utilisées exclusivement dans le cadre du traitement de votre demande commerciale.
            </p>
            <p className="mt-3">
              Ces données sont stockées de manière sécurisée via Firebase (Google Cloud) et ne sont jamais vendues ni transmises à des tiers à des fins commerciales.
            </p>
            <p className="mt-3">
              Conformément à la loi marocaine n° 09-08 relative à la protection des personnes physiques à l&apos;égard du traitement des données à caractère personnel, vous disposez d&apos;un droit d&apos;accès, de rectification et de suppression de vos données. Pour exercer ce droit, contactez-nous à : <strong>contact@npitpacking.com</strong>
            </p>
          </Section>

          <Section titre="5. Cookies">
            <p>
              Ce site utilise des cookies techniques nécessaires au bon fonctionnement du panier et de la navigation. Aucun cookie publicitaire ou de suivi tiers n&apos;est déposé sans votre consentement.
            </p>
          </Section>

          <Section titre="6. Limitation de responsabilité">
            <p>
              NPIT s&apos;efforce d&apos;assurer l&apos;exactitude et la mise à jour des informations diffusées sur ce site. Toutefois, NPIT ne peut garantir l&apos;exactitude, la précision ou l&apos;exhaustivité des informations mises à la disposition sur ce site.
            </p>
            <p className="mt-3">
              Les prix et disponibilités des produits sont donnés à titre indicatif et peuvent être modifiés sans préavis. La confirmation des prix et de la disponibilité se fait lors de la validation de votre devis.
            </p>
          </Section>

          <Section titre="7. Loi applicable">
            <p>
              Les présentes mentions légales sont soumises au droit marocain. En cas de litige, les tribunaux marocains seront seuls compétents.
            </p>
          </Section>

          <Section titre="8. Contact">
            <p>Pour toute question relative aux présentes mentions légales :</p>
            <ul className="mt-3 space-y-1">
              <li><span className="text-gray-400">Email :</span> contact@npitpacking.com</li>
              <li><span className="text-gray-400">WhatsApp :</span> +212700700585</li>
            </ul>
          </Section>

        </div>
      </div>

    </div>
  );
}

function Section({ titre, children }: { titre: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-lg font-bold text-gray-800 mb-4 pb-2 border-b border-gray-100">{titre}</h2>
      <div className="text-sm text-gray-500 leading-relaxed space-y-2">{children}</div>
    </section>
  );
}
