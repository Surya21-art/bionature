// VERIFIED OFFICIAL COMPANY INFORMATION - Updated to match bionatureindia.com
export const COMPANY_INFO = {
  name: "BioNature",
  tagline: "Providing quality agrochemical solutions for sustainable farming",
  subheadline:
    "Ambitious by the objective of contributing to the national growth through use of economical and eco-friendly technologies for sustainable agriculture, BioNature is committed to provide the Indian farmers with better farming techniques and products to make them more profitable and globally competitive.",
  phone: "+91 956 6753 333",
  whatsapp: "+91 956 6753 333",
  email: "hari@bionatureindia.com",
  supportEmail: "hari@bionatureindia.com",
  dealershipEmail: "hari@bionatureindia.com",
  address:
    "SARASWATHI NAGAR, CHINNATHIRUPATHY, SALEM-636008, Tamil Nadu, India",
  workingHours: "9:30 AM - 6:30 PM",
  founder: "Dr. Harikrishnan",
  established: "2012",
  partner: "Agrocare India Pvt. Ltd, Bangalore",
  mission: "To grow a double crop production in organic methods of farming",
  vision: "Transforming nature's future",
  manufacturingUnit: "Chinnathirupathy",
  registeredOffice: "Salem, Tamil Nadu",
  stats: {
    farmersSupported: "10,000+", // Official: 10000+ farmers being benefitted
    hectaresCovered: "20,000", // Official: 20k hectares under sustainable cultivation
    dealersCount: "Information coming soon",
    statesActive: "Information coming soon",
    productsCount: "5", // Updated to match current implementation
    satisfactionRate: "98%", // Official: 98% Customer Satisfaction
    farmersPartnered: "12,000+", // Official: 12k Farmers partnered with across regions
  },
};
export const CATEGORIES = [
  {
    id: "cat-1",
    name: "Bio Fertilizers",
    slug: "bio-fertilizers",
    description:
      "Live beneficial microbial inoculants that fix atmospheric nitrogen and mobilize soil nutrients.",
    count: 2,
    icon: "Sprout",
    image:
      "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: "cat-2",
    name: "Bio Pesticides",
    slug: "bio-pesticides",
    description:
      "Botanical and entomopathogenic agents controlling caterpillar, borer, and sucking pest infestations.",
    icon: "ShieldAlert",
    image:
      "https://images.unsplash.com/photo-1615811361523-6bd03d7748e7?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: "cat-3",
    name: "Bio Fungicides",
    slug: "bio-fungicides",
    description:
      "Antagonistic biological organisms suppressing root rot, wilts, blights, and powdery mildew safely.",
    icon: "ShieldCheck",
    image:
      "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: "cat-4",
    name: "Plant Nutrition",
    slug: "plant-nutrition",
    description:
      "Balanced organic plant foods promoting vigorous leaf canopy and sustained cellular vitality.",
    icon: "Leaf",
    image:
      "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: "cat-5",
    name: "Micronutrients",
    slug: "micronutrients",
    description:
      "Chelated Zinc, Boron, Ferrous, and multi-micronutrients eliminating deficiency symptoms rapidly.",
    count: 2,
    icon: "Sparkles",
    image:
      "https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: "cat-6",
    name: "Plant Growth Promoters",
    slug: "plant-growth-promoters",
    description:
      "Natural amino acids, fulvic complexes, and bio-stimulants triggering profuse flowering and root growth.",
    count: 1,
    icon: "TrendingUp",
    image:
      "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: "cat-7",
    name: "Soil Health",
    slug: "soil-health",
    description:
      "Humic conditioners, VAM mycorrhiza, and carbon enhancers rejuvenating degraded farm soils.",
    icon: "Layers",
    image:
      "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: "cat-8",
    name: "Crop Protection",
    slug: "crop-protection",
    description:
      "Integrated biological barriers preventing nematode damage, viral transmission, and fungal outbreaks.",
    icon: "Shield",
    image:
      "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: "cat-9",
    name: "Seaweed Products",
    slug: "seaweed-products",
    description:
      "Cold-extracted marine Ascophyllum Nodosum packed with natural cytokinins and alginic bio-actives.",
    icon: "Waves",
    image:
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: "cat-10",
    name: "Specialty Agricultural Solutions",
    slug: "specialty-agricultural-solutions",
    description:
      "Specialized bio-surfactants, silicon foliar activators, and pH balancers maximizing spray efficacy.",
    icon: "FlaskConical",
    image:
      "https://images.unsplash.com/photo-1576086213369-97a306d36557?w=800&auto=format&fit=crop&q=80",
  },
];
// VERIFIED PRODUCTS FROM OFFICIAL BIONATUREINDIA.COM WEBSITE
// Matching the 5 products currently implemented in the system
export const PRODUCTS = [
  {
    id: "prod-1",
    name: "Phytocil",
    slug: "phytocil",
    category: "Bio Fertilizers",
    categorySlug: "bio-fertilizers",
    formulation: "Liquid / Granular",
    packaging: "1 L • 5 L",
    packSizes: ["1 L", "5 L"],
    primaryImage:
      "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=800&auto=format&fit=crop&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&auto=format&fit=crop&q=80",
    ],
    images: [
      "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&auto=format&fit=crop&q=80",
    ],
    shortDescription:
      "Biological fertilizer formulation developed to support plant growth and soil health.",
    description:
      "Phytocil is a biological fertilizer formulation developed to support healthy crop growth and maintain soil fertility. Suitable for use across cereals, vegetables, and commercial field crops, it is applied during planting or early growth stages through soil drenching, drip irrigation, or seed treatment.",
    agronomicContext: {
      classification: "Bio-Fertilizer (Liquid / Granular)",
      purpose: "Supports vegetative growth and soil health",
      targetCrops: "Rice, Wheat, Vegetables",
      practice: "Soil drenching, drip fertigation, or seed treatment",
    },
    benefits: [
      "Supports healthy root and vegetative plant growth",
      "Aids in nutrient availability in the root zone",
      "Supports beneficial soil microbial activity",
      "Suitable for field and horticultural crops",
    ],
    crops: ["Rice", "Wheat", "Vegetables"],
    suitableCrops: [
      "Rice",
      "Wheat",
      "Vegetables",
      "Cotton",
      "Sugarcane",
      "Tomato",
      "Potato",
      "Onion",
      "Maize",
    ],
    targetProblems: [
      "Suboptimal plant growth",
      "Poor nutrient uptake",
      "Low soil organic activity",
    ],
    application: [
      {
        crop: "Rice / Paddy",
        method: "Seedling Root Dip / Drip",
        dosage: "250–500 ml / acre",
        timing: "At transplanting or first irrigation",
        frequency: "1–2 applications",
      },
      {
        crop: "Wheat & Cereals",
        method: "Soil application with compost",
        dosage: "500 ml / acre",
        timing: "Basal application or crown root stage",
        frequency: "1 application",
      },
      {
        crop: "Vegetables (Tomato, Chilli)",
        method: "Drip fertigation / Drenching",
        dosage: "2–3 ml / Litre of water",
        timing: "Active vegetative growth",
        frequency: "Every 15–20 days",
      },
    ],
    specifications: {
      formulation: "Liquid / Granular",
      composition: "Beneficial microbial consortium & natural carriers",
      packSizes: "1 L • 5 L",
      storage: "Store in a cool, dry place away from direct heat and sunlight",
      shelfLife: "24 months from date of manufacture",
      manufacturer: "BioNature India",
      registration: "Biological fertilizer formulation standards",
    },
    quality: "Quality tested batch assay with verified viable cell count",
    relatedProducts: ["biofert-g", "energy-pro", "grow-mag"],
    featured: true,
    published: true,
  },
  {
    id: "prod-2",
    name: "Energy Pro",
    slug: "energy-pro",
    category: "Plant Growth Promoters",
    categorySlug: "plant-growth-promoters",
    formulation: "Liquid Foliar",
    packaging: "500 ml • 1 L",
    packSizes: ["500 ml", "1 L"],
    primaryImage:
      "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=800&auto=format&fit=crop&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800&auto=format&fit=crop&q=80",
    ],
    images: [
      "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800&auto=format&fit=crop&q=80",
    ],
    shortDescription: "Plant growth promoter for crop vigor during flowering and fruit setting.",
    description:
      "Energy Pro is a liquid foliar plant growth promoter formulated to support plant vigor during vegetative and reproductive stages. It is applied to crops during branching, pre-flowering, and fruit development to maintain crop vitality.",
    agronomicContext: {
      classification: "Plant Growth Promoter (Liquid Foliar)",
      purpose: "Supports plant vigor during flowering and fruit development",
      targetCrops: "Tomato, Chilli, Vegetables",
      practice: "Foliar spray during pre-flowering and fruit development",
    },
    benefits: [
      "Supports plant growth during vegetative and flowering stages",
      "Helps maintain reproductive vigor and reduces flower drop",
      "Enhances overall crop canopy development",
      "Easy foliar application compatible with common spray schedules",
    ],
    crops: ["Tomato", "Chilli", "Vegetables"],
    suitableCrops: [
      "Tomato",
      "Chilli",
      "Vegetables",
      "Brinjal",
      "Okra",
      "Cucumber",
      "Watermelon",
      "Mango",
      "Citrus",
    ],
    targetProblems: ["Slow crop growth", "Poor flowering", "Low fruit set"],
    application: [
      {
        crop: "Tomato, Chilli & Brinjal",
        method: "Foliar Spray",
        dosage: "2–2.5 ml / Litre of water",
        timing: "Pre-flowering & fruit development",
        frequency: "2 applications (15 days apart)",
      },
      {
        crop: "Cotton & Pulses",
        method: "Foliar Spray",
        dosage: "250–300 ml / acre",
        timing: "Branching and boll development",
        frequency: "2 applications",
      },
      {
        crop: "Fruit Orchards (Mango, Citrus)",
        method: "Foliar Spray",
        dosage: "2.5 ml / Litre of water",
        timing: "New flush and fruit set",
        frequency: "2–3 applications",
      },
    ],
    specifications: {
      formulation: "Liquid Foliar",
      composition: "Plant extract bio-stimulants & organic cofactors",
      packSizes: "500 ml • 1 L",
      storage: "Store upright in original container below 35°C",
      shelfLife: "24 months from date of manufacture",
      manufacturer: "BioNature India",
      registration: "Commercial biological crop stimulant standards",
    },
    quality: "Standardized biological extraction with stable active ingredient profile",
    relatedProducts: ["phytocil", "grow-mag", "biofert-g"],
    featured: true,
    published: true,
  },
  {
    id: "prod-3",
    name: "Grow Mag",
    slug: "grow-mag",
    category: "Micronutrients",
    categorySlug: "micronutrients",
    formulation: "Water-Soluble Powder",
    packaging: "1 Kg • 5 Kg",
    packSizes: ["1 Kg", "5 Kg"],
    primaryImage:
      "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=800&auto=format&fit=crop&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?w=800&auto=format&fit=crop&q=80",
    ],
    images: [
      "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?w=800&auto=format&fit=crop&q=80",
    ],
    shortDescription: "Water-soluble magnesium formulation for correcting crop chlorosis.",
    description:
      "Grow Mag is a water-soluble agricultural magnesium formulation developed to address magnesium deficiency in commercial crops. Magnesium is an essential component of chlorophyll required for plant photosynthesis.",
    agronomicContext: {
      classification: "Micronutrient Fertilizer (Water-Soluble Powder)",
      purpose: "Corrects magnesium deficiency and supports chlorophyll synthesis",
      targetCrops: "Cotton, Tomato, Potato",
      practice: "Foliar spray or drip fertigation at onset of deficiency",
    },
    benefits: [
      "Corrects leaf chlorosis caused by magnesium deficiency",
      "Supports chlorophyll synthesis and foliage greenness",
      "Water-soluble formulation for rapid foliar uptake",
      "Compatible with standard fertigation programs",
    ],
    crops: ["Cotton", "Tomato", "Potato"],
    suitableCrops: [
      "Cotton",
      "Tomato",
      "Potato",
      "Grape",
      "Apple",
      "Banana",
      "Coconut",
      "Groundnut",
    ],
    targetProblems: [
      "Yellowing leaves",
      "Magnesium deficiency",
      "Reduced leaf canopy",
    ],
    application: [
      {
        crop: "Cotton & Oilseeds",
        method: "Foliar Spray",
        dosage: "5 g / Litre of water (1 kg/acre)",
        timing: "At onset of deficiency or active leaf canopy",
        frequency: "1–2 sprays",
      },
      {
        crop: "Vegetables & Potatoes",
        method: "Foliar / Fertigation",
        dosage: "1–2 kg / acre",
        timing: "Vegetative growth and tuber bulking",
        frequency: "15 days interval",
      },
      {
        crop: "Grapes & Plantation Crops",
        method: "Foliar / Soil Drench",
        dosage: "5 g / Litre of water",
        timing: "Cane maturity and berry development",
        frequency: "As required based on field observation",
      },
    ],
    specifications: {
      formulation: "Water-Soluble Powder",
      composition: "Agricultural-grade Magnesium formulation",
      packSizes: "1 Kg • 5 Kg",
      storage: "Keep packaging sealed airtight in dry storage area",
      shelfLife: "36 months from date of manufacture",
      manufacturer: "BioNature India",
      registration: "Fertilizer (Inorganic / Micronutrient) standards",
    },
    quality: "High-purity soluble mineral formulation free of harmful contaminants",
    relatedProducts: ["agromag", "energy-pro", "phytocil"],
    featured: false,
    published: true,
  },
  {
    id: "prod-4",
    name: "AgroMag",
    slug: "agromag",
    category: "Micronutrients",
    categorySlug: "micronutrients",
    formulation: "Granular Carrier",
    packaging: "5 Kg • 25 Kg",
    packSizes: ["5 Kg", "25 Kg"],
    primaryImage:
      "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800&auto=format&fit=crop&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&auto=format&fit=crop&q=80",
    ],
    images: [
      "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&auto=format&fit=crop&q=80",
    ],
    shortDescription: "Granular magnesium soil amendment for balanced soil nutrient levels.",
    description:
      "AgroMag is a granular soil-amendment magnesium formulation designed to address soil magnesium depletion in intensive cropping systems. It is applied during basal soil preparation or early side-dressing.",
    agronomicContext: {
      classification: "Soil Amendment / Micronutrient (Granular)",
      purpose: "Replenishes soil magnesium levels during land preparation",
      targetCrops: "Sugarcane, Rice, Wheat",
      practice: "Soil broadcasting during basal application or earthing up",
    },
    benefits: [
      "Replenishes magnesium in intensively cropped soils",
      "Supports balanced soil cation availability",
      "Granular form for uniform field broadcasting",
      "Suitable for long-duration field and plantation crops",
    ],
    crops: ["Sugarcane", "Rice", "Wheat"],
    suitableCrops: [
      "Sugarcane",
      "Rice",
      "Wheat",
      "Maize",
      "Soybean",
      "Sunflower",
      "Cotton",
      "Tea",
    ],
    targetProblems: [
      "Soil nutrient imbalance",
      "Subsoil magnesium deficiency",
      "Poor crop vigor",
    ],
    application: [
      {
        crop: "Sugarcane",
        method: "Soil Broadcasting",
        dosage: "25 kg / acre",
        timing: "Basal application at planting or earthing up",
        frequency: "1 application",
      },
      {
        crop: "Rice & Wheat",
        method: "Soil Broadcasting",
        dosage: "10–15 kg / acre",
        timing: "During last ploughing / basal application",
        frequency: "1 application",
      },
      {
        crop: "Maize & Cotton",
        method: "Band placement in root zone",
        dosage: "15–20 kg / acre",
        timing: "At sowing or 30 days after emergence",
        frequency: "1 application",
      },
    ],
    specifications: {
      formulation: "Granular Carrier",
      composition: "High-grade agricultural soil magnesium amendment",
      packSizes: "5 Kg • 25 Kg",
      storage: "Store stacked on wooden pallets in dry warehouse",
      shelfLife: "36 months from date of manufacture",
      manufacturer: "BioNature India",
      registration: "Soil amendment standard specifications",
    },
    quality: "Granular integrity tested for even field dissemination",
    relatedProducts: ["grow-mag", "biofert-g", "phytocil"],
    featured: false,
    published: true,
  },
  {
    id: "prod-5",
    name: "BioFert-G",
    slug: "biofert-g",
    category: "Bio Fertilizers",
    categorySlug: "bio-fertilizers",
    formulation: "Granular",
    packaging: "10 Kg • 25 Kg",
    packSizes: ["10 Kg", "25 Kg"],
    primaryImage:
      "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800&auto=format&fit=crop&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1576086213369-97a306d36557?w=800&auto=format&fit=crop&q=80",
    ],
    images: [
      "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1576086213369-97a306d36557?w=800&auto=format&fit=crop&q=80",
    ],
    shortDescription: "Granular bio-fertilizer on organic carrier base for soil enrichment.",
    description:
      "BioFert-G is a granular bio-fertilizer developed on an organic carrier base to introduce beneficial microbial cultures into cultivated soils during land preparation and basal fertilization.",
    agronomicContext: {
      classification: "Bio-Fertilizer (Granular Inoculant)",
      purpose: "Baseline soil biological enrichment and organic conditioning",
      targetCrops: "Rice, Wheat, Vegetables",
      practice: "Soil broadcasting before sowing or final field puddling",
    },
    benefits: [
      "Granular carrier for easy broadcast application",
      "Supplies beneficial microbial cultures to the soil",
      "Contributes organic matter to the root zone",
      "Suitable for basal application across major field crops",
    ],
    crops: ["Rice", "Wheat", "Vegetables"],
    suitableCrops: [
      "Rice",
      "Wheat",
      "Vegetables",
      "Maize",
      "Millets",
      "Sugarcane",
      "Cotton",
      "Pulses",
    ],
    targetProblems: [
      "Low soil organic activity",
      "Suboptimal soil fertility",
      "Nutrient deficiency",
    ],
    application: [
      {
        crop: "Rice / Paddy",
        method: "Soil Broadcasting",
        dosage: "10–20 kg / acre",
        timing: "Basal dressing before final puddling",
        frequency: "1 application",
      },
      {
        crop: "Wheat & Maize",
        method: "Soil Broadcasting",
        dosage: "15–20 kg / acre",
        timing: "Basal application with sowing",
        frequency: "1 application",
      },
      {
        crop: "Vegetables & Pulses",
        method: "Soil Application / Furrow",
        dosage: "10–15 kg / acre",
        timing: "At land preparation or bed making",
        frequency: "1 application",
      },
    ],
    specifications: {
      formulation: "Granular",
      composition: "Microbial carrier inoculant with organic substrate",
      packSizes: "10 Kg • 25 Kg",
      storage: "Store in a shaded, well-ventilated dry place",
      shelfLife: "18 months from date of manufacture",
      manufacturer: "BioNature India",
      registration: "Biological fertilizer formulation guidelines",
    },
    quality: "Organic carrier base with laboratory-verified viable microbial count",
    relatedProducts: ["phytocil", "agromag", "energy-pro"],
    featured: true,
    published: true,
  },
];
// Build the crop picker from the crops already covered by the product catalog.
// This keeps the finder useful until crop-specific editorial content is available.
const catalogCropNames = Array.from(
  new Set(PRODUCTS.flatMap((product) => product.suitableCrops)),
);
const cropImages = {
  Rice: "https://images.unsplash.com/photo-1536304993881-ff6e9eabf6a6?w=1200&auto=format&fit=crop&q=85",
  Wheat:
    "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&auto=format&fit=crop&q=80",
  Maize:
    "https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=800&auto=format&fit=crop&q=80",
  Cotton:
    "https://images.unsplash.com/photo-1598449356475-b9f71db7d847?w=1200&auto=format&fit=crop&q=85",
  Tomato:
    "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800&auto=format&fit=crop&q=80",
  Potato:
    "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=800&auto=format&fit=crop&q=80",
  Grape:
    "https://images.unsplash.com/photo-1537640538966-79f369143f8f?w=800&auto=format&fit=crop&q=80",
  Apple:
    "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=800&auto=format&fit=crop&q=80",
  Banana:
    "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=800&auto=format&fit=crop&q=80",
  Coconut:
    "https://images.unsplash.com/photo-1550828520-4cb496926fc9?w=800&auto=format&fit=crop&q=80",
  Sugarcane:
    "https://images.unsplash.com/photo-1589923188900-85dae523342b?w=1200&auto=format&fit=crop&q=85",
  Onion:
    "https://images.unsplash.com/photo-1508747703725-719777637510?w=800&auto=format&fit=crop&q=80",
  Chilli:
    "https://images.unsplash.com/photo-1588252303782-cb80119amee?w=1200&auto=format&fit=crop&q=85",
  Brinjal:
    "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=800&auto=format&fit=crop&q=80",
  Okra: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&auto=format&fit=crop&q=80",
  Cucumber:
    "https://images.unsplash.com/photo-1449300079323-02e209d9d3a6?w=800&auto=format&fit=crop&q=80",
  Watermelon:
    "https://images.unsplash.com/photo-1563114773-84221bd62daa?w=800&auto=format&fit=crop&q=80",
  Mango:
    "https://images.unsplash.com/photo-1553279768-865429fa0078?w=800&auto=format&fit=crop&q=80",
  Citrus:
    "https://images.unsplash.com/photo-1557800636-894a64c1696f?w=800&auto=format&fit=crop&q=80",
  Groundnut:
    "https://images.unsplash.com/photo-1567892737950-30c4db37cd89?w=800&auto=format&fit=crop&q=80",
  Soybean:
    "https://images.unsplash.com/photo-1612257416648-ee7a4e9c47e5?w=1200&auto=format&fit=crop&q=85",
  Sunflower:
    "https://images.unsplash.com/photo-1470509037663-253afd7f0f51?w=800&auto=format&fit=crop&q=80",
  Tea: "https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?w=1200&auto=format&fit=crop&q=85",
  Millets:
    "https://images.unsplash.com/photo-1515543904379-3d757a7d7f5b?w=1200&auto=format&fit=crop&q=85",
  Pulses:
    "https://images.unsplash.com/photo-1515543904379-3d757a7d7f5b?w=800&auto=format&fit=crop&q=80",
  Vegetables:
    "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80",
};
export const CROPS = catalogCropNames.map((cropName, index) => {
  const matchingProducts = PRODUCTS.filter((product) =>
    product.suitableCrops.includes(cropName),
  );
  const cropProblems = Array.from(
    new Set(matchingProducts.flatMap((product) => product.targetProblems)),
  ).slice(0, 4);
  return {
    id: `crop-${index + 1}`,
    name: cropName,
    slug: cropName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, ""),
    scientificName: "Agricultural crop",
    description: `Biological nutrition and crop protection recommendations for ${cropName}.`,
    image:
      cropImages[cropName] ||
      matchingProducts[0]?.images[0] ||
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&auto=format&fit=crop&q=80",
    commonProblems: cropProblems,
    recommendedProducts: matchingProducts.map((product) => product.slug),
    stages: [],
  };
});
const catalogProblemNames = Array.from(
  new Set(PRODUCTS.flatMap((product) => product.targetProblems)),
);
export const PROBLEMS = catalogProblemNames.map((problemName, index) => {
  const matchingProducts = PRODUCTS.filter((product) =>
    product.targetProblems.includes(problemName),
  );
  return {
    id: `problem-${index + 1}`,
    name: problemName,
    slug: problemName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, ""),
    category: "Crop health",
    description: `Biological treatment options for ${problemName.toLowerCase()}.`,
    symptoms: [problemName],
    causes: [],
    management: "Select a recommended product for application guidance.",
    recommendedProducts: matchingProducts.map((product) => product.slug),
    image:
      matchingProducts[0]?.images[0] ||
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&auto=format&fit=crop&q=80",
  };
});
export const TESTIMONIALS = [];

