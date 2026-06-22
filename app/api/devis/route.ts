import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { nom, telephone, ville, produit, quantite, message } = body;

    if (!nom || !telephone || !ville || !produit || !quantite) {
      return NextResponse.json({ error: "Champs manquants" }, { status: 400 });
    }

    // Sauvegarde dans Firestore
    await addDoc(collection(db, "devis"), {
      nom,
      telephone,
      ville,
      produit,
      quantite: Number(quantite),
      message: message || "",
      statut: "en-attente",
      createdAt: serverTimestamp(),
    });

    // Email notification via Resend (optionnel — uniquement si configuré)
    if (process.env.RESEND_API_KEY) {
      const { Resend } = await import("resend");
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: "devis@npit-packaging.ma",
        to: process.env.ADMIN_EMAIL || "admin@placeholder.ma",
        subject: `Nouveau devis gros — ${produit} (${quantite} unités)`,
        html: `
          <h2>Nouvelle demande de devis gros</h2>
          <table style="border-collapse:collapse;width:100%">
            <tr><td style="padding:8px;border:1px solid #eee"><strong>Nom</strong></td><td style="padding:8px;border:1px solid #eee">${nom}</td></tr>
            <tr><td style="padding:8px;border:1px solid #eee"><strong>Téléphone</strong></td><td style="padding:8px;border:1px solid #eee">${telephone}</td></tr>
            <tr><td style="padding:8px;border:1px solid #eee"><strong>Ville</strong></td><td style="padding:8px;border:1px solid #eee">${ville}</td></tr>
            <tr><td style="padding:8px;border:1px solid #eee"><strong>Produit</strong></td><td style="padding:8px;border:1px solid #eee">${produit}</td></tr>
            <tr><td style="padding:8px;border:1px solid #eee"><strong>Quantité</strong></td><td style="padding:8px;border:1px solid #eee">${quantite}</td></tr>
            ${message ? `<tr><td style="padding:8px;border:1px solid #eee"><strong>Message</strong></td><td style="padding:8px;border:1px solid #eee">${message}</td></tr>` : ""}
          </table>
        `,
      });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Devis API error:", err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
