import React, { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
const GALLERY_IMAGES = [
  {
    title: "Farmer Demonstration Meeting in Nashik",
    category: "Farmer Meets",
    url: "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=1000&auto=format&fit=crop&q=80",
    description:
      "Training over 120 progressive vegetable farmers on cold-pressed seaweed bio-stimulant timing.",
  },
  {
    title: "Automated Microbial Fermentation Bioreactors",
    category: "Manufacturing",
    url: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1000&auto=format&fit=crop&q=80",
    description:
      "Stainless-steel computerized fermenters ensuring sterile pure strain culturing.",
  },
  {
    title: "Microbiology Quality Testing Laboratory",
    category: "R&D",
    url: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1000&auto=format&fit=crop&q=80",
    description:
      "Colony count verification and pathogen-free certification of each batch.",
  },
  {
    title: "Healthy Basmati Paddy Crop in Punjab",
    category: "Field Crops",
    url: "https://images.unsplash.com/photo-1536657464919-892534f60d6e?w=1000&auto=format&fit=crop&q=80",
    description:
      "Demonstration plot treated with Zinc Solubilizing Bio-fertilizer showing zero zinc deficiency.",
  },
  {
    title: "Residue-Free Chilli Cluster in Guntur",
    category: "Field Crops",
    url: "https://images.unsplash.com/photo-1588252303782-cb80119abd6d?w=1000&auto=format&fit=crop&q=80",
    description:
      "Export-grade green chillies protected with Neem Shield 10,000 PPM and Trichoderma.",
  },
  {
    title: "Automated Bottle Filling & Packaging Line",
    category: "Manufacturing",
    url: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=1000&auto=format&fit=crop&q=80",
    description: "Leak-proof induction sealing and batch barcode tracking.",
  },
];
export const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const categories = [
    "All",
    "Field Crops",
    "Manufacturing",
    "R&D",
    "Farmer Meets",
  ];
  const filtered = GALLERY_IMAGES.filter(
    (item) => activeCategory === "All" || item.category === activeCategory,
  );
  return (
    <div className="site-container py-8 sm:py-12 space-y-12">
      {/* Header Banner */}
      <div className="bg-[#183F26] text-white p-8 sm:p-10 border border-stone-800 space-y-4 max-w-4xl">
        <span className="text-[10px] font-mono tracking-widest uppercase text-[#E7EBDD] px-2 py-0.5 border border-white/20 bg-white/5 inline-block">
          Visual Field Proof &bull; Documented Verification
        </span>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-normal leading-[1.2]">
          Field Demonstrations &amp; Facilities Gallery
        </h1>
        <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-sans">
          Explore photography from our manufacturing plants, testing
          laboratories, farmer field days, and verified harvest plots across India.
        </p>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap items-center gap-1.5">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`text-xs px-3 py-1 font-mono uppercase tracking-wider transition-colors ${
              activeCategory === cat
                ? "bg-[#245B35] text-white border border-[#245B35]"
                : "bg-stone-50 text-stone-700 hover:bg-stone-100 border border-stone-200"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Images Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filtered.map((img, idx) => (
          <div
            key={idx}
            onClick={() => setSelectedImage(img)}
            className="bg-white border border-stone-200/90 overflow-hidden hover:border-stone-400 transition-colors cursor-pointer group flex flex-col justify-between"
          >
            <div className="aspect-[4/3] bg-stone-100 overflow-hidden relative">
              <img
                src={img.url}
                alt={img.title}
                className="w-full h-full object-cover group-hover:scale-[1.01] transition-transform duration-500"
                loading="lazy"
              />
              <span className="absolute top-3 left-3 bg-stone-900/90 text-stone-200 text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 border border-stone-700">
                {img.category}
              </span>
            </div>
            <div className="p-4 space-y-1">
              <h3 className="font-serif font-normal text-stone-900 text-sm group-hover:text-[#245B35] transition-colors">
                {img.title}
              </h3>
              <p className="text-xs text-stone-500 line-clamp-2 font-sans">
                {img.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Dialog */}
      <Dialog
        open={!!selectedImage}
        onOpenChange={() => setSelectedImage(null)}
      >
        <DialogContent className="max-w-3xl p-0 overflow-hidden border border-stone-800 bg-transparent shadow-2xl rounded-none">
          {selectedImage && (
            <div className="bg-[#121A14] text-stone-100 overflow-hidden">
              <div className="relative aspect-[16/10] bg-black">
                <img
                  src={selectedImage.url}
                  alt={selectedImage.title}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="p-6 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-serif font-normal text-stone-100">
                    {selectedImage.title}
                  </h3>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#E7EBDD] bg-stone-900/80 px-2 py-0.5 border border-stone-700">
                    {selectedImage.category}
                  </span>
                </div>
                <p className="text-xs text-stone-400 font-sans">
                  {selectedImage.description}
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
