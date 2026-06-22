"use client";

import { MessageCircle } from "lucide-react";

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "212600000000";
const DEFAULT_MESSAGE = "Bonjour, je suis intéressé par vos produits d'emballage.";

interface FloatingWhatsAppProps {
  message?: string;
}

export default function FloatingWhatsApp({ message = DEFAULT_MESSAGE }: FloatingWhatsAppProps) {
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contacter sur WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-full shadow-lg transition-all duration-200 hover:scale-105"
    >
      <MessageCircle className="w-5 h-5" />
      <span className="text-sm font-medium hidden sm:block">WhatsApp</span>
    </a>
  );
}
