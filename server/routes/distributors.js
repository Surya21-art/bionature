import { Router } from "express";
import { db } from "../config/db.js";

const router = Router();

// GET /api/distributors
router.get("/", async (_req, res) => {
  try {
    const list = await db.getDistributors();
    res.json({ success: true, count: list.length, data: list });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST /api/distributors
router.post("/", async (req, res) => {
  try {
    const { name, company, mobile, email, state } = req.body;
    if (!name || !company || !mobile) {
      return res.status(400).json({
        success: false,
        message: "Applicant name, company, and mobile number are required",
      });
    }

    const lead = await db.createDistributor({
      name,
      company,
      mobile,
      email: email || "",
      state: state || "",
      district: req.body.district || "",
      currentBusiness: req.body.currentBusiness || "",
      yearsInBusiness: req.body.yearsInBusiness || "",
      interestedCategories: req.body.interestedCategories || [],
      message: req.body.message || "",
    });

    res.status(201).json({
      success: true,
      message: "Distributor application received successfully",
      data: lead,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// PATCH /api/distributors/:id/status
router.patch("/:id/status", async (req, res) => {
  try {
    const { status } = req.body;
    if (!status) {
      return res.status(400).json({ success: false, message: "Status is required" });
    }
    const updated = await db.updateDistributorStatus(req.params.id, status);
    if (!updated) {
      return res.status(404).json({ success: false, message: "Distributor lead not found" });
    }
    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;
