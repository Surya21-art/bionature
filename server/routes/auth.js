import { Router } from "express";
import { db } from "../config/db.js";

const router = Router();

// POST /api/auth/login
router.post("/login", async (req, res) => {
  const { email, password } = req.body || {};

  if (!password) {
    return res.status(400).json({
      success: false,
      message: "Password is required",
    });
  }

  // 1. Check against registered admins in DB
  if (email) {
    const admin = await db.getAdminByEmail(email);
    if (admin && admin.password === password) {
      const { password: _, ...safeUser } = admin;
      return res.json({
        success: true,
        message: `Welcome back, ${admin.name}!`,
        user: safeUser,
        token: `token_${admin.role}_${Date.now()}`,
      });
    }
  }

  // 2. Check fallback env admin credentials
  const defaultEmail = process.env.ADMIN_EMAIL || "admin@bionature.in";
  const defaultPassword = process.env.ADMIN_PASSWORD || "Admin@123";

  if (password === defaultPassword || (email === defaultEmail && password === defaultPassword)) {
    return res.json({
      success: true,
      message: "Welcome, Super Administrator!",
      user: {
        id: "admin-1",
        name: "Chief Super Admin",
        email: defaultEmail,
        role: "super_admin",
        roleTitle: "Super Admin",
        status: "active",
      },
      token: `token_super_admin_${Date.now()}`,
    });
  }

  return res.status(401).json({
    success: false,
    message: "Invalid administrator credentials. Please check your email and password.",
  });
});

// GET /api/auth/admins (List all administrators)
router.get("/admins", async (_req, res) => {
  try {
    const list = await db.getAdmins();
    res.json({ success: true, count: list.length, data: list });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST /api/auth/admins (Create a new administrator with role)
router.post("/admins", async (req, res) => {
  try {
    const { name, email, password, role } = req.body || {};
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email, and password are required",
      });
    }

    const newAdmin = await db.createAdmin({
      name,
      email,
      password,
      role: role || "support_manager",
    });

    res.status(201).json({
      success: true,
      message: `Administrator '${name}' created successfully`,
      data: newAdmin,
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// DELETE /api/auth/admins/:id (Remove an administrator)
router.delete("/admins/:id", async (req, res) => {
  try {
    const ok = await db.deleteAdmin(req.params.id);
    if (!ok) {
      return res.status(404).json({ success: false, message: "Administrator not found" });
    }
    res.json({ success: true, message: "Administrator removed successfully" });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

export default router;
