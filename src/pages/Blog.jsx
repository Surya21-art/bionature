import React, { useState } from "react";
import { Link } from "wouter";
import { Search, ArrowRight, Clock } from "lucide-react";
import { BLOG_POSTS } from "@/data/bionature-data";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
export const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const categories = [
    "All",
    "Bio Fertilizers",
    "Crop Protection",
    "Plant Nutrition",
    "Soil Health",
  ];
  const filteredPosts = BLOG_POSTS.filter((post) => {
    const matchCat =
      selectedCategory === "All" || post.category === selectedCategory;
    const matchSearch =
      !searchQuery.trim() ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      {/* Header Banner */}
      <div className="bg-[#183F26] text-white p-8 sm:p-10 border border-stone-800 space-y-4 max-w-4xl">
        <span className="text-[10px] font-mono tracking-widest uppercase text-[#E7EBDD] px-2 py-0.5 border border-white/20 bg-white/5 inline-block">
          Agronomy &bull; Technical Research Hub
        </span>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-normal leading-[1.2]">
          Scientific Insights for Modern Sustainable Farming
        </h1>
        <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-sans">
          Deep-dive technical guides written by certified agronomists and soil
          microbiologists on nitrogen fixation, biological pest control, flower
          retention, and organic soil enrichment.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white p-4 border border-stone-200/90">
        <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`text-xs px-3 py-1 font-mono uppercase tracking-wider transition-colors ${
                selectedCategory === cat
                  ? "bg-[#245B35] text-white border border-[#245B35]"
                  : "bg-stone-50 text-stone-700 hover:bg-stone-100 border border-stone-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-72">
          <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search articles..."
            className="pl-9 text-xs h-9 rounded-none border-stone-300 focus-visible:ring-0 focus-visible:border-stone-600"
          />
        </div>
      </div>

      {/* Blog Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {filteredPosts.map((post) => (
          <div
            key={post.id}
            className="bg-white border border-stone-200/90 overflow-hidden hover:border-stone-400 transition-colors flex flex-col justify-between group"
          >
            <div>
              <div className="aspect-[16/10] bg-stone-100 overflow-hidden relative">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-[1.01] transition-transform duration-500"
                  loading="lazy"
                />
                <span className="absolute top-3 left-3 bg-stone-900/90 text-stone-200 font-mono text-[10px] tracking-wider uppercase px-2 py-0.5 border border-stone-700">
                  {post.category}
                </span>
              </div>

              <div className="p-6 space-y-3">
                <div className="flex items-center gap-3 text-[11px] font-mono text-stone-500">
                  <span>{post.date}</span>
                  <span>&bull;</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {post.readTime}
                  </span>
                </div>

                <Link href={`/blog/${post.slug}`}>
                  <h3 className="text-base font-serif font-normal text-stone-900 group-hover:text-[#245B35] transition-colors line-clamp-2 leading-snug">
                    {post.title}
                  </h3>
                </Link>

                <p className="text-xs text-stone-600 line-clamp-3 leading-relaxed font-sans">
                  {post.excerpt}
                </p>
              </div>
            </div>

            <div className="p-6 pt-0 border-t border-stone-100 mt-4 flex items-center justify-between">
              <div className="text-xs">
                <div className="font-serif font-normal text-stone-900">
                  {post.author}
                </div>
                <div className="text-[10px] font-mono text-stone-500 uppercase">
                  {post.authorRole}
                </div>
              </div>

              <Link
                href={`/blog/${post.slug}`}
                className="text-[11px] font-mono font-semibold uppercase tracking-wider text-[#245B35] hover:text-[#183F26] flex items-center gap-1 transition-colors"
              >
                <span>Read</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
