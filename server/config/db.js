import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import {
  INITIAL_PRODUCTS,
  INITIAL_ENQUIRIES,
  INITIAL_DIAGNOSIS_RECORDS,
  INITIAL_DISTRIBUTORS,
  INITIAL_ADMINS,
} from "../data/initialData.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_FILE = path.resolve(__dirname, "../data/db.json");

// Persistent / In-Memory Store
class InMemoryStore {
  constructor() {
    this.products = [...INITIAL_PRODUCTS];
    this.enquiries = [...INITIAL_ENQUIRIES];
    this.farmerHelp = [...INITIAL_DIAGNOSIS_RECORDS];
    this.distributors = [...INITIAL_DISTRIBUTORS];
    this.admins = [...INITIAL_ADMINS];
    this.type = "in-memory";
    this.loadFromDisk();
  }

  loadFromDisk() {
    try {
      if (fs.existsSync(DATA_FILE)) {
        const content = fs.readFileSync(DATA_FILE, "utf-8");
        if (content && content.trim()) {
          const data = JSON.parse(content);
          if (Array.isArray(data.products) && data.products.length > 0) {
            // Keep existing products from disk, but also ensure any initial products not in disk are retained if needed
            const existingSlugs = new Set(data.products.map((p) => p.slug || p.id));
            const missingInitials = INITIAL_PRODUCTS.filter((p) => !existingSlugs.has(p.slug) && !existingSlugs.has(p.id));
            this.products = [...data.products, ...missingInitials];
          }
          if (Array.isArray(data.enquiries)) {
            this.enquiries = data.enquiries;
          }
          if (Array.isArray(data.farmerHelp)) {
            this.farmerHelp = data.farmerHelp;
          }
          if (Array.isArray(data.distributors)) {
            this.distributors = data.distributors;
          }
          if (Array.isArray(data.admins) && data.admins.length > 0) {
            this.admins = data.admins;
          }
          return;
        }
      }
    } catch (e) {
      console.warn("⚠️ [DB] Failed to load store from disk, initializing with default data:", e.message);
    }
    this.saveToDisk();
  }

  saveToDisk() {
    try {
      const dir = path.dirname(DATA_FILE);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(
        DATA_FILE,
        JSON.stringify(
          {
            products: this.products,
            enquiries: this.enquiries,
            farmerHelp: this.farmerHelp,
            distributors: this.distributors,
            admins: this.admins,
          },
          null,
          2
        ),
        "utf-8"
      );
    } catch (e) {
      console.warn("⚠️ [DB] Failed to save store to disk:", e.message);
    }
  }

