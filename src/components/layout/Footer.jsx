import React from "react";
import { Link } from "wouter";
import {
  Sprout,
  Phone,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  Award,
} from "lucide-react";
import { COMPANY_INFO, CATEGORIES } from "@/data/bionature-data";

export const Footer = () => {
  return (
    <footer className="bg-[#121A14] text-stone-300 border-t border-[#233527]">
      {/* Trust & Certifications Strip */}
      <div className="border-b border-[#233527] bg-[#162219] py-6 px-4">
        <div className="site-container grid grid-cols-2 md:grid-cols-4 gap-6 text-center md:text-left">
          <div className="flex items-center gap-3 justify-center md:justify-start">
            <div className="w-8 h-8 rounded-sm bg-[#1A2A1E] border border-[#2B4030] flex items-center justify-center text-[#8AA891] shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-stone-100 font-serif text-xs font-normal">
                ISO 9001:2015
              </h4>
              <p className="text-[11px] text-stone-400 font-sans">
                Quality Certified Manufacturing
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 justify-center md:justify-start">
            <div className="w-8 h-8 rounded-sm bg-[#1A2A1E] border border-[#2B4030] flex items-center justify-center text-[#8AA891] shrink-0">
              <Sprout className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-stone-100 font-serif text-xs font-normal">
                NPOP Organic Verified
              </h4>
              <p className="text-[11px] text-stone-400 font-sans">100% Residue-Free Inputs</p>
            </div>
          </div>

          <div className="flex items-center gap-3 justify-center md:justify-start">
            <div className="w-8 h-8 rounded-sm bg-[#1A2A1E] border border-[#2B4030] flex items-center justify-center text-[#8AA891] shrink-0">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-stone-100 font-serif text-xs font-normal">
                FCO &amp; CIB&amp;RC Approved
              </h4>
              <p className="text-[11px] text-stone-400 font-sans">
                Govt Regulatory Compliance
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 justify-center md:justify-start">
            <div className="w-8 h-8 rounded-sm bg-[#1A2A1E] border border-[#2B4030] flex items-center justify-center text-[#8AA891] shrink-0">
              <Phone className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-stone-100 font-serif text-xs font-normal">
                Agronomy Support
              </h4>
              <p className="text-[11px] text-stone-400 font-sans">
                Direct Farmer Advisory
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="site-container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10">
          {/* Brand & About */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-sm bg-[#245B35] border border-[#183F26] flex items-center justify-center text-white">
                <Sprout className="w-4 h-4" />
              </div>
              <span className="text-xl font-normal text-stone-100 font-serif tracking-tight">
                BioNature
                <span className="text-[10px] font-mono tracking-widest uppercase ml-1.5 px-1.5 py-0.5 bg-[#1C2C20] text-[#8AA891] border border-[#2A4030]">
                  India
                </span>
              </span>
            </div>
            <p className="text-xs text-stone-400 leading-relaxed max-w-sm font-sans">
              BioNature India develops biological fertilizers, natural crop
              protectors, plant nutrition, and bio-stimulants empowering Indian
              farmers with higher yields and regenerative soil health.
            </p>

            <div className="pt-2 space-y-2 text-xs text-stone-400 font-sans">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#8AA891] shrink-0 mt-0.5" />
                <span>{COMPANY_INFO.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#8AA891] shrink-0" />
                <a
                  href={`tel:${COMPANY_INFO.phone}`}
                  className="hover:text-stone-100 transition-colors"
                >
                  {COMPANY_INFO.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#8AA891] shrink-0" />
                <a
                  href={`mailto:${COMPANY_INFO.email}`}
                  className="hover:text-stone-100 transition-colors"
                >
                  {COMPANY_INFO.email}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-[#8AA891] shrink-0" />
                <span>{COMPANY_INFO.workingHours}</span>
              </div>
            </div>
          </div>

          {/* Product Categories */}
          <div>
            <span className="text-[11px] font-mono tracking-[0.16em] uppercase text-[#8AA891] font-semibold mb-4 block">
              Products
            </span>
            <ul className="space-y-2.5 text-xs text-stone-400">
              {CATEGORIES.slice(0, 6).map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={`/products?category=${encodeURIComponent(cat.name)}`}
                    className="hover:text-stone-100 transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
              <li className="pt-1">
                <Link
                  href="/products"
                  className="text-[#8AA891] hover:text-stone-100 transition-colors font-mono text-[11px] uppercase tracking-wider block"
                >
                  View All Products &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* Crop Solutions */}
          <div>
            <span className="text-[11px] font-mono tracking-[0.16em] uppercase text-[#8AA891] font-semibold mb-4 block">
              Crop Solutions
            </span>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li>
                <Link
                  href="/solutions/crops/tomato"
                  className="hover:text-stone-100 transition-colors"
                >
                  Tomato Solutions
                </Link>
              </li>
              <li>
                <Link
                  href="/solutions/crops/chilli"
                  className="hover:text-stone-100 transition-colors"
                >
                  Chilli Solutions
                </Link>
              </li>
              <li>
                <Link
                  href="/solutions/crops/cotton"
                  className="hover:text-stone-100 transition-colors"
                >
                  Cotton Protection
                </Link>
              </li>
              <li>
                <Link
                  href="/solutions/crops/banana"
                  className="hover:text-stone-100 transition-colors"
                >
                  Banana Nutrition
                </Link>
              </li>
              <li>
                <Link
                  href="/solutions/crops/paddy"
                  className="hover:text-stone-100 transition-colors"
                >
                  Paddy / Basmati Program
                </Link>
              </li>
              <li className="pt-1">
                <Link
                  href="/crop-diagnosis"
                  className="text-[#8AA891] hover:text-stone-100 transition-colors font-mono text-[11px] uppercase tracking-wider block"
                >
                  Crop Photo Diagnosis &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* Company & Dealership */}
          <div>
            <span className="text-[11px] font-mono tracking-[0.16em] uppercase text-[#8AA891] font-semibold mb-4 block">
              Company
            </span>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li>
                <Link
                  href="/about"
                  className="hover:text-stone-100 transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/infrastructure"
                  className="hover:text-stone-100 transition-colors"
                >
                  Infrastructure &amp; Plant
                </Link>
              </li>
              <li>
                <Link
                  href="/certifications"
                  className="hover:text-stone-100 transition-colors"
                >
                  Certifications
                </Link>
              </li>
              <li>
                <Link
                  href="/distributor"
                  className="hover:text-stone-100 transition-colors"
                >
                  Become a Distributor
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="hover:text-stone-100 transition-colors"
                >
                  Agri Knowledge Hub
                </Link>
              </li>
              <li>
                <Link
                  href="/resources"
                  className="hover:text-stone-100 transition-colors"
                >
                  Brochure Downloads
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-stone-100 transition-colors"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Copyright and Legal Bar */}
      <div className="border-t border-[#1C2C20] bg-[#0D140F] py-4 px-4 text-[11px] font-mono text-stone-500 uppercase tracking-wider">
        <div className="site-container flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>
            &copy; {new Date().getFullYear()} BioNature India Pvt Ltd. All rights
            reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/privacy"
              className="hover:text-stone-300 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-stone-300 transition-colors">
              Terms &amp; Conditions
            </Link>
            <Link
              href="/disclaimer"
              className="hover:text-stone-300 transition-colors"
            >
              Agricultural Disclaimer
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

