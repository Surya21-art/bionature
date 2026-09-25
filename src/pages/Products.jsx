import React, { useState, useMemo, useEffect } from "react";
import { useSearch, useLocation, Link } from "wouter";
import { Search, Filter, X, RotateCcw, Sprout, ArrowRight } from "lucide-react";
import { CATEGORIES, CROPS, PROBLEMS, PRODUCTS } from "@/data/bionature-data";
import { ProductCard } from "@/components/products/ProductCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const Products = ({ onEnquire }) => {
  const [, setLocation] = useLocation();
  const searchParams = new URLSearchParams(useSearch());
  const initialCategory = searchParams.get("category") || "all";

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedCrop, setSelectedCrop] = useState("all");
  const [selectedProblem, setSelectedProblem] = useState("all");
  const [sortBy, setSortBy] = useState("featured");
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Sync category filter when URL search params change (browser back/forward & direct links)
  useEffect(() => {
    const cat = searchParams.get("category");
    if (cat) {
      setSelectedCategory(cat);
    } else {
      setSelectedCategory("all");
    }
  }, [searchParams.get("category")]);

  // Ensure scroll is at top when visiting products
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  // Helper to normalize category strings for comparison (handles hyphens, spaces, casing)
  const normalize = (str) => (str || "").toLowerCase().replace(/[\s-]+/g, "");

  // Curated category list for the sidebar
  const SIDEBAR_CATEGORIES = [
    { id: "all", name: "All Formulations" },
    { id: "bio-fertilizers", name: "Bio-Fertilizers" },
    { id: "plant-growth-promoters", name: "Plant Growth Promoters" },
    { id: "micronutrients", name: "Micronutrients" },
    { id: "bio-pesticides", name: "Bio-Pesticides" },
    { id: "bio-fungicides", name: "Bio-Fungicides" },
    { id: "soil-conditioners", name: "Soil Conditioners" },
    { id: "specialty-formulations", name: "Specialty Formulations" },
  ];

  // Category select handler syncing URL without page reload
  const handleCategorySelect = (cat) => {
    const isAll = cat.id === "all";
    if (isAll) {
      setSelectedCategory("all");
      setLocation("/products");
    } else {
      const displayCat = cat.name.replace(/-/g, " ");
      setSelectedCategory(displayCat);
      setLocation(`/products?category=${encodeURIComponent(displayCat)}`);
    }
  };

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      // 1. Search Query (matches Name, Category, Formulation, Crop, Description, Benefit, Problems)
      if (searchQuery.trim()) {
        const q = searchQuery.trim().toLowerCase();
        const matchName = p.name?.toLowerCase().includes(q);
        const matchCategory =
          p.category?.toLowerCase().includes(q) ||
          p.categorySlug?.toLowerCase().includes(q);
        const matchFormulation =
          p.formulation?.toLowerCase().includes(q) ||
          p.specifications?.formulation?.toLowerCase().includes(q);
        const matchCrops =
          p.suitableCrops?.some((c) => c.toLowerCase().includes(q)) ||
          p.crops?.some((c) => c.toLowerCase().includes(q));
        const matchDesc = (p.shortDescription || p.description || "").toLowerCase().includes(q);
        const matchBenefit = (p.keyBenefit || "").toLowerCase().includes(q);
        const matchProblems = p.targetProblems?.some((pr) => pr.toLowerCase().includes(q));

        if (
          !matchName &&
          !matchCategory &&
          !matchFormulation &&
          !matchCrops &&
          !matchDesc &&
          !matchBenefit &&
          !matchProblems
        ) {
          return false;
        }
      }

      // 2. Category Filter
      if (selectedCategory !== "all") {
        const targetNorm = normalize(selectedCategory);
        const prodCatNorm = normalize(p.category);
        const prodCatSlugNorm = normalize(p.categorySlug);

        if (prodCatNorm !== targetNorm && prodCatSlugNorm !== targetNorm) {
          return false;
        }
      }

      // 3. Crop Filter
      if (selectedCrop !== "all") {
        if (!p.suitableCrops || !p.suitableCrops.includes(selectedCrop)) {
          return false;
        }
      }

      // 4. Problem Filter
      if (selectedProblem !== "all") {
        if (!p.targetProblems || !p.targetProblems.includes(selectedProblem)) {
          return false;
        }
      }

      return p.published !== false;
    }).sort((a, b) => {
      if (sortBy === "name-asc") return a.name.localeCompare(b.name);
      if (sortBy === "name-desc") return b.name.localeCompare(a.name);
      // Default: featured first
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [searchQuery, selectedCategory, selectedCrop, selectedProblem, sortBy]);

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSelectedCrop("all");
    setSelectedProblem("all");
    setSortBy("featured");
    setLocation("/products");
  };

  const hasActiveFilters =
    searchQuery !== "" ||
    selectedCategory !== "all" ||
    selectedCrop !== "all" ||
    selectedProblem !== "all";

  return (
    <div className="bg-[#F7F6F1] min-h-screen pt-6 pb-14 sm:pt-8 sm:pb-20 text-[#242421] selection:bg-[#183F26] selection:text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5 sm:space-y-6">

        {/* 1. REFINED COMPACT HERO WITH CORRECT TOP OFFSET & ANCHOR SCROLL MARGIN */}
        <div id="formulations-hero" className="scroll-mt-24 sm:scroll-mt-28 bg-[#183F26] text-white py-4 px-5 sm:py-5 sm:px-8 border border-stone-800">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 sm:gap-4">
            <div className="space-y-1.5 max-w-2xl">
              {/* User requirement 3: Exactly "BIOLOGICAL FORMULATIONS" */}
              <span className="inline-block text-[10px] font-mono tracking-[0.2em] uppercase text-[#E7EBDD] px-2 py-0.5 bg-white/10 border border-white/15">
                BIOLOGICAL FORMULATIONS
              </span>

              <h1 className="text-xl sm:text-2xl lg:text-[28px] font-serif font-normal text-white leading-tight">
                Biological Fertilizers &amp; Plant Protection Formulations
              </h1>
            </div>

            <div className="max-w-md md:text-right">
              <p className="text-xs text-stone-300 leading-relaxed font-sans">
                Biological formulations developed for practical crop and soil management.
              </p>
            </div>
          </div>
        </div>

        {/* 2. MAIN LAYOUT: FILTER SIDEBAR + PRODUCT GRID */}
        <div id="formulations-catalog" className="scroll-mt-24 sm:scroll-mt-28 grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-7 items-start">

          {/* Desktop Filter Sidebar (3 of 12 columns) with proper sticky offset */}
          <aside className="hidden lg:block lg:col-span-3 space-y-6 sticky top-24">
            <div className="bg-white p-5 border border-stone-200/90 space-y-5">
              
              {/* Sidebar Header */}
              <div className="flex items-center justify-between pb-3 border-b border-stone-200/80">
                <span className="text-xs font-mono tracking-wider uppercase font-semibold text-stone-900 flex items-center gap-1.5">
                  <Filter className="w-3.5 h-3.5 text-[#245B35]" />
                  Filter Formulations
                </span>

                {hasActiveFilters && (
                  <button
                    onClick={handleResetFilters}
                    className="text-[11px] font-mono uppercase text-red-700 hover:text-red-900 flex items-center gap-1 font-medium transition-colors"
                  >
                    <RotateCcw className="w-3 h-3" />
                    Reset
                  </button>
                )}
              </div>

              {/* Category Filter */}
              <div className="space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-[0.16em] text-stone-500 font-semibold block">
                  Category
                </span>

                <div className="space-y-0.5 text-xs font-sans">
                  {SIDEBAR_CATEGORIES.filter((cat) => {
                    if (cat.id === "all") return true;
                    const count = PRODUCTS.filter(
                      (p) =>
                        normalize(p.category) === normalize(cat.id) ||
                        normalize(p.categorySlug) === normalize(cat.id)
                    ).length;
                    return count > 0 || normalize(selectedCategory) === normalize(cat.id);
                  }).map((cat) => {
                    const isAll = cat.id === "all";
                    const isSelected =
                      (isAll && selectedCategory === "all") ||
                      (!isAll && normalize(selectedCategory) === normalize(cat.id));

                    // Count products matching this category
                    const count = isAll
                      ? PRODUCTS.length
                      : PRODUCTS.filter(
                          (p) =>
                            normalize(p.category) === normalize(cat.id) ||
                            normalize(p.categorySlug) === normalize(cat.id)
                        ).length;

                    return (
                      <button
                        key={cat.id}
                        onClick={() => handleCategorySelect(cat)}
                        className={`w-full text-left px-2.5 py-1.5 transition-colors flex items-center justify-between cursor-pointer ${
                          isSelected
                            ? "bg-[#F1F3EC] text-[#245B35] font-semibold border-l-2 border-[#245B35]"
                            : "text-stone-600 hover:bg-stone-50 hover:text-stone-900"
                        }`}
                      >
                        <span className="truncate pr-2">{cat.name}</span>
                        <span
                          className={`text-[10px] font-mono ${isSelected ? "text-[#245B35] font-semibold" : "text-stone-400"}`}
                        >
                          ({count})
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Target Crop Filter */}
              <div className="space-y-2 pt-3 border-t border-stone-100">
                <label className="text-[10px] font-mono uppercase tracking-[0.16em] text-stone-500 font-semibold block">
                  Target Crop
                </label>
                <select
                  value={selectedCrop}
                  onChange={(e) => setSelectedCrop(e.target.value)}
                  className="w-full h-8.5 rounded-none border border-stone-300 bg-white px-2.5 py-1 text-xs text-stone-800 shadow-none focus:outline-none focus:border-stone-600 transition-colors"
                >
                  <option value="all">All Crops</option>
                  {CROPS.map((c) => (
                    <option key={c.id} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Agricultural Problem Filter */}
              <div className="space-y-2 pt-3 border-t border-stone-100">
                <label className="text-[10px] font-mono uppercase tracking-[0.16em] text-stone-500 font-semibold block">
                  Field Challenge
                </label>
                <select
                  value={selectedProblem}
                  onChange={(e) => setSelectedProblem(e.target.value)}
                  className="w-full h-8.5 rounded-none border border-stone-300 bg-white px-2.5 py-1 text-xs text-stone-800 shadow-none focus:outline-none focus:border-stone-600 transition-colors"
                >
                  <option value="all">All Challenges</option>
                  {PROBLEMS.map((pr) => (
                    <option key={pr.id} value={pr.category}>
                      {pr.name}
                    </option>
                  ))}
                </select>
              </div>

            </div>

            {/* Quiet Advisory Strip */}
            <div className="bg-[#F1F3EC] p-4 border border-[#E7EBDD] space-y-1.5 text-xs">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#242421] font-semibold block">
                Technical Advisory
              </span>
              <p className="text-[11px] text-stone-600 font-sans leading-relaxed">
                Need batch assay Certificates of Analysis (CoA) or custom dosage calendars?
              </p>
              <button
                onClick={() => onEnquire ? onEnquire({ name: "Technical Formulation Dossier" }) : null}
                className="text-[11px] font-mono uppercase text-[#245B35] hover:text-[#183F26] font-semibold underline block pt-0.5 cursor-pointer"
              >
                Request Technical Dossier &rarr;
              </button>
            </div>
          </aside>

          {/* Product Grid Area (9 of 12 columns) */}
          <main className="lg:col-span-9 space-y-5">

            {/* Top Bar: Search Input, Mobile Filter Button, Sort Dropdown */}
            <div className="bg-white p-3.5 sm:p-4 border border-stone-200/90 flex flex-col sm:flex-row items-center justify-between gap-3">
              
              {/* Search Field */}
              <div className="relative w-full sm:w-80">
                <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search formulations by name, crop, benefit..."
                  aria-label="Search biological formulations"
                  className="pl-9 pr-8 text-xs h-8.5 rounded-none border-stone-300 focus-visible:ring-0 focus-visible:border-stone-600 shadow-none"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Sort & Mobile Filter Toggle */}
              <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
                  className="lg:hidden text-xs text-stone-700 rounded-none border-stone-300 h-8.5"
                >
                  <Filter className="w-3.5 h-3.5 mr-1" />
                  Filters
                </Button>

                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-stone-500 whitespace-nowrap hidden sm:inline">
                    Sort:
                  </span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    aria-label="Sort biological formulations"
                    className="h-8.5 rounded-none border border-stone-300 bg-white px-2.5 py-1 text-xs text-stone-800 shadow-none focus:outline-none focus:border-stone-600 transition-colors"
                  >
                    <option value="featured">Featured First</option>
                    <option value="name-asc">Name: A to Z</option>
                    <option value="name-desc">Name: Z to A</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Active Filter Chips (if any active) */}
            {hasActiveFilters && (
              <div className="flex flex-wrap items-center gap-2 bg-stone-50 p-2.5 border border-stone-200 text-xs">
                <span className="font-mono text-[10px] uppercase tracking-wider text-stone-500 font-semibold mr-1">
                  Active Filters:
                </span>

                {selectedCategory !== "all" && (
                  <Badge
                    variant="secondary"
                    className="gap-1 bg-white text-stone-800 border border-stone-300 rounded-none text-[11px] font-sans font-normal"
                  >
                    Category: {selectedCategory}
                    <X
                      className="w-3 h-3 cursor-pointer hover:text-red-700"
                      onClick={() => handleCategorySelect({ id: "all", name: "All Formulations" })}
                    />
                  </Badge>
                )}

                {selectedCrop !== "all" && (
                  <Badge
                    variant="secondary"
                    className="gap-1 bg-white text-stone-800 border border-stone-300 rounded-none text-[11px] font-sans font-normal"
                  >
                    Crop: {selectedCrop}
                    <X
                      className="w-3 h-3 cursor-pointer hover:text-red-700"
                      onClick={() => setSelectedCrop("all")}
                    />
                  </Badge>
                )}

                {selectedProblem !== "all" && (
                  <Badge
                    variant="secondary"
                    className="gap-1 bg-white text-stone-800 border border-stone-300 rounded-none text-[11px] font-sans font-normal"
                  >
                    Challenge: {selectedProblem}
                    <X
                      className="w-3 h-3 cursor-pointer hover:text-red-700"
                      onClick={() => setSelectedProblem("all")}
                    />
                  </Badge>
                )}

                {searchQuery && (
                  <Badge
                    variant="secondary"
                    className="gap-1 bg-white text-stone-800 border border-stone-300 rounded-none text-[11px] font-sans font-normal"
                  >
                    &ldquo;{searchQuery}&rdquo;
                    <X
                      className="w-3 h-3 cursor-pointer hover:text-red-700"
                      onClick={() => setSearchQuery("")}
                    />
                  </Badge>
                )}

                <button
                  onClick={handleResetFilters}
                  className="text-[11px] font-mono uppercase tracking-wider text-stone-500 hover:text-red-700 ml-auto transition-colors cursor-pointer"
                >
                  Clear All
                </button>
              </div>
            )}

            {/* Results Count */}
            <div className="flex items-center justify-between text-xs text-stone-500 font-mono pt-0.5">
              <span>
                Showing <strong className="text-stone-900">{filteredProducts.length}</strong> biological {filteredProducts.length === 1 ? "formulation" : "formulations"}
              </span>
            </div>

            {/* Product Cards Grid - Primary Focus of the Page */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onEnquire={onEnquire}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white border border-stone-200/90 p-12 text-center space-y-4">
                <div className="w-10 h-10 bg-stone-100 flex items-center justify-center mx-auto text-stone-500 border border-stone-200">
                  <Sprout className="w-5 h-5 text-[#245B35]" />
                </div>
                <h3 className="text-base font-serif font-normal text-stone-900 uppercase tracking-wide">
                  NO FORMULATIONS FOUND
                </h3>
                <p className="text-xs text-stone-500 max-w-sm mx-auto leading-relaxed font-sans">
                  Try adjusting your search or filters.
                </p>
                <Button
                  onClick={handleResetFilters}
                  size="sm"
                  className="bg-[#245B35] hover:bg-[#183F26] text-white text-xs uppercase tracking-wider font-semibold rounded-none shadow-none cursor-pointer"
                >
                  Reset All Filters
                </Button>
              </div>
            )}

          </main>
        </div>

      </div>

      {/* Mobile Slide-over / Modal Filter */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden bg-black/50 backdrop-blur-xs flex justify-end">
          <div className="w-full max-w-xs bg-white h-full p-6 space-y-6 overflow-y-auto border-l border-stone-200">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200">
              <span className="text-xs font-mono uppercase tracking-wider font-semibold text-stone-900">
                Filter Formulations
              </span>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="text-stone-400 hover:text-stone-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs font-sans">
              <div className="space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-[0.16em] text-stone-500 font-semibold block">
                  Category
                </span>
                <div className="space-y-1">
                  {SIDEBAR_CATEGORIES.filter((cat) => {
                    if (cat.id === "all") return true;
                    const count = PRODUCTS.filter(
                      (p) =>
                        normalize(p.category) === normalize(cat.id) ||
                        normalize(p.categorySlug) === normalize(cat.id)
                    ).length;
                    return count > 0 || normalize(selectedCategory) === normalize(cat.id);
                  }).map((cat) => {
                    const isAll = cat.id === "all";
                    const isSelected =
                      (isAll && selectedCategory === "all") ||
                      (!isAll && normalize(selectedCategory) === normalize(cat.id));

                    return (
                      <button
                        key={cat.id}
                        onClick={() => {
                          handleCategorySelect(cat);
                          setMobileFilterOpen(false);
                        }}
                        className={`w-full text-left px-2.5 py-1.5 flex items-center justify-between ${
                          isSelected ? "bg-stone-100 text-emerald-950 font-semibold" : "text-stone-600"
                        }`}
                      >
                        <span>{cat.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-stone-100">
                <label className="text-[10px] font-mono uppercase tracking-[0.16em] text-stone-500 font-semibold block">
                  Target Crop
                </label>
                <select
                  value={selectedCrop}
                  onChange={(e) => {
                    setSelectedCrop(e.target.value);
                    setMobileFilterOpen(false);
                  }}
                  className="w-full h-8.5 rounded-none border border-stone-300 bg-white px-2.5 py-1 text-xs"
                >
                  <option value="all">All Crops</option>
                  {CROPS.map((c) => (
                    <option key={c.id} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2 pt-2 border-t border-stone-100">
                <label className="text-[10px] font-mono uppercase tracking-[0.16em] text-stone-500 font-semibold block">
                  Field Challenge
                </label>
                <select
                  value={selectedProblem}
                  onChange={(e) => {
                    setSelectedProblem(e.target.value);
                    setMobileFilterOpen(false);
                  }}
                  className="w-full h-8.5 rounded-none border border-stone-300 bg-white px-2.5 py-1 text-xs"
                >
                  <option value="all">All Challenges</option>
                  {PROBLEMS.map((pr) => (
                    <option key={pr.id} value={pr.category}>
                      {pr.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="pt-4 flex gap-2">
                <Button
                  onClick={handleResetFilters}
                  variant="outline"
                  size="sm"
                  className="w-full text-xs rounded-none"
                >
                  Reset
                </Button>
                <Button
                  onClick={() => setMobileFilterOpen(false)}
                  size="sm"
                  className="w-full bg-[#245B35] hover:bg-[#183F26] text-white text-xs rounded-none cursor-pointer transition-colors"
                >
                  Apply
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
