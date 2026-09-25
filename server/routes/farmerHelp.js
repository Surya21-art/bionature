import { Router } from "express";
import { db } from "../config/db.js";

const router = Router();

// GET /api/farmer-help
router.get("/", async (_req, res) => {
  try {
    const list = await db.getFarmerHelp();
    res.json({ success: true, count: list.length, data: list });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/farmer-help/:ref
router.get("/:ref", async (req, res) => {
  try {
    const ticket = await db.getFarmerHelpByRef(req.params.ref);
    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: "No crop diagnosis record found with this reference number",
      });
    }
    res.json({ success: true, data: ticket });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST /api/farmer-help
router.post("/", async (req, res) => {
  try {
    const { farmerName, mobile, crop, problemDescription } = req.body;
    if (!farmerName || !mobile || !crop) {
      return res.status(400).json({
        success: false,
        message: "Farmer name, mobile number, and crop name are required",
      });
    }

    const ticket = await db.createFarmerHelp({
      farmerName,
      mobile,
      crop,
      problemDescription: problemDescription || "",
      cropAge: req.body.cropAge || "",
      state: req.body.state || "",
      district: req.body.district || "",
      email: req.body.email || "",
      imageUrls: req.body.imageUrls || [],
    });

    res.status(201).json({
      success: true,
      message: "Crop diagnosis request submitted successfully",
      referenceNumber: ticket.referenceNumber,
      data: ticket,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// PATCH /api/farmer-help/:id
router.patch("/:id", async (req, res) => {
  try {
    const updated = await db.updateFarmerHelp(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Diagnosis record not found",
      });
    }
    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;
