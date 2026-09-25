import React from "react";
import { Link } from "wouter";
import {
  Sprout,
  ShieldCheck,
  TrendingUp,
  FlaskConical,
  Award,
  ArrowRight,
  Phone,
  Stethoscope,
  ChevronRight,
  Star,
  CheckCircle2,
} from "lucide-react";
import {
  COMPANY_INFO,
  CATEGORIES,
  PRODUCTS,
  CROPS,
  TESTIMONIALS,
  BLOG_POSTS,
} from "@/data/bionature-data";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/products/ProductCard";
import { SmartProductFinder } from "@/components/solutions/SmartProductFinder";
import { EditorialHero } from "@/components/sections/EditorialHero";
import { useBioNatureStore } from "@/services/store";

export const Home = ({ onEnquire }) => {
  const { products: storeProducts } = useBioNatureStore();
  const allProducts = Array.isArray(storeProducts) && storeProducts.length > 0 ? storeProducts : PRODUCTS;
  const featuredProducts = allProducts.slice(0, 4);

  return (
    <div className="space-y-16 sm:space-y-24 pb-16 bg-[#F7F6F1] text-[#242421]">
      
      {/* 1. EDITORIAL HERO SECTION */}
      <EditorialHero onEnquire={onEnquire} />

      {/* 2. THE BIONATURE MANIFESTO / FOUNDER STATEMENT */}
      <section className="site-container">
        <div className="border-t border-b border-stone-200/80 py-12 sm:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Col 1: Pull-Quote (7 Cols) */}
            <div className="lg:col-span-7 space-y-5">
              <span className="text-[11px] font-mono tracking-[0.16em] uppercase text-[#686861] font-semibold block">
                The Core Philosophy &bull; Soil Regeneration
              </span>
              
              <blockquote className="text-xl sm:text-2xl lg:text-[26px] font-serif text-stone-900 font-normal leading-[1.35]">
                &ldquo;We do not simply formulate biological inputs; we restore the natural biological dialogue between plant roots and living soil microbiomes.&rdquo;
              </blockquote>

              <div className="pt-2 flex items-center gap-3.5">
                <div className="w-9 h-9 rounded-full bg-stone-200/80 border border-stone-300 flex items-center justify-center font-serif text-stone-800 font-semibold text-xs">
                  DH
                </div>
                <div>
                  <div className="text-sm font-semibold text-stone-900 font-serif">
                    {COMPANY_INFO.founder || "Dr. Harikrishnan"}
                  </div>
                  <div className="text-[11px] font-mono text-stone-500 uppercase">
                    Founder &bull; BioNature Agriscience
                  </div>
                </div>
              </div>
            </div>

            {/* Col 2: Technical Narrative (5 Cols) */}
            <div className="lg:col-span-5 space-y-3.5 text-stone-600 text-xs sm:text-[13px] leading-relaxed border-t lg:border-t-0 lg:border-l border-stone-200/80 pt-6 lg:pt-0 lg:pl-10">
              <p>
                Decades of intensive synthetic chemical application have depleted native mycorrhizae, beneficial rhizobacteria, and organic carbon across Indian farmlands.
              </p>
              <p>
                BioNature was established in {COMPANY_INFO.established || "2012"} in Salem, Tamil Nadu, to engineer high-potency microbial fertilizers and botanical crop protectors that cut synthetic costs by up to 30% while elevating marketable crate yields and export grade consistency.
              </p>
              <div className="pt-1">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#245B35] hover:text-[#183F26] transition-colors"
                >
                  <span>Our Research & Manufacturing Infrastructure</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. SCIENTIFIC PILLARS (Clean Numbered Architectural Matrix) */}
      <section className="site-container">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-stone-200/80">
          <div>
            <span className="text-[11px] font-mono tracking-[0.16em] uppercase text-[#686861] font-semibold block mb-1">
              Technical Standards
            </span>
            <h2 className="text-xl sm:text-2xl font-serif font-normal text-stone-900">
              The Six Pillars of BioNature Biologicals
            </h2>
          </div>
          <p className="text-xs font-mono text-stone-500 uppercase tracking-wider">
            Multi-tier FCO laboratory testing &bull; Sterile bioreactor fermentation
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-stone-200/80 border-b border-stone-200/80">
          {[
            {
              num: "01",
              title: "Highest Microbial CFU Viability",
              description:
                "Guaranteed viable colony forming unit density (>1x10⁸ CFU/ml) with 24-month stability formulated to survive extreme Indian soil temperatures.",
            },
            {
              num: "02",
              title: "100% Residue-Free Harvests",
              description:
                "Zero toxic synthetic pesticide molecules or heavy metal contaminants. Non-hazardous to honeybees, ladybirds, and natural soil earthworms.",
            },
            {
              num: "03",
              title: "Documented Yield & Quality Gain",
              description:
                "Field-verified crop results lowering chemical input expenses by 25-30% while elevating marketable crate yields by 15-28%.",
            },
            {
              num: "04",
              title: "In-House Sterile Fermentation & R&D",
              description:
                "Precision bioreactor facility with spectrophotometric purity assays and strict batch-wise FCO compliance before release.",
            },
            {
              num: "05",
              title: "Scientific Agronomic Guidance",
              description:
                "Direct access to certified agronomists providing customized biological spray calendars and phenological nutrition schedules.",
            },
            {
              num: "06",
              title: "Government & NPOP Accreditation",
              description:
                "Certified under ISO 9001:2015, NPOP Organic standards, and fully compliant with the Fertilizer Control Order (FCO).",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="p-6 sm:p-8 space-y-3 hover:bg-stone-50/70 transition-colors group"
            >
              <span className="text-xs font-mono tracking-wider text-emerald-800 font-semibold block">
                {item.num}
              </span>
              <h3 className="text-base font-serif text-stone-900 font-normal leading-snug group-hover:text-emerald-900 transition-colors">
                {item.title}
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed font-sans">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. CURATED PRODUCT FORMULATIONS */}
      <section className="site-container">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 pb-6 mb-8 border-b border-stone-200/80">
          <div>
            <span className="text-[11px] font-mono tracking-[0.16em] uppercase text-emerald-800 font-semibold block mb-1">
              Formulation Catalog
            </span>
            <h2 className="text-xl sm:text-2xl font-serif font-normal text-stone-900">
              Featured BioNature Formulations
            </h2>
          </div>
          <Link
            href="/products"
            className="text-xs font-semibold uppercase tracking-wider text-emerald-900 hover:text-emerald-700 flex items-center gap-1.5 transition-colors"
          >
            <span>View All Products</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} onEnquire={onEnquire} />
          ))}
        </div>
      </section>

      {/* 5. SMART SOLUTION FINDER (WIZARD) */}
      <section className="site-container">
        <div className="border border-stone-200/90 bg-white p-6 sm:p-8 shadow-sm">
          <SmartProductFinder onEnquire={onEnquire} />
        </div>
      </section>

      {/* 6. SOLUTIONS BY CROP PHENOLOGY */}
      <section className="site-container">
        <div className="bg-[#F2F4EB] border border-stone-200/90 p-7 sm:p-12">
          <div className="max-w-2xl mb-8 space-y-1.5">
            <span className="text-[11px] font-mono tracking-[0.16em] uppercase text-emerald-800 font-semibold block">
              Phenological Management
            </span>
            <h2 className="text-xl sm:text-2xl font-serif font-normal text-stone-900">
              Solutions for India’s Major Crops
            </h2>
            <p className="text-xs text-stone-600 leading-relaxed font-sans">
              Stage-by-stage biological nutrition schedules and non-chemical pest prevention programs tailored to commercial crop varieties.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {CROPS.slice(0, 5).map((crop) => (
              <Link
                key={crop.id}
                href={`/solutions/crops/${crop.slug}`}
                className="bg-white border border-stone-200/80 hover:border-stone-500 transition-colors p-3 group flex flex-col justify-between"
              >
                <div className="aspect-[4/3] bg-stone-100 overflow-hidden mb-2.5">
                  <img
                    src={crop.image}
                    alt={crop.name}
                    className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="space-y-1">
                  <h3 className="font-serif text-stone-900 text-sm font-normal group-hover:text-emerald-900 transition-colors">
                    {crop.name}
                  </h3>
                  <span className="text-[10px] font-mono text-emerald-800 block uppercase">
                    Protocol &rarr;
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="pt-6 text-left">
            <Link href="/solutions">
              <Button
                variant="outline"
                className="text-stone-900 border-stone-400 hover:border-stone-800 hover:bg-white text-xs uppercase tracking-wider font-semibold rounded-none"
              >
                Explore Complete Solutions Index
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 7. EXPERT AGRONOMIC DIAGNOSIS DISPATCH */}
      <section className="site-container">
        <div className="bg-[#183F26] text-white p-7 sm:p-12 border border-stone-800">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center justify-between">
            
            <div className="lg:col-span-8 space-y-3.5">
              <div className="inline-flex items-center gap-1.5 text-[10px] font-mono tracking-wider uppercase text-[#E7EBDD] px-2.5 py-0.5 bg-white/10 border border-white/20">
                <Stethoscope className="w-3.5 h-3.5" />
                <span>Crop Clinic &bull; Rapid Agronomic Diagnosis</span>
              </div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-serif font-normal text-white leading-tight">
                Facing Crop Leaf Curl, Root Rot, or Pest Infestation?
              </h2>
              <p className="text-xs sm:text-sm text-stone-300 max-w-xl leading-relaxed font-sans">
                Upload clear photographs of damaged leaves, stems, or soil. Our senior agronomists analyze the pathology and dispatch a tailored organic spray and dosage calendar.
              </p>
              <div className="flex flex-wrap gap-3 pt-1">
                <Link href="/crop-diagnosis">
                  <Button className="bg-white hover:bg-stone-100 text-stone-900 text-xs uppercase tracking-wider font-semibold px-5 py-4 rounded-none shadow-none">
                    Submit Photo for Diagnosis
                  </Button>
                </Link>
                <Link href="/farmer-help">
                  <button className="text-xs uppercase tracking-wider font-semibold text-white hover:text-[#E7EBDD] px-4 py-2.5 border border-white/40 hover:border-white transition-colors cursor-pointer">
                    Farmer Help Center
                  </button>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-4 border-t lg:border-t-0 lg:border-l border-white/20 pt-6 lg:pt-0 lg:pl-8 space-y-2">
              <span className="block text-[10px] font-mono tracking-wider uppercase text-stone-300">
                Direct Agronomist Helpline
              </span>
              <div className="text-xl sm:text-2xl font-serif text-white font-normal">
                {COMPANY_INFO.phone}
              </div>
              <p className="text-xs text-stone-300 font-sans">
                Monday &ndash; Saturday &bull; 9:30 AM &ndash; 6:30 PM (IST)
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 8. FIELD EXPERIENCES & JOURNAL DISPATCHES (Rendered when verified records exist) */}
      {TESTIMONIALS && TESTIMONIALS.length > 0 && (
        <section className="site-container">
          <div className="pb-6 mb-8 border-b border-stone-200/80 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-[11px] font-mono tracking-[0.16em] uppercase text-[#686861] font-semibold block mb-1">
                Field Verification &bull; Documented Trials
              </span>
              <h2 className="text-xl sm:text-2xl font-serif font-normal text-stone-900">
                Verified Grower Experiences
              </h2>
            </div>
            <span className="text-xs font-mono text-stone-500 uppercase tracking-wider">
              Documented Observations &bull; Commercial Farms
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.id}
                className="bg-white border border-stone-200/90 p-5 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono border-b border-stone-100 pb-2.5">
                    <span className="text-[#245B35] font-semibold uppercase text-[11px]">
                      {t.yieldIncrease || "Verified Grower Report"}
                    </span>
                  </div>

                  <blockquote className="text-xs text-stone-700 leading-relaxed font-sans italic">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                </div>

                <div className="pt-3 border-t border-stone-100 flex items-center gap-2.5">
                  <img
                    src={t.avatar}
                    alt={t.farmerName}
                    className="w-9 h-9 object-cover border border-stone-200"
                  />
                  <div>
                    <div className="text-xs font-semibold text-stone-900 font-serif">
                      {t.farmerName}
                    </div>
                    <div className="text-[10px] font-mono text-stone-500 uppercase">
                      {t.location}, {t.state} &bull; {t.crop}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 9. DISTRIBUTOR / COMMERCIAL PARTNERSHIP (INSTITUTIONAL STRIP) */}
      <section className="site-container">
        <div className="bg-stone-900 text-stone-100 p-7 sm:p-10 border border-stone-800">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center justify-between">
            <div className="lg:col-span-8 space-y-2.5">
              <span className="text-[10px] font-mono tracking-wider uppercase text-[#E7EBDD] font-semibold block">
                Commercial Dealership &bull; Agri-Input Network
              </span>
              <h2 className="text-xl sm:text-2xl font-serif font-normal text-white">
                Partner with BioNature as an Authorized Distributor
              </h2>
              <p className="text-xs sm:text-sm text-stone-400 max-w-xl leading-relaxed font-sans">
                Expand your agronomic retail portfolio with certified biological formulations. We support dealers with marketing demonstration plots, technical agronomy training, and farmer workshops.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-2.5">
              <Link href="/distributor">
                <Button className="w-full bg-[#245B35] hover:bg-[#183F26] text-white text-xs uppercase tracking-wider font-semibold py-4 rounded-none shadow-none transition-colors">
                  Apply for Dealership
                </Button>
              </Link>
              <Link href="/contact">
                <button className="w-full text-center text-xs uppercase tracking-wider font-semibold text-stone-300 hover:text-white py-2.5 border border-stone-700 hover:border-stone-500 transition-colors cursor-pointer">
                  Contact Commercial Head
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
