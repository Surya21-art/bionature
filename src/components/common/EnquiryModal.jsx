import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Sprout, CheckCircle2, MessageCircle, Send, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { BioNatureStore } from "@/services/store";
import { COMPANY_INFO } from "@/data/bionature-data";
import { toast } from "sonner";

const enquirySchema = z.object({
  name: z.string().min(2, "Please enter your full name"),
  phone: z
    .string()
    .regex(
      /^[6-9]\d{9}$/,
      "Please enter a valid 10-digit Indian mobile number",
    ),
  email: z.string().email("Invalid email address").optional().or(z.literal("")),
  location: z.string().min(2, "Please enter your location or district"),
  crop: z.string().optional(),
  quantity: z.string().optional(),
  message: z.string().optional(),
});

export const EnquiryModal = ({
  open,
  onOpenChange,
  product,
  defaultProductName,
  defaultProductSlug,
}) => {
  const [submitted, setSubmitted] = useState(false);

  const productName = product?.name || defaultProductName || "Biological Formulation";
  const rawCat = product?.category || "Bio-Fertilizer";
  const categoryName = rawCat.replace(/s$/i, "");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(enquirySchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      location: "",
      crop: "",
      quantity: "",
      message: "",
    },
  });

  // Reset submitted state when opening for a new product
  useEffect(() => {
    if (open) {
      setSubmitted(false);
      reset({
        name: "",
        phone: "",
        email: "",
        location: "",
        crop: "",
        quantity: "",
        message: "",
      });
    }
  }, [open, productName, reset]);

  // Clean WhatsApp phone number and message
  const cleanWhatsapp = (COMPANY_INFO.whatsapp || "+91 956 6753 333").replace(/[^0-9]/g, "");
  const categoryPhrase = categoryName.toLowerCase().includes("fertilizer")
    ? "bio-fertilizer"
    : categoryName.toLowerCase();
  const whatsappText = `Hello, I am interested in ${productName} ${categoryPhrase}. Please share product details, pricing and availability.`;
  const whatsappUrl = `https://wa.me/${cleanWhatsapp}?text=${encodeURIComponent(whatsappText)}`;

  const onSubmit = async (data) => {
    try {
      BioNatureStore.submitEnquiry({
        name: data.name,
        mobile: data.phone,
        email: data.email || undefined,
        district: data.location,
        crop: data.crop || undefined,
        quantity: data.quantity || undefined,
        message: data.message || `Direct product inquiry for ${productName}`,
        productName: productName,
        productSlug: product?.slug || defaultProductSlug,
      });
      setSubmitted(true);
      toast.success(`Enquiry submitted for ${productName}`);
    } catch (e) {
      toast.error("Failed to submit enquiry. Please call our helpline directly.");
    }
  };

  const handleClose = () => {
    onOpenChange(false);
    setTimeout(() => {
      setSubmitted(false);
      reset();
    }, 300);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-lg p-5 sm:p-6 max-h-[92vh] overflow-y-auto bg-white text-stone-900 border border-stone-200/90 shadow-2xl rounded-none">
        
        {/* Editorial Modal Header */}
        <DialogHeader className="space-y-1.5 pb-3 border-b border-stone-200/80">
          <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-[#686861] font-semibold block">
            Product Enquiry
          </span>
          <DialogTitle className="text-xl sm:text-2xl font-serif font-normal text-stone-900">
            {submitted ? "Enquiry Received" : `Enquire About ${productName}`}
          </DialogTitle>
          <DialogDescription className="text-xs text-stone-500 font-sans">
            Direct agronomic and commercial inquiry. Our technical sales team will assist with specifications, dosage, and order dispatch.
          </DialogDescription>
        </DialogHeader>

        {submitted ? (
          /* Confirmation Screen */
          <div className="py-8 text-center space-y-4">
            <div className="w-14 h-14 bg-[#F1F3EC] border border-[#E7EBDD] text-[#245B35] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8 text-[#245B35]" />
            </div>
            
            <div className="space-y-2">
              <h3 className="text-lg font-serif font-normal text-stone-900">
                Thank you.
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 max-w-sm mx-auto leading-relaxed font-sans">
                Thank you. Our team will contact you regarding{" "}
                <strong>{productName}</strong>.
              </p>
            </div>

            <div className="pt-2">
              <Button
                onClick={handleClose}
                className="bg-[#245B35] hover:bg-[#183F26] text-white text-xs font-mono uppercase tracking-wider py-2.5 px-6 rounded-none shadow-none cursor-pointer"
              >
                Close Window
              </Button>
            </div>
          </div>
        ) : (
          /* Enquiry Form */
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-2">
            
            {/* Auto-populated Product & Category Summary */}
            <div className="bg-[#F1F3EC] border border-[#E7EBDD] p-3 grid grid-cols-2 gap-3 text-left">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-stone-400 block mb-0.5">
                  Product
                </span>
                <span className="text-sm font-serif font-medium text-stone-900 block truncate">
                  {productName}
                </span>
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-stone-400 block mb-0.5">
                  Category
                </span>
                <span className="text-xs font-sans font-medium text-[#245B35] block truncate">
                  {categoryName}
                </span>
              </div>
            </div>

            {/* Customer Name & Phone Number */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label htmlFor="enq-name" className="text-[11px] font-mono uppercase tracking-wider text-stone-700">
                  Customer Name *
                </Label>
                <Input
                  id="enq-name"
                  placeholder="e.g. Ramesh Patel"
                  {...register("name")}
                  className="text-xs rounded-none border-stone-300 focus-visible:ring-0 focus-visible:border-stone-600 h-9"
                />
                {errors.name && (
                  <p className="text-[10px] font-mono text-red-600">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div className="space-y-1">
                <Label htmlFor="enq-phone" className="text-[11px] font-mono uppercase tracking-wider text-stone-700">
                  Phone Number *
                </Label>
                <Input
                  id="enq-phone"
                  placeholder="10-digit mobile number"
                  {...register("phone")}
                  className="text-xs rounded-none border-stone-300 focus-visible:ring-0 focus-visible:border-stone-600 h-9"
                />
                {errors.phone && (
                  <p className="text-[10px] font-mono text-red-600">
                    {errors.phone.message}
                  </p>
                )}
              </div>
            </div>

            {/* Email & Location / District */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label htmlFor="enq-email" className="text-[11px] font-mono uppercase tracking-wider text-stone-700">
                  Email
                </Label>
                <Input
                  id="enq-email"
                  type="email"
                  placeholder="e.g. contact@farm.in"
                  {...register("email")}
                  className="text-xs rounded-none border-stone-300 focus-visible:ring-0 focus-visible:border-stone-600 h-9"
                />
                {errors.email && (
                  <p className="text-[10px] font-mono text-red-600">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="space-y-1">
                <Label htmlFor="enq-location" className="text-[11px] font-mono uppercase tracking-wider text-stone-700">
                  Location / District *
                </Label>
                <Input
                  id="enq-location"
                  placeholder="e.g. Salem, Tamil Nadu"
                  {...register("location")}
                  className="text-xs rounded-none border-stone-300 focus-visible:ring-0 focus-visible:border-stone-600 h-9"
                />
                {errors.location && (
                  <p className="text-[10px] font-mono text-red-600">
                    {errors.location.message}
                  </p>
                )}
              </div>
            </div>

            {/* Crop & Required Quantity */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label htmlFor="enq-crop" className="text-[11px] font-mono uppercase tracking-wider text-stone-700">
                  Crop
                </Label>
                <Input
                  id="enq-crop"
                  placeholder="e.g. Rice, Wheat, Tomato, Cotton"
                  {...register("crop")}
                  className="text-xs rounded-none border-stone-300 focus-visible:ring-0 focus-visible:border-stone-600 h-9"
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="enq-qty" className="text-[11px] font-mono uppercase tracking-wider text-stone-700">
                  Required Quantity
                </Label>
                <Input
                  id="enq-qty"
                  placeholder="e.g. 50 Litres / 10 Acres"
                  {...register("quantity")}
                  className="text-xs rounded-none border-stone-300 focus-visible:ring-0 focus-visible:border-stone-600 h-9"
                />
              </div>
            </div>

            {/* Message */}
            <div className="space-y-1">
              <Label htmlFor="enq-message" className="text-[11px] font-mono uppercase tracking-wider text-stone-700">
                Message
              </Label>
              <Textarea
                id="enq-message"
                rows={2}
                placeholder="Mention specific crop acreage, field problem, or dealership enquiry..."
                {...register("message")}
                className="text-xs rounded-none border-stone-300 focus-visible:ring-0 focus-visible:border-stone-600 resize-none"
              />
            </div>

            {/* Primary Action Button */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#245B35] hover:bg-[#183F26] text-white text-xs font-mono uppercase tracking-wider font-semibold py-3 rounded-none shadow-none transition-colors cursor-pointer"
            >
              {isSubmitting ? "Sending..." : "SEND ENQUIRY"}
            </Button>

            {/* Subtle Divider */}
            <div className="relative flex py-1 items-center">
              <div className="flex-grow border-t border-stone-200"></div>
              <span className="flex-shrink mx-3 text-[10px] font-mono uppercase text-stone-400">
                or
              </span>
              <div className="flex-grow border-t border-stone-200"></div>
            </div>

            {/* WhatsApp Option */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full"
            >
              <Button
                type="button"
                variant="outline"
                className="w-full border border-stone-300 hover:border-stone-500 text-stone-800 hover:bg-stone-50 text-xs font-mono uppercase tracking-wider font-semibold py-3 rounded-none shadow-none flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <MessageCircle className="w-3.5 h-3.5 text-[#245B35]" />
                <span>ENQUIRE ON WHATSAPP</span>
              </Button>
            </a>

            <div className="text-[10px] font-mono text-stone-400 text-center pt-1">
              Official Helpline: {COMPANY_INFO.phone} &bull; No Obligation Formulation Advice
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

