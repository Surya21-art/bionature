import { Router } from "express";
import { db } from "../config/db.js";

const router = Router();

// GET /api/enquiries
router.get("/", async (_req, res) => {
  try {
    const list = await db.getEnquiries();
    res.json({ success: true, count: list.length, data: list });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST /api/enquiries
router.post("/", async (req, res) => {
  try {
    const { name, mobile, message, state, district } = req.body;
    if (!name || !mobile || !message) {
      return res.status(400).json({
        success: false,
        message: "Name, mobile number, and message are required",
      });
    }

    const newEnquiry = await db.createEnquiry({
      name,
      mobile,
      message,
      state: state || "",
      district: district || "",
      email: req.body.email || "",
      crop: req.body.crop || "",
      productName: req.body.productName || "",
      productSlug: req.body.productSlug || "",
      enquiryType: req.body.enquiryType || "General Enquiry",
    });

    res.status(201).json({
      success: true,
      message: "Enquiry submitted successfully",
      data: newEnquiry,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// PATCH /api/enquiries/:id/status
router.patch("/:id/status", async (req, res) => {
  try {
    const { status } = req.body;
    if (!status) {
      return res.status(400).json({ success: false, message: "Status is required" });
    }
    const updated = await db.updateEnquiryStatus(req.params.id, status);
    if (!updated) {
      return res.status(404).json({ success: false, message: "Enquiry not found" });
    }
    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;
