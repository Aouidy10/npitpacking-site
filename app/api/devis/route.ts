import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { nom, telephone, ville, produit, quantite, message } = body;

    if (!nom || !telephone || !ville || !produit || !quantite) {
      return NextResponse.json({ error: "Champs manquants" }, { status: 400 });
    }

    // 1 — Sauvegarde dans Firestore
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

    // 2 — Email via Namecheap SMTP
    if (process.env.SMTP_USER && process.env.SMTP_PASS) {
      const transporter = nodemailer.createTransport({
        host: "mail.privateemail.com",
        port: 587,
        secure: false,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      await transporter.sendMail({
        from: `"NPITPACKING Site" <${process.env.SMTP_USER}>`,
        to: process.env.ADMIN_EMAIL || process.env.SMTP_USER,
        subject: `🧾 Nouveau devis — ${produit} (${quantite} unités) — ${nom}`,
        html: `
          <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
            <div style="background:#1B3266;color:white;padding:20px 24px;border-radius:12px 12px 0 0">
              <h2 style="margin:0;font-size:18px">📦 Nouvelle demande de devis gros</h2>
              <p style="margin:4px 0 0;opacity:0.8;font-size:13px">NPITPACKING — npitpacking.com</p>
            </div>
            <div style="background:#f9fafb;padding:24px;border:1px solid #e5e7eb;border-radius:0 0 12px 12px">
              <table style="width:100%;border-collapse:collapse;font-size:14px">
                <tr style="background:white">
                  <td style="padding:10px 14px;border:1px solid #e5e7eb;font-weight:600;color:#374151;width:35%">Nom</td>
                  <td style="padding:10px 14px;border:1px solid #e5e7eb;color:#111827">${nom}</td>
                </tr>
                <tr>
                  <td style="padding:10px 14px;border:1px solid #e5e7eb;font-weight:600;color:#374151;background:#f9fafb">Téléphone</td>
                  <td style="padding:10px 14px;border:1px solid #e5e7eb;color:#111827"><a href="tel:${telephone}">${telephone}</a></td>
                </tr>
                <tr style="background:white">
                  <td style="padding:10px 14px;border:1px solid #e5e7eb;font-weight:600;color:#374151">Ville</td>
                  <td style="padding:10px 14px;border:1px solid #e5e7eb;color:#111827">${ville}</td>
                </tr>
                <tr>
                  <td style="padding:10px 14px;border:1px solid #e5e7eb;font-weight:600;color:#374151;background:#f9fafb">Produit</td>
                  <td style="padding:10px 14px;border:1px solid #e5e7eb;color:#111827"><strong>${produit}</strong></td>
                </tr>
                <tr style="background:white">
                  <td style="padding:10px 14px;border:1px solid #e5e7eb;font-weight:600;color:#374151">Quantité</td>
                  <td style="padding:10px 14px;border:1px solid #e5e7eb;color:#1B3266;font-weight:700">${quantite} unités</td>
                </tr>
                ${message ? `
                <tr>
                  <td style="padding:10px 14px;border:1px solid #e5e7eb;font-weight:600;color:#374151;background:#f9fafb">Message</td>
                  <td style="padding:10px 14px;border:1px solid #e5e7eb;color:#111827">${message}</td>
                </tr>` : ""}
              </table>
              <div style="margin-top:20px;text-align:center">
                <a href="https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=${encodeURIComponent(`Bonjour ${nom}, concernant votre devis pour ${produit} (${quantite} unités).`)}"
                   style="background:#25D366;color:white;padding:12px 28px;border-radius:8px;text-decoration:none;font-weight:600;font-size:14px;display:inline-block">
                  📱 Répondre via WhatsApp
                </a>
              </div>
              <p style="margin-top:16px;font-size:11px;color:#9ca3af;text-align:center">
                Reçu le ${new Date().toLocaleString("fr-MA")} — Dashboard admin : npitpacking.com/admin
              </p>
            </div>
          </div>
        `,
      });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Devis API error:", err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
