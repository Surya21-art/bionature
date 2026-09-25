import React, { useState, useEffect } from "react";
import { Link } from "wouter";
import {
  LayoutDashboard,
  Package,
  Stethoscope,
  MessageSquare,
  Building2,
  Lock,
  LogOut,
  Plus,
  Trash2,
  ExternalLink,
  ShieldCheck,
  UserPlus,
  Users,
  UserCheck,
  ShieldAlert,
  Sparkles,
} from "lucide-react";
import { useBioNatureStore } from "@/services/store";
import { CATEGORIES } from "@/data/bionature-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export const Admin = () => {
  const {
    products,
    enquiries,
    diagnoses,
    distributors,
    isAdmin,
    adminUser,
    admins,
    store,
  } = useBioNatureStore();

  const currentRole = adminUser?.role || "super_admin";
  const isSuperAdmin = currentRole === "super_admin";
  const canManageProducts = isSuperAdmin || currentRole === "product_admin";
  const canManageDiagnoses = isSuperAdmin || currentRole === "agronomist";
  const canManageEnquiries = isSuperAdmin || currentRole === "support_manager";
  const canManageDistributors = isSuperAdmin || currentRole === "support_manager";
  const canViewOverview = isSuperAdmin || currentRole === "product_admin" || currentRole === "support_manager";
  const canManageTeam = isSuperAdmin;

  const [email, setEmail] = useState("admin@bionature.in");
  const [password, setPassword] = useState("Admin@123");
  const [activeTab, setActiveTab] = useState("overview");

  // Adjust active tab if current tab is not allowed for this role
  useEffect(() => {
    if (isAdmin) {
      if (currentRole === "agronomist" && activeTab !== "diagnosis") {
        setActiveTab("diagnosis");
      } else if (currentRole === "product_admin" && activeTab !== "products" && activeTab !== "overview") {
        setActiveTab("products");
      } else if (currentRole === "support_manager" && activeTab !== "enquiries" && activeTab !== "distributors" && activeTab !== "overview") {
        setActiveTab("enquiries");
      }
    }
  }, [currentRole, isAdmin]);

  // New Admin User Modal State
  const [showAddAdmin, setShowAddAdmin] = useState(false);
  const [newAdminName, setNewAdminName] = useState("");
  const [newAdminEmail, setNewAdminEmail] = useState("");
  const [newAdminPassword, setNewAdminPassword] = useState("");
  const [newAdminRole, setNewAdminRole] = useState("support_manager");
  // New Product Modal State
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [newProductName, setNewProductName] = useState("");
  const [newProductCategory, setNewProductCategory] =
    useState("Bio Fertilizers");
  const [newProductDesc, setNewProductDesc] = useState("");
  const [newProductDosage, setNewProductDosage] = useState("");
  // Expert Note Response State
  const [selectedDiagnosisId, setSelectedDiagnosisId] = useState(null);
  const [expertNoteText, setExpertNoteText] = useState("");
  const [isGeneratingAiPrescription, setIsGeneratingAiPrescription] = useState(false);

  const handleAiPrescribe = async (ticket) => {
    try {
      setIsGeneratingAiPrescription(true);
      const res = await fetch("/api/ai/prescribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ticket }),
      });
      const data = await res.json();
      if (data.success && data.data?.prescription) {
        setExpertNoteText(data.data.prescription);
        toast.success("✨ Gemini AI generated an agronomy prescription!");
      } else {
        toast.error("Failed to generate prescription with AI.");
      }
    } catch (e) {
      toast.error("Could not reach Gemini AI service.");
    } finally {
      setIsGeneratingAiPrescription(false);
    }
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await store.verifyAdmin(email, password);
    if (res && res.success) {
      toast.success(
        `Welcome, ${res.user?.name || "Administrator"} (${res.user?.roleTitle || "Admin"})!`
      );
    } else {
      toast.error("Invalid credentials. Please select a demo role or check your input.");
    }
  };

  const handleLogout = () => {
    store.setAdminLogin(false);
    toast.info("Logged out of Admin Portal");
  };

  const handleCreateAdmin = async (e) => {
    e.preventDefault();
    if (!newAdminName.trim() || !newAdminEmail.trim() || !newAdminPassword.trim()) {
      toast.error("Name, email, and password are required");
      return;
    }
    try {
      await store.createAdmin({
        name: newAdminName.trim(),
        email: newAdminEmail.trim(),
        password: newAdminPassword.trim(),
        role: newAdminRole,
      });
      setShowAddAdmin(false);
      setNewAdminName("");
      setNewAdminEmail("");
      setNewAdminPassword("");
      toast.success(`Administrator '${newAdminName}' created successfully!`);
    } catch (err) {
      toast.error(err.message || "Failed to create administrator");
    }
  };

  const handleDeleteAdmin = async (id, name) => {
    if (window.confirm(`Are you sure you want to remove administrator '${name}'?`)) {
      try {
        await store.deleteAdmin(id);
        toast.info(`Administrator '${name}' removed.`);
      } catch (err) {
        toast.error(err.message || "Failed to remove administrator");
      }
    }
  };

  const getRoleBadge = (role) => {
    switch (role) {
      case "super_admin":
        return (
          <Badge className="bg-purple-600 hover:bg-purple-700 text-white text-[10px] flex items-center gap-1 font-semibold px-2 py-0.5">
            <ShieldCheck className="w-3 h-3" /> Super Admin
          </Badge>
        );
      case "product_admin":
        return (
          <Badge className="bg-blue-600 hover:bg-blue-700 text-white text-[10px] flex items-center gap-1 font-semibold px-2 py-0.5">
            <Package className="w-3 h-3" /> Product Admin
          </Badge>
        );
      case "agronomist":
        return (
          <Badge className="bg-amber-600 hover:bg-amber-700 text-white text-[10px] flex items-center gap-1 font-semibold px-2 py-0.5">
            <Stethoscope className="w-3 h-3" /> Agronomist
          </Badge>
        );
      case "support_manager":
        return (
          <Badge className="bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] flex items-center gap-1 font-semibold px-2 py-0.5">
            <Users className="w-3 h-3" /> Support Manager
          </Badge>
        );
      default:
        return (
          <Badge variant="secondary" className="text-[10px]">
            {role}
          </Badge>
        );
    }
  };

  const setDemoCredentials = (role) => {
    switch (role) {
      case "super_admin":
        setEmail("admin@bionature.in");
        setPassword("Admin@123");
        break;
      case "product_admin":
        setEmail("products@bionature.in");
        setPassword("Product@123");
        break;
      case "agronomist":
        setEmail("agronomy@bionature.in");
        setPassword("Agro@123");
        break;
      case "support_manager":
        setEmail("support@bionature.in");
        setPassword("Support@123");
        break;
    }
  };

  const handleCreateProduct = (e) => {
    e.preventDefault();
    if (!newProductName.trim()) {
      toast.error("Product name is required");
      return;
    }
    const slug = newProductName.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const newProd = {
      id: `prod-${Date.now()}`,
      name: newProductName,
      slug,
      category: newProductCategory,
      categorySlug: newProductCategory
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-"),
      shortDescription:
        newProductDesc ||
        "High-potency biological formulation for Indian crops.",
      description: newProductDesc || "Certified bio-agricultural solution.",
      benefits: [
        "Increases nutrient assimilation",
        "Eco-friendly and 100% residue-free",
      ],
      ingredients: "Active biological inoculants",
      applicationMethod: "Foliar Spray / Drip Irrigation",
      dosage: newProductDosage || "1 to 2 Liters per acre",
      packSizes: ["500 ml", "1 Liter", "5 Liters"],
      images: [
        "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=800&auto=format&fit=crop&q=80",
      ],
      documents: [
        { name: "Product Brochure.pdf", type: "PDF", size: "1.2 MB" },
      ],
      suitableCrops: ["Tomato", "Chilli", "Paddy", "Vegetables"],
      targetProblems: ["Nutrient Deficiency", "Soil Health"],
      published: true,
    };
    store.saveProduct(newProd);
    setShowAddProduct(false);
    setNewProductName("");
    setNewProductDesc("");
    setNewProductDosage("");
    toast.success("Product created and published to catalog!");
  };

  const handleSaveExpertNote = (id) => {
    if (!expertNoteText.trim()) return;
    store.updateDiagnosis(id, {
      expertNotes: expertNoteText,
      status: "responded",
    });
    setSelectedDiagnosisId(null);
    setExpertNoteText("");
    toast.success("Diagnosis advice updated and sent to farmer ticket!");
  };

  // If not logged in, show login screen
  if (!isAdmin) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4 py-16 bg-slate-50">
        <div className="max-w-md w-full bg-white p-8 rounded-3xl border border-slate-200 shadow-xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-2xl flex items-center justify-center mx-auto shadow-sm">
              <Lock className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900 font-serif">
              Admin Portal Login
            </h1>
            <p className="text-xs text-slate-500">
              Access role-based administrative workspaces.
            </p>
          </div>

          {/* Quick-Fill Role Selector */}
          <div className="space-y-2">
            <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider block">
              Quick-Select Role to Test:
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setDemoCredentials("super_admin")}
                className={`p-2 rounded-xl text-left border transition-all text-xs flex flex-col gap-0.5 ${email === "admin@bionature.in" ? "bg-purple-50 border-purple-500 text-purple-950 font-bold ring-2 ring-purple-400" : "bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-700"}`}
              >
                <div className="flex items-center gap-1 text-[11px]">
                  <ShieldCheck className="w-3.5 h-3.5 text-purple-600" />
                  <span>Super Admin</span>
                </div>
                <span className="text-[10px] text-slate-400 font-normal">All areas + Team</span>
              </button>

              <button
                type="button"
                onClick={() => setDemoCredentials("product_admin")}
                className={`p-2 rounded-xl text-left border transition-all text-xs flex flex-col gap-0.5 ${email === "products@bionature.in" ? "bg-blue-50 border-blue-500 text-blue-950 font-bold ring-2 ring-blue-400" : "bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-700"}`}
              >
                <div className="flex items-center gap-1 text-[11px]">
                  <Package className="w-3.5 h-3.5 text-blue-600" />
                  <span>Product Admin</span>
                </div>
                <span className="text-[10px] text-slate-400 font-normal">Catalog & Products</span>
              </button>

              <button
                type="button"
                onClick={() => setDemoCredentials("agronomist")}
                className={`p-2 rounded-xl text-left border transition-all text-xs flex flex-col gap-0.5 ${email === "agronomy@bionature.in" ? "bg-amber-50 border-amber-500 text-amber-950 font-bold ring-2 ring-amber-400" : "bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-700"}`}
              >
                <div className="flex items-center gap-1 text-[11px]">
                  <Stethoscope className="w-3.5 h-3.5 text-amber-600" />
                  <span>Agronomist</span>
                </div>
                <span className="text-[10px] text-slate-400 font-normal">Crop Diagnoses</span>
              </button>

              <button
                type="button"
                onClick={() => setDemoCredentials("support_manager")}
                className={`p-2 rounded-xl text-left border transition-all text-xs flex flex-col gap-0.5 ${email === "support@bionature.in" ? "bg-emerald-50 border-emerald-500 text-emerald-950 font-bold ring-2 ring-emerald-400" : "bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-700"}`}
              >
                <div className="flex items-center gap-1 text-[11px]">
                  <Users className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Support Mgr</span>
                </div>
                <span className="text-[10px] text-slate-400 font-normal">Enquiries & Dealers</span>
              </button>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">
                Email Address
              </label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="text-xs"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">
                Password
              </label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="text-xs"
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 text-xs rounded-xl shadow-md"
            >
              Sign In to Management Portal
            </Button>
          </form>
        </div>
      </div>
    );
  }

  // Logged-in Admin Dashboard
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Header Bar */}
      <div className="bg-slate-950 text-white rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-lg border border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            {getRoleBadge(currentRole)}
            <span className="text-xs text-slate-400">{adminUser?.email || email}</span>
          </div>
          <h1 className="text-2xl font-bold font-serif text-white mt-1">
            BioNature India Management Dashboard
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Logged in as <strong className="text-slate-200">{adminUser?.name || "Administrator"}</strong>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/">
            <Button
              variant="outline"
              size="sm"
              className="bg-slate-900 border-slate-700 text-slate-300 text-xs hover:bg-slate-800"
            >
              <ExternalLink className="w-3.5 h-3.5 mr-1" />
              View Public Website
            </Button>
          </Link>
          <Button
            variant="outline"
            size="sm"
            onClick={handleLogout}
            className="bg-red-950/60 border-red-800 text-red-300 text-xs hover:bg-red-900"
          >
            <LogOut className="w-3.5 h-3.5 mr-1" />
            Logout
          </Button>
        </div>
      </div>

      {/* Navigation Tabs (Filtered by Admin Role) */}
      <div className="flex flex-wrap items-center gap-2 border-b pb-3">
        {canViewOverview && (
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${activeTab === "overview" ? "bg-emerald-600 text-white shadow-sm" : "bg-slate-100 text-slate-700 hover:bg-slate-200"}`}
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>Overview KPIs</span>
          </button>
        )}

        {canManageProducts && (
          <button
            onClick={() => setActiveTab("products")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${activeTab === "products" ? "bg-emerald-600 text-white shadow-sm" : "bg-slate-100 text-slate-700 hover:bg-slate-200"}`}
          >
            <Package className="w-3.5 h-3.5" />
            <span>Products ({products.length})</span>
          </button>
        )}

        {canManageDiagnoses && (
          <button
            onClick={() => setActiveTab("diagnosis")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${activeTab === "diagnosis" ? "bg-emerald-600 text-white shadow-sm" : "bg-slate-100 text-slate-700 hover:bg-slate-200"}`}
          >
            <Stethoscope className="w-3.5 h-3.5 text-amber-500" />
            <span>Farmer Diagnoses ({diagnoses.length})</span>
          </button>
        )}

        {canManageEnquiries && (
          <button
            onClick={() => setActiveTab("enquiries")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${activeTab === "enquiries" ? "bg-emerald-600 text-white shadow-sm" : "bg-slate-100 text-slate-700 hover:bg-slate-200"}`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Enquiries Pipeline ({enquiries.length})</span>
          </button>
        )}

        {canManageDistributors && (
          <button
            onClick={() => setActiveTab("distributors")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${activeTab === "distributors" ? "bg-emerald-600 text-white shadow-sm" : "bg-slate-100 text-slate-700 hover:bg-slate-200"}`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>Distributor Leads ({distributors.length})</span>
          </button>
        )}

        {canManageTeam && (
          <button
            onClick={() => setActiveTab("team")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${activeTab === "team" ? "bg-purple-700 text-white shadow-sm" : "bg-purple-50 text-purple-800 border border-purple-200 hover:bg-purple-100"}`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-purple-600" />
            <span>Admin Team & Roles ({admins.length})</span>
          </button>
        )}
      </div>

      {/* 1. OVERVIEW TAB */}
      {activeTab === "overview" && (
        <div className="space-y-8">
          {/* KPI Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
              <span className="text-xs text-slate-500 font-medium">
                Published Products
              </span>
              <div className="text-3xl font-black font-serif text-slate-900">
                {products.length}
              </div>
              <span className="text-[10px] text-emerald-600 font-semibold">
                10 Biological Categories
              </span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
              <span className="text-xs text-slate-500 font-medium">
                Farmer Diagnosis Tickets
              </span>
              <div className="text-3xl font-black font-serif text-amber-600">
                {diagnoses.length}
              </div>
              <span className="text-[10px] text-amber-700 font-semibold">
                Photo Clinic Requests
              </span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
              <span className="text-xs text-slate-500 font-medium">
                Customer Inquiries
              </span>
              <div className="text-3xl font-black font-serif text-emerald-600">
                {enquiries.length}
              </div>
              <span className="text-[10px] text-emerald-700 font-semibold">
                Product & Dosage Queries
              </span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
              <span className="text-xs text-slate-500 font-medium">
                Distributor Applications
              </span>
              <div className="text-3xl font-black font-serif text-blue-600">
                {distributors.length}
              </div>
              <span className="text-[10px] text-blue-700 font-semibold">
                Dealership Leads
              </span>
            </div>
          </div>

          {/* Recent Diagnosis Tickets */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <Stethoscope className="w-4 h-4 text-amber-600" />
                Recent Farmer Crop Diagnoses Requiring Attention
              </h3>
              <button
                onClick={() => setActiveTab("diagnosis")}
                className="text-xs text-emerald-700 font-semibold"
              >
                View All →
              </button>
            </div>

            <div className="divide-y divide-slate-100 text-xs">
              {diagnoses.slice(0, 3).map((d) => (
                <div
                  key={d.id}
                  className="py-3 flex items-center justify-between gap-4"
                >
                  <div className="space-y-0.5">
                    <div className="font-bold text-slate-900">
                      {d.farmerName} •{" "}
                      <span className="text-emerald-700 font-mono">
                        {d.referenceNumber}
                      </span>
                    </div>
                    <div className="text-slate-500">
                      {d.crop} ({d.cropAge}) • {d.district}, {d.state}
                    </div>
                  </div>
                  <Badge
                    variant="outline"
                    className={`text-[10px] uppercase font-bold ${d.status === "responded" ? "bg-emerald-50 text-emerald-800" : "bg-amber-50 text-amber-800"}`}
                  >
                    {d.status.replace("_", " ")}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 2. PRODUCTS MANAGEMENT TAB */}
      {activeTab === "products" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900 font-serif">
                Catalog Products Management
              </h2>
              <p className="text-xs text-slate-500">
                Add, edit dosage, or unpublish biological products.
              </p>
            </div>
            <Button
              onClick={() => setShowAddProduct(true)}
              size="sm"
              className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold gap-1"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Product</span>
            </Button>
          </div>

          {/* Add Product Form Modal */}
          {showAddProduct && (
            <form
              onSubmit={handleCreateProduct}
              className="bg-emerald-50/70 p-6 rounded-3xl border border-emerald-200 space-y-4"
            >
              <h3 className="text-sm font-bold text-emerald-950">
                Add New Agricultural Formulation
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-700">
                    Product Name *
                  </label>
                  <Input
                    value={newProductName}
                    onChange={(e) => setNewProductName(e.target.value)}
                    placeholder="e.g. Bio-Potash Mobilizer"
                    className="text-xs bg-white mt-1"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700">
                    Category *
                  </label>
                  <select
                    value={newProductCategory}
                    onChange={(e) => setNewProductCategory(e.target.value)}
                    className="w-full h-9 rounded-md border border-input bg-white px-3 py-1 text-xs shadow-sm focus:outline-none mt-1"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c.id} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700">
                    Dosage per Acre *
                  </label>
                  <Input
                    value={newProductDosage}
                    onChange={(e) => setNewProductDosage(e.target.value)}
                    placeholder="e.g. 1-2 Liters per acre"
                    className="text-xs bg-white mt-1"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700">
                  Short Description
                </label>
                <Input
                  value={newProductDesc}
                  onChange={(e) => setNewProductDesc(e.target.value)}
                  placeholder="Summary of active microbes and agricultural benefits..."
                  className="text-xs bg-white mt-1"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <Button
                  type="submit"
                  size="sm"
                  className="bg-emerald-700 hover:bg-emerald-800 text-white text-xs"
                >
                  Save & Publish Product
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setShowAddProduct(false)}
                  className="text-xs"
                >
                  Cancel
                </Button>
              </div>
            </form>
          )}

          {/* Products Table */}
          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-700 font-bold border-b">
                <tr>
                  <th className="p-4">Product Name</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Dosage per Acre</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {products.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50/50">
                    <td className="p-4 font-bold text-slate-900">{p.name}</td>
                    <td className="p-4">{p.category}</td>
                    <td className="p-4 font-mono text-[11px]">{p.dosage}</td>
                    <td className="p-4">
                      <Badge
                        variant="outline"
                        className="text-[10px] text-emerald-800 bg-emerald-50"
                      >
                        {p.published ? "Published" : "Draft"}
                      </Badge>
                    </td>
                    <td className="p-4 text-right">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => {
                          if (confirm(`Delete ${p.name}?`)) {
                            store.deleteProduct(p.id);
                            toast.success("Product removed");
                          }
                        }}
                        className="text-red-600 hover:bg-red-50 p-1 h-8"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 3. FARMER DIAGNOSIS DESK */}
      {activeTab === "diagnosis" && (
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-bold text-slate-900 font-serif">
              Farmer Crop Photo Diagnosis Desk
            </h2>
            <p className="text-xs text-slate-500">
              Inspect uploaded crop damage photos and enter technical agronomic
              spray recommendations.
            </p>
          </div>

          <div className="space-y-4">
            {diagnoses.map((d) => (
              <div
                key={d.id}
                className="bg-white rounded-3xl border border-slate-200 p-6 space-y-4 shadow-sm"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b pb-3">
                  <div>
                    <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                      {d.referenceNumber}
                    </span>
                    <span className="text-xs text-slate-400 ml-3">
                      Submitted: {new Date(d.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-500">Status:</span>
                    <select
                      value={d.status}
                      onChange={(e) => {
                        store.updateDiagnosis(d.id, { status: e.target.value });
                        toast.success("Ticket status updated");
                      }}
                      className="text-xs font-bold rounded-lg border border-slate-200 px-2.5 py-1 bg-slate-50"
                    >
                      <option value="new">New</option>
                      <option value="in_review">In Review</option>
                      <option value="responded">Responded</option>
                      <option value="closed">Closed</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  <div>
                    <span className="text-slate-400 block">
                      Farmer Contact:
                    </span>
                    <strong className="text-slate-900">{d.farmerName}</strong>
                    <div className="text-slate-600">{d.mobile}</div>
                    <div className="text-slate-500">
                      {d.district}, {d.state}
                    </div>
                  </div>

                  <div>
                    <span className="text-slate-400 block">Crop & Stage:</span>
                    <strong className="text-slate-900">{d.crop}</strong>
                    <div className="text-slate-600">
                      Growth Stage: {d.cropAge}
                    </div>
                  </div>

                  <div>
                    <span className="text-slate-400 block">
                      Reported Symptoms:
                    </span>
                    <p className="text-slate-700 bg-slate-50 p-2 rounded-lg leading-relaxed">
                      {d.problemDescription}
                    </p>
                  </div>
                </div>

                {/* Crop Photographs */}
                {d.imageUrls && d.imageUrls.length > 0 && (
                  <div className="space-y-1.5 pt-2">
                    <span className="text-xs font-bold text-slate-700">
                      Uploaded Field Images:
                    </span>
                    <div className="flex flex-wrap gap-3">
                      {d.imageUrls.map((url, i) => (
                        <a
                          key={i}
                          href={url}
                          target="_blank"
                          rel="noreferrer"
                          className="block"
                        >
                          <img
                            src={url}
                            alt="Crop Photo"
                            className="w-24 h-24 object-cover rounded-xl border-2 border-slate-200 hover:border-emerald-500 shadow-sm"
                          />
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {/* Expert Diagnosis / Recommendation */}
                <div className="pt-2 border-t border-slate-100">
                  {d.expertNotes ? (
                    <div className="bg-emerald-50/80 p-4 rounded-xl border border-emerald-200 text-xs space-y-1">
                      <span className="font-bold text-emerald-900">
                        Current Agronomist Recommendation:
                      </span>
                      <p className="text-emerald-800">{d.expertNotes}</p>
                      <button
                        onClick={() => {
                          setSelectedDiagnosisId(d.id);
                          setExpertNoteText(d.expertNotes || "");
                        }}
                        className="text-[11px] text-emerald-700 font-semibold underline mt-2 block"
                      >
                        Edit Advice
                      </button>
                    </div>
                  ) : selectedDiagnosisId === d.id ? (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label className="text-xs font-bold text-slate-800">
                          Write Agronomist Diagnosis & Treatment:
                        </Label>
                        <Button
                          type="button"
                          size="sm"
                          variant="outline"
                          disabled={isGeneratingAiPrescription}
                          onClick={() => handleAiPrescribe(d)}
                          className="text-xs border-amber-300 bg-amber-50 text-amber-900 hover:bg-amber-100 flex items-center gap-1.5 h-7"
                        >
                          {isGeneratingAiPrescription ? (
                            <span className="flex items-center gap-1">
                              <span className="w-2.5 h-2.5 border-2 border-amber-600 border-t-transparent rounded-full animate-spin" />
                              Generating with Gemini...
                            </span>
                          ) : (
                            <span className="flex items-center gap-1">
                              <Sparkles className="w-3 h-3 text-amber-600" />
                              Auto-Generate with Gemini AI
                            </span>
                          )}
                        </Button>
                      </div>
                      <Textarea
                        value={expertNoteText}
                        onChange={(e) => setExpertNoteText(e.target.value)}
                        placeholder="State disease/pest identified and prescribe exact BioNature product + water dilution..."
                        className="text-xs font-mono"
                        rows={6}
                      />
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() => handleSaveExpertNote(d.id)}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold"
                        >
                          Send Advice to Ticket
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setSelectedDiagnosisId(null)}
                          className="text-xs"
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <Button
                      size="sm"
                      onClick={() => {
                        setSelectedDiagnosisId(d.id);
                        setExpertNoteText("");
                      }}
                      className="bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold"
                    >
                      + Prescribe Treatment Protocol
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. ENQUIRIES PIPELINE */}
      {activeTab === "enquiries" && (
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-bold text-slate-900 font-serif">
              Customer Enquiries Pipeline
            </h2>
            <p className="text-xs text-slate-500">
              Track and convert incoming buyer inquiries.
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-700 font-bold border-b">
                <tr>
                  <th className="p-4">Contact</th>
                  <th className="p-4">Location</th>
                  <th className="p-4">Type / Product</th>
                  <th className="p-4">Message</th>
                  <th className="p-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {enquiries.map((e) => (
                  <tr key={e.id} className="hover:bg-slate-50/50">
                    <td className="p-4">
                      <strong className="text-slate-900 block">{e.name}</strong>
                      <div className="text-slate-500">{e.mobile}</div>
                    </td>
                    <td className="p-4">
                      {e.district}, {e.state}
                    </td>
                    <td className="p-4">
                      <span className="font-semibold text-emerald-800">
                        {e.enquiryType}
                      </span>
                      {e.productName && (
                        <div className="text-[11px] text-slate-500">
                          {e.productName}
                        </div>
                      )}
                    </td>
                    <td className="p-4 max-w-xs truncate">{e.message}</td>
                    <td className="p-4">
                      <select
                        value={e.status}
                        onChange={(ev) => {
                          store.updateEnquiryStatus(e.id, ev.target.value);
                          toast.success("Enquiry status updated");
                        }}
                        className="text-xs font-semibold rounded-lg border border-slate-200 px-2 py-1 bg-slate-50"
                      >
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="in_progress">In Progress</option>
                        <option value="converted">Converted</option>
                        <option value="closed">Closed</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 5. DISTRIBUTOR LEADS */}
      {activeTab === "distributors" && (
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-bold text-slate-900 font-serif">
              Distributor & Dealership Applications
            </h2>
            <p className="text-xs text-slate-500">
              Commercial partners applying for territory distribution.
            </p>
          </div>

          <div className="space-y-4">
            {distributors.map((dist) => (
              <div
                key={dist.id}
                className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3"
              >
                <div className="flex items-center justify-between border-b pb-2">
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">
                      {dist.company}
                    </h3>
                    <div className="text-xs text-slate-500">
                      Contact Person: {dist.name} • {dist.mobile} • {dist.email}
                    </div>
                  </div>
                  <select
                    value={dist.status}
                    onChange={(e) => {
                      store.updateDistributorStatus(dist.id, e.target.value);
                      toast.success("Distributor status updated");
                    }}
                    className="text-xs font-bold rounded-lg border border-slate-200 px-2.5 py-1 bg-slate-50"
                  >
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="approved">Approved</option>
                    <option value="closed">Closed</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div>
                    <span className="text-slate-400 block">Territory:</span>
                    <strong className="text-slate-800">
                      {dist.district}, {dist.state}
                    </strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block">
                      Business Experience:
                    </span>
                    <strong className="text-slate-800">
                      {dist.yearsInBusiness} ({dist.currentBusiness})
                    </strong>
                  </div>
                  <div className="sm:col-span-2">
                    <span className="text-slate-400 block">
                      Interested Lines:
                    </span>
                    <div className="flex flex-wrap gap-1 mt-0.5">
                      {dist.interestedCategories.map((c) => (
                        <Badge
                          key={c}
                          variant="secondary"
                          className="text-[10px]"
                        >
                          {c}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                {dist.message && (
                  <p className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    {dist.message}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 6. ADMIN TEAM & ROLES (Super Admin Only) */}
      {canManageTeam && activeTab === "team" && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-slate-900 font-serif">
                  Administrator Team & Role Permissions
                </h2>
                <Badge className="bg-purple-100 text-purple-800 text-[10px] font-bold border border-purple-200">
                  Super Admin Control
                </Badge>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Delegate operational roles (Product Admins, Agronomists, Support Managers) to team members.
              </p>
            </div>

            <Button
              size="sm"
              onClick={() => setShowAddAdmin(true)}
              className="bg-purple-700 hover:bg-purple-800 text-white text-xs font-bold rounded-xl shadow-sm flex items-center gap-1.5"
            >
              <UserPlus className="w-4 h-4" />
              <span>Add New Administrator</span>
            </Button>
          </div>

          {/* Add Admin Form Modal */}
          {showAddAdmin && (
            <form
              onSubmit={handleCreateAdmin}
              className="bg-purple-50/70 p-6 rounded-3xl border border-purple-200 space-y-4 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <UserPlus className="w-4 h-4 text-purple-700" />
                  <h3 className="text-sm font-bold text-purple-950">
                    Invite & Configure New Administrator
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setShowAddAdmin(false)}
                  className="text-slate-400 hover:text-slate-600 text-xs font-bold"
                >
                  ✕ Close
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-700">
                    Full Name *
                  </label>
                  <Input
                    value={newAdminName}
                    onChange={(e) => setNewAdminName(e.target.value)}
                    placeholder="e.g. Ramesh Chandra"
                    className="text-xs bg-white mt-1"
                    required
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700">
                    Email Address (Login ID) *
                  </label>
                  <Input
                    type="email"
                    value={newAdminEmail}
                    onChange={(e) => setNewAdminEmail(e.target.value)}
                    placeholder="e.g. ramesh@bionature.in"
                    className="text-xs bg-white mt-1"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-700">
                    Initial Password *
                  </label>
                  <Input
                    type="password"
                    value={newAdminPassword}
                    onChange={(e) => setNewAdminPassword(e.target.value)}
                    placeholder="Minimum 6 characters"
                    className="text-xs bg-white mt-1"
                    required
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700">
                    Assigned Role & Access Scope *
                  </label>
                  <select
                    value={newAdminRole}
                    onChange={(e) => setNewAdminRole(e.target.value)}
                    className="w-full h-9 rounded-md border border-input bg-white px-3 py-1 text-xs shadow-sm focus:outline-none mt-1 font-semibold text-slate-800"
                  >
                    <option value="product_admin">
                      Product Admin (Catalog & Product Management only)
                    </option>
                    <option value="agronomist">
                      Agronomist / Diagnosis Expert (Crop Diagnoses & Prescriptions)
                    </option>
                    <option value="support_manager">
                      Support Manager (Customer Inquiries & Distributor Leads)
                    </option>
                    <option value="super_admin">
                      Super Admin (Full unrestricted access + Admin Team control)
                    </option>
                  </select>
                </div>
              </div>

              <div className="bg-white/80 p-3 rounded-xl border border-purple-100 text-[11px] text-purple-900 flex items-start gap-2">
                <ShieldAlert className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Role Security:</strong> Administrators will only see the specific modules authorized by their role upon logging in.
                </span>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <Button
                  type="submit"
                  size="sm"
                  className="bg-purple-700 hover:bg-purple-800 text-white text-xs font-bold rounded-xl"
                >
                  Create Administrator Account
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setShowAddAdmin(false)}
                  className="text-xs rounded-xl"
                >
                  Cancel
                </Button>
              </div>
            </form>
          )}

          {/* Administrators Table */}
          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="p-4 border-b bg-slate-50/70 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-slate-500" />
                <h3 className="text-xs font-bold text-slate-800">
                  Active Administrative Accounts ({admins.length})
                </h3>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-100 uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="p-4">Administrator</th>
                    <th className="p-4">Assigned Role</th>
                    <th className="p-4">Accessible Modules</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {admins.map((admin) => (
                    <tr key={admin.id || admin.email} className="hover:bg-slate-50/50 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center font-bold text-slate-700 text-xs">
                            {admin.name ? admin.name.charAt(0).toUpperCase() : "A"}
                          </div>
                          <div>
                            <strong className="text-slate-900 block font-semibold">
                              {admin.name}
                            </strong>
                            <span className="text-slate-400 text-[11px]">
                              {admin.email}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        {getRoleBadge(admin.role)}
                      </td>
                      <td className="p-4">
                        {admin.role === "super_admin" && (
                          <span className="text-[11px] text-purple-700 font-medium">
                            Full Control (Products, Diagnoses, Enquiries, Distributors, Team)
                          </span>
                        )}
                        {admin.role === "product_admin" && (
                          <span className="text-[11px] text-blue-700 font-medium">
                            Overview KPIs & Product Formulations Catalog
                          </span>
                        )}
                        {admin.role === "agronomist" && (
                          <span className="text-[11px] text-amber-700 font-medium">
                            Farmer Crop Diagnoses & Advisory Prescriptions
                          </span>
                        )}
                        {admin.role === "support_manager" && (
                          <span className="text-[11px] text-emerald-700 font-medium">
                            Customer Enquiries & Distributor Dealership Leads
                          </span>
                        )}
                      </td>
                      <td className="p-4">
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          Active
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        {admin.email === "admin@bionature.in" ? (
                          <span className="text-[10px] text-slate-400 italic">
                            Primary Root
                          </span>
                        ) : (
                          <button
                            type="button"
                            onClick={() => handleDeleteAdmin(admin.id, admin.name)}
                            className="text-red-500 hover:text-red-700 p-1.5 rounded-lg hover:bg-red-50 transition-colors"
                            title="Remove Administrator"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
