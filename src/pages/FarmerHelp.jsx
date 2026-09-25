import React, { useState } from "react";
import { Link } from "wouter";
import {
  Stethoscope,
  Phone,
  MessageCircle,
  HelpCircle,
  CheckCircle2,
  Search,
  Sprout,
  Clock,
  AlertCircle,
  ArrowRight,
} from "lucide-react";
import { COMPANY_INFO } from "@/data/bionature-data";
import { useBioNatureStore } from "@/services/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const FAQS = [
  {
    num: "01",
    q: "Can BioNature bio-fertilizers be tank-mixed with chemical fungicides?",
    a: "Bio-fertilizers and bio-fungicides contain live beneficial microbial colonies (Trichoderma, Pseudomonas, Azotobacter). They should NOT be mixed directly in the spray tank with synthetic copper bactericides or chemical fungicides. Maintain an interval of at least 4 to 5 days between biological applications and synthetic chemical sprays.",
  },
  {
    num: "02",
    q: "What is the scientifically optimal time of day to spray biological formulations?",
    a: "Always spray in the early morning (before 9:00 AM) or late afternoon (after 4:30 PM). Solar ultraviolet (UV) radiation from intense mid-day heat degrades live bacterial spores and volatile botanical terpenoids.",
  },
  {
    num: "03",
    q: "Does water pH and hardness affect bio-pesticide efficacy?",
    a: "Yes. Highly alkaline water (pH above 8.0) or hard borewell water diminishes microbial spore viability. For maximum efficacy, use clean irrigation water with neutral pH (6.5 - 7.2).",
  },
  {
    num: "04",
    q: "How long before visible leaf greening occurs after micronutrient application?",
    a: "Foliar application of Chelated Micronutrients and Bio-NPK typically initiates visible leaf greening and photosynthetic revival within 4 to 7 days. Soil-applied VAM mycorrhizae and humic conditioners manifest visible root proliferation within 10 to 14 days.",
  },
  {
    num: "05",
    q: "What is the validated shelf stability of BioNature liquid consortia?",
    a: "Our stabilized liquid consortia possess a validated shelf life of 12 to 24 months when stored in original sealed containers away from direct sunlight at room temperature (below 35°C).",
  },
];

