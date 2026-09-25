import React from "react";
import { useRoute, Link } from "wouter";
import { ShieldCheck, FileText, AlertTriangle } from "lucide-react";
export const Legal = () => {
  const [isPrivacy] = useRoute("/privacy");
  const [isTerms] = useRoute("/terms");
  const [isDisclaimer] = useRoute("/disclaimer");
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-10">
      {/* Navigation tabs between legal docs */}
      <div className="flex items-center gap-3 border-b pb-4 text-xs font-semibold">
        <Link
          href="/privacy"
          className={`px-3 py-1.5 rounded-lg transition-colors ${isPrivacy ? "bg-emerald-600 text-white" : "text-slate-600 hover:bg-slate-100"}`}
        >
          Privacy Policy
        </Link>
        <Link
          href="/terms"
          className={`px-3 py-1.5 rounded-lg transition-colors ${isTerms ? "bg-emerald-600 text-white" : "text-slate-600 hover:bg-slate-100"}`}
        >
          Terms & Conditions
        </Link>
        <Link
          href="/disclaimer"
          className={`px-3 py-1.5 rounded-lg transition-colors ${isDisclaimer ? "bg-emerald-600 text-white" : "text-slate-600 hover:bg-slate-100"}`}
        >
          Agricultural Disclaimer
        </Link>
      </div>

      {isDisclaimer && (
        <div className="space-y-6">
          <div className="flex items-center gap-3 text-amber-700">
            <AlertTriangle className="w-8 h-8 text-amber-600" />
            <h1 className="text-2xl sm:text-3xl font-bold font-serif text-slate-900">
              Agricultural Efficacy & Usage Disclaimer
            </h1>
          </div>

          <div className="prose prose-slate max-w-none text-xs sm:text-sm leading-relaxed space-y-4 text-slate-700">
            <p>
              <strong>1. Biological Nature of Formulations:</strong> All
              products manufactured and distributed by BioNature India contain
              live beneficial microbial cultures, cold-extracted botanicals, and
              bio-stimulants. Because agricultural performance is subject to
              unpredictable environmental variables including soil pH, soil
              salinity, microclimatic temperatures, rainfall intensity, water
              quality, and tank-mixing combinations, results may vary across
              regions and crop varieties.
            </p>
            <p>
              <strong>2. Diagnostic Guidance Notice:</strong> Recommendations
              provided via the Farmer Crop Diagnosis Tool, WhatsApp support, or
              telephone helpline are advisory in nature, derived from
              photographs and farmer descriptions. They do not constitute
              on-site physical laboratory tissue analysis. Farmers are advised
              to conduct localized test sprays on a small acreage before
              extensive field application.
            </p>
            <p>
              <strong>3. Chemical Compatibility:</strong> Bio-fertilizers and
              bio-fungicides must not be directly mixed in the spray tank with
              copper bactericides, inorganic sulfur, or systemic chemical
              fungicides. An application gap of at least 4 to 5 days must be
              observed.
            </p>
          </div>
        </div>
      )}

      {isPrivacy && (
        <div className="space-y-6">
          <div className="flex items-center gap-3 text-emerald-700">
            <ShieldCheck className="w-8 h-8 text-emerald-600" />
            <h1 className="text-2xl sm:text-3xl font-bold font-serif text-slate-900">
              Privacy Policy
            </h1>
          </div>

          <div className="prose prose-slate max-w-none text-xs sm:text-sm leading-relaxed space-y-4 text-slate-700">
            <p>
              BioNature India is dedicated to safeguarding farmer and
              distributor personal information. When you submit crop diagnosis
              photographs, telephone numbers, or dealership inquiries, your data
              is securely stored for the sole purpose of delivering agronomy
              advisory support and commercial fulfillment.
            </p>
            <p>
              We do not sell, license, or transmit farmer mobile numbers to
              third-party commercial marketing entities. Technical advisors only
              contact you in direct relation to your filed inquiries or
              dealership applications.
            </p>
          </div>
        </div>
      )}

      {isTerms && (
        <div className="space-y-6">
          <div className="flex items-center gap-3 text-slate-800">
            <FileText className="w-8 h-8 text-slate-600" />
            <h1 className="text-2xl sm:text-3xl font-bold font-serif text-slate-900">
              Terms & Conditions
            </h1>
          </div>

          <div className="prose prose-slate max-w-none text-xs sm:text-sm leading-relaxed space-y-4 text-slate-700">
            <p>
              By accessing the BioNature India website and utilizing its online
              diagnostic tools, you agree to comply with all applicable Indian
              agricultural regulations and commercial guidelines.
            </p>
            <p>
              All trademarks, product names (e.g. Bio-NPK, Neem Shield,
              BloomPro), and formulation specifications are intellectual
              property of BioNature India Pvt Ltd. Unauthorized copying or
              redistribution is strictly prohibited under Indian law.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
