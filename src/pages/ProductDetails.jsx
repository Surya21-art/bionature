import React, { useState, useEffect } from "react";
import { useRoute, Link } from "wouter";
import {
  MessageCircle,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { PRODUCTS, COMPANY_INFO } from "@/data/bionature-data";
import { useBioNatureStore } from "@/services/store";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/products/ProductCard";

const CROP_IMAGES = {
  Rice: "https://images.unsplash.com/photo-1536304993881-ff6e9eabf6a6?w=600&auto=format&fit=crop&q=80",
  Wheat: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&auto=format&fit=crop&q=80",
  Vegetables: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&auto=format&fit=crop&q=80",
  Cotton: "https://images.unsplash.com/photo-1598449356475-b9f71db7d847?w=600&auto=format&fit=crop&q=80",
  Tomato: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&auto=format&fit=crop&q=80",
  Potato: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=600&auto=format&fit=crop&q=80",
  Sugarcane: "https://images.unsplash.com/photo-1589923188900-85dae523342b?w=600&auto=format&fit=crop&q=80",
  Maize: "https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=600&auto=format&fit=crop&q=80",
  Chilli: "https://images.unsplash.com/photo-1588252303782-cb80119a0ee?w=600&auto=format&fit=crop&q=80",
  Onion: "https://images.unsplash.com/photo-1508747703725-719777637510?w=600&auto=format&fit=crop&q=80",
  Soybean: "https://images.unsplash.com/photo-1612257416648-ee7a4e9c47e5?w=600&auto=format&fit=crop&q=80",
  Tea: "https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?w=600&auto=format&fit=crop&q=80",
};

export const ProductDetails = ({ onEnquire }) => {
  const [, paramsProduct] = useRoute("/product/:slug");
  const [, paramsProducts] = useRoute("/products/:slug");
  const slug = paramsProduct?.slug || paramsProducts?.slug;

  const { products } = useBioNatureStore();

  // Find product from static verified catalog or store
  const product =
    PRODUCTS.find((p) => p.slug === slug) ||
    products.find((p) => p.slug === slug);

  // Configured primary image (default main image)
  const defaultImage =
    product?.primaryImage ||
    product?.galleryImages?.[0] ||
    product?.images?.[0] ||
    "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=800&auto=format&fit=crop&q=80";

  // Active displayed main image state (starts as defaultImage, resets when product changes)
  const [currentImage, setCurrentImage] = useState(defaultImage);

  // Reset to the configured primary image whenever the product/slug changes
  useEffect(() => {
    setCurrentImage(defaultImage);
  }, [product?.slug, defaultImage]);

  useEffect(() => {
    if (product?.name) {
      document.title = `${product.name} | BioNature India`;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc && product.shortDescription) {
        metaDesc.setAttribute(
          "content",
          `${product.name}: ${product.shortDescription}`,
        );
      }
    }
    return () => {
      document.title =
        "BioNature India - Sustainable Biological Inputs & Crop Solutions";
    };
  }, [product]);

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <span className="text-[10px] font-mono tracking-widest uppercase text-stone-400 block">
          Product Catalogue
        </span>
        <h2 className="text-2xl font-serif font-normal text-stone-900">
          Formulation Not Found
        </h2>
        <p className="text-xs sm:text-sm text-stone-600 font-sans max-w-md mx-auto">
          The requested biological product could not be located in our catalogue.
        </p>
        <Link href="/products">
          <Button className="bg-[#245B35] hover:bg-[#183F26] text-white text-xs font-mono uppercase tracking-wider rounded-none shadow-none cursor-pointer">
            Back to Products Catalogue
          </Button>
        </Link>
      </div>
    );
  }

  // Gallery images explicitly derived from product data
  const galleryImages =
    Array.isArray(product.galleryImages) && product.galleryImages.length > 0
      ? product.galleryImages
      : Array.isArray(product.images) && product.images.length > 0
      ? product.images
      : [defaultImage];

  // Category formatting
  const rawCat = product.category || "Bio Fertilizers";
  const categoryLabel = rawCat
    .toUpperCase()
    .replace(/\s+/g, "-")
    .replace(/S$/, "");

  // Metadata labels
  const cropsList = product.crops || product.suitableCrops || [];
  const targetCropsText =
    cropsList.length > 0 ? cropsList.slice(0, 3).join(" • ") : null;

  const formulationText = product.formulation || null;

  const packSizeText =
    product.packaging ||
    (Array.isArray(product.packSizes) && product.packSizes.length > 0
      ? product.packSizes.join(" • ")
      : product.specifications?.packSizes || null);

  // WhatsApp specific enquiry (automatically includes product name and category)
  const cleanWhatsapp = (COMPANY_INFO.whatsapp || "+91 956 6753 333").replace(
    /[^0-9]/g,
    "",
  );
  const whatsappText = `Hello BioNature India, I am interested in ${product.name} (${rawCat}). Please share product specifications, application guidance, availability and requirements.`;
  const whatsappUrl = `https://wa.me/${cleanWhatsapp}?text=${encodeURIComponent(
    whatsappText,
  )}`;

  // Benefits (populate only from product.benefits without inventing generic items)
  const hasBenefits =
    Array.isArray(product.benefits) && product.benefits.length > 0;

  // Target crops for visual cards
  const displayCrops = cropsList.slice(0, 6);
  const hasTargetCrops = displayCrops.length > 0;

  // Technical Information (Only display fields that have actual verified data)
  const specRows = [];
  if (product.specifications?.formulation || product.formulation) {
    specRows.push({
      label: "Formulation",
      value: product.specifications?.formulation || product.formulation,
    });
  }
  if (packSizeText) {
    specRows.push({ label: "Pack Size", value: packSizeText });
  }
  if (product.specifications?.composition) {
    specRows.push({
      label: "Composition",
      value: product.specifications.composition,
    });
  }
  if (product.specifications?.storage) {
    specRows.push({
      label: "Storage",
      value: product.specifications.storage,
    });
  }
  if (product.specifications?.shelfLife) {
    specRows.push({
      label: "Shelf Life",
      value: product.specifications.shelfLife,
    });
  }
  if (product.specifications?.manufacturer || COMPANY_INFO.name) {
    specRows.push({
      label: "Manufacturer",
      value: product.specifications?.manufacturer || COMPANY_INFO.name,
    });
  }
  if (product.specifications?.registration) {
    specRows.push({
      label: "Registration",
      value: product.specifications.registration,
    });
  }

  // Agronomic Context validation (only show panel if verified data exists)
  const context = product.agronomicContext;
  const hasClassification = Boolean(context?.classification);
  const hasPurpose = Boolean(context?.purpose);
  const hasWhereUsed = Boolean(context?.targetCrops || context?.whereUsed);
  const hasPractice = Boolean(context?.practice);
  const hasAgronomicContext = Boolean(
    context && (hasClassification || hasPurpose || hasWhereUsed || hasPractice),
  );

  // Application & use validation
  const hasApplication =
    Array.isArray(product.application) && product.application.length > 0;

  // Quality & certification validation
  const hasQualityOrCert = Boolean(
    product.quality ||
      (Array.isArray(product.certifications) &&
        product.certifications.length > 0),
  );

  // Related formulations (2-3 existing products, navigating to /product/[slug])
  const relatedSlugs = product.relatedProducts || [];
  const relatedProductsList = (
    relatedSlugs.length > 0
      ? relatedSlugs
          .map(
            (relSlug) =>
              PRODUCTS.find((p) => p.slug === relSlug) ||
              products.find((p) => p.slug === relSlug),
          )
          .filter(Boolean)
      : products.filter((p) => p.slug !== product.slug)
  ).slice(0, 3);

  return (
    <div className="bg-[#F7F6F1] text-[#242421] min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        
        {/* ==================================================
            1. BREADCRUMBS
            ================================================== */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center flex-wrap gap-2 text-xs font-sans text-stone-500"
        >
          <Link
            href="/"
            className="hover:text-[#245B35] transition-colors cursor-pointer"
          >
            Home
          </Link>
          <span className="text-stone-300">/</span>
          <Link
            href="/products"
            className="hover:text-[#245B35] transition-colors cursor-pointer"
          >
            Products
          </Link>
          <span className="text-stone-300">/</span>
          <Link
            href={`/products?category=${encodeURIComponent(product.category || "Bio Fertilizers")}`}
            className="hover:text-[#245B35] transition-colors cursor-pointer"
          >
            {product.category || "Bio-Fertilizers"}
          </Link>
          <span className="text-stone-300">/</span>
          <span className="text-stone-900 font-medium truncate">
            {product.name}
          </span>
        </nav>

        {/* ==================================================
            2. PRODUCT DETAIL HERO (Balanced Two-Column Composition)
            ================================================== */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* LEFT: Balanced product image + Subtle thumbnail gallery */}
          <div className="lg:col-span-6 space-y-3">
            <div className="relative aspect-[16/11] max-h-[280px] sm:max-h-[360px] lg:max-h-[400px] bg-stone-100 border border-stone-200/90 overflow-hidden">
              <img
                src={currentImage}
                alt={product.name}
                className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-[1.02]"
              />
              <div className="absolute top-3 left-3 bg-[#245B35] text-white text-[10px] font-mono tracking-wider uppercase px-2.5 py-1">
                {categoryLabel}
              </div>
            </div>

            {/* Gallery Thumbnails: Clicking thumbnail updates displayed image */}
            {galleryImages.length > 1 && (
              <div className="flex items-center gap-2 pt-1">
                {galleryImages.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setCurrentImage(img)}
                    aria-label={`Select product image view ${idx + 1}`}
                    className={`w-14 h-11 sm:w-16 sm:h-12 bg-stone-100 border transition-all overflow-hidden cursor-pointer ${
                      currentImage === img
                        ? "border-[#245B35] ring-1 ring-[#245B35]"
                        : "border-stone-200/80 opacity-70 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} view ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT: Product Category, Name, Short Description, Specs Strip & CTAs */}
          <div className="lg:col-span-6 space-y-6 flex flex-col justify-center">
            <div className="space-y-2">
              <span className="text-[11px] font-mono uppercase tracking-[0.18em] text-[#245B35] font-semibold block">
                {categoryLabel}
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal text-stone-900 tracking-tight leading-tight">
                {product.name}
              </h1>
              {product.shortDescription && (
                <p className="text-sm sm:text-base text-stone-600 font-sans leading-relaxed pt-1">
                  {product.shortDescription}
                </p>
              )}
            </div>

            {/* Structured Specifications Strip (only renders populated items) */}
            {(targetCropsText || formulationText || packSizeText) && (
              <div className="py-4 border-y border-stone-200/90 grid grid-cols-1 sm:grid-cols-3 gap-4">
                {targetCropsText && (
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono uppercase tracking-[0.16em] text-stone-400 font-semibold block">
                      TARGET CROPS
                    </span>
                    <p className="text-xs font-sans text-stone-900 font-medium">
                      {targetCropsText}
                    </p>
                  </div>
                )}

                {formulationText && (
                  <div className="space-y-1 sm:border-l sm:border-stone-200/80 sm:pl-4">
                    <span className="text-[10px] font-mono uppercase tracking-[0.16em] text-stone-400 font-semibold block">
                      FORMULATION
                    </span>
                    <p className="text-xs font-sans text-stone-900 font-medium">
                      {formulationText}
                    </p>
                  </div>
                )}

                {packSizeText && (
                  <div className="space-y-1 sm:border-l sm:border-stone-200/80 sm:pl-4">
                    <span className="text-[10px] font-mono uppercase tracking-[0.16em] text-stone-400 font-semibold block">
                      PACK SIZE
                    </span>
                    <p className="text-xs font-sans text-stone-900 font-medium">
                      {packSizeText}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Main Action CTAs */}
            <div className="pt-1 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <Button
                onClick={() => onEnquire && onEnquire(product)}
                className="bg-[#245B35] hover:bg-[#183F26] text-white font-mono text-xs uppercase tracking-wider font-semibold py-4 px-6 rounded-none shadow-none flex items-center justify-center gap-2 cursor-pointer transition-colors"
              >
                <span>ENQUIRE ABOUT {product.name.toUpperCase()}</span>
                <ArrowRight className="w-4 h-4" />
              </Button>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block"
              >
                <Button
                  variant="outline"
                  className="w-full bg-white hover:bg-stone-50 text-stone-800 border-stone-300 font-mono text-xs uppercase tracking-wider font-semibold py-4 px-5 rounded-none shadow-none flex items-center justify-center gap-2 cursor-pointer transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-[#245B35]" />
                  <span>WhatsApp Enquiry</span>
                </Button>
              </a>
            </div>

            {/* Direct Phone Number via Centralized Config */}
            <div className="text-[11px] font-mono text-stone-500 flex items-center gap-2 pt-1">
              <span>Direct agronomy & bulk dispatch desk</span>
              <span>&bull;</span>
              <a
                href={`tel:${COMPANY_INFO.phone}`}
                className="hover:text-[#245B35] underline underline-offset-2"
              >
                {COMPANY_INFO.phone}
              </a>
            </div>
          </div>
        </section>

        {/* ==================================================
            3. ABOUT THE PRODUCT (Single concise description)
            ================================================== */}
        {product.description && (
          <section className="pt-10 border-t border-stone-200/90 space-y-6">
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#686861] font-semibold block">
                Formulation Overview
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-normal text-stone-900">
                About the Product
              </h2>
            </div>

            <div
              className={`grid grid-cols-1 ${
                hasAgronomicContext ? "lg:grid-cols-12 gap-8" : ""
              } items-start`}
            >
              <div className={hasAgronomicContext ? "lg:col-span-7" : "max-w-3xl"}>
                <p className="text-sm sm:text-base text-stone-700 font-sans leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Agronomic Context panel rendered only if verified data exists */}
              {hasAgronomicContext && (
                <div className="lg:col-span-5 bg-[#F1F3EC] p-5 sm:p-6 border border-[#E7EBDD] space-y-4">
                  <span className="text-[10px] font-mono uppercase tracking-[0.16em] text-stone-400 font-semibold block border-b border-stone-200/70 pb-2">
                    Agronomic Context
                  </span>
                  <dl className="space-y-3 text-xs text-stone-700 font-sans">
                    {hasClassification && (
                      <div>
                        <dt className="font-mono text-[10px] uppercase tracking-wider text-[#242421] font-semibold mb-0.5">
                          Formulation Classification
                        </dt>
                        <dd className="text-stone-800 font-medium">
                          {product.agronomicContext.classification}
                        </dd>
                      </div>
                    )}
                    {hasPurpose && (
                      <div className="pt-2 border-t border-stone-200/60">
                        <dt className="font-mono text-[10px] uppercase tracking-wider text-[#242421] font-semibold mb-0.5">
                          Intended Agronomic Purpose
                        </dt>
                        <dd className="text-stone-800">
                          {product.agronomicContext.purpose}
                        </dd>
                      </div>
                    )}
                    {hasWhereUsed && (
                      <div className="pt-2 border-t border-stone-200/60">
                        <dt className="font-mono text-[10px] uppercase tracking-wider text-[#242421] font-semibold mb-0.5">
                          Where It Is Used
                        </dt>
                        <dd className="text-stone-800">
                          {product.agronomicContext.targetCrops ||
                            product.agronomicContext.whereUsed}
                        </dd>
                      </div>
                    )}
                    {hasPractice && (
                      <div className="pt-2 border-t border-stone-200/60">
                        <dt className="font-mono text-[10px] uppercase tracking-wider text-[#242421] font-semibold mb-0.5">
                          Agricultural Practice Integration
                        </dt>
                        <dd className="text-stone-800">
                          {product.agronomicContext.practice}
                        </dd>
                      </div>
                    )}
                  </dl>
                </div>
              )}
            </div>
          </section>
        )}

        {/* ==================================================
            4. KEY BENEFITS (Only rendered if verified benefits exist)
            ================================================== */}
        {hasBenefits && (
          <section className="pt-8 border-t border-stone-200/90 space-y-6">
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#686861] font-semibold block">
                Agronomic Efficacy
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-normal text-stone-900">
                Key Benefits
              </h2>
            </div>

            <div className="border border-stone-200/90 bg-white grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-stone-200/90">
              {product.benefits.slice(0, 4).map((benefit, idx) => (
                <div
                  key={idx}
                  className="p-5 sm:p-6 space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <span className="text-xs font-mono uppercase tracking-widest text-[#245B35] font-semibold block">
                      0{idx + 1}
                    </span>
                    <p className="text-sm font-sans text-stone-800 leading-snug font-medium">
                      {benefit}
                    </p>
                  </div>
                  <div className="pt-3 border-t border-stone-100 text-[10px] font-mono uppercase tracking-wider text-stone-400">
                    Verified Feature
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ==================================================
            5. TARGET CROPS (Only rendered if crops exist)
            ================================================== */}
        {hasTargetCrops && (
          <section className="pt-8 border-t border-stone-200/90 space-y-6">
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#686861] font-semibold block">
                Crop Compatibility
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-normal text-stone-900">
                Target Crops
              </h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {displayCrops.map((cropName) => {
                const cropImg =
                  CROP_IMAGES[cropName] || defaultImage;

                return (
                  <Link
                    key={cropName}
                    href={`/solutions/crops/${cropName.toLowerCase()}`}
                    className="group bg-white border border-stone-200/90 hover:border-stone-400 transition-colors overflow-hidden block cursor-pointer"
                  >
                    <div className="aspect-[4/3] bg-stone-100 overflow-hidden border-b border-stone-200/80">
                      <img
                        src={cropImg}
                        alt={cropName}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-2.5 text-center">
                      <span className="text-xs font-serif text-stone-900 group-hover:text-[#245B35] transition-colors block">
                        {cropName}
                      </span>
                      <span className="text-[10px] font-mono text-stone-400 uppercase tracking-wider block mt-0.5">
                        Field Solutions &rarr;
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {/* ==================================================
            6. APPLICATION & USE (Only rendered if data exists)
            ================================================== */}
        {hasApplication && (
          <section className="pt-8 border-t border-stone-200/90 space-y-6">
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#686861] font-semibold block">
                Agronomy Schedule
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-normal text-stone-900">
                Application & Use
              </h2>
            </div>

            <div className="border border-stone-200/90 overflow-x-auto bg-white">
              <table className="w-full text-left text-xs min-w-[640px]">
                <thead className="bg-[#F1F3EC] text-[#242421] font-mono text-[11px] uppercase tracking-wider border-b border-stone-200/90">
                  <tr>
                    <th className="p-3.5 font-semibold">Crop</th>
                    <th className="p-3.5 font-semibold">Application Method</th>
                    <th className="p-3.5 font-semibold">Dosage</th>
                    <th className="p-3.5 font-semibold">Timing</th>
                    <th className="p-3.5 font-semibold">Frequency</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 text-stone-700 font-sans">
                  {product.application.map((row, idx) => (
                    <tr
                      key={idx}
                      className="hover:bg-stone-50/60 transition-colors"
                    >
                      <td className="p-3.5 font-medium text-stone-900">
                        {row.crop || "—"}
                      </td>
                      <td className="p-3.5 text-stone-600">
                        {row.method || "—"}
                      </td>
                      <td className="p-3.5 font-mono text-[#245B35] font-semibold">
                        {row.dosage || "—"}
                      </td>
                      <td className="p-3.5 text-stone-600">
                        {row.timing || "—"}
                      </td>
                      <td className="p-3.5 text-stone-600">
                        {row.frequency || "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-[11px] font-mono text-stone-400">
              Note: Application rates and timing should be calibrated based on soil test analysis, local crop stage, and irrigation management.
            </p>
          </section>
        )}

        {/* ==================================================
            7. TECHNICAL INFORMATION (Only rendered if spec fields exist)
            ================================================== */}
        {specRows.length > 0 && (
          <section className="pt-8 border-t border-stone-200/90 space-y-6">
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#686861] font-semibold block">
                Statutory & Technical Specifications
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-normal text-stone-900">
                Technical Information
              </h2>
            </div>

            <div className="border border-stone-200/90 bg-white divide-y divide-stone-100">
              {specRows.map((spec, idx) => (
                <div
                  key={idx}
                  className="grid grid-cols-1 sm:grid-cols-3 p-3.5 sm:p-4 text-xs hover:bg-stone-50/50 transition-colors"
                >
                  <div className="font-mono uppercase tracking-wider text-stone-500 font-semibold text-[11px]">
                    {spec.label}
                  </div>
                  <div className="sm:col-span-2 text-stone-800 font-sans mt-1 sm:mt-0 font-medium">
                    {spec.value}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ==================================================
            8. QUALITY & CERTIFICATION (Only rendered if verified data exists)
            ================================================== */}
        {hasQualityOrCert && (
          <section className="pt-8 border-t border-stone-200/90 space-y-4">
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#686861] font-semibold block">
                Quality Assurance
              </span>
              <h2 className="text-xl sm:text-2xl font-serif font-normal text-stone-900">
                Quality & Certification
              </h2>
            </div>

            <div className="bg-[#F1F3EC] p-5 sm:p-6 border border-[#E7EBDD] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-[#245B35] shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-stone-900 font-semibold">
                    Verified Formulation Quality
                  </h4>
                  <p className="text-xs text-stone-600 font-sans leading-relaxed">
                    {product.quality ||
                      "Quality tested formulation standards with verified batch integrity and active microbial viability."}
                  </p>
                </div>
              </div>
              <div className="font-mono text-[10px] uppercase tracking-wider text-stone-500 shrink-0 bg-white border border-stone-200 px-3 py-1.5 self-start sm:self-auto">
                Batch Assay Available
              </div>
            </div>
          </section>
        )}

        {/* ==================================================
            9. FINAL ENQUIRY CTA
            ================================================== */}
        <section className="bg-[#183F26] text-white p-8 sm:p-12 border border-stone-800 space-y-6">
          <div className="max-w-2xl space-y-2">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#E7EBDD] font-semibold block">
              Direct Agronomy & Bulk Desk
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-normal text-white">
              INTERESTED IN THIS FORMULATION?
            </h2>
            <p className="text-xs sm:text-sm text-stone-300 font-sans leading-relaxed">
              Speak with our team for product information, application guidance, availability and requirements.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
            <Button
              onClick={() => onEnquire && onEnquire(product)}
              className="bg-white hover:bg-stone-100 text-stone-900 font-mono text-xs uppercase tracking-wider font-semibold py-4 px-6 rounded-none shadow-none flex items-center justify-center gap-2 cursor-pointer transition-colors"
            >
              <span>ENQUIRE ABOUT {product.name.toUpperCase()} &rarr;</span>
            </Button>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block"
            >
              <Button
                variant="outline"
                className="w-full border border-white/30 bg-transparent hover:bg-white/10 text-white font-mono text-xs uppercase tracking-wider font-semibold py-4 px-6 rounded-none shadow-none flex items-center justify-center gap-2 cursor-pointer transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-white" />
                <span>WHATSAPP ENQUIRY</span>
              </Button>
            </a>
          </div>

          <div className="pt-2 border-t border-[#245B35]/50 text-[11px] font-mono text-stone-400 flex flex-wrap items-center gap-x-4 gap-y-1">
            <span>Direct Desk: {COMPANY_INFO.phone}</span>
            <span>&bull;</span>
            <span>Email: {COMPANY_INFO.email}</span>
            <span>&bull;</span>
            <span>Hours: {COMPANY_INFO.workingHours} (IST)</span>
          </div>
        </section>

        {/* ==================================================
            10. RELATED FORMULATIONS
            ================================================== */}
        {relatedProductsList.length > 0 && (
          <section className="pt-8 border-t border-stone-200/90 space-y-6">
            <div className="flex items-end justify-between flex-wrap gap-4">
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#686861] font-semibold block">
                  Complementary Agronomic Inputs
                </span>
                <h2 className="text-2xl sm:text-3xl font-serif font-normal text-stone-900">
                  Related Formulations
                </h2>
              </div>
              <Link
                href="/products"
                className="font-mono text-xs uppercase tracking-wider text-[#245B35] hover:text-[#183F26] underline underline-offset-4 flex items-center gap-1 font-semibold cursor-pointer"
              >
                <span>View Full Catalogue</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProductsList.map((relProduct) => (
                <ProductCard
                  key={relProduct.id || relProduct.slug}
                  product={relProduct}
                  onEnquire={onEnquire}
                />
              ))}
            </div>
          </section>
        )}

      </div>
    </div>
  );
};
