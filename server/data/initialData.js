import { PRODUCTS, CATEGORIES } from "../../src/data/bionature-data.js";

export const INITIAL_PRODUCTS = PRODUCTS.map((p) => ({
  ...p,
  createdAt: new Date().toISOString(),
}));

export const INITIAL_CATEGORIES = CATEGORIES;

export const INITIAL_ENQUIRIES = [
  {
    id: "enq-1",
    name: "Rajesh Patil",
    mobile: "9822012345",
    email: "rajesh.patil@example.com",
    state: "Maharashtra",
    district: "Solapur",
    crop: "Pomegranate",
    productName: "Bio-NPK Liquid Consortia",
    productSlug: "bio-npk-liquid-consortia",
    enquiryType: "Product Inquiry",
    message: "Need bulk pricing for 50 liters Bio-NPK for bacterial blight management and root boosting.",
    status: "new",
    createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
  },
  {
    id: "enq-2",
    name: "Gurpreet Singh",
    mobile: "9814098765",
    email: "gurpreet@example.com",
    state: "Punjab",
    district: "Ludhiana",
    crop: "Wheat",
    productName: "Trichoderma Viride Bio-Fungicide",
    productSlug: "trichoderma-viride-bio-fungicide",
    enquiryType: "Technical Support",
    message: "Can Trichoderma be applied with irrigation water in standing wheat crop at first watering?",
    status: "contacted",
    createdAt: new Date(Date.now() - 3600000 * 28).toISOString(),
  },
];

export const INITIAL_DIAGNOSIS_RECORDS = [
  {
    id: "diag-1",
    referenceNumber: "BN-DIAG-4812",
    farmerName: "Balwinder Singh",
    mobile: "9876543210",
    email: "balwinder@example.com",
    state: "Punjab",
    district: "Bathinda",
    crop: "Cotton",
    cropAge: "45 Days",
    problemDescription: "Leaves turning pale yellow with dark curling at margins. Sucking insects visible under leaves.",
    imageUrls: [
      "https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?w=600&auto=format&fit=crop&q=80",
    ],
    status: "in_review",
    expertNotes: "Symptoms indicate early whitefly feeding combined with minor Zinc deficiency. Recommended Neem Shield 10,000 PPM + Chelated Zinc foliar spray.",
    recommendedProducts: [
      "neem-shield-bio-pesticide-10000-ppm",
      "chelated-multi-micronutrient-liquid",
    ],
    createdAt: new Date(Date.now() - 3600000 * 12).toISOString(),
  },
  {
    id: "diag-2",
    referenceNumber: "BN-DIAG-9120",
    farmerName: "Narayana Swamy",
    mobile: "9443322110",
    state: "Karnataka",
    district: "Kolar",
    crop: "Tomato",
    cropAge: "30 Days (Flowering initiation)",
    problemDescription: "Sudden wilting of healthy plants in patches after heavy morning rain. Roots have dark collar rot.",
    imageUrls: [
      "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=600&auto=format&fit=crop&q=80",
    ],
    status: "responded",
    expertNotes: "Severe Phytophthora collar rot. Immediately drench surrounding beds with Trichoderma Viride and avoid standing water.",
    recommendedProducts: ["trichoderma-viride-bio-fungicide"],
    createdAt: new Date(Date.now() - 3600000 * 36).toISOString(),
  },
];

export const INITIAL_DISTRIBUTORS = [
  {
    id: "dist-1",
    name: "Mahesh Agrotech",
    company: "Mahesh Agri Inputs Pvt Ltd",
    mobile: "9845012345",
    email: "mahesh.agri@example.com",
    state: "Maharashtra",
    district: "Nashik",
    currentBusiness: "Agricultural Retailer & Distributor",
    yearsInBusiness: "12 Years",
    interestedCategories: [
      "Bio Fertilizers",
      "Bio Fungicides",
      "Seaweed Products",
    ],
    message: "We have 150+ sub-dealer network across Nashik and Niphad grape and vegetable belts.",
    status: "new",
    createdAt: new Date(Date.now() - 3600000 * 18).toISOString(),
  },
];

export const INITIAL_ADMINS = [
  {
    id: "admin-1",
    name: "Chief Super Admin",
    email: "admin@bionature.in",
    password: "Admin@123",
    role: "super_admin",
    roleTitle: "Super Admin",
    status: "active",
    createdAt: new Date().toISOString(),
  },
  {
    id: "admin-2",
    name: "Catalog Product Admin",
    email: "products@bionature.in",
    password: "Product@123",
    role: "product_admin",
    roleTitle: "Product Admin",
    status: "active",
    createdAt: new Date().toISOString(),
  },
  {
    id: "admin-3",
    name: "Dr. Sharma (Agronomist)",
    email: "agronomy@bionature.in",
    password: "Agro@123",
    role: "agronomist",
    roleTitle: "Agronomist",
    status: "active",
    createdAt: new Date().toISOString(),
  },
  {
    id: "admin-4",
    name: "Farmer Support Manager",
    email: "support@bionature.in",
    password: "Support@123",
    role: "support_manager",
    roleTitle: "Support Manager",
    status: "active",
    createdAt: new Date().toISOString(),
  },
];
