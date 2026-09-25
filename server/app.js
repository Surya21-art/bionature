import express from "express";
import cors from "cors";
import apiRouter from "./routes/index.js";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Simple request logger
app.use((req, _res, next) => {
  const start = Date.now();
  const { method, url } = req;
  _res.on("finish", () => {
    const duration = Date.now() - start;
    console.log(`[API] ${method} ${url} ${_res.statusCode} (${duration}ms)`);
  });
  next();
});

// API routes
app.use("/api", apiRouter);

// 404 for unhandled API routes
app.use("/api/*", (_req, res) => {
  res.status(404).json({ success: false, message: "API endpoint not found" });
});

// Generic error handler
app.use((err, _req, res, _next) => {
  console.error("Unhandled Server Error:", err);
  res.status(500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

export default app;
