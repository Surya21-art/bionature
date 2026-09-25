import React from "react";
import { useRoute, Link } from "wouter";
import { ArrowLeft, Clock, Share2 } from "lucide-react";
import { BLOG_POSTS } from "@/data/bionature-data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
export const BlogDetails = () => {
  const [, params] = useRoute("/blog/:slug");
  const slug = params?.slug;
  const post = BLOG_POSTS.find((b) => b.slug === slug);

  if (!post) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 sm:py-24 text-center space-y-6">
        <span className="text-[11px] font-mono tracking-widest uppercase text-stone-500 bg-stone-100 px-3 py-1 border border-stone-200">
          ARTICLE NOT FOUND
        </span>
        <h1 className="text-3xl font-serif font-normal text-stone-900">
          The requested article could not be located.
        </h1>
        <p className="text-sm text-stone-600 max-w-md mx-auto font-sans leading-relaxed">
          The publication may have been updated or moved. Browse all agronomic guides in our technical knowledge hub.
        </p>
        <div className="pt-2">
          <Link href="/blog">
            <Button className="bg-[#245B35] hover:bg-[#183F26] text-white text-xs font-mono uppercase tracking-wider px-6 py-3 rounded-none shadow-none">
              &larr; Return to Knowledge Hub
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Article link copied to clipboard!");
    }
  };
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-slate-500">
        <Link
          href="/blog"
          className="hover:text-emerald-700 flex items-center gap-1 font-medium"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Blog</span>
        </Link>
        <span>/</span>
        <span className="text-slate-900 font-semibold truncate">
          {post.title}
        </span>
      </div>

      {/* Header */}
      <div className="space-y-4">
        <span className="text-[10px] font-mono tracking-widest uppercase text-emerald-900 bg-stone-100 px-2 py-0.5 border border-stone-200 inline-block">
          {post.category}
        </span>
        <h1 className="text-2xl sm:text-3xl font-serif font-normal text-stone-900 leading-snug">
          {post.title}
        </h1>

        <div className="flex flex-wrap items-center justify-between gap-4 border-y border-stone-200/90 py-3 text-xs text-stone-500 font-sans">
          <div className="flex items-center gap-4">
            <div>
              <strong className="text-stone-900 font-serif font-normal">{post.author}</strong> &bull;{" "}
              <span className="text-[11px] font-mono uppercase text-stone-500">{post.authorRole}</span>
            </div>
            <span>&bull;</span>
            <div className="font-mono text-[11px]">{post.date}</div>
            <span>&bull;</span>
            <div className="flex items-center gap-1 font-mono text-[11px]">
              <Clock className="w-3 h-3" />
              <span>{post.readTime}</span>
            </div>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={handleShare}
            className="text-xs text-stone-700 gap-1.5 rounded-none border-stone-300 hover:bg-stone-50"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span className="text-[11px] font-mono uppercase tracking-wider">Share</span>
          </Button>
        </div>
      </div>

      {/* Hero Image */}
      <div className="aspect-[16/9] border border-stone-200/90 overflow-hidden bg-stone-100">
        <img
          src={post.coverImage}
          alt={post.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="prose prose-stone max-w-none text-sm leading-relaxed space-y-4 font-sans">
        <div className="bg-[#F2F4EB] p-5 border border-stone-200/90 text-stone-900 italic font-serif text-sm">
          <strong className="font-sans font-semibold not-italic">Key Takeaway:</strong> {post.excerpt}
        </div>

        <div className="whitespace-pre-line text-stone-700 space-y-4">
          {post.content}
        </div>
      </div>

      {/* Tags */}
      <div className="pt-6 border-t border-stone-200/90 flex items-center gap-2">
        <span className="text-[11px] font-mono uppercase tracking-wider text-stone-500">Tags:</span>
        <div className="flex flex-wrap gap-1.5">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-mono uppercase tracking-wider bg-stone-100 text-stone-700 px-2 py-0.5 border border-stone-200"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Relevant Recommended Products Banner */}
      <div className="bg-[#183F26] text-white p-7 sm:p-8 border border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-md">
          <h3 className="text-xl font-serif font-normal text-white">
            Apply These Agronomy Insights
          </h3>
          <p className="text-xs text-stone-300 font-sans leading-relaxed">
            Explore BioNature&rsquo;s certified biological formulations designed
            specifically for biological nitrogen fixation, plant nutrition, and
            disease defense.
          </p>
        </div>
        <Link href="/products">
          <Button className="bg-white hover:bg-stone-100 text-stone-900 text-xs uppercase tracking-wider font-semibold py-3 px-5 rounded-none shadow-none shrink-0">
            Browse Formulation Catalog
          </Button>
        </Link>
      </div>
    </div>
  );
};
