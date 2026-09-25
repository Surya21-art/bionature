import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  CheckCircle2,
  Building2,
} from "lucide-react";
import { COMPANY_INFO } from "@/data/bionature-data";
import { BioNatureStore } from "@/services/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  mobile: z
    .string()
    .regex(
      /^[6-9]\d{9}$/,
      "Please enter a valid 10-digit Indian mobile number",
    ),
  email: z
    .string()
    .email("Valid email is required")
    .optional()
    .or(z.literal("")),
  subject: z.string().min(3, "Subject is required"),
  enquiryType: z.string().min(1, "Please select an enquiry category"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});
export const Contact = () => {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitted, touchedFields },
  } = useForm({
    resolver: zodResolver(contactSchema),
    mode: "onTouched",
    defaultValues: {
      name: "",
      mobile: "",
      email: "",
      subject: "",
      enquiryType: "Product Enquiry",
      message: "",
    },
  });

  const shouldShowError = (field) => Boolean(errors[field] && (touchedFields[field] || isSubmitted));
  const onSubmit = async (data) => {
    try {
      BioNatureStore.submitEnquiry({
        name: data.name,
        mobile: data.mobile,
        email: data.email || undefined,
        state: "Direct Contact Form",
        district: "National",
        enquiryType: data.enquiryType,
        message: `[Subject: ${data.subject}] ${data.message}`,
      });
      setSubmitted(true);
      toast.success(
        "Thank you! Your message has been received by our head office team.",
      );
      reset();
    } catch {
      toast.error("Failed to send message. Please call our helpline directly.");
    }
  };
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      {/* Header Banner */}
      <div className="bg-[#183F26] text-white p-8 sm:p-12 border border-stone-800 space-y-3">
        <span className="inline-block text-[11px] font-mono tracking-[0.2em] uppercase text-[#E7EBDD] px-3 py-1 bg-white/10 border border-white/20">
          COMMUNICATIONS &bull; DIRECT DISPATCH
        </span>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-normal text-white leading-[1.2]">
          Contact BioNature India
        </h1>
        <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-sans max-w-2xl">
          Have inquiries regarding microbial fertilizers, bulk institutional FPO supplies, or regional retail dealership? Connect with our corporate office or technical agronomy desk.
        </p>
      </div>

      {/* Main Grid: Contact Info + Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left 5 Cols: Contact Information */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-6 sm:p-8 rounded-sm border border-stone-200/90 space-y-6 shadow-none">
            <h2 className="text-lg font-serif font-normal text-stone-900">
              Corporate & Manufacturing Headquarters
            </h2>

            <div className="space-y-4 text-xs text-stone-600">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xs bg-[#F1F3EC] border border-[#E7EBDD] text-[#245B35] flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <strong className="text-stone-900 block mb-0.5 font-mono uppercase text-[11px]">
                    Plant & Office Address
                  </strong>
                  <p className="leading-relaxed font-sans">{COMPANY_INFO.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xs bg-[#F1F3EC] border border-[#E7EBDD] text-[#245B35] flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <strong className="text-stone-900 block mb-0.5 font-mono uppercase text-[11px]">
                    Agronomist Support Helpline
                  </strong>
                  <a
                    href={`tel:${COMPANY_INFO.phone}`}
                    className="text-[#245B35] hover:text-[#183F26] font-medium hover:underline font-mono"
                  >
                    {COMPANY_INFO.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xs bg-[#F1F3EC] border border-[#E7EBDD] text-[#245B35] flex items-center justify-center shrink-0">
                  <MessageCircle className="w-4 h-4" />
                </div>
                <div>
                  <strong className="text-stone-900 block mb-0.5 font-mono uppercase text-[11px]">
                    Official WhatsApp Field Desk
                  </strong>
                  <a
                    href={`https://wa.me/${COMPANY_INFO.whatsapp.replace(/[^0-9]/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#245B35] hover:text-[#183F26] font-medium hover:underline font-mono"
                  >
                    {COMPANY_INFO.whatsapp}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xs bg-[#F1F3EC] border border-[#E7EBDD] text-[#245B35] flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <strong className="text-stone-900 block mb-0.5 font-mono uppercase text-[11px]">
                    Email Communications
                  </strong>
                  <a
                    href={`mailto:${COMPANY_INFO.email}`}
                    className="text-[#245B35] hover:text-[#183F26] font-medium hover:underline font-mono"
                  >
                    {COMPANY_INFO.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xs bg-stone-50 border border-stone-200 text-emerald-800 flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <strong className="text-stone-900 block mb-0.5 font-mono uppercase text-[11px]">
                    Working Hours
                  </strong>
                  <p className="font-mono text-[11px]">{COMPANY_INFO.workingHours}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Map Preview Container */}
          <div className="bg-stone-50 rounded-sm overflow-hidden border border-stone-200 aspect-[16/9] relative flex items-center justify-center text-stone-500 p-6 text-center">
            <div>
              <Building2 className="w-7 h-7 mx-auto mb-2 text-emerald-900 opacity-70" />
              <div className="text-xs font-serif text-stone-900">
                BioNature India Biotech Plant
              </div>
              <div className="text-[11px] font-mono text-stone-500 uppercase mt-0.5">
                Industrial Estate &bull; Salem, Tamil Nadu
              </div>
            </div>
          </div>
        </div>

        {/* Right 7 Cols: Contact Form */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-sm border border-stone-200/90 shadow-none space-y-6">
          <div>
            <h2 className="text-lg font-serif font-normal text-stone-900">
              Send an Official Enquiry
            </h2>
            <p className="text-xs text-stone-500 font-sans">
              Our executive agronomy and support team reviews queries within 4 business hours.
            </p>
          </div>

          {submitted ? (
            <div className="py-12 text-center space-y-3">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                Message Delivered!
              </h3>
              <p className="text-sm text-slate-600 max-w-md mx-auto">
                Thank you for contacting BioNature India. A team member has been
                assigned to your query.
              </p>
              <Button
                onClick={() => setSubmitted(false)}
                className="bg-emerald-600 text-white mt-4 text-xs"
              >
                Send Another Message
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label className="text-xs">Your Full Name *</Label>
                  <Input
                    placeholder="e.g. Rameshwar Patil"
                    {...register("name")}
                    className="text-xs"
                  />
                  {shouldShowError("name") && (
                    <p className="text-[11px] text-red-500">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div className="space-y-1">
                  <Label className="text-xs">Mobile Number (10 Digits) *</Label>
                  <Input
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label className="text-xs">Email Address (Optional)</Label>
                  <Input
                    type="email"
                    placeholder="name@domain.com"
                    {...register("email")}
                    className="text-xs"
                  />
                  {shouldShowError("email") && (
                    <p className="text-[11px] text-red-500">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div className="space-y-1">
                  <Label className="text-xs">Enquiry Department *</Label>
                  <select
                    {...register("enquiryType")}
                    className="w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-xs shadow-sm focus:outline-none"
                  >
                    <option value="Product Enquiry">
                      Product Enquiry & Pricing
                    </option>
                    <option value="Farmer Support">
                      Farmer Technical Support
                    </option>
                    <option value="Distributor">
                      Distributor / Dealership
                    </option>
                    <option value="Bulk Order">
                      Bulk Order (FPO / Institutional)
                    </option>
                    <option value="Technical Support">
                      R&D & Quality Query
                    </option>
                    <option value="General Enquiry">
                      General Corporate Query
                    </option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <Label className="text-xs">Subject / Purpose *</Label>
                <Input
                  placeholder="e.g. Price quote for Bio-NPK 500L supply"
                  {...register("subject")}
                  className="text-xs"
                />
                {shouldShowError("subject") && (
                  <p className="text-[11px] text-red-500">
                    {errors.subject.message}
                  </p>
                )}
              </div>

              <div className="space-y-1">
                <Label className="text-xs">Your Detailed Message *</Label>
                <Textarea
                  rows={4}
                  placeholder="Share details of your farm location, crops, or partnership requirement..."
                  {...register("message")}
                  className="text-xs"
                />
                {shouldShowError("message") && (
                  <p className="text-[11px] text-red-500">
                    {errors.message.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#245B35] hover:bg-[#183F26] text-white text-xs uppercase tracking-wider font-semibold py-4 rounded-none shadow-none transition-colors"
              >
                {isSubmitting ? "Dispatching Message..." : "Dispatch Message to BioNature Team"}
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
