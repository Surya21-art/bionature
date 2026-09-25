// Client wrapper for BioNature backend REST API

const API_BASE = "/api";

async function request(path, options = {}) {
  const url = `${API_BASE}${path}`;
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  try {
    const res = await fetch(url, {
      ...options,
      headers,
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || `Request failed with status ${res.status}`);
    }
    return data;
  } catch (err) {
    console.warn(`[API error] ${path}:`, err.message);
    throw err;
  }
}

export const api = {
  // Products
  async getProducts(params = {}) {
    const query = new URLSearchParams(params).toString();
    const res = await request(`/products${query ? `?${query}` : ""}`);
    return res.data || [];
  },

  async getProductBySlug(slug) {
    const res = await request(`/products/${encodeURIComponent(slug)}`);
    return res.data;
  },

  async createProduct(product) {
    const res = await request("/products", {
      method: "POST",
      body: JSON.stringify(product),
    });
    return res.data;
  },

  async updateProduct(id, product) {
    const res = await request(`/products/${encodeURIComponent(id)}`, {
      method: "PUT",
      body: JSON.stringify(product),
    });
    return res.data;
  },

  async deleteProduct(id) {
    return request(`/products/${encodeURIComponent(id)}`, {
      method: "DELETE",
    });
  },

  // Enquiries
  async getEnquiries() {
    const res = await request("/enquiries");
    return res.data || [];
  },

  async createEnquiry(enquiry) {
    const res = await request("/enquiries", {
      method: "POST",
      body: JSON.stringify(enquiry),
    });
    return res.data;
  },

  async updateEnquiryStatus(id, status) {
    const res = await request(`/enquiries/${encodeURIComponent(id)}/status`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    });
    return res.data;
  },

  // Farmer Help / Crop Diagnosis
  async getFarmerHelp() {
    const res = await request("/farmer-help");
    return res.data || [];
  },

  async getFarmerHelpByRef(ref) {
    const res = await request(`/farmer-help/${encodeURIComponent(ref)}`);
    return res.data;
  },

  async createFarmerHelp(data) {
    const res = await request("/farmer-help", {
      method: "POST",
      body: JSON.stringify(data),
    });
    return res.data;
  },

  async updateFarmerHelp(id, data) {
    const res = await request(`/farmer-help/${encodeURIComponent(id)}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    });
    return res.data;
  },

  // Distributors
  async getDistributors() {
    const res = await request("/distributors");
    return res.data || [];
  },

  async createDistributor(data) {
    const res = await request("/distributors", {
      method: "POST",
      body: JSON.stringify(data),
    });
    return res.data;
  },

  async updateDistributorStatus(id, status) {
    const res = await request(`/distributors/${encodeURIComponent(id)}/status`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    });
    return res.data;
  },

  // Auth & Admin Team
  async login(email, password) {
    return request("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
  },

  async getAdmins() {
    const res = await request("/auth/admins");
    return res.data || [];
  },

  async createAdmin(data) {
    const res = await request("/auth/admins", {
      method: "POST",
      body: JSON.stringify(data),
    });
    return res.data;
  },

  async deleteAdmin(id) {
    return request(`/auth/admins/${encodeURIComponent(id)}`, {
      method: "DELETE",
    });
  },

  // Health
  async checkHealth() {
    return request("/health");
  },
};
