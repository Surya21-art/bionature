import { useState, useEffect } from "react";
import { PRODUCTS } from "@/data/bionature-data";
import { api } from "./api";
const STORAGE_KEYS = {
  PRODUCTS: "bionature_products_v1",
  ENQUIRIES: "bionature_enquiries_v1",
  DIAGNOSIS: "bionature_diagnosis_v1",
  DISTRIBUTORS: "bionature_distributors_v1",
  ADMIN_AUTH: "bionature_admin_auth_v1",
  ADMIN_USER: "bionature_admin_user_v1",
  ADMINS: "bionature_admins_list_v1",
};
// Initial Seed Data
const INITIAL_ENQUIRIES = [
  {
    id: "enq-1",
    name: "Rajesh Kumar Verma",
    mobile: "9876543210",
    email: "rajesh.verma@example.com",
    state: "Uttar Pradesh",
    district: "Varanasi",
    crop: "Tomato",
    productName: "Bio-NPK Liquid Consortia",
    productSlug: "bio-npk-liquid-consortia",
    enquiryType: "Product Enquiry",
    message: "Need bulk pricing for 50 Liters for my cooperative farm members.",
    status: "new",
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
  },
  {
    id: "enq-2",
    name: "Gurpreet Singh",
    mobile: "9812345678",
    email: "gurpreet.paddy@example.com",
    state: "Punjab",
    district: "Ludhiana",
    crop: "Paddy",
    productName: "Zinc Solubilizing Bio-Fertilizer",
    productSlug: "zinc-solubilizing-bio-fertilizer",
    enquiryType: "Bulk Order",
    message:
      "Looking for dealership in Ludhiana block and dosage recommendations for Basmati 1509.",
    status: "contacted",
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
  },
];
const INITIAL_DIAGNOSES = [
  {
    id: "diag-1",
    referenceNumber: "BN-DIAG-8492",
    farmerName: "Balwinder Singh",
    mobile: "9887766554",
    email: "balwinder@example.com",
    state: "Punjab",
    district: "Bathinda",
    crop: "Cotton",
    cropAge: "45 Days",
    problemDescription:
      "Leaves turning pale yellow with dark curling at margins. Sucking insects visible under leaves.",
    imageUrls: [
      "https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?w=600&auto=format&fit=crop&q=80",
    ],
    status: "in_review",
    expertNotes:
      "Symptoms indicate early whitefly feeding combined with minor Zinc deficiency. Recommended Neem Shield 10,000 PPM + Chelated Zinc foliar spray.",
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
    problemDescription:
      "Sudden wilting of healthy plants in patches after heavy morning rain. Roots have dark collar rot.",
    imageUrls: [
      "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=600&auto=format&fit=crop&q=80",
    ],
    status: "responded",
    expertNotes:
      "Severe Phytophthora collar rot. Immediately drench surrounding beds with Trichoderma Viride and avoid standing water.",
    recommendedProducts: ["trichoderma-viride-bio-fungicide"],
    createdAt: new Date(Date.now() - 3600000 * 36).toISOString(),
  },
];
const INITIAL_DISTRIBUTORS = [
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
    message:
      "We have 150+ sub-dealer network across Nashik and Niphad grape and vegetable belts.",
    status: "new",
    createdAt: new Date(Date.now() - 3600000 * 18).toISOString(),
  },
];
// Helper to get from local storage with fallback
function getLocal(key, fallback) {
  if (typeof window === "undefined") return fallback;
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch {
    return fallback;
  }
}
function setLocal(key, value) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
    window.dispatchEvent(new Event("bionature_storage_updated"));
  } catch (e) {
    console.error("Failed to save to localStorage", e);
  }
}
export const BioNatureStore = {
  // Sync all store caches from backend API
  async syncFromApi() {
    try {
      const [prods, enqs, diags, dists] = await Promise.allSettled([
        api.getProducts(),
        api.getEnquiries(),
        api.getFarmerHelp(),
        api.getDistributors(),
      ]);

      if (prods.status === "fulfilled" && prods.value.length > 0) {
        setLocal(STORAGE_KEYS.PRODUCTS, prods.value);
      }
      if (enqs.status === "fulfilled" && enqs.value.length > 0) {
        setLocal(STORAGE_KEYS.ENQUIRIES, enqs.value);
      }
      if (diags.status === "fulfilled" && diags.value.length > 0) {
        setLocal(STORAGE_KEYS.DIAGNOSIS, diags.value);
      }
      if (dists.status === "fulfilled" && dists.value.length > 0) {
        setLocal(STORAGE_KEYS.DISTRIBUTORS, dists.value);
      }
    } catch (err) {
      console.warn("Could not sync with backend API:", err.message);
    }
  },

  // Products
  getProducts() {
    const local = getLocal(STORAGE_KEYS.PRODUCTS, null);
    if (!local || !Array.isArray(local)) return PRODUCTS;
    return PRODUCTS.map((p) => {
      const found = local.find((l) => l.slug === p.slug || l.id === p.id);
      return found
        ? {
            ...found,
            ...p,
            specifications: { ...found.specifications, ...p.specifications },
            application: p.application || found.application,
            crops: p.crops || found.crops,
            gallery: p.gallery || found.gallery,
            galleryImages: p.galleryImages || found.galleryImages,
            primaryImage: p.primaryImage || found.primaryImage,
          }
        : p;
    });
  },
  getProductBySlug(slug) {
    const all = this.getProducts();
    return all.find((p) => p.slug === slug);
  },
  async saveProduct(product) {
    const products = this.getProducts();
    const index = products.findIndex(
      (p) => p.id === product.id || p.slug === product.slug,
    );
    if (index >= 0) {
      products[index] = product;
    } else {
      products.unshift(product);
    }
    setLocal(STORAGE_KEYS.PRODUCTS, products);

    // Call API in background
    try {
      if (product.id && !product.id.startsWith("temp-")) {
        await api.updateProduct(product.id, product);
      } else {
        const saved = await api.createProduct(product);
        if (saved && saved.id) {
          const idx = products.findIndex((p) => p.slug === product.slug);
          if (idx >= 0) {
            products[idx] = saved;
            setLocal(STORAGE_KEYS.PRODUCTS, [...products]);
          }
        }
      }
    } catch (e) {
      console.warn("Backend saveProduct sync warning:", e.message);
    }
  },
  async deleteProduct(id) {
    const products = this.getProducts().filter((p) => p.id !== id);
    setLocal(STORAGE_KEYS.PRODUCTS, products);
    try {
      await api.deleteProduct(id);
    } catch (e) {
      console.warn("Backend deleteProduct sync warning:", e.message);
    }
  },

  // Enquiries
  getEnquiries() {
    return getLocal(STORAGE_KEYS.ENQUIRIES, INITIAL_ENQUIRIES);
  },
  async submitEnquiry(data) {
    const records = this.getEnquiries();
    const tempId = `enq-${Date.now()}`;
    const newRecord = {
      ...data,
      id: tempId,
      status: "new",
      createdAt: new Date().toISOString(),
    };
    records.unshift(newRecord);
    setLocal(STORAGE_KEYS.ENQUIRIES, records);

    // Sync to backend
    try {
      const serverRecord = await api.createEnquiry(data);
      if (serverRecord && serverRecord.id) {
        const idx = records.findIndex((r) => r.id === tempId);
        if (idx >= 0) {
          records[idx] = serverRecord;
          setLocal(STORAGE_KEYS.ENQUIRIES, [...records]);
        }
        return serverRecord;
      }
    } catch (e) {
      console.warn("Enquiry backend submission failed, cached locally:", e.message);
    }
    return newRecord;
  },
  async updateEnquiryStatus(id, status) {
    const records = this.getEnquiries().map((e) =>
      e.id === id ? { ...e, status } : e,
    );
    setLocal(STORAGE_KEYS.ENQUIRIES, records);
    try {
      await api.updateEnquiryStatus(id, status);
    } catch (e) {
      console.warn("Backend updateEnquiryStatus sync warning:", e.message);
    }
  },

  // Farmer Diagnosis
  getDiagnoses() {
    return getLocal(STORAGE_KEYS.DIAGNOSIS, INITIAL_DIAGNOSES);
  },
  getDiagnosisByReference(ref) {
    const cleanRef = ref.trim().toUpperCase();
    return this.getDiagnoses().find(
      (d) => d.referenceNumber.toUpperCase() === cleanRef,
    );
  },
  async submitDiagnosis(data) {
    const records = this.getDiagnoses();
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const tempRef = `BN-DIAG-${randomNum}`;
    const tempId = `diag-${Date.now()}`;
    const newRecord = {
      ...data,
      id: tempId,
      referenceNumber: tempRef,
      status: "new",
      createdAt: new Date().toISOString(),
    };
    records.unshift(newRecord);
    setLocal(STORAGE_KEYS.DIAGNOSIS, records);

    // Sync to backend
    try {
      const serverRecord = await api.createFarmerHelp(data);
      if (serverRecord && serverRecord.referenceNumber) {
        const idx = records.findIndex((r) => r.id === tempId);
        if (idx >= 0) {
          records[idx] = serverRecord;
          setLocal(STORAGE_KEYS.DIAGNOSIS, [...records]);
        }
        return serverRecord;
      }
    } catch (e) {
      console.warn("Diagnosis backend submission failed, saved locally:", e.message);
    }
    return newRecord;
  },
  async updateDiagnosis(id, updates) {
    const records = this.getDiagnoses().map((d) =>
      d.id === id ? { ...d, ...updates } : d,
    );
    setLocal(STORAGE_KEYS.DIAGNOSIS, records);
    try {
      await api.updateFarmerHelp(id, updates);
    } catch (e) {
      console.warn("Backend updateDiagnosis sync warning:", e.message);
    }
  },

  // Distributors
  getDistributors() {
    return getLocal(STORAGE_KEYS.DISTRIBUTORS, INITIAL_DISTRIBUTORS);
  },
  async submitDistributor(data) {
    const records = this.getDistributors();
    const tempId = `dist-${Date.now()}`;
    const newRecord = {
      ...data,
      id: tempId,
      status: "new",
      createdAt: new Date().toISOString(),
    };
    records.unshift(newRecord);
    setLocal(STORAGE_KEYS.DISTRIBUTORS, records);

    try {
      const serverRecord = await api.createDistributor(data);
      if (serverRecord && serverRecord.id) {
        const idx = records.findIndex((r) => r.id === tempId);
        if (idx >= 0) {
          records[idx] = serverRecord;
          setLocal(STORAGE_KEYS.DISTRIBUTORS, [...records]);
        }
        return serverRecord;
      }
    } catch (e) {
      console.warn("Distributor backend submission failed, saved locally:", e.message);
    }
    return newRecord;
  },
  async updateDistributorStatus(id, status) {
    const records = this.getDistributors().map((d) =>
      d.id === id ? { ...d, status } : d,
    );
    setLocal(STORAGE_KEYS.DISTRIBUTORS, records);
    try {
      await api.updateDistributorStatus(id, status);
    } catch (e) {
      console.warn("Backend updateDistributorStatus sync warning:", e.message);
    }
  },

  // Admin Auth & RBAC
  isAdminLoggedIn() {
    return getLocal(STORAGE_KEYS.ADMIN_AUTH, false);
  },
  getAdminUser() {
    return getLocal(STORAGE_KEYS.ADMIN_USER, null);
  },
  setAdminUser(user) {
    if (user) {
      setLocal(STORAGE_KEYS.ADMIN_USER, user);
      setLocal(STORAGE_KEYS.ADMIN_AUTH, true);
    } else {
      setLocal(STORAGE_KEYS.ADMIN_USER, null);
      setLocal(STORAGE_KEYS.ADMIN_AUTH, false);
    }
  },
  setAdminLogin(status) {
    setLocal(STORAGE_KEYS.ADMIN_AUTH, status);
    if (!status) {
      setLocal(STORAGE_KEYS.ADMIN_USER, null);
    }
  },

  // Admin Team Management
  getAdmins() {
    return getLocal(STORAGE_KEYS.ADMINS, [
      {
        id: "admin-1",
        name: "Chief Super Admin",
        email: "admin@bionature.in",
        role: "super_admin",
        roleTitle: "Super Admin",
        status: "active",
      },
      {
        id: "admin-2",
        name: "Catalog Product Admin",
        email: "products@bionature.in",
        role: "product_admin",
        roleTitle: "Product Admin",
        status: "active",
      },
      {
        id: "admin-3",
        name: "Dr. Sharma (Agronomist)",
        email: "agronomy@bionature.in",
        role: "agronomist",
        roleTitle: "Agronomist",
        status: "active",
      },
      {
        id: "admin-4",
        name: "Farmer Support Manager",
        email: "support@bionature.in",
        role: "support_manager",
        roleTitle: "Support Manager",
        status: "active",
      },
    ]);
  },
  async fetchAdmins() {
    try {
      const list = await api.getAdmins();
      if (list && list.length > 0) {
        setLocal(STORAGE_KEYS.ADMINS, list);
        return list;
      }
    } catch (e) {
      console.warn("Could not fetch admins from backend, using local:", e.message);
    }
    return this.getAdmins();
  },
  async createAdmin(data) {
    const admins = this.getAdmins();
    const tempId = `admin-${Date.now()}`;
    const roleTitles = {
      super_admin: "Super Admin",
      product_admin: "Product Admin",
      agronomist: "Agronomist",
      support_manager: "Support Manager",
    };
    const newAdmin = {
      id: tempId,
      name: data.name,
      email: data.email,
      role: data.role || "support_manager",
      roleTitle: roleTitles[data.role] || "Administrator",
      status: "active",
      createdAt: new Date().toISOString(),
    };
    admins.push(newAdmin);
    setLocal(STORAGE_KEYS.ADMINS, admins);

    try {
      const serverAdmin = await api.createAdmin(data);
      if (serverAdmin && serverAdmin.id) {
        const idx = admins.findIndex((a) => a.id === tempId);
        if (idx >= 0) {
          admins[idx] = serverAdmin;
          setLocal(STORAGE_KEYS.ADMINS, [...admins]);
        }
        return serverAdmin;
      }
    } catch (e) {
      console.warn("Backend createAdmin sync warning:", e.message);
    }
    return newAdmin;
  },
  async deleteAdmin(id) {
    const admins = this.getAdmins().filter((a) => a.id !== id);
    setLocal(STORAGE_KEYS.ADMINS, admins);
    try {
      await api.deleteAdmin(id);
    } catch (e) {
      console.warn("Backend deleteAdmin sync warning:", e.message);
    }
  },

  async verifyAdmin(email, password) {
    try {
      const res = await api.login(email, password);
      if (res && res.success && res.user) {
        this.setAdminUser(res.user);
        return { success: true, user: res.user };
      }
    } catch (e) {
      // Fallback local check
      const fallbackAdmins = [
        {
          email: "admin@bionature.in",
          password: "Admin@123",
          role: "super_admin",
          roleTitle: "Super Admin",
          name: "Chief Super Admin",
        },
        {
          email: "products@bionature.in",
          password: "Product@123",
          role: "product_admin",
          roleTitle: "Product Admin",
          name: "Catalog Product Admin",
        },
        {
          email: "agronomy@bionature.in",
          password: "Agro@123",
          role: "agronomist",
          roleTitle: "Agronomist",
          name: "Dr. Sharma (Agronomist)",
        },
        {
          email: "support@bionature.in",
          password: "Support@123",
          role: "support_manager",
          roleTitle: "Support Manager",
          name: "Farmer Support Manager",
        },
      ];

      const found = fallbackAdmins.find(
        (a) =>
          a.email.toLowerCase() === (email || "").toLowerCase() &&
          a.password === password
      );

      if (found) {
        const { password: _, ...safeUser } = found;
        this.setAdminUser(safeUser);
        return { success: true, user: safeUser };
      }

      // Password-only shortcut for super admin demo
      if (password === "Admin@123" || password === "admin123") {
        const user = {
          email: "admin@bionature.in",
          role: "super_admin",
          roleTitle: "Super Admin",
          name: "Chief Super Admin",
        };
        this.setAdminUser(user);
        return { success: true, user };
      }
    }
    return { success: false };
  },
};