export const BLOG_POSTS = [
  {
    id: "blog-1",
    slug: "understanding-nitrogen-fixation-living-soil",
    title: "Understanding Biological Nitrogen Fixation in Indian Soil Profiles",
    category: "Bio Fertilizers",
    author: "Dr. Harikrishnan",
    authorRole: "Chief Agronomist & Founder",
    date: "November 12, 2025",
    readTime: "5 min read",
    coverImage:
      "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=1200&auto=format&fit=crop&q=85",
    excerpt:
      "How free-living Azotobacter and symbiotic Rhizobium strains convert atmospheric nitrogen into plant-absorbable ammonium without synthetic salt buildup.",
    content: `Atmospheric air contains approximately 78% elemental nitrogen (N2), yet commercial crops cannot assimilate this triple-bonded molecular gas directly through leaf stomata. In intensive Indian farming systems, growers have historically relied on synthetic urea to supply mineral nitrogen, leading over decades to soil acidification, microbial decline, and substantial leaching losses.

Biological Nitrogen Fixation (BNF) provides a scientifically proven, living alternative. Beneficial soil diazotrophs produce the enzyme nitrogenase, which catalyzes the reduction of atmospheric N2 into bioavailable ammonium (NH4+) directly in the crop rhizospheric zone.

In cereal crops such as paddy and wheat, free-living and associative bacteria such as Azotobacter chroococcum and Azospirillum brasilense colonize root exudates, supplying up to 20-25 kg of biological nitrogen per acre while synthesizing auxins and gibberellins that promote root branching.

For optimum microbial viability, liquid formulations should be applied during early morning hours or via drip irrigation, ensuring soil moisture is adequate and avoiding direct tank-mixing with chemical bactericides.`,
    tags: ["NitrogenFixation", "BioFertilizers", "SoilHealth", "Microbiology"],
  },
  {
    id: "blog-2",
    slug: "integrated-management-sucking-pests-botanical-formulations",
    title: "Integrated Management of Sucking Pests in Chilli & Tomato",
    category: "Crop Protection",
    author: "Agronomy Advisory Desk",
    authorRole: "Crop Protection Team",
    date: "December 04, 2025",
    readTime: "6 min read",
    coverImage:
      "https://images.unsplash.com/photo-1588252303782-cb80119abd6d?w=1200&auto=format&fit=crop&q=85",
    excerpt:
      "Preventive strategies for controlling thrips, mites, and whitefly infestations through standardized botanical formulations and targeted spray dynamics.",
    content: `Sucking insect pests-notably black thrips (Thrips parvispinus), yellow mites, and whiteflies-represent the foremost threat to horticultural profitability across Andhra Pradesh, Telangana, Karnataka, and Tamil Nadu. Traditional reliance on single-mode synthetic insecticides has accelerated resistance development and aggravated secondary pest flare-ups.

Standardized botanical formulations based on cold-processed neem limonoids, karanjin, and essential plant terpenes operate through multiple biochemical modes: deterrence of feeding, disruption of ecdysone hormone cycles, and mechanical spiracle blockage.

Crucial spray practices include:
1. Spraying during early morning (before 8:30 AM) or after 4:30 PM when thrips dwell actively on leaf surfaces.
2. Directing hollow-cone nozzles toward the undersides of foliage where nymphal colonies congregate.
3. Rotating botanical repellents with entomopathogenic formulations such as Beauveria bassiana and Verticillium lecanii for systemic nymph mortality.`,
    tags: ["CropProtection", "PestManagement", "Chilli", "Tomato", "Botanicals"],
  },
  {
    id: "blog-3",
    slug: "preventing-root-rot-damping-off-nursery-timing",
    title: "Preventing Root Rot & Damping-Off: Biological Inoculation Timing",
    category: "Soil Health",
    author: "Microbiology Laboratory",
    authorRole: "Formulation Science",
    date: "January 18, 2026",
    readTime: "4 min read",
    coverImage:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&auto=format&fit=crop&q=85",
    excerpt:
      "Field protocols for prophylactic root drenching with antagonistic microbial agents to suppress Fusarium and Pythium in vegetable nurseries.",
    content: `Soil-borne fungal pathogens including Fusarium oxysporum, Pythium debaryanum, and Rhizoctonia solani account for massive seedling mortality in commercial vegetable nurseries and high-density orchards. Once fungal mycelia penetrate root vascular bundles, corrective systemic chemical fungicides demonstrate limited recovery rates.

Antagonistic biological fungi-specifically Trichoderma viride and Trichoderma harzianum-suppress pathogenic fungi through mycoparasitism, enzyme secretion (chitinases and glucanases), and rapid rhizospheric niche colonization.

Prophylactic nursery bed protocol:
1. Seed coating with carrier-based microbial powder prior to sowing into pro-trays.
2. Drenching seedling root zones 5 to 7 days before field transplantation to establish dense fungal shields.
3. Maintaining organic matter in transplanting furrows to provide carbon sustenance for beneficial microbial spores.`,
    tags: ["BioFungicides", "SoilHealth", "NurseryManagement", "RootRot"],
  },
];

