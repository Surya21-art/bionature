import { Router } from "express";
import {
  diagnoseCrop,
  generatePrescription,
  chatWithAgronomist,
  isGeminiConfigured,
} from "../services/gemini.js";

const router = Router();

/**
 * GET /api/ai/status
 * Check Gemini integration status
 */
router.get("/status", (_req, res) => {
  const configured = isGeminiConfigured();
  res.json({
    success: true,
    service: "BioNature Gemini AI Service",
    provider: configured ? "Google Gemini API" : "BioNature Domain Agronomy Engine (Standby)",
    isLiveGemini: configured,
    model: configured ? (process.env.GEMINI_MODEL || "gemini-1.5-flash") : "bionature-v1",
    capabilities: [
      "Multimodal Crop Photo Diagnosis (Vision)",
      "Automated Agronomist Prescription Generation",
      "Multilingual Farmer Chatbot",
    ],
  });
});

/**
 * POST /api/ai/diagnose
 * Multimodal diagnosis of plant disease from photo & symptoms
 */
router.post("/diagnose", async (req, res) => {
  try {
    const { crop, symptoms, imageBase64, mimeType } = req.body;

    if (!crop && !symptoms && !imageBase64) {
      return res.status(400).json({
        success: false,
        message: "At least one of crop name, symptoms, or photo is required for diagnosis",
      });
    }

    const diagnosis = await diagnoseCrop({
      crop,
      symptoms,
      imageBase64,
      mimeType,
    });

    res.json({
      success: true,
      data: diagnosis,
    });
  } catch (error) {
    console.error("[AI Diagnose Route Error]:", error);
    res.status(500).json({
      success: false,
      message: "Failed to generate AI crop diagnosis: " + error.message,
    });
  }
});

/**
 * POST /api/ai/prescribe
 * Generate prescription for admin agronomist
 */
router.post("/prescribe", async (req, res) => {
  try {
    const { ticket } = req.body;

    if (!ticket) {
      return res.status(400).json({
        success: false,
        message: "Ticket details are required to generate prescription",
      });
    }

    const result = await generatePrescription({ ticket });

    res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("[AI Prescribe Route Error]:", error);
    res.status(500).json({
      success: false,
      message: "Failed to generate AI prescription: " + error.message,
    });
  }
});

/**
 * POST /api/ai/chat
 * Farmer conversational assistant
 */
router.post("/chat", async (req, res) => {
  try {
    const { message, conversationHistory = [], language = "en" } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({
        success: false,
        message: "Message text is required",
      });
    }

    const response = await chatWithAgronomist({
      message,
      conversationHistory,
      language,
    });

    res.json({
      success: true,
      data: response,
    });
  } catch (error) {
    console.error("[AI Chat Route Error]:", error);
    res.status(500).json({
      success: false,
      message: "AI Chat failed: " + error.message,
    });
  }
});

export default router;
