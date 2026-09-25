import { Router } from "express";
import { db } from "../config/db.js";

const router = Router();

router.get("/health", (_req, res) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    databaseType: db.type,
    uptime: process.uptime(),
  });
});

export default router;
