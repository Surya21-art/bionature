import React from "react";
import { Link } from "wouter";
import { ShieldCheck, Download, ArrowLeft } from "lucide-react";
import { CERTIFICATIONS } from "@/data/bionature-data";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
export const Certifications = () => {
  const handleDownload = (certName) => {
    toast.success(`Downloading ${certName} certificate file...`);
  };
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-slate-500">
        <Link
          href="/about"
          className="hover:text-emerald-700 flex items-center gap-1 font-medium"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>About Us</span>
        </Link>
        <span>/</span>
        <span className="text-slate-900 font-semibold">
          Quality & Certifications
        </span>
      </div>

      {/* Header */}
      <div className="bg-[#183F26] text-white p-8 sm:p-10 border border-stone-800 space-y-4 max-w-4xl">
        <span className="text-[10px] font-mono tracking-widest uppercase text-[#E7EBDD] px-2 py-0.5 border border-white/20 bg-white/5 inline-block">
          Statutory Compliance &bull; Quality Assurances
        </span>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-normal leading-[1.2]">
          Verified Quality &amp; Statutory Standards
        </h1>
        <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-sans">
          BioNature India operates under stringent agricultural input guidelines. Every commercial formulation batch is assayed for viable microbial counts, freedom from heavy metals, and statutory adherence under Fertilizer Control Order schedules.
        </p>
      </div>

      {/* Certifications Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {CERTIFICATIONS.map((cert) => (
          <div
            key={cert.id}
            className="bg-white border border-stone-200/90 p-6 sm:p-8 space-y-5 hover:border-stone-400 transition-colors flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div className="w-10 h-10 rounded-sm bg-stone-100 text-stone-800 border border-stone-200 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono tracking-wider text-[#245B35] bg-[#F1F3EC] px-2 py-0.5 border border-[#E7EBDD]">
                  {cert.validity}
                </span>
              </div>

              <div className="space-y-1">
                <h3 className="text-base sm:text-lg font-serif font-normal text-stone-900">
                  {cert.name}
                </h3>
                <div className="text-xs text-stone-500 font-sans">
                  Issuing Authority: {cert.issuingBody}
                </div>
                <div className="text-[11px] font-mono text-stone-700 bg-stone-50 p-2 border border-stone-200 mt-2">
                  Reg No: {cert.certNumber}
                </div>
              </div>

              <p className="text-xs text-stone-600 leading-relaxed font-sans">
                {cert.description}
              </p>
            </div>

            <div className="pt-4 border-t border-stone-100 flex items-center gap-3">
              <Button
                onClick={() => handleDownload(cert.name)}
                size="sm"
                className="w-full bg-[#245B35] hover:bg-[#183F26] text-white text-xs uppercase tracking-wider font-semibold rounded-none shadow-none py-2.5"
              >
                <Download className="w-3.5 h-3.5 mr-1.5" />
                Download Official Certificate (PDF)
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
