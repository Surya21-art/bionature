import React from "react";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";

export const ProductCard = ({ product, onEnquire }) => {
  const primaryImage =
    product.primaryImage ||
    product.galleryImages?.[0] ||
    product.images?.[0] ||
    "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=800&auto=format&fit=crop&q=80";

  const packText =
    product.packaging ||
    (Array.isArray(product.packSizes) &&
    product.packSizes.length > 0 &&
    product.packSizes[0] !== "Information coming soon"
      ? product.packSizes.slice(0, 2).join(", ")
      : product.specifications?.packSize || null);

  const crops = product.crops || product.suitableCrops || product.targetCrops || [];
  const cropsText =
    Array.isArray(crops) && crops.length > 0
      ? crops.slice(0, 3).join(" • ")
      : "Rice • Wheat • Vegetables";

  const formulationText = product.formulation || "Liquid / Granular";

  // Clean category label formatted like BIO-FERTILIZER
  const rawCat = product.category || "Bio Fertilizers";
  const categoryLabel = rawCat
    .toUpperCase()
    .replace(/\s+/g, "-")
    .replace(/S$/, "");

  const productUrl = `/product/${product.slug || ""}`;

  return (
    <div className="group bg-white border border-stone-200/90 hover:border-stone-400 transition-colors duration-200 flex flex-col justify-between">
      <div>
        {/* Prominent, Clean Product Image (4:3 aspect ratio) - Clickable */}
        <Link
          href={productUrl}
          className="block relative aspect-[4/3] bg-stone-100 overflow-hidden border-b border-stone-200/80 cursor-pointer"
        >
          <img
            src={primaryImage}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-[1.025] transition-transform duration-500 ease-out"
            loading="lazy"
          />

          {packText && (
            <div className="absolute bottom-2.5 right-2.5 bg-stone-900/90 text-stone-200 text-[10px] font-mono tracking-wider uppercase px-2 py-0.5 border border-stone-700">
              {packText}
            </div>
          )}
        </Link>

        {/* Product Information formatted to exact specifications */}
        <div className="p-4 sm:p-5 space-y-3">
          {/* Category */}
          <div>
            <span className="text-[10px] font-mono tracking-[0.18em] uppercase text-[#245B35] font-semibold block mb-1">
              {categoryLabel}
            </span>

            {/* Product Name - Clickable */}
            <h3 className="text-lg font-serif text-stone-900 font-normal leading-snug group-hover:text-[#245B35] transition-colors">
              <Link href={productUrl}>{product.name}</Link>
            </h3>
          </div>

          {/* Short practical description */}
          <p className="text-xs text-stone-600 leading-relaxed font-sans line-clamp-2">
            {product.shortDescription || product.description}
          </p>

          {/* TARGET CROPS */}
          <div className="pt-2 border-t border-stone-100 space-y-0.5">
            <span className="text-[10px] font-mono uppercase tracking-[0.16em] text-stone-400 font-semibold block">
              TARGET CROPS
            </span>
            <p className="text-xs text-stone-800 font-sans font-medium">
              {cropsText}
            </p>
          </div>

          {/* FORMULATION */}
          <div className="space-y-0.5">
            <span className="text-[10px] font-mono uppercase tracking-[0.16em] text-stone-400 font-semibold block">
              FORMULATION
            </span>
            <p className="text-xs text-stone-800 font-sans font-medium">
              {formulationText}
            </p>
          </div>
        </div>
      </div>

      {/* Card Action Footer: TWO actions: Primary VIEW PRODUCT → & Secondary ENQUIRE */}
      <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-3 border-t border-stone-100 flex items-center gap-2">
        <Link
          href={productUrl}
          className="flex-1 bg-[#245B35] hover:bg-[#183F26] text-white font-mono text-[11px] uppercase tracking-wider font-semibold py-2.5 px-3 flex items-center justify-center gap-1.5 transition-colors group/btn text-center cursor-pointer"
        >
          <span>VIEW PRODUCT</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform shrink-0" />
        </Link>
        <button
          type="button"
          onClick={() => (onEnquire ? onEnquire(product) : null)}
          className="border border-stone-300 hover:border-stone-900 bg-white hover:bg-stone-50 text-stone-700 hover:text-stone-900 font-mono text-[11px] uppercase tracking-wider font-semibold py-2.5 px-3.5 transition-colors cursor-pointer shrink-0"
        >
          ENQUIRE
        </button>
      </div>
    </div>
  );
};

