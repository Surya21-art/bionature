import React from "react";
import { Link } from "wouter";
import { Target, Eye, Heart, ArrowRight, CheckCircle2 } from "lucide-react";
import { COMPANY_INFO } from "@/data/bionature-data";
import { Button } from "@/components/ui/button";

const TIMELINE = [
  {
    num: "01",
    year: "2012",
    title: "Establishment in Salem, Tamil Nadu",
    description:
      "BioNature founded by agricultural scientists and biotechnologists to introduce biological inputs designed for regional soil profiles.",
  },
  {
    num: "02",
    year: "2016",
    title: "Statutory FCO Clearance & Quality Assay Lab",
    description:
      "Received regulatory clearance under the Fertilizer Control Order (FCO) and established standardized batch assay protocols for viable microbial counts.",
  },
  {
    num: "03",
    year: "2020",
    title: "Sterile Bioreactor Fermentation Facility",
    description:
      "Commissioned automated stainless-steel fermentation units and optical purity assay testing for guaranteed CFU density.",
  },
  {
    num: "04",
    year: "2024",
    title: "20,000+ Hectares Sustainable Coverage",
    description:
      "Expanded distribution across Southern and Western Indian farming belts with the Digital Farmer Crop Advisory Desk.",
  },
];

export const About = () => {
  return (
    <div className="bg-[#F7F6F1] text-[#242421] min-h-screen py-10 sm:py-16 space-y-16">
      <div className="site-container space-y-16">
        
        {/* Editorial Hero Banner */}
        <div className="bg-[#183F26] text-white p-8 sm:p-14 border border-stone-800">
          <div className="max-w-3xl space-y-4">
            <span className="inline-block text-[11px] font-mono tracking-[0.2em] uppercase text-[#E7EBDD] px-3 py-1 bg-white/10 border border-white/20">
              ORIGIN &bull; SALEM, TAMIL NADU &bull; EST. 2012
            </span>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-normal text-white leading-[1.2]">
              Pioneering Ecological Agriscience for Modern Indian Agriculture
            </h1>
            <p className="text-sm sm:text-base text-stone-300 leading-relaxed font-sans">
              BioNature was founded with a singular scientific conviction: that sustainable soil microbiology and high commercial crop yields can exist in complete harmony.
            </p>
          </div>
        </div>

        {/* Mission, Vision, Governance (3 Architectural Columns) */}
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-stone-200 border-t border-b border-stone-200 bg-white">
          <div className="p-8 sm:p-10 space-y-4">
            <span className="text-xs font-mono tracking-widest text-[#686861] font-semibold block">
              01 / PURPOSE
            </span>
            <h2 className="text-xl font-serif text-stone-900 font-normal">
              Our Mission
            </h2>
            <p className="text-xs text-stone-600 leading-relaxed font-sans">
              To supply Indian farmers with verified, high-viability biological inputs that reduce reliance on synthetic fertilizers, eliminate chemical residues, and restore living soil carbon.
            </p>
          </div>

          <div className="p-8 sm:p-10 space-y-4">
            <span className="text-xs font-mono tracking-widest text-[#686861] font-semibold block">
              02 / HORIZON
            </span>
            <h2 className="text-xl font-serif text-stone-900 font-normal">
              Our Vision
            </h2>
            <p className="text-xs text-stone-600 leading-relaxed font-sans">
              To be India&rsquo;s definitive benchmark for biological agricultural formulations, recognized across agricultural universities for fermentation purity and field efficacy.
            </p>
          </div>

          <div className="p-8 sm:p-10 space-y-4">
            <span className="text-xs font-mono tracking-widest text-[#686861] font-semibold block">
              03 / ETHICS
            </span>
            <h2 className="text-xl font-serif text-stone-900 font-normal">
              Our Values
            </h2>
            <p className="text-xs text-stone-600 leading-relaxed font-sans">
              Rigorous laboratory verification, grower transparency, guaranteed microbial viability (&gt;1x10⁸ CFU/ml), and uncompromising environmental stewardship.
            </p>
          </div>
        </div>

        {/* Company Overview (Asymmetric Editorial Split) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-5">
            <span className="text-[11px] font-mono tracking-widest uppercase text-[#686861] font-semibold block">
              TECHNICAL GOVERNANCE
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-normal text-stone-900 leading-tight">
              Science-Backed Biological Inputs for Commercial Indian Farming
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-sans">
              Operating out of Salem, Tamil Nadu, with commercial collaborations including Agrocare India, BioNature maintains dedicated sterile fermentation bioreactors. Each formulation is calibrated for tropical shelf-life and soil resilience.
            </p>
            <div className="pt-2">
              <Link href="/infrastructure">
                <button className="text-xs font-semibold uppercase tracking-wider text-[#245B35] hover:text-[#183F26] inline-flex items-center gap-2">
                  <span>Explore Manufacturing & Laboratories</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6 border border-stone-300 p-2 bg-white">
            <img
              src="https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?w=1000&auto=format&fit=crop&q=80"
              alt="BioNature Biotechnology Laboratory"
              className="w-full h-80 object-cover"
            />
            <div className="flex items-center justify-between text-[11px] font-mono text-stone-500 pt-2 px-1">
              <span>FIG. 02 — BATCH SPECTROPHOTOMETRIC ASSAYS</span>
              <span>SALEM FACILITY</span>
            </div>
          </div>
        </div>

        {/* Chronological Timeline */}
        <div className="space-y-8 pt-6">
          <div className="border-b border-stone-200 pb-4">
            <span className="text-[11px] font-mono tracking-widest uppercase text-[#686861] font-semibold block mb-1">
              CHRONOLOGY
            </span>
            <h2 className="text-2xl font-serif font-normal text-stone-900">
              Our Growth & Milestones
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TIMELINE.map((item, idx) => (
              <div
                key={idx}
                className="bg-white border border-stone-200/90 p-6 space-y-3"
              >
                <div className="flex items-center justify-between font-mono text-xs text-stone-400">
                  <span>{item.num}</span>
                  <span className="font-serif text-lg text-[#245B35] font-bold">
                    {item.year}
                  </span>
                </div>
                <h3 className="text-sm font-serif font-normal text-stone-900">
                  {item.title}
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed font-sans">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
