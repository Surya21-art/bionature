import React, { useState } from "react";
import { useSearch, Link } from "wouter";
import {
  Search,
  Sprout,
  ShieldAlert,
  BookOpen,
  ArrowRight,
} from "lucide-react";
import { PRODUCTS, CROPS, PROBLEMS, BLOG_POSTS } from "@/data/bionature-data";
import { ProductCard } from "@/components/products/ProductCard";
import { Input } from "@/components/ui/input";
export const SearchPage = ({ onEnquire }) => {
  const searchParams = new URLSearchParams(useSearch());
  const initialQ = searchParams.get("q") || "";
  const [query, setQuery] = useState(initialQ);
  const q = query.trim().toLowerCase();
  const matchingProducts = q
    ? PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.shortDescription.toLowerCase().includes(q) ||
          p.suitableCrops.some((c) => c.toLowerCase().includes(q)) ||
          p.targetProblems.some((pr) => pr.toLowerCase().includes(q)),
      )
    : [];
  const matchingCrops = q
    ? CROPS.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.description.toLowerCase().includes(q),
      )
    : [];
  const matchingProblems = q
    ? PROBLEMS.filter(
        (pr) =>
          pr.name.toLowerCase().includes(q) ||
          pr.description.toLowerCase().includes(q),
      )
    : [];
  const matchingBlogs = q
    ? BLOG_POSTS.filter(
        (b) =>
          b.title.toLowerCase().includes(q) ||
          b.excerpt.toLowerCase().includes(q),
      )
    : [];
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      {/* Search Input Hero */}
      <div className="bg-[#183F26] text-white p-8 sm:p-10 border border-stone-800 space-y-5 max-w-4xl mx-auto text-center">
        <span className="text-[10px] font-mono tracking-widest uppercase text-[#E7EBDD] px-2 py-0.5 border border-white/20 bg-white/5 inline-block">
          Agronomic Search &bull; Multi-Index Catalog
        </span>
        <h1 className="text-2xl sm:text-3xl font-serif font-normal leading-snug">
          Global Formulation &amp; Crop Search
        </h1>
        <p className="text-xs sm:text-sm text-stone-300 max-w-xl mx-auto font-sans leading-relaxed">
          Find matching biological fertilizers, crop stage schedules, pest
          diagnosis guides, and agronomy articles.
        </p>

        <div className="max-w-xl mx-auto relative pt-1">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search e.g. Tomato, Wilt, Bio-NPK, Thrips, Nitrogen..."
            className="pl-10 py-5 text-xs bg-white text-stone-900 rounded-none border border-stone-300 focus-visible:ring-0 focus-visible:border-stone-600 shadow-none"
          />
        </div>
      </div>

      {/* Results Overview */}
      {q ? (
        <div className="space-y-12">
          <div className="text-xs font-mono uppercase tracking-wider text-stone-500">
            Search results for:{" "}
            <span className="text-stone-900 font-semibold">&ldquo;{query}&rdquo;</span>
          </div>

          {/* Products Group */}
          {matchingProducts.length > 0 && (
            <div className="space-y-6">
              <h2 className="text-xl font-serif font-normal text-stone-900 flex items-center gap-2 border-b border-stone-200/90 pb-2">
                <Sprout className="w-4 h-4 text-[#245B35]" />
                Matching Formulations ({matchingProducts.length})
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {matchingProducts.map((p) => (
                  <ProductCard key={p.id} product={p} onEnquire={onEnquire} />
                ))}
              </div>
            </div>
          )}

          {/* Crops Group */}
          {matchingCrops.length > 0 && (
            <div className="space-y-6">
              <h2 className="text-xl font-serif font-normal text-stone-900 flex items-center gap-2 border-b border-stone-200/90 pb-2">
                <Sprout className="w-4 h-4 text-[#245B35]" />
                Crop Management Programs ({matchingCrops.length})
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {matchingCrops.map((c) => (
                  <Link
                    key={c.id}
                    href={`/solutions/crops/${c.slug}`}
                    className="bg-white p-5 border border-stone-200/90 hover:border-stone-400 transition-colors flex items-center justify-between group"
                  >
                    <div>
                      <h3 className="font-serif font-normal text-stone-900 text-sm group-hover:text-[#245B35] transition-colors">
                        {c.name} Guide
                      </h3>
                      <p className="text-xs text-stone-500 line-clamp-1 font-sans">
                        {c.description}
                      </p>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-stone-400 group-hover:text-[#245B35] transition-colors" />
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Problems Group */}
          {matchingProblems.length > 0 && (
            <div className="space-y-6">
              <h2 className="text-xl font-serif font-normal text-stone-900 flex items-center gap-2 border-b border-stone-200/90 pb-2">
                <ShieldAlert className="w-4 h-4 text-amber-600" />
                Crop Problems &amp; Diagnosis Guides ({matchingProblems.length})
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {matchingProblems.map((pr) => (
                  <Link
                    key={pr.id}
                    href={`/solutions/problems/${pr.slug}`}
                    className="bg-white p-5 border border-stone-200/90 hover:border-stone-400 transition-colors flex items-center justify-between group"
                  >
                    <div>
                      <h3 className="font-serif font-normal text-stone-900 text-sm group-hover:text-amber-800 transition-colors">
                        {pr.name}
                      </h3>
                      <p className="text-xs text-stone-500 line-clamp-1 font-sans">
                        {pr.description}
                      </p>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-stone-400 group-hover:text-amber-700 transition-colors" />
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Blog Group */}
          {matchingBlogs.length > 0 && (
            <div className="space-y-6">
              <h2 className="text-xl font-serif font-normal text-stone-900 flex items-center gap-2 border-b border-stone-200/90 pb-2">
                <BookOpen className="w-4 h-4 text-[#245B35]" />
                Knowledge Hub Articles ({matchingBlogs.length})
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {matchingBlogs.map((b) => (
                  <Link
                    key={b.id}
                    href={`/blog/${b.slug}`}
                    className="bg-white p-5 border border-stone-200/90 hover:border-stone-400 transition-colors space-y-2 group block"
                  >
                    <span className="text-[10px] font-mono text-[#245B35] font-semibold uppercase tracking-wider block">
                      {b.category}
                    </span>
                    <h3 className="text-sm font-serif font-normal text-stone-900 group-hover:text-[#245B35] transition-colors">
                      {b.title}
                    </h3>
                    <p className="text-xs text-stone-500 line-clamp-2 font-sans">
                      {b.excerpt}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-16 text-slate-400 text-sm">
          Enter a keyword above to search BioNature products, crops, or agronomy
          solutions.
        </div>
      )}
    </div>
  );
};