export const FarmerHelp = () => {
  const { store } = useBioNatureStore();
  const [lookupRef, setLookupRef] = useState("");
  const [searchedTicket, setSearchedTicket] = useState(null);
  const [searchError, setSearchError] = useState("");

  const handleLookup = (e) => {
    e.preventDefault();
    setSearchError("");
    setSearchedTicket(null);
    if (!lookupRef.trim()) {
      setSearchError("Please enter your Reference ID (e.g. BN-DIAG-8492)");
      return;
    }
    const ticket = store.getDiagnosisByReference(lookupRef.trim());
    if (ticket) {
      setSearchedTicket(ticket);
    } else {
      setSearchError(
        `No ticket found for reference "${lookupRef}". Please check the ID or contact our helpline.`,
      );
    }
  };

  return (
    <div className="bg-[#F7F6F1] text-[#242421] min-h-screen py-10 sm:py-16 space-y-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Editorial Top Consultation Banner */}
        <div className="bg-[#183F26] text-white p-8 sm:p-14 border border-stone-800">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center justify-between">
            <div className="lg:col-span-8 space-y-4">
              <span className="inline-block text-[11px] font-mono tracking-[0.2em] uppercase text-[#E7EBDD] px-3 py-1 bg-white/10 border border-white/20">
                KISAN AGRONOMY DESK &bull; SCIENTIFIC DIAGNOSIS
              </span>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-normal text-white leading-[1.2]">
                Crop Health Diagnosis & Field Advisory
              </h1>
              <p className="text-sm sm:text-base text-stone-300 leading-relaxed font-sans max-w-2xl">
                Connect directly with certified agronomists for scientific, residue-free biological solutions. Share crop symptoms or upload field photos for an actionable dosage calendar.
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <Link href="/crop-diagnosis">
                  <Button className="bg-white hover:bg-stone-100 text-stone-900 text-xs uppercase tracking-wider font-semibold px-6 py-5 rounded-none shadow-none">
                    Upload Photos for Diagnosis
                  </Button>
                </Link>
                <a href={`tel:${COMPANY_INFO.phone}`}>
                  <button className="text-xs uppercase tracking-wider font-semibold text-white hover:text-emerald-200 px-5 py-3 border border-white/40 hover:border-white transition-colors">
                    Call Helpline: {COMPANY_INFO.phone}
                  </button>
                </a>
              </div>
            </div>

            {/* Helpline Panel */}
            <div className="lg:col-span-4 border-t lg:border-t-0 lg:border-l border-white/20 pt-8 lg:pt-0 lg:pl-8 space-y-3">
              <span className="block text-[11px] font-mono tracking-widest uppercase text-stone-300">
                DIRECT AGRONOMIST HOTLINE
              </span>
              <div className="text-2xl sm:text-3xl font-serif text-white font-normal">
                {COMPANY_INFO.phone}
              </div>
              <p className="text-xs text-stone-300 font-sans">
                Multilingual agronomic support available in Hindi, Telugu, Marathi, Kannada, and English.
              </p>
              <div className="pt-2 text-[11px] font-mono text-emerald-300 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                <span>Mon &ndash; Sat: 9:00 AM &ndash; 6:30 PM (IST)</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Core Editorial Pathways */}
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-stone-200 border-t border-b border-stone-200 bg-white">
          
          <div className="p-8 sm:p-10 space-y-5 flex flex-col justify-between">
            <div className="space-y-3">
              <span className="text-xs font-mono tracking-widest text-emerald-800 font-semibold block">
                01 / PHOTO ANALYSIS
              </span>
              <h3 className="text-xl font-serif text-stone-900 font-normal">
                Crop Photo Diagnosis
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed font-sans">
                Upload images of curled foliage, wilts, or insect damage. Senior agronomists evaluate the pathology and issue an official prescription ticket.
              </p>
            </div>
            <Link
              href="/crop-diagnosis"
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-900 hover:text-emerald-700 pt-2"
            >
              <span>Submit Case &rarr;</span>
            </Link>
          </div>

          <div className="p-8 sm:p-10 space-y-5 flex flex-col justify-between">
            <div className="space-y-3">
              <span className="text-xs font-mono tracking-widest text-emerald-800 font-semibold block">
                02 / MOBILE MESSAGING
              </span>
              <h3 className="text-xl font-serif text-stone-900 font-normal">
                WhatsApp Field Desk
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed font-sans">
                Direct mobile communication channel for immediate farmer assistance. Share voice notes, crop pictures, and soil test reports seamlessly.
              </p>
            </div>
            <a
              href={`https://wa.me/${COMPANY_INFO.whatsapp.replace(/[^0-9]/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-900 hover:text-emerald-700 pt-2"
            >
              <span>Open WhatsApp &rarr;</span>
            </a>
          </div>

          <div className="p-8 sm:p-10 space-y-5 flex flex-col justify-between">
            <div className="space-y-3">
              <span className="text-xs font-mono tracking-widest text-emerald-800 font-semibold block">
                03 / PROTOCOLS
              </span>
              <h3 className="text-xl font-serif text-stone-900 font-normal">
                Crop Solutions Catalog
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed font-sans">
                Scientific management calendars for cotton, paddy, sugarcane, banana, tomato, and vegetables tailored for Indian soil profiles.
              </p>
            </div>
            <Link
              href="/solutions"
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-900 hover:text-emerald-700 pt-2"
            >
              <span>Browse Protocols &rarr;</span>
            </Link>
          </div>

        </div>

        {/* Ticket Tracking Section (Architectural Style) */}
        <div className="border border-stone-200/90 bg-white p-8 sm:p-12 space-y-8" id="tracking">
          <div className="max-w-xl mx-auto text-center space-y-2">
            <span className="text-[11px] font-mono tracking-widest uppercase text-emerald-800 font-semibold block">
              STATUS VERIFICATION
            </span>
            <h2 className="text-2xl font-serif font-normal text-stone-900">
              Check Status of Your Diagnosis Ticket
            </h2>
            <p className="text-xs text-stone-500 font-sans">
              Enter your reference identifier received after submitting crop photos (e.g. BN-DIAG-8492).
            </p>
          </div>

          <form
            onSubmit={handleLookup}
            className="max-w-md mx-auto flex items-center gap-2"
          >
            <Input
              value={lookupRef}
              onChange={(e) => setLookupRef(e.target.value)}
              placeholder="ENTER TICKET ID: BN-DIAG-XXXX"
              className="text-xs font-mono uppercase rounded-none border-stone-300"
            />
            <Button
              type="submit"
              className="bg-[#245B35] hover:bg-[#183F26] text-white text-xs uppercase tracking-wider font-semibold rounded-none shrink-0 px-6"
            >
              <Search className="w-3.5 h-3.5 mr-1" />
              Track
            </Button>
          </form>

          {searchError && (
            <div className="max-w-md mx-auto p-3 bg-red-50 border border-red-200 text-xs text-red-700 text-center font-mono">
              {searchError}
            </div>
          )}

          {searchedTicket && (
            <div className="max-w-2xl mx-auto bg-white p-8 border border-stone-300 space-y-6">
              <div className="flex items-center justify-between border-b border-stone-200 pb-4">
                <div>
                  <span className="text-[10px] font-mono text-stone-400 uppercase tracking-wider block">
                    REFERENCE DOSSIER
                  </span>
                  <div className="text-lg font-serif font-semibold text-[#245B35]">
                    {searchedTicket.referenceNumber}
                  </div>
                </div>
                <span className="text-[11px] font-mono uppercase tracking-wider px-3 py-1 bg-stone-200 border border-stone-300 text-stone-800 font-semibold">
                  STATUS: {searchedTicket.status.replace("_", " ")}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs font-mono border-b border-stone-200 pb-4">
                <div>
                  <span className="text-stone-400 block mb-0.5">GROWER:</span>
                  <div className="font-semibold text-stone-900">
                    {searchedTicket.farmerName}
                  </div>
                </div>
                <div>
                  <span className="text-stone-400 block mb-0.5">CROP & PHENOLOGY:</span>
                  <div className="font-semibold text-stone-900">
                    {searchedTicket.crop} ({searchedTicket.cropAge})
                  </div>
                </div>
              </div>

              <div className="space-y-1.5 text-xs">
                <span className="text-stone-400 font-mono block">OBSERVED FIELD PATHOLOGY:</span>
                <p className="text-stone-800 bg-white p-3 border border-stone-200 font-sans leading-relaxed">
                  {searchedTicket.problemDescription}
                </p>
              </div>

              {searchedTicket.expertNotes ? (
                <div className="bg-[#F1F3EC] p-5 border border-[#E7EBDD] space-y-2">
                  <div className="text-xs font-semibold text-stone-900 font-serif flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[#245B35]" />
                    Agronomist Recommendation & Biological Protocol:
                  </div>
                  <p className="text-xs text-stone-800 leading-relaxed font-sans">
                    {searchedTicket.expertNotes}
                  </p>
                </div>
              ) : (
                <div className="bg-amber-50 p-4 border border-amber-200 text-xs text-amber-800 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-700 shrink-0" />
                  <span>
                    Case is under active laboratory review. Recommended protocol will update shortly.
                  </span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Editorial FAQ Index */}
        <div className="max-w-4xl mx-auto space-y-8 pt-6">
          <div className="border-b border-stone-200 pb-4">
            <span className="text-[11px] font-mono tracking-widest uppercase text-emerald-800 font-semibold block mb-1">
              AGRONOMY ARCHIVE
            </span>
            <h2 className="text-2xl font-serif font-normal text-stone-900">
              Technical Agronomy Inquiries
            </h2>
          </div>

          <div className="divide-y divide-stone-200 border-b border-stone-200">
            {FAQS.map((faq, idx) => (
              <div key={idx} className="py-6 space-y-2">
                <div className="flex items-start gap-4">
                  <span className="text-xs font-mono text-emerald-800 font-semibold mt-0.5">
                    {faq.num}
                  </span>
                  <div className="space-y-2">
                    <h3 className="text-base font-serif font-normal text-stone-900 leading-snug">
                      {faq.q}
                    </h3>
                    <p className="text-xs text-stone-600 leading-relaxed font-sans">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
