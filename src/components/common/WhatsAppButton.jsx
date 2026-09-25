import React from "react";
import { MessageCircle } from "lucide-react";
import { COMPANY_INFO } from "@/data/bionature-data";
export const WhatsAppButton = ({ productName }) => {
  const cleanNumber = COMPANY_INFO.whatsapp.replace(/[^0-9]/g, "");
  const defaultText = productName
    ? `Hello BioNature India, I am interested in ${productName}. Please share dosage and availability details.`
    : "Hello BioNature India, I would like agricultural guidance and product advice.";
  const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(defaultText)}`;
  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-2 group">
      <div className="hidden md:block bg-stone-900 text-stone-200 text-[11px] font-mono tracking-wider uppercase px-2.5 py-1 rounded-sm border border-stone-800 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-sm">
        WhatsApp Agronomy Desk
      </div>
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with BioNature on WhatsApp"
        className="w-11 h-11 bg-[#245B35] hover:bg-[#183F26] text-white rounded-full flex items-center justify-center border border-[#183F26] shadow-md transition-colors duration-200"
      >
        <MessageCircle className="w-5 h-5 fill-white" />
      </a>
    </div>
  );
};
