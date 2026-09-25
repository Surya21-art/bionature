import React from "react";
import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import { INFRASTRUCTURE_FACILITIES } from "@/data/bionature-data";
import { Button } from "@/components/ui/button";
export const Infrastructure = () => {
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
          Infrastructure & Manufacturing
        </span>
      </div>

      {/* Header */}
      <div className="bg-[#183F26] text-white p-8 sm:p-10 border border-stone-800 space-y-4 max-w-4xl">
        <span className="text-[10px] font-mono tracking-widest uppercase text-[#E7EBDD] px-2 py-0.5 border border-white/20 bg-white/5 inline-block">
          Biotech Infrastructure &bull; Precision Fermentation
        </span>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-normal leading-[1.2]">
          Advanced Fermentation &amp; Quality Laboratories
        </h1>
        <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-sans">
          Located in Salem, Tamil Nadu, our state-of-the-art biological manufacturing and
          research center adheres to the highest statutory and environmental standards for
          microbial bio-stimulant synthesis.
        </p>
      </div>

      {/* Facilities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {INFRASTRUCTURE_FACILITIES.map((facility, idx) => (
          <div
            key={idx}
            className="bg-white border border-stone-200/90 overflow-hidden hover:border-stone-400 transition-colors flex flex-col justify-between"
          >
            <div className="aspect-[16/10] bg-stone-100 overflow-hidden relative">
              <img
                src={facility.image}
                alt={facility.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <span className="absolute bottom-3 left-3 bg-stone-900/90 text-stone-200 text-[10px] font-mono tracking-wider uppercase px-2.5 py-1 border border-stone-700">
                Capacity: {facility.capacity}
              </span>
            </div>

            <div className="p-6 space-y-2">
              <h3 className="text-base sm:text-lg font-serif font-normal text-stone-900">
                {facility.title}
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed font-sans">
                {facility.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* R&D Commitment Banner */}
      <div className="bg-[#F1F3EC] border border-[#E7EBDD] p-8 text-center max-w-3xl mx-auto space-y-3">
        <h3 className="text-lg font-serif font-normal text-stone-900">
          Interested in a Technical Visit or Institutional Supply?
        </h3>
        <p className="text-xs text-stone-600 max-w-xl mx-auto font-sans leading-relaxed">
          We welcome agricultural university faculty, Farmer Producer
          Organizations (FPOs), and commercial distributors to tour our
          fermentation and quality testing facility.
        </p>
        <div className="pt-2">
          <Link href="/contact">
            <Button className="bg-[#245B35] hover:bg-[#183F26] text-white text-xs uppercase tracking-wider font-semibold rounded-none shadow-none py-2.5 px-6">
              Schedule a Facility Visit
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
