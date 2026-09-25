import React from "react";
import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import { AWARDS } from "@/data/bionature-data";
export const Awards = () => {
  return (
    <div className="site-container py-8 sm:py-12 space-y-12">
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
        <span className="text-slate-900 font-semibold">Awards & Honors</span>
      </div>

      {/* Header */}
      <div className="bg-[#183F26] text-white p-8 sm:p-10 border border-stone-800 space-y-4 max-w-4xl">
        <span className="text-[10px] font-mono tracking-widest uppercase text-[#E7EBDD] px-2 py-0.5 border border-white/20 bg-white/5 inline-block">
          Industry Recognition &bull; Peer Accreditations
        </span>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-normal leading-[1.2]">
          Awards &amp; Agricultural Honors
        </h1>
        <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-sans">
          Celebrating milestones in biological formulation stability,
          sustainable soil impact, and farmer community welfare across India.
        </p>
      </div>

      {/* Awards List or Compliance Notice */}
      {AWARDS.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {AWARDS.map((awd) => (
            <div
              key={awd.id}
              className="bg-white border border-stone-200/90 overflow-hidden hover:border-stone-400 transition-colors flex flex-col justify-between"
            >
              <div className="aspect-[16/10] bg-stone-100 overflow-hidden relative">
                <img
                  src={awd.image}
                  alt={awd.title}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-3 right-3 bg-stone-900/90 text-stone-200 font-mono text-[10px] px-2 py-0.5 border border-stone-700">
                  {awd.year}
                </span>
              </div>

              <div className="p-6 space-y-2.5">
                <div className="text-[10px] font-mono font-semibold text-[#686861] uppercase tracking-wider">
                  {awd.organization}
                </div>
                <h3 className="text-base font-serif font-normal text-stone-900">
                  {awd.title}
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed font-sans">
                  {awd.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white border border-stone-200/90 p-10 sm:p-14 text-center max-w-2xl mx-auto space-y-4">
          <span className="text-[10px] font-mono tracking-widest uppercase text-[#686861] bg-stone-100 px-3 py-1 border border-stone-200 inline-block">
            Peer Accreditations
          </span>
          <h2 className="text-xl sm:text-2xl font-serif font-normal text-stone-900">
            Formal Accreditations &amp; Institutional Review
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 font-sans leading-relaxed">
            BioNature adheres strictly to verified statutory guidelines. Institutional citations and industry awards are published upon completion of multi-season validation protocols.
          </p>
          <div className="pt-2">
            <Link href="/certifications">
              <button className="bg-[#245B35] hover:bg-[#183F26] text-white text-xs font-mono uppercase tracking-wider px-6 py-3">
                View Quality Certifications
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
