import React from "react";
import { useRoute, Link } from "wouter";
import {
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
} from "lucide-react";
import { PROBLEMS, PRODUCTS } from "@/data/bionature-data";
import { useBioNatureStore } from "@/services/store";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/products/ProductCard";
export const ProblemSolutions = ({ onEnquire }) => {
  const [, params] = useRoute("/solutions/problems/:problem");
  const probParam = params?.problem?.toLowerCase() || "pest-management";
  const { products: storeProducts } = useBioNatureStore();
  const allProducts = Array.isArray(storeProducts) && storeProducts.length > 0 ? storeProducts : PRODUCTS;

  const currentProblem =
    PROBLEMS.find(
      (pr) =>
        pr.slug === probParam ||
        pr.name.toLowerCase().replace(/[^a-z0-9]+/g, "-") === probParam ||
        pr.category.toLowerCase().includes(probParam),
    ) || PROBLEMS[0];
  const matchedProducts = allProducts.filter(
    (p) =>
      (p.targetProblems || []).some(
        (tp) => tp.toLowerCase() === currentProblem.name.toLowerCase(),
      ) || currentProblem.recommendedProducts?.includes(p.slug),
  );
  return (
    <div className="site-container py-8 sm:py-12 space-y-12">
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
        <span>Problems</span>
        <span>/</span>
        <span className="text-slate-900 font-semibold">
          {currentProblem.name}
        </span>
      </div>

      {/* Problem Header Banner */}
      <div className="bg-[#183F26] text-white p-8 sm:p-10 border border-stone-800 space-y-4">
        <span className="text-[10px] font-mono tracking-widest uppercase text-[#E7EBDD] px-2 py-0.5 border border-white/20 bg-white/5 inline-block">
          Pathology Profile &bull; {currentProblem.category}
        </span>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-normal leading-[1.2]">
          {currentProblem.name}
        </h1>
        <p className="text-xs sm:text-sm text-stone-300 leading-relaxed max-w-3xl font-sans">
          {currentProblem.description}
        </p>
      </div>

      {/* Diagnostics Grid: Symptoms, Causes, Management */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Symptoms */}
        <div className="bg-white border border-stone-200/90 p-6 space-y-3">
          <div className="flex items-center gap-2 text-stone-900 font-serif text-sm">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            <span>Field Symptoms Checklist</span>
          </div>
          <ul className="space-y-2 text-xs text-stone-600 font-sans">
            {currentProblem.symptoms.map((sym, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-[#245B35] font-bold">&bull;</span>
                <span>{sym}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Underlying Causes */}
        <div className="bg-white border border-stone-200/90 p-6 space-y-3">
          <div className="flex items-center gap-2 text-stone-900 font-serif text-sm">
            <Lightbulb className="w-4 h-4 text-[#245B35]" />
            <span>Key Underlying Causes</span>
          </div>
          <ul className="space-y-2 text-xs text-stone-600 font-sans">
            {currentProblem.causes.map((cause, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-[#245B35] font-bold">&bull;</span>
                <span>{cause}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Biological Management Protocol */}
        <div className="bg-[#183F26] text-white border border-stone-800 p-6 space-y-3">
          <div className="flex items-center gap-2 text-sm text-[#E7EBDD] font-serif">
            <CheckCircle2 className="w-4 h-4" />
            <span>BioNature Treatment Protocol</span>
          </div>
          <p className="text-xs text-stone-200 leading-relaxed font-sans">
            {currentProblem.management}
          </p>
          <div className="pt-2">
            <Link href="/crop-diagnosis">
              <Button
                size="sm"
                className="w-full bg-white hover:bg-stone-100 text-stone-900 text-xs uppercase tracking-wider font-semibold rounded-none shadow-none py-2.5"
              >
                Upload Photo for Diagnosis
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Recommended Formulations */}
      <div className="space-y-6 pt-6 border-t border-stone-200/90">
        <div>
          <h2 className="text-xl sm:text-2xl font-serif font-normal text-stone-900">
            Targeted Biological Solutions
          </h2>
          <p className="text-xs text-stone-500 font-sans">
            Formulations formulated specifically to resolve{" "}
            {currentProblem.name}.
          </p>
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
