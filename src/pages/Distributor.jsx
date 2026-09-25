import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  TrendingUp,
  ShieldCheck,
  Award,
  Users,
  CheckCircle2,
} from "lucide-react";
import { CATEGORIES } from "@/data/bionature-data";
import { BioNatureStore } from "@/services/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
const distributorSchema = z.object({
  name: z.string().min(2, "Name is required"),
  company: z.string().min(2, "Company / Firm name is required"),
  mobile: z
    .string()
    .regex(
      /^[6-9]\d{9}$/,
      "Please enter a valid 10-digit Indian mobile number",
    ),
  email: z.string().email("Valid email address is required"),
  state: z.string().min(2, "State is required"),
  district: z.string().min(2, "District is required"),
  currentBusiness: z.string().min(2, "Current business type is required"),
  yearsInBusiness: z.string().min(1, "Years in business is required"),
  interestedCategories: z
    .array(z.string())
    .min(1, "Please select at least one product category"),
  message: z.string().optional(),
});
const INDIAN_STATES = [
  "Andhra Pradesh",
  "Bihar",
  "Gujarat",
  "Haryana",
  "Karnataka",
  "Madhya Pradesh",
  "Maharashtra",
  "Punjab",
  "Rajasthan",
  "Tamil Nadu",
  "Telangana",
  "Uttar Pradesh",
  "West Bengal",
  "Other State / UT",
];
export const Distributor = () => {
  const [submitted, setSubmitted] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([
    "Bio Fertilizers",
    "Bio Fungicides",
  ]);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(distributorSchema),
    defaultValues: {
      interestedCategories: selectedCategories,
    },
  });
  const toggleCategory = (catName) => {
    let updated;
    if (selectedCategories.includes(catName)) {
      updated = selectedCategories.filter((c) => c !== catName);
    } else {
      updated = [...selectedCategories, catName];
    }
    setSelectedCategories(updated);
  };
  const onSubmit = async (data) => {
    try {
      BioNatureStore.submitDistributor({
        name: data.name,
        company: data.company,
        mobile: data.mobile,
        email: data.email,
        state: data.state,
        district: data.district,
        currentBusiness: data.currentBusiness,
        yearsInBusiness: data.yearsInBusiness,
        interestedCategories: selectedCategories,
        message: data.message,
      });
      setSubmitted(true);
      toast.success(
        "Dealership application received! Our state sales head will contact you within 24 hours.",
      );
      reset();
    } catch (e) {
      toast.error("Failed to submit dealership application.");
    }
  };
  return (
    <div className="site-container py-8 sm:py-12 space-y-12">
      {/* Hero Banner */}
      <div className="bg-[#183F26] text-white p-8 sm:p-12 border border-stone-800 space-y-3">
        <span className="inline-block text-[11px] font-mono tracking-[0.2em] uppercase text-[#E7EBDD] px-3 py-1 bg-white/10 border border-white/20">
          COMMERCIAL PARTNERSHIP &bull; AGRI-INPUT NETWORK
        </span>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-normal text-white leading-[1.2]">
          Grow Your Agricultural Business With BioNature India
        </h1>
        <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-sans max-w-2xl">
          Partner with an established manufacturer of certified biological fertilizers, microbial inoculants, and organic crop protectors. Enjoy competitive margins, territorial block rights, and agronomist support.
        </p>
      </div>

      {/* Value Proposition Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-sm border border-stone-200/90 space-y-3 shadow-none">
          <div className="w-9 h-9 rounded-xs bg-[#F1F3EC] border border-[#E7EBDD] text-[#245B35] flex items-center justify-center">
            <TrendingUp className="w-5 h-5" />
          </div>
          <h3 className="font-serif font-normal text-stone-900 text-base">
            Trade Margins & Logistics
          </h3>
          <p className="text-xs text-stone-600 leading-relaxed font-sans">
            Predictable inventory ROI with transparent volume discounts and prompt dispatch from regional manufacturing centers.
          </p>
        </div>

        <div className="bg-white p-6 rounded-sm border border-stone-200/90 space-y-3 shadow-none">
          <div className="w-9 h-9 rounded-xs bg-[#F1F3EC] border border-[#E7EBDD] text-[#245B35] flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="font-serif font-normal text-stone-900 text-base">
            Territorial Rights
          </h3>
          <p className="text-xs text-stone-600 leading-relaxed font-sans">
            Defined block and taluka-level distribution coverage protecting your established dealer network and farmer relationships.
          </p>
        </div>

        <div className="bg-white p-6 rounded-sm border border-stone-200/90 space-y-3 shadow-none">
          <div className="w-9 h-9 rounded-xs bg-[#F1F3EC] border border-[#E7EBDD] text-[#245B35] flex items-center justify-center">
            <Users className="w-5 h-5" />
          </div>
          <h3 className="font-serif font-normal text-stone-900 text-base">
            Farmer Field Campaigns
          </h3>
          <p className="text-xs text-stone-600 leading-relaxed font-sans">
            Our qualified agronomists organize village-level farmer meetings, demonstration plots, and crop clinic camps in your area.
          </p>
        </div>

        <div className="bg-white p-6 rounded-sm border border-stone-200/90 space-y-3 shadow-none">
          <div className="w-9 h-9 rounded-xs bg-[#F1F3EC] border border-[#E7EBDD] text-[#245B35] flex items-center justify-center">
            <Award className="w-5 h-5" />
          </div>
          <h3 className="font-serif font-normal text-stone-900 text-base">
            Regulatory Compliance
          </h3>
          <p className="text-xs text-stone-600 leading-relaxed font-sans">
            Complete statutory documentation, batch-wise FCO assay reports, verifiable test dossiers, and guaranteed shelf-stability.
          </p>
        </div>
      </div>

      {/* Main Application Form Container */}
      <div className="bg-white rounded-sm border border-stone-200/90 p-6 sm:p-10 shadow-none max-w-4xl mx-auto space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-1.5">
          <span className="text-[11px] font-mono tracking-wider uppercase text-[#686861] font-semibold block">
            REGISTRATION DOSSIER
          </span>
          <h2 className="text-xl sm:text-2xl font-serif font-normal text-stone-900">
            Distributor & Dealership Application
          </h2>
          <p className="text-xs text-stone-500 font-sans">
            Submit your firm&rsquo;s profile below. Our commercial sales director will evaluate territory availability within 24 hours.
          </p>
        </div>

        {submitted ? (
          <div className="py-12 text-center space-y-3">
            <div className="w-16 h-16 bg-[#F1F3EC] text-[#245B35] rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              Application Received!
            </h3>
            <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
              Thank you for your interest in partnering with BioNature India.
              Our regional distribution team will call your registered contact
              number to discuss terms and sample shipment.
            </p>
            <Button
              onClick={() => setSubmitted(false)}
              className="bg-[#245B35] hover:bg-[#183F26] text-white mt-4"
            >
              Submit Another Application
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Contact Person & Firm Name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label className="text-xs">Applicant Name *</Label>
                <Input
                  placeholder="e.g. Ramesh Chandra"
                  {...register("name")}
                  className="text-xs"
                />
                {errors.name && (
                  <p className="text-[11px] text-red-500">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div className="space-y-1">
                <Label className="text-xs">Firm / Company Name *</Label>
                <Input
                  placeholder="e.g. Kisan Agri Inputs Pvt Ltd"
                  {...register("company")}
                  className="text-xs"
                />
                {errors.company && (
                  <p className="text-[11px] text-red-500">
                    {errors.company.message}
                  </p>
                )}
              </div>
            </div>

            {/* Mobile & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label className="text-xs">Mobile Number (10 Digits) *</Label>
                <Input
                  placeholder="98XXXXXXXX"
                  {...register("mobile")}
                  className="text-xs"
                />
                {errors.mobile && (
                  <p className="text-[11px] text-red-500">
                    {errors.mobile.message}
                  </p>
                )}
              </div>

              <div className="space-y-1">
                <Label className="text-xs">Business Email Address *</Label>
                <Input
                  type="email"
                  placeholder="contact@yourbusiness.com"
                  {...register("email")}
                  className="text-xs"
                />
                {errors.email && (
                  <p className="text-[11px] text-red-500">
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>

            {/* State & District */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label className="text-xs">State *</Label>
                <select
                  {...register("state")}
                  className="w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-xs shadow-sm focus:outline-none"
                >
                  <option value="">Select State</option>
                  {INDIAN_STATES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
                {errors.state && (
                  <p className="text-[11px] text-red-500">
                    {errors.state.message}
                  </p>
                )}
              </div>

              <div className="space-y-1">
                <Label className="text-xs">District / Headquarter Town *</Label>
                <Input
                  placeholder="e.g. Nashik, Guntur, Karnal"
                  {...register("district")}
                  className="text-xs"
                />
                {errors.district && (
                  <p className="text-[11px] text-red-500">
                    {errors.district.message}
                  </p>
                )}
              </div>
            </div>

            {/* Current Business & Experience */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label className="text-xs">Current Business Type *</Label>
                <Input
                  placeholder="e.g. Wholesale Fertilizer Distributor, Retail Agrochemical Shop"
                  {...register("currentBusiness")}
                  className="text-xs"
                />
                {errors.currentBusiness && (
                  <p className="text-[11px] text-red-500">
                    {errors.currentBusiness.message}
                  </p>
                )}
              </div>

              <div className="space-y-1">
                <Label className="text-xs">
                  Years in Agricultural Business *
                </Label>
                <Input
                  placeholder="e.g. 5 Years, 12 Years"
                  {...register("yearsInBusiness")}
                  className="text-xs"
                />
                {errors.yearsInBusiness && (
                  <p className="text-[11px] text-red-500">
                    {errors.yearsInBusiness.message}
                  </p>
                )}
              </div>
            </div>

            {/* Categories of Interest */}
            <div className="space-y-2">
              <Label className="text-xs block">
                Interested Product Lines (Select all that apply) *
              </Label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => toggleCategory(cat.name)}
                    className={`p-2.5 border text-xs font-mono uppercase tracking-wider flex items-center justify-between text-left transition-colors ${
                      selectedCategories.includes(cat.name)
                        ? "bg-[#F1F3EC] border-[#245B35] text-[#245B35] font-semibold"
                        : "bg-white border-stone-200 text-stone-600 hover:bg-stone-50"
                    }`}
                  >
                    <span>{cat.name}</span>
                    {selectedCategories.includes(cat.name) && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#245B35] shrink-0" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Message */}
            <div className="space-y-1">
              <Label className="text-xs font-mono text-stone-500 uppercase tracking-wider">
                Proposed Territory & Current Dealer Network Details (Optional)
              </Label>
              <Textarea
                rows={3}
                placeholder="Mention number of sub-dealers, current turnover, key crops in your area..."
                {...register("message")}
                className="text-xs rounded-none border-stone-300"
              />
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#245B35] hover:bg-[#183F26] text-white text-xs uppercase tracking-wider font-semibold py-4 rounded-none shadow-none transition-colors"
            >
              {isSubmitting
                ? "Submitting Application Dossier..."
                : "Submit Dealership Application"}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
};
