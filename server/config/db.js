import dotenv from "dotenv";
import {
  INITIAL_PRODUCTS,
  INITIAL_ENQUIRIES,
  INITIAL_DIAGNOSIS_RECORDS,
  INITIAL_DISTRIBUTORS,
  INITIAL_ADMINS,
} from "../data/initialData.js";

dotenv.config();

// In-Memory Repository
class InMemoryStore {
  constructor() {
    this.products = [...INITIAL_PRODUCTS];
    this.enquiries = [...INITIAL_ENQUIRIES];
    this.farmerHelp = [...INITIAL_DIAGNOSIS_RECORDS];
    this.distributors = [...INITIAL_DISTRIBUTORS];
    this.admins = [...INITIAL_ADMINS];
    this.type = "in-memory";
  }

  // Products
  async getProducts({ category, search } = {}) {
    let list = [...this.products];
    if (category) {
      list = list.filter(
        (p) => p.category?.toLowerCase() === category.toLowerCase()
      );
    }
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) =>
          p.name?.toLowerCase().includes(q) ||
          p.shortDescription?.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q)
      );
    }
    return list;
  }

  async getProductBySlug(slug) {
    return this.products.find((p) => p.slug === slug) || null;
  }

  async createProduct(data) {
    const newProduct = {
      id: `prod-${Date.now()}`,
      published: true,
      featured: false,
      ...data,
      createdAt: new Date().toISOString(),
    };
    this.products.unshift(newProduct);
    return newProduct;
  }

  async updateProduct(id, data) {
    const idx = this.products.findIndex((p) => p.id === id || p.slug === id);
    if (idx === -1) return null;
    this.products[idx] = { ...this.products[idx], ...data };
    return this.products[idx];
  }

  async deleteProduct(id) {
    const idx = this.products.findIndex((p) => p.id === id || p.slug === id);
    if (idx === -1) return false;
    this.products.splice(idx, 1);
    return true;
  }

  // Enquiries
  async getEnquiries() {
    return [...this.enquiries];
  }

  async createEnquiry(data) {
    const enquiry = {
      id: `enq-${Date.now()}`,
      status: "new",
      ...data,
      createdAt: new Date().toISOString(),
    };
    this.enquiries.unshift(enquiry);
    return enquiry;
  }

  async updateEnquiryStatus(id, status) {
    const item = this.enquiries.find((e) => e.id === id);
    if (!item) return null;
    item.status = status;
    return item;
  }

  // Farmer Help / Crop Diagnosis
  async getFarmerHelp() {
    return [...this.farmerHelp];
  }

  async getFarmerHelpByRef(ref) {
    return (
      this.farmerHelp.find(
        (t) => t.referenceNumber?.toUpperCase() === ref?.toUpperCase()
      ) || null
    );
  }

  async createFarmerHelp(data) {
    const rand = Math.floor(1000 + Math.random() * 9000);
    const referenceNumber = `BN-DIAG-${rand}`;
    const ticket = {
      id: `diag-${Date.now()}`,
      referenceNumber,
      status: "new",
      imageUrls: [],
      ...data,
      createdAt: new Date().toISOString(),
    };
    this.farmerHelp.unshift(ticket);
    return ticket;
  }

  async updateFarmerHelp(id, data) {
    const idx = this.farmerHelp.findIndex(
      (t) => t.id === id || t.referenceNumber === id
    );
    if (idx === -1) return null;
    this.farmerHelp[idx] = { ...this.farmerHelp[idx], ...data };
    return this.farmerHelp[idx];
  }

  // Distributors
  async getDistributors() {
    return [...this.distributors];
  }

  async createDistributor(data) {
    const lead = {
      id: `dist-${Date.now()}`,
      status: "new",
      ...data,
      createdAt: new Date().toISOString(),
    };
    this.distributors.unshift(lead);
    return lead;
  }

  async updateDistributorStatus(id, status) {
    const item = this.distributors.find((d) => d.id === id);
    if (!item) return null;
    item.status = status;
    return item;
  }

  // Admin Users & Roles
  async getAdmins() {
    return this.admins.map(({ password, ...admin }) => admin);
  }

  async getAdminByEmail(email) {
    return (
      this.admins.find(
        (a) => a.email.toLowerCase() === (email || "").toLowerCase()
      ) || null
    );
  }

  async createAdmin({ name, email, password, role }) {
    const exists = await this.getAdminByEmail(email);
    if (exists) {
      throw new Error("An administrator with this email already exists");
    }

    const roleTitles = {
      super_admin: "Super Admin",
      product_admin: "Product Admin",
      agronomist: "Agronomist",
      support_manager: "Support Manager",
    };

    const newAdmin = {
      id: `admin-${Date.now()}`,
      name,
      email,
      password,
      role: role || "support_manager",
      roleTitle: roleTitles[role] || "Administrator",
      status: "active",
      createdAt: new Date().toISOString(),
    };
    this.admins.push(newAdmin);
    const { password: _, ...safeAdmin } = newAdmin;
    return safeAdmin;
  }

  async deleteAdmin(id) {
    const admin = this.admins.find((a) => a.id === id);
    if (!admin) return false;
    if (admin.role === "super_admin" && admin.email === "admin@bionature.in") {
      throw new Error("The primary Super Admin account cannot be removed");
    }
    const idx = this.admins.findIndex((a) => a.id === id);
    this.admins.splice(idx, 1);
    return true;
  }
}

// Global DB instance
export let db = new InMemoryStore();

export async function initDatabase() {
  const { DATABASE_URL, MONGODB_URI } = process.env;

  if (DATABASE_URL) {
    try {
      const { default: pg } = await import("pg");
      const pool = new pg.Pool({ connectionString: DATABASE_URL });
      await pool.query("SELECT NOW()");
      console.log("✓ Connected to PostgreSQL database via DATABASE_URL");
      // Could initialize tables if needed or use pool
    } catch (err) {
      console.warn(
        "⚠️  PostgreSQL connection failed. Falling back to in-memory store.",
        err.message
      );
    }
  } else if (MONGODB_URI) {
    try {
      const { default: mongoose } = await import("mongoose");
      await mongoose.connect(MONGODB_URI);
      console.log("✓ Connected to MongoDB via MONGODB_URI");
    } catch (err) {
      console.warn(
        "⚠️  MongoDB connection failed. Falling back to in-memory store.",
        err.message
      );
    }
  } else {
    console.log(
      "ℹ️  [DB] Running with in-memory store. Set DATABASE_URL or MONGODB_URI in .env to connect a database."
    );
  }

  return db;
}
