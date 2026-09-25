import React, { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Search,
  Phone,
  MessageCircle,
  Menu,
  X,
  ShieldCheck,
  Award,
  BookOpen,
  FileText,
  UserCheck,
  Stethoscope,
  Building2,
  Users,
} from "lucide-react";
import { COMPANY_INFO, CATEGORIES } from "@/data/bionature-data";
import { Button } from "@/components/ui/button";
import { AnimatedDropdown } from "@/components/ui/animated-dropdown";
export const Header = ({ onOpenSearch, onOpenEnquiry }) => {
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  // Close mobile menu on Escape key and prevent background scrolling
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [mobileMenuOpen]);

  // Filter only categories with active commercial products
  const activeCategories = CATEGORIES.filter((cat) => cat.count && cat.count > 0);

  return (
    <>
      {/* Top Notification Bar */}
      <div className="bg-[#183F26] text-stone-200 text-[11px] py-1.5 px-4 hidden md:block border-b border-[#245B35]/40 font-sans">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-5">
            <span className="flex items-center gap-1.5 font-medium text-stone-100">
              <ShieldCheck className="w-3.5 h-3.5 text-[#E7EBDD]" />
              Quality Tested Biological Inputs &bull; Sustainable Crop Solutions
            </span>
            <span className="text-emerald-400/60">&bull;</span>
            <span className="text-stone-300">
              Residue-Free &bull; High Viability Microbial Formulations
            </span>
          </div>
          <div className="flex items-center gap-4 text-stone-200">
            <a
              href={`tel:${COMPANY_INFO.phone}`}
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#E7EBDD]" />
              <span>Helpline: {COMPANY_INFO.phone}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header
        className={`sticky top-0 z-40 w-full transition-shadow duration-200 bg-white/95 backdrop-blur-md border-b border-stone-200/90 py-2.5 sm:py-3.5 ${isScrolled ? "shadow-sm" : ""}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3 sm:gap-4">
          {/* Logo (Visible on both mobile and desktop) */}
          <Link
            href="/"
            className="flex items-center gap-2.5 sm:gap-3.5 group shrink-0"
          >
            {/* BioNature Logo */}
            <div className="w-9 h-9 sm:w-11 sm:h-11 relative overflow-hidden rounded-full border border-stone-300 bg-white p-1 shrink-0">
              <img
                src="/bionature-logo.svg"
                alt="BioNature Logo"
                className="w-full h-full object-contain"
              />
            </div>

            {/* Company Name */}
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-lg sm:text-xl font-normal tracking-tight text-stone-900 font-serif leading-none">
                  BioNature
                </span>
                <span className="text-[9px] sm:text-[10px] font-mono font-semibold tracking-wider text-[#245B35] bg-[#F1F3EC] px-1.5 py-0.5 border border-[#E7EBDD]">
                  INDIA
                </span>
              </div>
              <span className="text-[10px] font-mono tracking-wider text-stone-500 hidden sm:block mt-0.5 uppercase">
                Agriscience &bull; Est. 2012
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-sm font-medium text-stone-700">
            <Link
              href="/"
              className={`px-3 py-1.5 rounded-sm hover:text-[#245B35] hover:bg-stone-100/70 transition-colors ${location === "/" ? "text-[#245B35] font-semibold bg-stone-100/90" : "text-stone-700"}`}
            >
              Home
            </Link>

            {/* Products Dropdown */}
            <AnimatedDropdown
              trigger={<span>Products</span>}
              isActive={location.startsWith("/product")}
              items={[
                {
                  label: "All Products Catalog",
                  href: "/products",
                  icon: (
                    <div className="w-4 h-4 bg-emerald-600 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  ),
                  description: "Browse our complete product range",
                },
                { separator: true, label: "" },
                ...activeCategories.map((cat) => ({
                  label: cat.name,
                  href: `/products?category=${encodeURIComponent(cat.name)}`,
                  description: `${cat.count} commercial formulation${cat.count > 1 ? "s" : ""}`,
                })),
                { separator: true, label: "" },
                {
                  label: "Smart Product Finder",
                  href: "/smart-finder",
                  badge: "Finder",
                  description: "Find the matching biological input for your crop",
                },
              ]}
            />

            {/* Solutions Dropdown */}
            <AnimatedDropdown
              trigger={<span>Solutions</span>}
              isActive={location.startsWith("/solutions")}
              items={[
                {
                  label: "Solutions Overview",
                  href: "/solutions",
                  description: "Comprehensive agricultural solutions",
                },
                { separator: true, label: "" },
                {
                  label: "Solutions by Crop",
                  href: "/solutions#crops",
                  icon: (
                    <div className="w-4 h-4 bg-emerald-600 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  ),
                  description: "Targeted solutions for 10+ crops",
                },
                {
                  label: "Solutions by Problem",
                  href: "/solutions#problems",
                  icon: <ShieldCheck className="w-4 h-4" />,
                  description: "Problem-specific treatments",
                },
                {
                  label: "Interactive Solution Finder",
                  href: "/smart-finder",
                  icon: <Search className="w-4 h-4" />,
                  badge: "Smart",
                  description: "AI-powered recommendation engine",
                },
              ]}
            />

            {/* Farmer Help Center Dropdown */}
            <AnimatedDropdown
              trigger={<span>Farmer Help</span>}
              isActive={
                location.startsWith("/farmer-help") ||
                location.startsWith("/crop-diagnosis")
              }
              items={[
                {
                  label: "Farmer Help Center Hub",
                  href: "/farmer-help",
                  icon: <UserCheck className="w-4 h-4" />,
                  description: "Complete support center for farmers",
                },
                {
                  label: "Crop Photo Diagnosis Tool",
                  href: "/crop-diagnosis",
                  icon: <Stethoscope className="w-4 h-4" />,
                  badge: "AI",
                  description: "Upload crop photos for instant diagnosis",
                },
                {
                  label: "Track Diagnosis Ticket",
                  href: "/farmer-help#tracking",
                  description: "Track your diagnosis by ticket ID",
                },
              ]}
            />

            {/* About Us Dropdown */}
            <AnimatedDropdown
              trigger={<span>About</span>}
              isActive={
                location === "/about" ||
                location === "/infrastructure" ||
                location === "/certifications" ||
                location === "/awards" ||
                location === "/testimonials"
              }
              items={[
                {
                  label: "Who We Are & Mission",
                  href: "/about",
                  description: "Our story and agricultural mission",
                },
                {
                  label: "R&D & Manufacturing Plant",
                  href: "/infrastructure",
                  icon: <Building2 className="w-4 h-4" />,
                  description: "State-of-the-art facilities",
                },
                {
                  label: "Quality & Certifications",
                  href: "/certifications",
                  icon: <ShieldCheck className="w-4 h-4" />,
                  description: "ISO 9001:2015 & NPOP certified",
                },
                {
                  label: "Awards & Honors",
                  href: "/awards",
                  icon: <Award className="w-4 h-4" />,
                  description: "Recognition and achievements",
                },
                {
                  label: "Farmer Testimonials",
                  href: "/testimonials",
                  icon: <Users className="w-4 h-4" />,
                  description: "Success stories from farmers",
                },
              ]}
            />

            {/* Resources Dropdown */}
            <AnimatedDropdown
              trigger={<span>Resources</span>}
              isActive={
                location.startsWith("/blog") ||
                location === "/resources" ||
                location === "/gallery" ||
                location === "/videos"
              }
              items={[
                {
                  label: "Agri Blog & Knowledge Hub",
                  href: "/blog",
                  icon: <BookOpen className="w-4 h-4" />,
                  description: "Latest agricultural insights",
                },
                {
                  label: "Downloads & Dosage Charts",
                  href: "/resources",
                  icon: <FileText className="w-4 h-4" />,
                  description: "Technical resources and guides",
                },
                {
                  label: "Field Photo Gallery",
                  href: "/gallery",
                  description: "Success stories in images",
                },
                {
                  label: "Application Videos",
                  href: "/videos",
                  description: "How-to and demonstration videos",
                },
              ]}
            />

            <Link
              href="/distributor"
              className={`px-3 py-1.5 rounded-sm hover:text-emerald-900 hover:bg-stone-100/70 transition-colors ${location === "/distributor" ? "text-emerald-900 font-semibold bg-stone-100/90" : "text-stone-700"}`}
            >
              Dealership
            </Link>

            <Link
              href="/contact"
              className={`px-3 py-1.5 rounded-sm hover:text-emerald-900 hover:bg-stone-100/70 transition-colors ${location === "/contact" ? "text-emerald-900 font-semibold bg-stone-100/90" : "text-stone-700"}`}
            >
              Contact
            </Link>
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search Trigger */}
            <button
              onClick={onOpenSearch}
              className="p-2 text-stone-600 bg-white border border-stone-200/90 hover:border-stone-400 hover:text-stone-900 rounded-sm transition-colors flex items-center gap-1.5"
              title="Search products, crops, and guides"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* WhatsApp CTA */}
            <a
              href={`https://wa.me/${COMPANY_INFO.whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent("Hello BioNature India team, I would like agricultural product and crop advice.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 bg-white text-stone-700 hover:text-emerald-900 text-xs font-medium px-3 py-2 rounded-sm border border-stone-200/90 hover:border-stone-400 transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-800" />
              <span>WhatsApp</span>
            </a>

            {/* Enquire Now CTA */}
            <Button
              onClick={() => onOpenEnquiry()}
              className="bg-[#245B35] hover:bg-[#183F26] text-white text-xs uppercase tracking-wider font-semibold px-4 py-2 rounded-sm shadow-none transition-colors"
            >
              Enquire
            </Button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-700 hover:text-emerald-700 rounded-lg hover:bg-slate-100"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Slide-Out Drawer Menu with Backdrop */}
        {mobileMenuOpen && (
          <>
            <div
              className="lg:hidden fixed inset-0 top-[60px] sm:top-[72px] bg-stone-900/40 z-30"
              onClick={() => setMobileMenuOpen(false)}
            />
            <div className="lg:hidden fixed inset-x-0 top-full bg-white border-b border-stone-200 shadow-xl max-h-[85vh] overflow-y-auto px-4 py-6 z-40 animate-in slide-in-from-top-2">
              <div className="space-y-3 font-sans">
                <Link
                  href="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2 text-base font-medium text-stone-900 border-b border-stone-100"
                >
                  Home
                </Link>
                <Link
                  href="/products"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2 text-base font-medium text-stone-900 border-b border-stone-100"
                >
                  All Products Catalogue
                </Link>
                <Link
                  href="/smart-finder"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2 text-base font-medium text-emerald-800 border-b border-stone-100"
                >
                  Smart Formulation Finder
                </Link>
                <Link
                  href="/solutions"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2 text-base font-medium text-stone-900 border-b border-stone-100"
                >
                  Solutions by Crop &amp; Problem
                </Link>
                <Link
                  href="/crop-diagnosis"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2 text-base font-medium text-stone-900 border-b border-stone-100"
                >
                  Crop Photo Diagnosis Tool
                </Link>
                <Link
                  href="/farmer-help"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2 text-base font-medium text-stone-900 border-b border-stone-100"
                >
                  Farmer Help Center
                </Link>
                <Link
                  href="/about"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2 text-base font-medium text-stone-900 border-b border-stone-100"
                >
                  About Us &amp; Infrastructure
                </Link>
                <Link
                  href="/distributor"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2 text-base font-medium text-stone-900 border-b border-stone-100"
                >
                  Become a Distributor
                </Link>
                <Link
                  href="/resources"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2 text-base font-medium text-stone-900 border-b border-stone-100"
                >
                  Downloads &amp; Brochures
                </Link>
                <Link
                  href="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2 text-base font-medium text-stone-900 border-b border-stone-100"
                >
                  Contact Us
                </Link>

                <div className="pt-3 flex flex-col gap-2 font-mono text-xs uppercase tracking-wider">
                  <a
                    href={`tel:${COMPANY_INFO.phone}`}
                    className="flex items-center justify-center gap-2 py-3 bg-stone-100 text-stone-800 rounded-none border border-stone-300 font-semibold"
                  >
                    <Phone className="w-4 h-4 text-emerald-800" />
                    Call Helpline: {COMPANY_INFO.phone}
                  </a>
                  <a
                    href={`https://wa.me/${COMPANY_INFO.whatsapp.replace(/[^0-9]/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 py-3 bg-[#245B35] hover:bg-[#183F26] text-white rounded-none font-semibold transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Chat on WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </>
        )}
      </header>
    </>
  );
};