// React Hook to subscribe to store updates
export function useBioNatureStore() {
  const [products, setProducts] = useState(() => BioNatureStore.getProducts());
  const [enquiries, setEnquiries] = useState(() =>
    BioNatureStore.getEnquiries(),
  );
  const [diagnoses, setDiagnoses] = useState(() =>
    BioNatureStore.getDiagnoses(),
  );
  const [distributors, setDistributors] = useState(() =>
    BioNatureStore.getDistributors(),
  );
  const [isAdmin, setIsAdmin] = useState(() =>
    BioNatureStore.isAdminLoggedIn(),
  );
  const [adminUser, setAdminUser] = useState(() =>
    BioNatureStore.getAdminUser(),
  );
  const [admins, setAdmins] = useState(() => BioNatureStore.getAdmins());

  useEffect(() => {
    // Initial sync from backend API
    BioNatureStore.syncFromApi().then(() => {
      setProducts(BioNatureStore.getProducts());
      setEnquiries(BioNatureStore.getEnquiries());
      setDiagnoses(BioNatureStore.getDiagnoses());
      setDistributors(BioNatureStore.getDistributors());
    });

    if (isAdmin) {
      BioNatureStore.fetchAdmins().then((list) => {
        if (list) setAdmins(list);
      });
    }

    function handleUpdate() {
      setProducts(BioNatureStore.getProducts());
      setEnquiries(BioNatureStore.getEnquiries());
      setDiagnoses(BioNatureStore.getDiagnoses());
      setDistributors(BioNatureStore.getDistributors());
      setIsAdmin(BioNatureStore.isAdminLoggedIn());
      setAdminUser(BioNatureStore.getAdminUser());
      setAdmins(BioNatureStore.getAdmins());
    }

    window.addEventListener("bionature_storage_updated", handleUpdate);
    window.addEventListener("storage", handleUpdate);
    return () => {
      window.removeEventListener("bionature_storage_updated", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, [isAdmin]);

  return {
    products,
    enquiries,
    diagnoses,
    distributors,
    isAdmin,
    adminUser,
    admins,
    store: BioNatureStore,
  };
}
