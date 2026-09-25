import React from "react";
import { Play } from "lucide-react";
const VIDEOS = [
  {
    title: "How to Apply Bio-NPK Liquid Consortia Through Drip Irrigation",
    category: "Application Guide",
    duration: "4:30",
    embedId: "dQw4w9WgXcQ", // demo video placeholder
    thumbnail:
      "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=800&auto=format&fit=crop&q=80",
    description:
      "Step-by-step procedure for mixing, venturi filter calibration, and optimal morning application timing.",
  },
  {
    title: "Trichoderma Viride Seed & Nursery Bed Treatment Protocol",
    category: "Biological Protection",
    duration: "5:15",
    embedId: "dQw4w9WgXcQ",
    thumbnail:
      "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=800&auto=format&fit=crop&q=80",
    description:
      "Preventing damping-off and collar rot before transplanting vegetables into the main field.",
  },
  {
    title: "Managing Chilli Black Thrips with Neem Shield 10,000 PPM",
    category: "Pest Management",
    duration: "6:20",
    embedId: "dQw4w9WgXcQ",
    thumbnail:
      "https://images.unsplash.com/photo-1588252303782-cb80119abd6d?w=800&auto=format&fit=crop&q=80",
    description:
      "Demonstration of spray nozzle angle and leaf underside coverage in Andhra Pradesh fields.",
  },
  {
    title: "Farmer Interview: 28% Tomato Yield Boost in Maharashtra",
    category: "Farmer Stories",
    duration: "7:40",
    embedId: "dQw4w9WgXcQ",
    thumbnail:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=80",
    description:
      "Rameshwar Patil shares his experience overcoming blossom drop and chemical spray reductions.",
  },
];
export const Videos = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      {/* Header Banner */}
      <div className="bg-[#183F26] text-white p-8 sm:p-10 border border-stone-800 space-y-4 max-w-4xl">
        <span className="text-[10px] font-mono tracking-widest uppercase text-[#E7EBDD] px-2 py-0.5 border border-white/20 bg-white/5 inline-block">
          Video Demonstrations &bull; Field Operations
        </span>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-normal leading-[1.2]">
          Agronomy Video Library
        </h1>
        <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-sans">
          Watch instructional guides on bio-fertilizer mixing, sprayer
          calibration, disease diagnosis, and farmer field testimonials.
        </p>
      </div>

      {/* Videos Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {VIDEOS.map((vid, idx) => (
          <div
            key={idx}
            className="bg-white border border-stone-200/90 overflow-hidden hover:border-stone-400 transition-colors flex flex-col justify-between group"
          >
            <div className="aspect-video bg-stone-900 relative overflow-hidden">
              <img
                src={vid.thumbnail}
                alt={vid.title}
                className="w-full h-full object-cover opacity-85 group-hover:scale-[1.01] transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                <div className="w-12 h-12 bg-white/95 text-stone-900 flex items-center justify-center border border-stone-300 shadow-sm transition-transform duration-300">
                  <Play className="w-5 h-5 fill-stone-900 ml-0.5" />
                </div>
              </div>
              <span className="absolute bottom-3 right-3 bg-black/80 text-stone-200 text-[10px] font-mono px-2 py-0.5 border border-stone-700">
                {vid.duration}
              </span>
              <span className="absolute top-3 left-3 bg-stone-900/90 text-stone-200 text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 border border-stone-700">
                {vid.category}
              </span>
            </div>

            <div className="p-6 space-y-2">
              <h3 className="font-serif font-normal text-stone-900 text-base leading-snug">
                {vid.title}
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed font-sans">
                {vid.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
