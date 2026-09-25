import React, { useState } from "react";
import { Download, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
const DOWNLOADABLE_RESOURCES = [
  {
    title: "Bio-NPK Liquid Consortia Technical Dossier",
    category: "Technical Sheet",
    size: "1.4 MB",
    description:
      "Detailed microbial counts, symbiotic mechanisms, Indian field trial results, and FCO regulatory standards.",
  },
  {
    title: "BioNature Complete Product Catalog (2026 Edition)",
    category: "Product Brochure",
    size: "4.8 MB",
    description:
      "Comprehensive 32-page full-color guide covering all biofertilizers, biopesticides, and seaweed extracts.",
  },
  {
    title: "Solanaceous Crop Spray Schedule (Tomato & Chilli)",
    category: "Crop Guide",
    size: "2.1 MB",
    description:
      "Stage-by-stage calendar detailing nursery, vegetative, flowering, and harvesting spray concentrations.",
  },
  {
    title: "Cotton Integrated Pest Management (IPM) Manual",
    category: "Application Guide",
    size: "1.8 MB",
    description:
      "Step-by-step biological protocol to manage whiteflies, thrips, and bollworms with zero chemical residue.",
  },
  {
    title: "Basmati Paddy Yield Enhancement Protocol",
    category: "Crop Guide",
    size: "1.6 MB",
    description:
      "Application instructions for Zinc Solubilizing Bio-Fertilizer and biological silicon foliar activators.",
  },
  {
    title: "FCO Regulatory Compliance & Quality Assay Dossier",
    category: "Regulatory",
    size: "890 KB",
    description:
      "Statutory laboratory assay parameters verifying biological input standards, absence of heavy metals, and statutory adherence under Fertilizer Control Order guidelines.",
  },
];
export const Resources = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCat, setSelectedCat] = useState("All");
  const categories = [
    "All",
    "Product Brochure",
    "Technical Sheet",
    "Crop Guide",
    "Application Guide",
    "Regulatory",
  ];
  const filtered = DOWNLOADABLE_RESOURCES.filter((res) => {
    const matchCat = selectedCat === "All" || res.category === selectedCat;
    const matchSearch =
      !searchQuery.trim() ||
      res.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });
  const handleDownload = (title) => {
    toast.success(`Downloading ${title}... (Sample document)`);
  };
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      {/* Header Banner */}
      <div className="bg-[#183F26] text-white p-8 sm:p-10 border border-stone-800 space-y-4 max-w-4xl">
        <span className="text-[10px] font-mono tracking-widest uppercase text-[#E7EBDD] px-2 py-0.5 border border-white/20 bg-white/5 inline-block">
          Downloads &bull; Technical Documentation
        </span>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-normal leading-[1.2]">
          Agricultural Guides, Brochures &amp; Schedules
        </h1>
        <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-sans">
          Access high-resolution product brochures, stage-wise spray charts, lab
          test reports, and organic compliance certificates freely downloadable
          for farmers and distributors.
        </p>
      </div>

      {/* Filter and Search */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white p-4 border border-stone-200/90">
        <div className="flex flex-wrap items-center gap-1.5">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setSelectedCat(c)}
              className={`text-xs px-3 py-1 font-mono uppercase tracking-wider transition-colors ${selectedCat === c ? "bg-[#245B35] text-white border border-[#245B35]" : "bg-stone-50 text-stone-700 hover:bg-stone-100 border border-stone-200"}`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-72">
          <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search guides, crop names..."
            className="pl-9 text-xs h-9 rounded-none border-stone-300 focus-visible:ring-0 focus-visible:border-stone-600"
          />
        </div>
      </div>

      {/* Resources Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((item, idx) => (
          <div
            key={idx}
            className="bg-white border border-stone-200/90 p-6 space-y-4 hover:border-stone-400 transition-colors flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono tracking-wider uppercase text-[#245B35] bg-[#F1F3EC] px-2 py-0.5 border border-[#E7EBDD]">
                  {item.category}
                </span>
                <span className="text-[10px] text-stone-400 font-mono">
                  {item.size}
                </span>
              </div>

              <h3 className="font-serif font-normal text-stone-900 text-base leading-snug">
                {item.title}
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed font-sans">
                {item.description}
              </p>
            </div>

            <div className="pt-3 border-t border-stone-100">
              <Button
                onClick={() => handleDownload(item.title)}
                size="sm"
                className="w-full bg-[#245B35] hover:bg-[#183F26] text-white text-xs uppercase tracking-wider font-semibold rounded-none shadow-none py-2.5 gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download PDF Document</span>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
