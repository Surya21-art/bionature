import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Stethoscope,
  UploadCloud,
  CheckCircle2,
  X,
  Image as ImageIcon,
  Search,
  Sparkles,
  Bot,
  AlertTriangle,
} from "lucide-react";
import { CROPS } from "@/data/bionature-data";
import { BioNatureStore, useBioNatureStore } from "@/services/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
const diagnosisSchema = z.object({
  farmerName: z.string().min(2, "Name must be at least 2 characters"),
  mobile: z
    .string()
    .regex(
      /^[6-9]\d{9}$/,
      "Please enter a valid 10-digit Indian mobile number",
    ),
  email: z.string().email("Invalid email").optional().or(z.literal("")),
  state: z.string().min(2, "State is required"),
  district: z.string().min(2, "District is required"),
  crop: z.string().min(1, "Please select the crop being grown"),
  cropAge: z
    .string()
    .min(1, "Crop stage / age is required (e.g. 35 days / flowering)"),
  problemDescription: z
    .string()
    .min(10, "Please describe the symptoms observed (at least 10 characters)"),
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
export const CropDiagnosis = () => {
  const { store } = useBioNatureStore();
  const [uploadedImages, setUploadedImages] = useState([]);
  const [submittedTicket, setSubmittedTicket] = useState(null);
  // Status Lookup state
  const [lookupRef, setLookupRef] = useState("");
  const [searchedTicket, setSearchedTicket] = useState(null);
  const [lookupError, setLookupError] = useState("");

  // Gemini AI Analysis State
  const [aiAnalysis, setAiAnalysis] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    setValue,
    formState: { errors, isSubmitting, isSubmitted, touchedFields },
  } = useForm({
    resolver: zodResolver(diagnosisSchema),
    mode: "onTouched",
    defaultValues: {
      farmerName: "",
      mobile: "",
      email: "",
      state: "",
      district: "",
      crop: "",
      cropAge: "",
      problemDescription: "",
    },
  });

  const shouldShowError = (field) => Boolean(errors[field] && (touchedFields[field] || isSubmitted));

  const handleAiDiagnose = async () => {
    const cropValue = getValues("crop");
    const descValue = getValues("problemDescription");

    if (!cropValue && !descValue && uploadedImages.length === 0) {
      toast.error("Please select a crop, describe symptoms, or upload a photo to run Gemini AI analysis.");
      return;
    }

    try {
      setIsAnalyzing(true);
      const res = await fetch("/api/ai/diagnose", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          crop: cropValue || "General Crop",
          symptoms: descValue || "Visual leaf damage observed in photo",
          imageBase64: uploadedImages[0] || null,
        }),
      });

      const data = await res.json();
      if (data.success && data.data?.data) {
        setAiAnalysis(data.data.data);
        toast.success("✨ Gemini AI Crop Diagnosis complete!");
      } else {
        toast.error("Could not complete AI diagnosis.");
      }
    } catch (e) {
      toast.error("Failed to connect to AI diagnosis service.");
    } finally {
      setIsAnalyzing(false);
    }
  };
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size must be under 5 MB");
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setUploadedImages((prev) => [...prev, event.target.result]);
        }
      };
      reader.readAsDataURL(file);
    }
  };
  const handleRemoveImage = (index) => {
    setUploadedImages((prev) => prev.filter((_, i) => i !== index));
  };
  const onSubmit = async (data) => {
    try {
      const ticket = BioNatureStore.submitDiagnosis({
        farmerName: data.farmerName,
        mobile: data.mobile,
        email: data.email || undefined,
        state: data.state,
        district: data.district,
        crop: data.crop,
        cropAge: data.cropAge,
        problemDescription: data.problemDescription,
        imageUrls:
          uploadedImages.length > 0
            ? uploadedImages
            : [
                "https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?w=600&auto=format&fit=crop&q=80",
              ],
      });
      setSubmittedTicket(ticket);
      toast.success(
        `Diagnosis request registered! Reference Number: ${ticket.referenceNumber}`,
      );
      reset();
      setUploadedImages([]);
    } catch (e) {
      toast.error(
        "Failed to submit diagnosis ticket. Please contact helpline.",
      );
    }
  };
  const handleSearchTicket = (e) => {
    e.preventDefault();
    setLookupError("");
    setSearchedTicket(null);
    if (!lookupRef.trim()) {
      setLookupError("Please provide a Reference ID");
      return;
    }
    const t = store.getDiagnosisByReference(lookupRef.trim());
    if (t) {
      setSearchedTicket(t);
    } else {
      setLookupError(`No diagnosis ticket found for "${lookupRef}".`);
    }
  };
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      {/* Header Banner */}
      <div className="bg-[#183F26] text-white p-8 sm:p-12 border border-stone-800 space-y-3">
        <span className="inline-block text-[11px] font-mono tracking-[0.2em] uppercase text-[#E7EBDD] px-3 py-1 bg-white/10 border border-white/20">
          FIELD PATHOLOGY &bull; SCIENTIFIC ADVISORY
        </span>
        <h1 className="text-2xl sm:text-3xl font-serif font-normal text-white leading-snug">
          Farmer Crop Diagnosis Desk
        </h1>
        <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-sans max-w-2xl">
          Attach photographs of affected leaves, stems, or root systems. Senior agronomists analyze pathogen etiology and issue an actionable biological management calendar.
        </p>
      </div>

      {/* Success View */}
      {submittedTicket ? (
        <div className="bg-white rounded-sm border border-stone-200 p-8 sm:p-12 text-center space-y-4 max-w-2xl mx-auto">
          <div className="w-12 h-12 bg-stone-100 text-[#245B35] border border-stone-200 rounded-xs flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-6 h-6 text-[#245B35]" />
          </div>

          <h2 className="text-xl sm:text-2xl font-serif font-normal text-stone-900">
            Crop Diagnosis Request Submitted
          </h2>

          <div className="bg-stone-50 border border-stone-200 p-4 rounded-xs max-w-sm mx-auto space-y-1">
            <span className="text-[11px] font-mono uppercase text-stone-500 tracking-wider">
              Assigned Reference ID:
            </span>
            <div className="text-xl font-mono font-bold text-stone-900 tracking-wider">
              {submittedTicket.referenceNumber}
            </div>
            <p className="text-[11px] text-stone-500 font-sans">
              Save this reference code to track laboratory evaluation and protocol.
            </p>
          </div>

          <p className="text-xs text-stone-600 max-w-md mx-auto leading-relaxed font-sans">
            Our certified agronomists have been notified. An assessment report and biological schedule will be available in the portal within 4 business hours.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
            <Button
              onClick={() => setSubmittedTicket(null)}
              className="bg-[#245B35] hover:bg-[#183F26] text-white text-xs uppercase tracking-wider font-semibold rounded-none shadow-none"
            >
              Submit Another Request
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setLookupRef(submittedTicket.referenceNumber);
                setSearchedTicket(submittedTicket);
                setSubmittedTicket(null);
              }}
              className="text-xs uppercase tracking-wider font-semibold border-stone-300 rounded-none shadow-none text-stone-800"
            >
              View Ticket Details
            </Button>
          </div>
        </div>
      ) : (
        /* Two Column Layout: Form on Left, Lookup & Guidelines on Right */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Form */}
          <div className="lg:col-span-8 bg-white p-6 sm:p-8 rounded-sm border border-stone-200/90 shadow-none space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <h2 className="text-lg font-bold text-slate-900 font-serif">
                Submit Crop Information & Photos
              </h2>
              <p className="text-xs text-slate-500">
                All fields marked with * are required for scientific assessment.
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Farmer Name & Mobile */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label htmlFor="diag-name" className="text-xs">
                    Farmer Full Name *
                  </Label>
                  <Input
                    id="diag-name"
                    placeholder="e.g. Gurpreet Singh"
                    {...register("farmerName")}
                    className="text-xs"
                  />
                  {shouldShowError("farmerName") && (
                    <p className="text-[11px] text-red-500">
                      {errors.farmerName.message}
                    </p>
                  )}
                </div>

                <div className="space-y-1">
                  <Label htmlFor="diag-mob" className="text-xs">
                    Mobile Number (10 Digits) *
                  </Label>
                  <Input
                    id="diag-mob"
                    placeholder="98XXXXXXXX"
                    {...register("mobile")}
                    className="text-xs"
                  />
                  {shouldShowError("mobile") && (
                    <p className="text-[11px] text-red-500">
                      {errors.mobile.message}
                    </p>
                  )}
                </div>
              </div>

              {/* State & District */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label htmlFor="diag-state" className="text-xs">
                    Farm State *
                  </Label>
                  <select
                    id="diag-state"
                    {...register("state")}
                    className="w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-xs shadow-sm focus:outline-none"
                  >
                    <option value="">Select State</option>
                    {INDIAN_STATES.map((st) => (
                      <option key={st} value={st}>
                        {st}
                      </option>
                    ))}
                  </select>
                  {shouldShowError("state") && (
                    <p className="text-[11px] text-red-500">
                      {errors.state.message}
                    </p>
                  )}
                </div>

                <div className="space-y-1">
                  <Label htmlFor="diag-district" className="text-xs">
                    District / Taluka *
                  </Label>
                  <Input
                    id="diag-district"
                    placeholder="e.g. Bathinda, Guntur, Nashik"
                    {...register("district")}
                    className="text-xs"
                  />
                  {shouldShowError("district") && (
                    <p className="text-[11px] text-red-500">
                      {errors.district.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Crop & Crop Age */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label htmlFor="diag-crop" className="text-xs">
                    Crop *
                  </Label>
                  <select
                    id="diag-crop"
                    {...register("crop")}
                    className="w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-xs shadow-sm focus:outline-none"
                  >
                    <option value="">Select Crop</option>
                    {CROPS.map((c) => (
                      <option key={c.id} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                    <option value="Other Commercial Crop">
                      Other Commercial Crop
                    </option>
                  </select>
                  {shouldShowError("crop") && (
                    <p className="text-[11px] text-red-500">
                      {errors.crop.message}
                    </p>
                  )}
                </div>

                <div className="space-y-1">
                  <Label htmlFor="diag-age" className="text-xs">
                    Crop Age / Growth Stage *
                  </Label>
                  <Input
                    id="diag-age"
                    placeholder="e.g. 40 Days / Flowering / Fruit Sizing"
                    {...register("cropAge")}
                    className="text-xs"
                  />
                  {shouldShowError("cropAge") && (
                    <p className="text-[11px] text-red-500">
                      {errors.cropAge.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Problem Description */}
              <div className="space-y-1">
                <Label htmlFor="diag-desc" className="text-xs">
                  Detailed Symptoms & Observations *
                </Label>
                <Textarea
                  id="diag-desc"
                  rows={3}
                  placeholder="Describe leaf yellowing, spots, insect presence, root condition, or blossom drop..."
                  {...register("problemDescription")}
                  className="text-xs"
                />
                {shouldShowError("problemDescription") && (
                  <p className="text-[11px] text-red-500">
                    {errors.problemDescription.message}
                  </p>
                )}
              </div>

              {/* Photo Upload Area */}
              <div className="space-y-2 pt-1">
                <Label className="text-xs flex items-center justify-between">
                  <span>Upload Affected Crop Images (JPG, PNG, WEBP)</span>
                  <span className="text-[10px] text-slate-400">
                    Max 5MB each
                  </span>
                </Label>

                <div className="border-2 border-dashed border-slate-200 hover:border-emerald-500 rounded-2xl p-6 text-center transition-colors bg-slate-50/50 relative cursor-pointer">
                  <input
                    type="file"
                    accept="image/png, image/jpeg, image/webp"
                    onChange={handleFileChange}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                  />
                  <UploadCloud className="w-8 h-8 text-emerald-600 mx-auto mb-1.5" />
                  <p className="text-xs font-semibold text-slate-800">
                    Click to browse or drag & drop crop photographs
                  </p>
                  <p className="text-[11px] text-slate-400">
                    Take close-up shots of leaves, damaged stems, or exposed
                    root collar
                  </p>
                </div>

                {/* Uploaded Previews */}
                {uploadedImages.length > 0 && (
                  <div className="flex flex-wrap gap-3 pt-2">
                    {uploadedImages.map((img, idx) => (
                      <div
                        key={idx}
                        className="relative w-20 h-20 rounded-xl overflow-hidden border border-slate-200 shadow-sm group"
                      >
                        <img
                          src={img}
                          alt="preview"
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(idx)}
                          className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-0.5 hover:bg-red-700"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Gemini AI Interactive Diagnosis Card */}
              <div className="bg-[#183F26] text-white p-5 rounded-sm border border-stone-800 space-y-3">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xs bg-white/10 border border-white/20 flex items-center justify-center text-[#E7EBDD] shrink-0">
                      <Sparkles className="w-4 h-4 text-[#E7EBDD]" />
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-serif text-white flex items-center gap-2">
                        Agronomic Image Recognition Analysis
                        <span className="text-[10px] font-mono uppercase tracking-wider bg-white/10 text-[#E7EBDD] px-1.5 py-0.5 rounded-none border border-white/20">
                          Assisted
                        </span>
                      </h4>
                      <p className="text-[11px] text-stone-300 font-sans">
                        Instant pathogen identification & biological recommendation
                      </p>
                    </div>
                  </div>

                  <Button
                    type="button"
                    onClick={handleAiDiagnose}
                    disabled={isAnalyzing}
                    className="w-full sm:w-auto bg-[#245B35] hover:bg-[#183F26] text-white text-xs uppercase tracking-wider font-semibold px-4 py-2 rounded-none shadow-none shrink-0"
                  >
                    {isAnalyzing ? (
                      <span className="flex items-center gap-1.5">
                        <span className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Scanning Pathology...
                      </span>
                    ) : (
                      <span className="flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-emerald-200" />
                        Scan Crop Pathology
                      </span>
                    )}
                  </Button>
                </div>

                {/* AI Result Card */}
                {aiAnalysis && (
                  <div className="bg-white/5 rounded-none p-4 border border-white/15 text-xs space-y-2.5 mt-2">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-2">
                      <div>
                        <span className="text-[10px] font-mono text-emerald-300 uppercase tracking-wider font-semibold">
                          Identified Pathology
                        </span>
                        <div className="text-sm font-serif font-normal text-white flex items-center gap-2">
                          {aiAnalysis.diseaseName}
                          <span className="bg-white/10 text-stone-200 text-[10px] font-mono px-1.5 py-0.5 border border-white/20">
                            {aiAnalysis.confidenceScore}% Match
                          </span>
                        </div>
                        <div className="text-[11px] font-mono text-stone-300 italic">
                          {aiAnalysis.scientificName}
                        </div>
                      </div>
                      <span
                        className={`inline-block px-2.5 py-0.5 text-[10px] font-mono uppercase self-start sm:self-auto border ${
                          aiAnalysis.severity === "Severe"
                            ? "bg-red-950/60 text-red-200 border-red-800"
                            : aiAnalysis.severity === "Moderate"
                              ? "bg-amber-950/60 text-amber-200 border-amber-800"
                              : "bg-emerald-950/60 text-emerald-200 border-emerald-800"
                        }`}
                      >
                        {aiAnalysis.severity} Severity
                      </span>
                    </div>

                    <p className="text-[11px] text-stone-300 leading-relaxed font-sans">
                      {aiAnalysis.symptomAnalysis}
                    </p>

                    <div className="bg-white/5 p-3 border border-white/15 space-y-1 font-mono text-xs">
                      <div className="text-[10px] text-emerald-300 uppercase tracking-wider">
                        BioNature Biological Treatment:
                      </div>
                      <div className="text-xs font-semibold text-white">
                        {aiAnalysis.recommendedBioNatureProduct}
                      </div>
                      <div className="text-[11px] text-stone-300">
                        <strong>Dosage:</strong> {aiAnalysis.recommendedDosage} ({aiAnalysis.applicationMode})
                      </div>
                      <div className="text-[11px] text-stone-300">
                        <strong>Immediate Field Action:</strong> {aiAnalysis.immediateAction}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#245B35] hover:bg-[#183F26] text-white text-xs uppercase tracking-wider font-semibold py-4 rounded-none shadow-none transition-colors"
              >
                {isSubmitting
                  ? "Registering Diagnosis..."
                  : "Submit for Scientific Diagnosis"}
              </Button>
            </form>
          </div>

          {/* Right Sidebar: Ticket Tracking & Guidelines */}
          <div className="lg:col-span-4 space-y-6">
            {/* Ticket Lookup Box */}
            <div className="bg-white p-6 rounded-sm border border-stone-200/90 shadow-none space-y-4">
              <h3 className="text-xs font-mono uppercase tracking-wider text-stone-900 font-semibold flex items-center gap-2">
                <Search className="w-3.5 h-3.5 text-emerald-800" />
                Track Submitted Ticket
              </h3>
              <p className="text-xs text-stone-500 font-sans">
                Check whether our agronomists have responded to your inquiry.
              </p>

              <form onSubmit={handleSearchTicket} className="space-y-2">
                <Input
                  value={lookupRef}
                  onChange={(e) => setLookupRef(e.target.value)}
                  placeholder="e.g. BN-DIAG-8492"
                  className="text-xs font-mono uppercase rounded-none border-stone-300"
                />
                <Button
                  type="submit"
                  size="sm"
                  variant="outline"
                  className="w-full text-xs uppercase tracking-wider font-semibold rounded-none border-stone-300 text-stone-800 hover:bg-stone-50"
                >
                  Track Status
                </Button>
              </form>

              {lookupError && (
                <div className="text-[11px] font-mono text-red-700 bg-red-50 p-2.5 border border-red-200">
                  {lookupError}
                </div>
              )}

              {searchedTicket && (
                <div className="bg-stone-50 p-3.5 rounded-none border border-stone-200 space-y-2 text-xs font-mono">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-emerald-950">
                      {searchedTicket.referenceNumber}
                    </span>
                    <span className="text-[10px] uppercase px-1.5 py-0.5 bg-white border border-stone-300">
                      {searchedTicket.status}
                    </span>
                  </div>
                  <div className="text-stone-600">
                    Crop: {searchedTicket.crop} ({searchedTicket.cropAge})
                  </div>
                  {searchedTicket.expertNotes && (
                    <div className="bg-white p-2.5 border border-stone-200 text-stone-800">
                      Advice: {searchedTicket.expertNotes}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Photography Best Practices */}
            <div className="bg-stone-50 p-6 rounded-sm border border-stone-200/90 space-y-3">
              <h3 className="text-xs font-mono uppercase tracking-wider text-stone-900 font-semibold flex items-center gap-1.5">
                <ImageIcon className="w-3.5 h-3.5 text-stone-600" />
                Guidelines for Field Photos
              </h3>
              <ul className="text-xs text-stone-600 space-y-2 font-sans">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-800 font-bold">&bull;</span>
                  <span>Capture both upper and lower surfaces of affected leaves.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-800 font-bold">&bull;</span>
                  <span>Photograph in natural daylight without harsh direct flash shadows.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-800 font-bold">&bull;</span>
                  <span>Include a wider shot showing whole-plant habit or patch pattern in field.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
