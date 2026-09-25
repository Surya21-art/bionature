import React from "react";
import { useRoute, Link } from "wouter";
import { Sprout, ArrowLeft, Calendar, CheckCircle2 } from "lucide-react";
import { CROPS, PRODUCTS } from "@/data/bionature-data";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/products/ProductCard";
export const CropSolutions = ({ onEnquire }) => {
  const [, params] = useRoute("/solutions/crops/:crop");
  const cropParam = params?.crop?.toLowerCase() || "tomato";
  const currentCrop =
    CROPS.find(
      (c) => c.slug === cropParam || c.name.toLowerCase() === cropParam,
    ) || CROPS[0];
  const matchedProducts = PRODUCTS.filter((p) =>
    p.suitableCrops.includes(currentCrop.name),
  );
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-slate-500">
        <Link
          href="/solutions"
          className="hover:text-emerald-700 flex items-center gap-1 font-medium"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Solutions</span>
        </Link>
        <span>/</span>
        <span>Crops</span>
        <span>/</span>
        <span className="text-slate-900 font-semibold">{currentCrop.name}</span>
      </div>

      {/* Crop Hero Card */}
      <div className="bg-[#183F26] text-white overflow-hidden grid grid-cols-1 lg:grid-cols-12 border border-stone-800">
        <div className="lg:col-span-7 p-8 sm:p-10 space-y-4 flex flex-col justify-center">
          <div className="inline-flex items-center gap-2 border border-white/20 bg-white/5 px-2.5 py-0.5 text-[10px] font-mono uppercase tracking-wider text-[#E7EBDD] w-fit">
            <Sprout className="w-3.5 h-3.5" />
            <span>Botanical Name: {currentCrop.scientificName}</span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-normal leading-[1.2]">
            {currentCrop.name} Management Program
          </h1>

          <p className="text-xs sm:text-sm text-stone-300 leading-relaxed max-w-xl font-sans">
            {currentCrop.description}
          </p>

          <div className="pt-2 flex flex-wrap gap-1.5 text-xs">
            <span className="font-mono text-[10px] uppercase tracking-wider text-stone-400 self-center mr-1">
              Frequent Challenges:
            </span>
            {currentCrop.commonProblems.map((prob) => (
              <span
                key={prob}
                className="bg-black/30 text-stone-200 font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 border border-stone-700"
              >
                {prob}
              </span>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5 aspect-[4/3] lg:aspect-auto bg-stone-900">
          <img
            src={currentCrop.image}
            alt={currentCrop.name}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Stage-by-Stage Phenological Management Schedule */}
      {currentCrop.stages && currentCrop.stages.length > 0 && (
        <div className="space-y-6">
          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl font-serif font-normal text-stone-900 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-[#245B35]" />
              Stage-by-Stage Biological Schedule for {currentCrop.name}
            </h2>
            <p className="text-xs text-stone-500 font-sans">
              Apply biological fertilizers and bio-pesticides aligned with
              critical vegetative and reproductive phases.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {currentCrop.stages.map((stg, idx) => (
              <div
                key={idx}
                className="bg-white border border-stone-200/90 p-6 space-y-4 hover:border-stone-400 transition-colors"
              >
                <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-[#245B35]">
                      Stage {idx + 1} &bull; {stg.days}
                    </span>
                    <h3 className="text-base font-serif font-normal text-stone-900">
                      {stg.stage}
                    </h3>
                  </div>
                  <CheckCircle2 className="w-4 h-4 text-[#245B35] shrink-0" />
                </div>

                <p className="text-xs text-stone-600 leading-relaxed font-sans">
                  {stg.description}
                </p>

                <div className="bg-[#F1F3EC] p-3.5 border border-[#E7EBDD] space-y-1">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-stone-800 font-semibold block">
                    Recommended Agronomy Action:
                  </span>
                  <p className="text-xs text-stone-700 leading-relaxed font-sans">
                    {stg.management}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recommended Products for This Crop */}
      <div className="space-y-6 pt-4 border-t border-stone-200/90">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-2">
          <div>
            <h2 className="text-xl sm:text-2xl font-serif font-normal text-stone-900">
              BioNature Formulations for {currentCrop.name}
            </h2>
            <p className="text-xs text-stone-500 font-sans">
              Field-tested microbial inoculants and biological crop protectors
              tailored for {currentCrop.name}.
            </p>
          </div>
          <Link href="/products">
            <Button
              variant="outline"
              size="sm"
              className="text-xs font-mono uppercase tracking-wider text-stone-800 border-stone-300 rounded-none hover:bg-stone-50"
            >
              View All Products &rarr;
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {matchedProducts.map((p) => (
            <ProductCard key={p.id} product={p} onEnquire={onEnquire} />
          ))}
        </div>
      </div>
    </div>
  );
};
