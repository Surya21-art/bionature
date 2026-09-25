import React from "react";
import { Link } from "wouter";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { COMPANY_INFO } from "@/data/bionature-data";
import { Button } from "@/components/ui/button";

export const EditorialHero = ({ onEnquire }) => {
  return (
    <section className="relative bg-[#F7F6F1] border-b border-stone-200/70 pt-6 pb-14 lg:pt-10 lg:pb-20 overflow-hidden">
      <div className="site-container">
        
        {/* Subtle, Simplified Top Breadcrumb Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-8 border-b border-stone-200/70 text-xs text-stone-500">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#245B35]"></span>
            <span className="font-medium text-stone-800">BioNature India</span>
            <span className="text-stone-300">/</span>
            <span>Salem, Tamil Nadu</span>
            <span className="text-stone-300">/</span>
            <span>Est. {COMPANY_INFO.established || "2012"}</span>
          </div>
          <div className="hidden sm:flex items-center gap-3 text-[11px] text-stone-500 font-mono tracking-wider uppercase">
            <span>Quality Assured</span>
            <span>&bull;</span>
            <span>Sustainable Agriculture Inputs</span>
          </div>
        </div>

        {/* Asymmetric Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Refined Typography & Mission (7 Columns) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-3">
              <span className="text-[11px] font-semibold tracking-[0.16em] uppercase text-[#245B35] block">
                Sustainable Biological Inputs
              </span>
              
              {/* Tastefully Reduced Editorial Headline */}
              <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-normal text-stone-900 font-serif leading-[1.18] tracking-tight">
                Ecological Intelligence for <span className="italic font-normal text-[#245B35]">Living Soil</span> & Lasting Harvests.
              </h1>
            </div>

            <p className="text-sm sm:text-base text-stone-600 font-normal leading-relaxed max-w-xl">
              BioNature formulates certified biological fertilizers, botanical crop protectors, and organic soil conditioners. Built on precision sterile fermentation, our high-viability microbial inputs eliminate chemical residues while enhancing marketable crop yields.
            </p>

            {/* Subtle, Understated Action Triggers */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <Link href="/products">
                <Button className="bg-[#245B35] hover:bg-[#183F26] text-white text-xs uppercase tracking-wider font-semibold px-6 py-5 rounded-sm shadow-none transition-colors">
                  <span>Explore Formulations</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-2" />
                </Button>
              </Link>

              <button
                onClick={() => onEnquire ? onEnquire(null) : null}
                className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-stone-800 hover:text-[#245B35] px-5 py-3 border border-stone-300 hover:border-stone-600 rounded-sm transition-colors cursor-pointer"
              >
                <span>Request Technical Dossier</span>
              </button>
            </div>

            {/* Quiet, Human-Scale Trust Points */}
            <div className="pt-6 border-t border-stone-200/70 grid grid-cols-2 sm:grid-cols-3 gap-5 text-stone-700">
              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-stone-900">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#245B35] shrink-0" />
                  <span>Residue-Free</span>
                </div>
                <p className="text-[11px] text-stone-500">Safe for pollinators & export standards</p>
              </div>

              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-stone-900">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#245B35] shrink-0" />
                  <span>High CFU Viability</span>
                </div>
                <p className="text-[11px] text-stone-500">Guaranteed 1x10⁸ CFU/ml stability</p>
              </div>

              <div className="space-y-0.5 col-span-2 sm:col-span-1">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-stone-900">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#245B35] shrink-0" />
                  <span>Field Tested</span>
                </div>
                <p className="text-[11px] text-stone-500">Documented regional farm trial observations</p>
              </div>
            </div>
          </div>

          {/* Right Column: Natural Photographic Treatment (5 Columns) */}
          <div className="lg:col-span-5 space-y-2">
            <div className="relative border border-stone-200/90 bg-white p-1.5 shadow-sm rounded-sm">
              <div className="aspect-[4/3] sm:aspect-[5/4] overflow-hidden bg-stone-100 rounded-sm">
                <img
                  src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=1200&auto=format&fit=crop&q=85"
                  alt="Vibrant agricultural fields under biological nutrition schedule"
                  className="w-full h-full object-cover hover:scale-[1.02] transition-transform duration-700 ease-out"
                />
              </div>
            </div>

            {/* Single Clean Editorial Caption */}
            <p className="text-[11px] text-stone-500 font-mono flex items-center justify-between pt-1 px-1">
              <span>Biological crop vigor &bull; Salem research fields</span>
              <span>20,000+ Ha Documented</span>
            </p>
          </div>

        </div>

        {/* Refined, Human-Scale Metric Register */}
        <div className="mt-12 pt-8 border-t border-stone-200/80 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="space-y-1">
            <span className="block text-[11px] font-mono tracking-wider uppercase text-stone-400">01 / ACREAGE</span>
            <span className="block text-2xl sm:text-3xl font-serif text-stone-900 font-normal">
              {COMPANY_INFO.stats?.hectaresCovered || "20,000"}+
            </span>
            <span className="block text-xs text-stone-500">Hectares under biological management</span>
          </div>

          <div className="space-y-1">
            <span className="block text-[11px] font-mono tracking-wider uppercase text-stone-400">02 / GROWERS</span>
            <span className="block text-2xl sm:text-3xl font-serif text-stone-900 font-normal">
              {COMPANY_INFO.stats?.farmersSupported || "10,000"}+
            </span>
            <span className="block text-xs text-stone-500">Farmers directly supported across India</span>
          </div>

          <div className="space-y-1">
            <span className="block text-[11px] font-mono tracking-wider uppercase text-stone-400">03 / SATISFACTION</span>
            <span className="block text-2xl sm:text-3xl font-serif text-stone-900 font-normal">
              {COMPANY_INFO.stats?.satisfactionRate || "98%"}
            </span>
            <span className="block text-xs text-stone-500">Repeat grower retention & field satisfaction</span>
          </div>

          <div className="space-y-1">
            <span className="block text-[11px] font-mono tracking-wider uppercase text-stone-400">04 / PURITY</span>
            <span className="block text-2xl sm:text-3xl font-serif text-stone-900 font-normal">
              100%
            </span>
            <span className="block text-xs text-stone-500">Residue-free biological & botanical inputs</span>
          </div>
        </div>

      </div>
    </section>
  );
};
