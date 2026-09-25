import React, { useState } from "react";
import { Link } from "wouter";
import {
  ShieldAlert,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
} from "lucide-react";
import { CROPS, PROBLEMS, PRODUCTS } from "@/data/bionature-data";
import { useBioNatureStore } from "@/services/store";
import { Button } from "@/components/ui/button";

export const SmartProductFinder = ({ onEnquire }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedCrop, setSelectedCrop] = useState("");
  const [selectedProblem, setSelectedProblem] = useState("");
  const { products: storeProducts } = useBioNatureStore();
  const allProducts = Array.isArray(storeProducts) && storeProducts.length > 0 ? storeProducts : PRODUCTS;

  const handleSelectCrop = (cropName) => {
    setSelectedCrop(cropName);
    setCurrentStep(2);
  };

  const handleSelectProblem = (problemCategory) => {
    setSelectedProblem(problemCategory);
    setCurrentStep(3);
  };

  const handleReset = () => {
    setSelectedCrop("");
    setSelectedProblem("");
    setCurrentStep(1);
  };

  // Match products based on selected crop and problem
  const recommendedProducts = allProducts.filter((p) => {
    const crops = p.suitableCrops || p.crops || [];
    const problems = p.targetProblems || [];
    const cropMatch = !selectedCrop || crops.some((c) => c.toLowerCase() === selectedCrop.toLowerCase());
    const problemMatch = !selectedProblem || problems.some((pr) => pr.toLowerCase() === selectedProblem.toLowerCase());
    return cropMatch && problemMatch;
  });

  // Fallback if no exact intersection found
  const finalProducts =
    recommendedProducts.length > 0
      ? recommendedProducts
      : allProducts.filter((p) => {
          const crops = p.suitableCrops || p.crops || [];
          const problems = p.targetProblems || [];
          return (
            problems.some((pr) => pr.toLowerCase() === selectedProblem.toLowerCase()) ||
            crops.some((c) => c.toLowerCase() === selectedCrop.toLowerCase())
          );
        }).slice(0, 3);

  return (
    <div className="bg-[#183F26] text-white p-7 sm:p-12 border border-stone-800 space-y-8">
      {/* Header Section */}
      <div className="max-w-2xl space-y-3">
        <span className="text-[11px] font-mono tracking-[0.16em] uppercase text-[#E7EBDD] font-semibold block">
          Agronomic Matching Protocol &bull; Step {currentStep} of 3
        </span>
        <h2 className="text-xl sm:text-2xl lg:text-[26px] font-serif font-normal text-white">
          Formulation Selector by Crop & Field Pathology
        </h2>
        <p className="text-xs text-stone-300 leading-relaxed font-sans">
          Select your crop type and visible symptom profile. Our agronomic engine identifies verified biological inputs, CFU concentrations, and spray regimens.
        </p>

        {/* Architectural Step Sequence */}
        <div className="flex flex-wrap items-center gap-2 pt-2 text-[11px] font-mono uppercase tracking-wider">
          <button
            onClick={() => setCurrentStep(1)}
            className={`px-3 py-1.5 border transition-colors ${
              currentStep === 1
                ? "bg-white text-stone-900 border-white font-semibold"
                : selectedCrop
                  ? "bg-white/10 text-[#E7EBDD] border-white/20"
                  : "bg-transparent text-stone-400 border-white/10"
            }`}
          >
            01 / Crop: {selectedCrop || "Select"}
          </button>

          <span className="text-stone-500">&rarr;</span>

          <button
            onClick={() => (selectedCrop ? setCurrentStep(2) : null)}
            disabled={!selectedCrop}
            className={`px-3 py-1.5 border transition-colors ${
              currentStep === 2
                ? "bg-white text-stone-900 border-white font-semibold"
                : selectedProblem
                  ? "bg-white/10 text-[#E7EBDD] border-white/20"
                  : "bg-transparent text-stone-400 border-white/10"
            }`}
          >
            02 / Issue: {selectedProblem || "Select"}
          </button>

          <span className="text-stone-500">&rarr;</span>

          <span
            className={`px-3 py-1.5 border ${
              currentStep === 3
                ? "bg-white text-stone-900 border-white font-semibold"
                : "bg-transparent text-stone-400 border-white/10"
            }`}
          >
            03 / Protocol
          </span>

          {(selectedCrop || selectedProblem) && (
            <button
              onClick={handleReset}
              className="ml-auto text-xs font-mono uppercase text-emerald-300 hover:text-white flex items-center gap-1 transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* Step 1: Crop Selection */}
      {currentStep === 1 && (
        <div className="space-y-4 pt-2 border-t border-white/15">
          <div className="text-xs font-mono uppercase tracking-wider text-stone-300">
            Select Commercial Crop
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {CROPS.map((crop) => (
              <button
                key={crop.id}
                onClick={() => handleSelectCrop(crop.name)}
                className="bg-white/5 hover:bg-white/10 border border-white/15 hover:border-white/40 p-3 text-left transition-colors group flex flex-col justify-between"
              >
                <div className="aspect-[4/3] bg-stone-900 overflow-hidden mb-2.5">
                  <img
                    src={crop.image}
                    alt={crop.name}
                    className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                  />
                </div>
                <div className="space-y-0.5">
                  <span className="text-xs font-serif font-normal text-white group-hover:text-emerald-300 transition-colors block">
                    {crop.name}
                  </span>
                  <span className="text-[10px] font-mono text-stone-400 block uppercase">
                    Select &rarr;
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 2: Problem Selection */}
      {currentStep === 2 && (
        <div className="space-y-4 pt-2 border-t border-white/15">
          <div className="flex items-center justify-between text-xs font-mono uppercase tracking-wider text-stone-300">
            <span>Observed Symptom in {selectedCrop}</span>
            <button
              onClick={() => setCurrentStep(1)}
              className="text-emerald-300 hover:text-white underline text-[11px]"
            >
              Change Crop
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {PROBLEMS.map((problem) => (
              <button
                key={problem.id}
                onClick={() => handleSelectProblem(problem.category)}
                className="p-4 bg-white/5 hover:bg-white/10 border border-white/15 hover:border-white/40 text-left transition-colors group"
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <ShieldAlert className="w-3.5 h-3.5 text-emerald-300 shrink-0" />
                  <span className="text-xs font-serif text-white group-hover:text-emerald-200">
                    {problem.name}
                  </span>
                </div>
                <p className="text-[11px] text-stone-300 line-clamp-2 leading-relaxed font-sans">
                  {problem.description}
                </p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 3: Recommendations Display */}
      {currentStep === 3 && (
        <div className="space-y-6 pt-2 border-t border-white/15">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-white/5 border border-white/15 p-4 text-xs font-mono">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <div>
                <span className="text-stone-400">TARGET: </span>
                <span className="text-white font-semibold">
                  {selectedCrop} &bull; {selectedProblem}
                </span>
              </div>
            </div>
            <button
              onClick={handleReset}
              className="text-xs uppercase tracking-wider text-emerald-300 hover:text-white flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Modify Selection</span>
            </button>
          </div>

          {/* Recommended Product Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {finalProducts.map((p) => (
              <div
                key={p.id}
                className="bg-white text-stone-900 border border-stone-200 p-5 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between gap-2 border-b border-stone-100 pb-2">
                    <span className="text-[10px] font-mono tracking-wider text-emerald-800 uppercase font-semibold">
                      {p.category}
                    </span>
                    <span className="text-[10px] font-mono text-stone-500 uppercase">
                      FCO Compliant
                    </span>
                  </div>

                  <h3 className="font-serif text-stone-900 text-base font-normal leading-snug">
                    {p.name}
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed font-sans line-clamp-2">
                    {p.shortDescription}
                  </p>

                  <div className="bg-stone-50 p-3 border border-stone-200/80 space-y-1 text-xs font-mono">
                    <div className="text-[10px] text-stone-500 uppercase tracking-wider">
                      Verified Field Dosage:
                    </div>
                    <div className="text-stone-900 font-semibold">{p.dosage}</div>
                    <div className="text-[11px] text-stone-500">
                      Method: {p.applicationMethod}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2 border-t border-stone-100">
                  <Link href={`/product/${p.slug}`} className="flex-1">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full text-xs uppercase tracking-wider font-semibold border-stone-300 text-stone-800 hover:bg-stone-50 rounded-none shadow-none"
                    >
                      <span>Technical Dossier</span>
                      <ArrowRight className="w-3 h-3 ml-1" />
                    </Button>
                  </Link>
                  {onEnquire && (
                    <Button
                      size="sm"
                      onClick={() => onEnquire(p)}
                      className="bg-[#245B35] hover:bg-[#183F26] text-white text-xs uppercase tracking-wider font-semibold rounded-none shadow-none cursor-pointer"
                    >
                      Enquire
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Scientific Disclaimer */}
          <div className="flex items-start gap-2.5 bg-white/5 border border-white/15 p-4 text-xs text-stone-300">
            <AlertCircle className="w-4 h-4 text-[#E7EBDD] shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong>Agronomist Note:</strong> Formulations are recommended based on input symptoms. Regional water pH, soil EC, and infestation pressure can alter application frequency. For severe fungal wilts, connect with our agronomists or upload photos to the{" "}
              <Link
                href="/crop-diagnosis"
                className="underline text-[#E7EBDD] hover:text-white"
              >
                Crop Photo Diagnosis Desk
              </Link>
              .
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
