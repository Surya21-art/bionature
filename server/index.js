import dotenv from "dotenv";
import app from "./app.js";
import { initDatabase } from "./config/db.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    await initDatabase();

    const server = app.listen(PORT, () => {
      console.log(`===========================================`);
      console.log(`🚀 BioNature India API Server`);
      console.log(`📡 URL: http://localhost:${PORT}`);
      console.log(`🩺 Health: http://localhost:${PORT}/api/health`);
      console.log(`===========================================`);
    });

    server.on("error", (err) => {
      if (err.code === "EADDRINUSE") {
        console.error(
          `\n⚠️  Port ${PORT} is already in use by another process. Please stop the existing process or set PORT=... in .env`
        );
      } else {
        console.error("Server error:", err);
      }
      process.exit(1);
    });

    // Graceful shutdown
    const shutdown = () => {
      console.log("Shutting down server...");
      server.close(() => {
        console.log("Server stopped.");
        process.exit(0);
      });
    };

    process.on("SIGINT", shutdown);
    process.on("SIGTERM", shutdown);
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
}

startServer();
