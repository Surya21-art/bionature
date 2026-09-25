import React from "react";
import { Link } from "wouter";
import { Star, ArrowLeft, Quote, CheckCircle2 } from "lucide-react";
import { TESTIMONIALS } from "@/data/bionature-data";
export const Testimonials = () => {
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
          Farmer Testimonials
        </span>
      </div>

      {/* Header */}
      <div className="bg-[#183F26] text-white p-8 sm:p-10 border border-stone-800 space-y-4 max-w-4xl">
        <span className="text-[10px] font-mono tracking-widest uppercase text-[#E7EBDD] px-2 py-0.5 border border-white/20 bg-white/5 inline-block">
          Field Feedback &bull; Documented Trials
        </span>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-normal leading-[1.2]">
          What Indian Farmers Say About BioNature
        </h1>
        <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-sans">
          From Punjab basmati fields to Maharashtra tomato clusters and Tamil Nadu
          plantations, hear direct accounts of reduced chemical costs,
          healthier soils, and elevated crate yields.
        </p>
      </div>

      {/* Testimonials Grid or Verification Notice */}
      {TESTIMONIALS.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="bg-white border border-stone-200/90 p-6 sm:p-8 space-y-6 hover:border-stone-400 transition-colors flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-semibold uppercase text-[#245B35] bg-[#F1F3EC] px-2 py-0.5 border border-[#E7EBDD]">
                    {t.yieldIncrease || "Verified Grower Observation"}
                  </span>
                  <span className="text-[10px] font-mono text-stone-500 uppercase">
                    Field Trial #{t.id}
                  </span>
                </div>

                <div>
                  <p className="font-serif text-sm text-stone-800 leading-relaxed italic">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </div>

                <div className="bg-stone-50 p-3 border border-stone-200 text-xs text-stone-700 flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#245B35] shrink-0" />
                  <span className="font-sans text-xs">
                    <strong className="font-mono text-[11px] uppercase tracking-wider text-stone-900">Formulation Used:</strong> {t.productUsed}
                  </span>
                </div>
              </div>

              <div className="pt-4 border-t border-stone-100 flex items-center gap-3">
                <img
                  src={t.avatar}
                  alt={t.farmerName}
                  className="w-10 h-10 object-cover border border-stone-300"
                />
                <div>
                  <div className="font-serif font-normal text-stone-900 text-sm">
                    {t.farmerName}
                  </div>
                  <div className="text-[10px] font-mono text-stone-500 uppercase">
                    {t.location}, {t.state} &bull; Crop: {t.crop}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white border border-stone-200/90 p-10 sm:p-14 text-center max-w-2xl mx-auto space-y-4">
          <span className="text-[10px] font-mono tracking-widest uppercase text-[#686861] bg-stone-100 px-3 py-1 border border-stone-200 inline-block">
            Grower Field Documentation
          </span>
          <h2 className="text-xl sm:text-2xl font-serif font-normal text-stone-900">
            Documented Field Evaluations Under Agronomic Review
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 font-sans leading-relaxed">
            BioNature adheres strictly to statutory verification standards. Multi-season regional grower observations and harvest reports are compiled with verified dosage data before public release.
          </p>
          <div className="pt-3">
            <Link href="/contact">
              <Button className="bg-[#245B35] hover:bg-[#183F26] text-white text-xs font-mono uppercase tracking-wider px-6 py-3 rounded-none shadow-none">
                Consult With Field Agronomy Team
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