  // Products
  async getProducts({ category, search } = {}) {
    let list = [...this.products];
    if (category && category !== "all") {
      list = list.filter(
        (p) =>
          p.category?.toLowerCase() === category.toLowerCase() ||
          p.categorySlug?.toLowerCase() === category.toLowerCase()
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
    if (!slug) return null;
    const clean = slug.toLowerCase();
    return (
      this.products.find(
        (p) => (p.slug && p.slug.toLowerCase() === clean) || p.id === slug
      ) || null
    );
  }

  async createProduct(data) {
    const rawName = (data.name || "").trim();
    const rawCategory = (data.category || "Bio Fertilizers").trim();
    const baseSlug =
      data.slug ||
      rawName
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "") ||
      `product-${Date.now()}`;

    // Ensure unique slug
    let uniqueSlug = baseSlug;
    let counter = 1;
    while (this.products.some((p) => p.slug === uniqueSlug && p.id !== data.id)) {
      uniqueSlug = `${baseSlug}-${counter++}`;
    }

    const defaultImage =
      data.primaryImage ||
      (Array.isArray(data.images) && data.images[0]) ||
      "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=800&auto=format&fit=crop&q=80";

    const newProduct = {
      id: data.id || `prod-${Date.now()}`,
      published: data.published !== undefined ? data.published : true,
      featured: Boolean(data.featured),
      name: rawName,
      slug: uniqueSlug,
      category: rawCategory,
      categorySlug:
        data.categorySlug ||
        rawCategory.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      shortDescription:
        data.shortDescription ||
        "High-potency biological formulation for Indian crops.",
      description:
        data.description ||
        data.shortDescription ||
        "Certified bio-agricultural solution.",
      dosage: data.dosage || "1 to 2 Liters per acre",
      applicationMethod:
        data.applicationMethod || "Foliar Spray / Drip Irrigation",
      benefits:
        Array.isArray(data.benefits) && data.benefits.length > 0
          ? data.benefits
          : [
              "Increases nutrient assimilation",
              "Eco-friendly and 100% residue-free",
            ],
      suitableCrops:
        Array.isArray(data.suitableCrops) && data.suitableCrops.length > 0
          ? data.suitableCrops
          : ["Tomato", "Chilli", "Paddy", "Vegetables"],
      targetProblems:
        Array.isArray(data.targetProblems) && data.targetProblems.length > 0
          ? data.targetProblems
          : ["Nutrient Deficiency", "Soil Health"],
      packSizes:
        Array.isArray(data.packSizes) && data.packSizes.length > 0
          ? data.packSizes
          : ["500 ml", "1 Liter", "5 Liters"],
      primaryImage: defaultImage,
      images:
        Array.isArray(data.images) && data.images.length > 0
          ? data.images
          : [defaultImage],
      galleryImages:
        Array.isArray(data.galleryImages) && data.galleryImages.length > 0
          ? data.galleryImages
          : [defaultImage],
      ...data,
      id: data.id || `prod-${Date.now()}`,
      slug: uniqueSlug,
      createdAt: data.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // If a product with the same ID already exists, update it instead
    const existingIdx = this.products.findIndex((p) => p.id === newProduct.id);
    if (existingIdx !== -1) {
      this.products[existingIdx] = { ...this.products[existingIdx], ...newProduct };
      this.saveToDisk();
      return this.products[existingIdx];
    }

    this.products.unshift(newProduct);
    this.saveToDisk();
    return newProduct;
  }

  async updateProduct(id, data) {
    const idx = this.products.findIndex((p) => p.id === id || p.slug === id);
    if (idx === -1) return null;
    this.products[idx] = {
      ...this.products[idx],
      ...data,
      updatedAt: new Date().toISOString(),
    };
    this.saveToDisk();
    return this.products[idx];
  }

  async deleteProduct(id) {
    const idx = this.products.findIndex((p) => p.id === id || p.slug === id);
    if (idx === -1) return false;
    this.products.splice(idx, 1);
    this.saveToDisk();
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
    this.saveToDisk();
    return enquiry;
  }

  async updateEnquiryStatus(id, status) {
    const item = this.enquiries.find((e) => e.id === id);
    if (!item) return null;
    item.status = status;
    item.updatedAt = new Date().toISOString();
    this.saveToDisk();
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
    this.saveToDisk();
    return ticket;
  }

  async updateFarmerHelp(id, data) {
    const idx = this.farmerHelp.findIndex(
      (t) => t.id === id || t.referenceNumber === id
    );
    if (idx === -1) return null;
    this.farmerHelp[idx] = {
      ...this.farmerHelp[idx],
      ...data,
      updatedAt: new Date().toISOString(),
    };
    this.saveToDisk();
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
    this.saveToDisk();
    return lead;
  }

  async updateDistributorStatus(id, status) {
    const item = this.distributors.find((d) => d.id === id);
    if (!item) return null;
    item.status = status;
    item.updatedAt = new Date().toISOString();
    this.saveToDisk();
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
    this.saveToDisk();
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
    this.saveToDisk();
    return true;
  }
}

// ===========================================
// PostgreSQL / Supabase Store
// ===========================================
class PostgresStore {
  constructor(pool) {
    this.pool = pool;
    this.type = "postgresql";
  }

  async init() {
    await this.pool.query(`
      CREATE TABLE IF NOT EXISTS products (
        id VARCHAR(100) PRIMARY KEY,
        slug VARCHAR(255) UNIQUE NOT NULL,
        name VARCHAR(255) NOT NULL,
        category VARCHAR(100) NOT NULL,
        published BOOLEAN DEFAULT true,
        data JSONB DEFAULT '{}'::jsonb,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS enquiries (
        id VARCHAR(100) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        mobile VARCHAR(50),
        email VARCHAR(255),
        status VARCHAR(50) DEFAULT 'new',
        data JSONB DEFAULT '{}'::jsonb,
        created_at TIMESTAMPTZ DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS farmer_help (
        id VARCHAR(100) PRIMARY KEY,
        reference_number VARCHAR(100) UNIQUE,
        farmer_name VARCHAR(255),
        status VARCHAR(50) DEFAULT 'in_review',
        data JSONB DEFAULT '{}'::jsonb,
        created_at TIMESTAMPTZ DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS distributors (
        id VARCHAR(100) PRIMARY KEY,
        firm_name VARCHAR(255),
        contact_person VARCHAR(255),
        status VARCHAR(50) DEFAULT 'pending_review',
        data JSONB DEFAULT '{}'::jsonb,
        created_at TIMESTAMPTZ DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS admins (
        id VARCHAR(100) PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        role VARCHAR(50) DEFAULT 'product_admin',
        password TEXT,
        data JSONB DEFAULT '{}'::jsonb,
        created_at TIMESTAMPTZ DEFAULT NOW()
      );
    `);

    // Seed initial products if table is empty
    const checkRes = await this.pool.query("SELECT COUNT(*) FROM products");
    if (parseInt(checkRes.rows[0].count, 10) === 0) {
      console.log("🌱 Seeding initial products & data into Supabase / PostgreSQL...");
      for (const prod of INITIAL_PRODUCTS) {
        await this.createProduct(prod);
      }
      for (const enq of INITIAL_ENQUIRIES) {
        await this.createEnquiry(enq);
      }
      for (const diag of INITIAL_DIAGNOSIS_RECORDS) {
        await this.createFarmerHelp(diag);
      }
      for (const dist of INITIAL_DISTRIBUTORS) {
        await this.createDistributor(dist);
      }
      for (const adm of INITIAL_ADMINS) {
        await this.createAdmin(adm);
      }
      console.log("✓ Initial data successfully seeded into Supabase!");
    }
  }

  // Products
  async getProducts({ category, search } = {}) {
    let query = "SELECT * FROM products WHERE 1=1";
    const params = [];
    if (category && category !== "all") {
      params.push(category.toLowerCase());
      query += ` AND (LOWER(category) = $${params.length} OR LOWER(COALESCE(data->>'categorySlug', '')) = $${params.length})`;
    }
    if (search) {
      params.push(`%${search.toLowerCase()}%`);
      query += ` AND (LOWER(name) LIKE $${params.length} OR LOWER(COALESCE(data->>'description', '')) LIKE $${params.length} OR LOWER(COALESCE(data->>'shortDescription', '')) LIKE $${params.length})`;
    }
    query += " ORDER BY created_at DESC";
    const res = await this.pool.query(query, params);
    return res.rows.map((r) => {
      const dataObj = typeof r.data === "object" && r.data !== null ? r.data : {};
      return {
        ...dataObj,
        ...r,
        id: r.id || dataObj.id,
        slug: r.slug || dataObj.slug || (r.name ? r.name.toLowerCase().replace(/[^a-z0-9]+/g, "-") : undefined),
        name: r.name || dataObj.name,
        category: r.category || dataObj.category || "Bio Fertilizers",
        published: r.published !== undefined ? r.published : (dataObj.published !== undefined ? dataObj.published : true),
        primaryImage: r.primaryImage || dataObj.primaryImage || (dataObj.images && dataObj.images[0]) || "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=800&auto=format&fit=crop&q=80",
        description: r.description || dataObj.description || dataObj.shortDescription || "High-potency biological formulation for Indian crops.",
      };
    });
  }

  async getProductBySlug(slug) {
    if (!slug) return null;
    const res = await this.pool.query("SELECT * FROM products WHERE slug = $1 OR id = $1", [slug]);
    if (!res.rows[0]) return null;
    const r = res.rows[0];
    const dataObj = typeof r.data === "object" && r.data !== null ? r.data : {};
    return {
      ...dataObj,
      ...r,
      id: r.id || dataObj.id,
      slug: r.slug || dataObj.slug,
      name: r.name || dataObj.name,
      category: r.category || dataObj.category || "Bio Fertilizers",
      published: r.published !== undefined ? r.published : (dataObj.published !== undefined ? dataObj.published : true),
      primaryImage: r.primaryImage || dataObj.primaryImage || (dataObj.images && dataObj.images[0]) || "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=800&auto=format&fit=crop&q=80",
      description: r.description || dataObj.description || dataObj.shortDescription || "High-potency biological formulation for Indian crops.",
    };
  }

  async getProductById(id) {
    if (!id) return null;
    const res = await this.pool.query("SELECT * FROM products WHERE id = $1 OR slug = $1", [id]);
    if (!res.rows[0]) return null;
    const r = res.rows[0];
    const dataObj = typeof r.data === "object" && r.data !== null ? r.data : {};
    return {
      ...dataObj,
      ...r,
      id: r.id || dataObj.id,
      slug: r.slug || dataObj.slug,
      name: r.name || dataObj.name,
      category: r.category || dataObj.category || "Bio Fertilizers",
      published: r.published !== undefined ? r.published : (dataObj.published !== undefined ? dataObj.published : true),
      primaryImage: r.primaryImage || dataObj.primaryImage || (dataObj.images && dataObj.images[0]) || "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=800&auto=format&fit=crop&q=80",
      description: r.description || dataObj.description || dataObj.shortDescription || "High-potency biological formulation for Indian crops.",
    };
  }

  async createProduct(data) {
    const newProduct = {
      id: data.id || `prod-${Date.now()}`,
      published: data.published !== false,
      featured: data.featured || false,
      ...data,
      createdAt: data.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const slug = newProduct.slug || newProduct.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    newProduct.slug = slug;
    await this.pool.query(
      `INSERT INTO products (id, slug, name, category, published, data, created_at, updated_at)
       VALUES ($1, $2, $3, $4, $5, $6, NOW(), NOW())
       ON CONFLICT (id) DO UPDATE SET slug = $2, name = $3, category = $4, published = $5, data = $6, updated_at = NOW()`,
      [newProduct.id, slug, newProduct.name, newProduct.category || "General", newProduct.published, JSON.stringify(newProduct)]
    );
    return newProduct;
  }

  async updateProduct(id, data) {
    const existing = (await this.getProductById(id)) || (await this.getProductBySlug(id));
    if (!existing) return null;
    const updated = {
      ...existing,
      ...data,
      updatedAt: new Date().toISOString(),
    };
    const slug = updated.slug || existing.slug;
    await this.pool.query(
      `UPDATE products SET slug = $2, name = $3, category = $4, published = $5, data = $6, updated_at = NOW() WHERE id = $1 OR slug = $1`,
      [existing.id, slug, updated.name, updated.category || "General", updated.published !== false, JSON.stringify(updated)]
    );
    return updated;
  }

  async deleteProduct(id) {
    const res = await this.pool.query("DELETE FROM products WHERE id = $1 OR slug = $1", [id]);
    return res.rowCount > 0;
  }

  // Enquiries
  async getEnquiries({ status, search } = {}) {
    let query = "SELECT data FROM enquiries WHERE 1=1";
    const params = [];
    if (status) {
      params.push(status);
      query += ` AND status = $${params.length}`;
    }
    if (search) {
      params.push(`%${search.toLowerCase()}%`);
      query += ` AND (LOWER(name) LIKE $${params.length} OR LOWER(mobile) LIKE $${params.length} OR LOWER(email) LIKE $${params.length})`;
    }
    query += " ORDER BY created_at DESC";
    const res = await this.pool.query(query, params);
    return res.rows.map((r) => r.data);
  }

  async getEnquiryById(id) {
    const res = await this.pool.query("SELECT data FROM enquiries WHERE id = $1", [id]);
    return res.rows[0]?.data || null;
  }

  async createEnquiry(data) {
    const newEnquiry = {
      id: data.id || `enq-${Date.now()}`,
      status: data.status || "new",
      ...data,
      createdAt: data.createdAt || new Date().toISOString(),
    };
    await this.pool.query(
      `INSERT INTO enquiries (id, name, mobile, email, status, data, created_at)
       VALUES ($1, $2, $3, $4, $5, $6, NOW())
       ON CONFLICT (id) DO UPDATE SET status = $5, data = $6`,
      [newEnquiry.id, newEnquiry.name, newEnquiry.mobile || "", newEnquiry.email || "", newEnquiry.status, JSON.stringify(newEnquiry)]
    );
    return newEnquiry;
  }

  async updateEnquiryStatus(id, status) {
    const enq = await this.getEnquiryById(id);
    if (!enq) return null;
    enq.status = status;
    enq.updatedAt = new Date().toISOString();
    await this.pool.query(
      "UPDATE enquiries SET status = $2, data = $3 WHERE id = $1",
      [id, status, JSON.stringify(enq)]
    );
    return enq;
  }

  async deleteEnquiry(id) {
    const res = await this.pool.query("DELETE FROM enquiries WHERE id = $1", [id]);
    return res.rowCount > 0;
  }

  // Farmer Help
  async getFarmerHelp({ status, search } = {}) {
    let query = "SELECT data FROM farmer_help WHERE 1=1";
    const params = [];
    if (status) {
      params.push(status);
      query += ` AND status = $${params.length}`;
    }
    if (search) {
      params.push(`%${search.toLowerCase()}%`);
      query += ` AND (LOWER(farmer_name) LIKE $${params.length} OR LOWER(reference_number) LIKE $${params.length})`;
    }
    query += " ORDER BY created_at DESC";
    const res = await this.pool.query(query, params);
    return res.rows.map((r) => r.data);
  }

  async getFarmerHelpById(id) {
    const res = await this.pool.query("SELECT data FROM farmer_help WHERE id = $1", [id]);
    return res.rows[0]?.data || null;
  }

  async getFarmerHelpByReference(ref) {
    const res = await this.pool.query("SELECT data FROM farmer_help WHERE reference_number = $1", [ref]);
    return res.rows[0]?.data || null;
  }

  async createFarmerHelp(data) {
    const newHelp = {
      id: data.id || `diag-${Date.now()}`,
      referenceNumber: data.referenceNumber || `BN-DIAG-${Math.floor(1000 + Math.random() * 9000)}`,
      status: data.status || "in_review",
      ...data,
      createdAt: data.createdAt || new Date().toISOString(),
    };
    await this.pool.query(
      `INSERT INTO farmer_help (id, reference_number, farmer_name, status, data, created_at)
       VALUES ($1, $2, $3, $4, $5, NOW())
       ON CONFLICT (id) DO UPDATE SET status = $4, data = $5`,
      [newHelp.id, newHelp.referenceNumber, newHelp.farmerName || "", newHelp.status, JSON.stringify(newHelp)]
    );
    return newHelp;
  }

  async updateFarmerHelp(id, data) {
    const help = await this.getFarmerHelpById(id);
    if (!help) return null;
    const updated = { ...help, ...data, updatedAt: new Date().toISOString() };
    await this.pool.query(
      "UPDATE farmer_help SET status = $2, data = $3 WHERE id = $1",
      [id, updated.status, JSON.stringify(updated)]
    );
    return updated;
  }

  // Distributors
  async getDistributors({ status, search } = {}) {
    let query = "SELECT data FROM distributors WHERE 1=1";
    const params = [];
    if (status) {
      params.push(status);
      query += ` AND status = $${params.length}`;
    }
    if (search) {
      params.push(`%${search.toLowerCase()}%`);
      query += ` AND (LOWER(firm_name) LIKE $${params.length} OR LOWER(contact_person) LIKE $${params.length})`;
    }
    query += " ORDER BY created_at DESC";
    const res = await this.pool.query(query, params);
    return res.rows.map((r) => r.data);
  }

  async getDistributorById(id) {
    const res = await this.pool.query("SELECT data FROM distributors WHERE id = $1", [id]);
    return res.rows[0]?.data || null;
  }

  async createDistributor(data) {
    const newDist = {
      id: data.id || `dist-${Date.now()}`,
      status: data.status || "pending_review",
      ...data,
      createdAt: data.createdAt || new Date().toISOString(),
    };
    await this.pool.query(
      `INSERT INTO distributors (id, firm_name, contact_person, status, data, created_at)
       VALUES ($1, $2, $3, $4, $5, NOW())
       ON CONFLICT (id) DO UPDATE SET status = $4, data = $5`,
      [newDist.id, newDist.firmName || "", newDist.contactPerson || "", newDist.status, JSON.stringify(newDist)]
    );
    return newDist;
  }

  async updateDistributorStatus(id, status) {
    const dist = await this.getDistributorById(id);
    if (!dist) return null;
    dist.status = status;
    dist.updatedAt = new Date().toISOString();
    await this.pool.query(
      "UPDATE distributors SET status = $2, data = $3 WHERE id = $1",
      [id, status, JSON.stringify(dist)]
    );
    return dist;
  }

  async deleteDistributor(id) {
    const res = await this.pool.query("DELETE FROM distributors WHERE id = $1", [id]);
    return res.rowCount > 0;
  }

  // Admins
  async getAdmins() {
    const res = await this.pool.query("SELECT data FROM admins ORDER BY created_at ASC");
    return res.rows.map((r) => {
      const { password, ...safe } = r.data;
      return safe;
    });
  }

  async findAdminByEmail(email) {
    const res = await this.pool.query("SELECT data FROM admins WHERE LOWER(email) = LOWER($1)", [email]);
    return res.rows[0]?.data || null;
  }

  verifyAdminPassword(admin, password) {
    return admin?.password === password;
  }

  async createAdmin(data) {
    const newAdmin = {
      id: data.id || `admin-${Date.now()}`,
      role: data.role || "product_admin",
      ...data,
      createdAt: data.createdAt || new Date().toISOString(),
    };
    await this.pool.query(
      `INSERT INTO admins (id, email, role, password, data, created_at)
       VALUES ($1, $2, $3, $4, $5, NOW())
       ON CONFLICT (id) DO UPDATE SET role = $3, password = $4, data = $5`,
      [newAdmin.id, newAdmin.email, newAdmin.role, newAdmin.password, JSON.stringify(newAdmin)]
    );
    const { password, ...safe } = newAdmin;
    return safe;
  }

  async deleteAdmin(id) {
    const res = await this.pool.query("DELETE FROM admins WHERE id = $1 AND role != 'super_admin'", [id]);
    return res.rowCount > 0;
  }
}

// Active Store Pointer & Dynamic Proxy
let activeStore = new InMemoryStore();

export const db = new Proxy({}, {
  get(_target, prop) {
    if (typeof activeStore[prop] === "function") {
      return activeStore[prop].bind(activeStore);
    }
    return activeStore[prop];
  },
});

export async function initDatabase() {
  const { DATABASE_URL } = process.env;

  if (DATABASE_URL) {
    try {
      const { default: pg } = await import("pg");
      const pool = new pg.Pool({
        connectionString: DATABASE_URL,
        ssl: { rejectUnauthorized: false },
        connectionTimeoutMillis: 5000,
      });
      await pool.query("SELECT NOW()");
      const pgStore = new PostgresStore(pool);
      await pgStore.init();
      activeStore = pgStore;
      console.log("===========================================");
      console.log("✓ Connected to Supabase / PostgreSQL Database!");
      console.log("✓ Tables & Schema Initialized and Synced.");
      console.log("===========================================");
    } catch (err) {
      console.warn(
        "⚠️  PostgreSQL connection failed. Falling back to in-memory store.",
        err.message
      );
    }
  } else {
    console.log(
      "ℹ️  [DB] Running with local persistent store (db.json). Set DATABASE_URL in .env to connect Supabase."
    );
  }

  return db;
}