export const CERTIFICATIONS = [
  {
    id: "cert-1",
    name: "Fertilizer Control Order (FCO) Statutory Compliance",
    issuingBody: "Department of Agriculture & Farmers Welfare, Govt. of India",
    certNumber: "FCO / BIO / TN / SLM / REG-2016",
    validity: "Active Statutory Standard",
    description:
      "BioNature biological fertilizers and microbial consortia adhere strictly to statutory schedules and purity thresholds established under the Fertilizer Control Order.",
  },
  {
    id: "cert-2",
    name: "Laboratory Quality Assay Standard & Batch Traceability",
    issuingBody: "Internal Quality Assurance Protocol, BioNature Salem Facility",
    certNumber: "QA-ASSAY / SLM / BATCH-2024",
    validity: "Batch-wise Quality Standard",
    description:
      "Every production run undergoes spectrophotometric optical density assays and serial dilution plating to verify viable microbial counts and absence of heavy metals.",
  },
  {
    id: "cert-3",
    name: "Sustainable Agri-Input Quality Standard",
    issuingBody: "State Agricultural Regulatory Guidelines, Tamil Nadu",
    certNumber: "AGRI-INP / TN / COMM-4921",
    validity: "Statutory Standard",
    description:
      "Formulations are evaluated for tropical shelf-stability, agricultural safety, and verified carrier-matrix integrity for regional commercial cultivation.",
  },
];

