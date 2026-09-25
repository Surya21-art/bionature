import React from "react";
import { Link } from "wouter";
import { Sprout, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-[75vh] w-full flex items-center justify-center bg-[#F7F6F1] text-[#242421] px-4 py-16">
      <div className="max-w-md w-full text-center space-y-5 bg-white border border-stone-200/90 p-8 sm:p-10 shadow-none">
        <div className="w-12 h-12 bg-stone-100 border border-stone-200 text-[#245B35] flex items-center justify-center mx-auto">
          <Sprout className="w-6 h-6 text-[#245B35]" />
        </div>

        <div className="space-y-2">
          <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#686861] font-semibold block">
            404 &bull; Page Not Found
          </span>
          <h1 className="text-2xl sm:text-3xl font-serif font-normal text-stone-900 leading-snug">
            Formulation or Page Not Found
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 font-sans leading-relaxed">
            The page or commercial formulation you are looking for may have been moved, updated, or does not exist in our catalog.
          </p>
        </div>

        <div className="pt-3 flex flex-col sm:flex-row gap-2.5 justify-center">
          <Link href="/">
            <Button
              variant="outline"
              className="w-full sm:w-auto text-xs font-mono uppercase tracking-wider text-stone-800 border-stone-300 rounded-none hover:bg-stone-50"
            >
              Return Home
            </Button>
          </Link>
          <Link href="/products">
            <Button className="w-full sm:w-auto bg-[#245B35] hover:bg-[#183F26] text-white text-xs font-mono uppercase tracking-wider rounded-none shadow-none flex items-center justify-center gap-1.5 cursor-pointer transition-colors">
              <span>View Products</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
