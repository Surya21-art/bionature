import React, { useState } from "react";
import { Link } from "wouter";
import { Sprout, ShieldAlert, ArrowRight } from "lucide-react";
import { CROPS, PROBLEMS } from "@/data/bionature-data";
import { SmartProductFinder } from "@/components/solutions/SmartProductFinder";
import { Button } from "@/components/ui/button";
export const Solutions = () => {
  const [activeTab, setActiveTab] = useState("crops");
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      {/* Header Banner */}
      <div className="bg-[#183F26] text-white p-8 sm:p-12 border border-stone-800 space-y-3">
        <span className="inline-block text-[11px] font-mono tracking-[0.2em] uppercase text-[#E7EBDD] px-3 py-1 bg-white/10 border border-white/20">
          INTEGRATED AGRONOMIC PROTOCOLS
        </span>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-normal text-white leading-[1.2]">
          Biological Crop Nutrition & Disease Protection Programs
        </h1>
        <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-sans max-w-2xl">
          Sustainable agricultural yields start with biological precision. Explore stage-by-stage crop management calendars or search targeted treatments for fungal wilts, pests, and nutrient deficits.
        </p>
      </div>

      {/* Embedded Smart Finder */}
      <SmartProductFinder />

      {/* Solutions Navigation Tabs */}
      <div className="space-y-8" id="solutions-browser">
        <div className="flex items-center justify-center">
          <div className="inline-flex border border-stone-300 bg-white p-1">
            <button
              onClick={() => setActiveTab("crops")}
              className={`flex items-center gap-2 px-5 py-2 text-xs font-mono uppercase tracking-wider transition-colors ${
                activeTab === "crops"
                  ? "bg-[#245B35] text-white font-semibold"
                  : "text-stone-600 hover:text-stone-900"
              }`}
            >
              <Sprout className="w-3.5 h-3.5" />
              <span>Solutions by Crop</span>
            </button>

            <button
              onClick={() => setActiveTab("problems")}
              className={`flex items-center gap-2 px-5 py-2 text-xs font-mono uppercase tracking-wider transition-colors ${
                activeTab === "problems"
                  ? "bg-[#245B35] text-white font-semibold"
                  : "text-stone-600 hover:text-stone-900"
              }`}
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Solutions by Pathology</span>
            </button>
          </div>
        </div>

        {/* 1. SOLUTIONS BY CROP */}
        {activeTab === "crops" && (
          <div className="space-y-6">
            <div className="text-center max-w-xl mx-auto space-y-1">
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#686861] font-semibold block">
                PHENOLOGICAL INDEX
              </span>
              <h2 className="text-xl font-serif font-normal text-stone-900">
                Stage-Wise Biological Calendars
              </h2>
              <p className="text-xs text-stone-500 font-sans">
                Nutrition and protection schedules covering seed treatment, vegetative growth, flowering, and harvest.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {CROPS.map((crop) => (
                <div
                  key={crop.id}
                  className="bg-white rounded-none border border-stone-200/90 overflow-hidden shadow-none flex flex-col justify-between group"
                >
                  <div>
                    <div className="aspect-[16/9] bg-stone-100 overflow-hidden relative">
                      <img
                        src={crop.image}
                        alt={crop.name}
                        className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                        loading="lazy"
                      />
                      <span className="absolute bottom-2 right-2 bg-stone-900 text-stone-200 text-[10px] font-mono px-2 py-0.5">
                        {crop.scientificName}
                      </span>
                    </div>

                    <div className="p-5 space-y-3">
                      <h3 className="font-serif text-stone-900 text-base font-normal group-hover:text-[#245B35] transition-colors">
                        {crop.name} Protocol
                      </h3>
                      <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed font-sans">
                        {crop.description}
                      </p>

                      <div className="space-y-1 pt-1">
                        <span className="text-[10px] font-mono text-stone-400 uppercase tracking-wider block">
                          Addressed Pathology:
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {crop.commonProblems.map((prob) => (
                            <span
                              key={prob}
                              className="text-[11px] bg-stone-50 text-stone-700 px-2 py-0.5 border border-stone-200 font-mono"
                            >
                              {prob}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-5 pt-0">
                    <Link href={`/solutions/crops/${crop.slug}`}>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full text-xs uppercase tracking-wider font-semibold text-stone-800 hover:text-[#245B35] border-stone-300 rounded-none shadow-none"
                      >
                        <span>View {crop.name} Program</span>
                        <ArrowRight className="w-3 h-3 ml-1" />
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 2. SOLUTIONS BY PROBLEM */}
        {activeTab === "problems" && (
          <div className="space-y-6">
            <div className="text-center max-w-xl mx-auto space-y-1">
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#686861] font-semibold block">
                PATHOLOGY INDEX
              </span>
              <h2 className="text-xl font-serif font-normal text-stone-900">
                Targeted Biological Treatments
              </h2>
              <p className="text-xs text-stone-500 font-sans">
                Identify fungal, bacterial, insect, and nutritional disorders with proven botanical and microbial remedies.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {PROBLEMS.map((problem) => (
                <div
                  key={problem.id}
                  className="bg-white rounded-none border border-stone-200/90 p-6 flex flex-col justify-between space-y-4 shadow-none group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#245B35] font-semibold border border-[#E7EBDD] px-2 py-0.5 bg-[#F1F3EC]">
                        {problem.category}
                      </span>
                    </div>

                    <h3 className="font-serif text-stone-900 text-base font-normal group-hover:text-[#245B35] transition-colors">
                      {problem.name}
                    </h3>

                    <p className="text-xs text-stone-600 leading-relaxed font-sans line-clamp-2">
                      {problem.description}
                    </p>

                    <div className="bg-stone-50 p-3 border border-stone-200/80 space-y-1">
                      <span className="text-[10px] font-mono text-stone-400 uppercase tracking-wider block">
                        Visible Symptoms:
                      </span>
                      <ul className="text-xs text-stone-700 space-y-1 font-sans">
                        {problem.symptoms.slice(0, 2).map((sym, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-1.5 line-clamp-1"
                          >
                            <span className="text-[#245B35] font-bold">&bull;</span>
                            <span>{sym}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <Link href={`/solutions/problems/${problem.slug}`}>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full text-xs uppercase tracking-wider font-semibold text-stone-800 hover:text-[#245B35] border-stone-300 rounded-none shadow-none"
                    >
                      <span>Treatment Dossier</span>
                      <ArrowRight className="w-3 h-3 ml-1" />
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