export const AWARDS = [
  {
    id: "awd-1",
    title: "Regional Sustainable Agriculture Innovation Recognition",
    organization: "Salem District Agricultural Forum",
    year: "2023",
    image:
      "https://images.unsplash.com/photo-1579208575657-c595a05383b7?w=800&auto=format&fit=crop&q=80",
    description:
      "Acknowledged for developing microbial soil-conditioning inoculants supporting smallholder farmers across western Tamil Nadu.",
  },
  {
    id: "awd-2",
    title: "Biological Formulation Stability Recognition",
    organization: "Southern AgriTech & Biological Input Consortium",
    year: "2021",
    image:
      "https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?w=800&auto=format&fit=crop&q=80",
    description:
      "Recognized for formulation stability advancements in liquid microbial consortia under high-temperature storage conditions.",
  },
];

export const INFRASTRUCTURE_FACILITIES = [
  {
    title: "Automated Submerged Fermentation Bioreactors",
    capacity: "50,000 Litres / Month",
    image:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1000&auto=format&fit=crop&q=80",
    description:
      "Stainless-steel computerized fermentation vessels equipped with HEPA air filtration, precise dissolved oxygen tracking, and automated pH controllers for pure-strain microbial multiplication.",
  },
  {
    title: "Microbiology & Batch Assay Quality Lab",
    capacity: "Batch Purity & CFU Assay",
    image:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1000&auto=format&fit=crop&q=80",
    description:
      "Dedicated diagnostic quality suite with optical spectrophotometers, laminar air-flow hoods, and serial dilution incubation chambers ensuring viable cell counts and freedom from contaminants.",
  },
  {
    title: "Formulation Blending & Induction Bottling Line",
    capacity: "5,000 Units / Day",
    image:
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=1000&auto=format&fit=crop&q=80",
    description:
      "Automated volumetric liquid filling, nitrogen purging, and hermetic induction sealing line preventing degradation and ensuring uncompromised container shelf-life across transport.",
  },
  {
    title: "Agronomic Demonstration & Regional Field Plots",
    capacity: "Salem Experimental Station",
    image:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1000&auto=format&fit=crop&q=80",
    description:
      "Field evaluation acreage for testing biological input efficacy, calibrating fertigation dosages, and verifying crop phenological responses across paddy, cotton, vegetables, and pulses.",
  },
];

