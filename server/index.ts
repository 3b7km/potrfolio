import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";

export function createServer() {
  const app = express();

  // Security middleware
  app.use((req, res, next) => {
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("X-Frame-Options", "DENY");
    res.setHeader("X-XSS-Protection", "1; mode=block");
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    next();
  });

  // CORS with proper origin validation
  const allowedOrigins = [
    "http://localhost:3000",
    "http://localhost:8080",
    process.env.ALLOWED_ORIGIN,
  ].filter(Boolean);

  app.use(
    cors({
      origin: allowedOrigins,
      credentials: true,
    })
  );

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Health check endpoint
  app.get("/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // Example API routes with error handling
  app.get("/api/ping", (_req, res) => {
    try {
      const ping = process.env.PING_MESSAGE ?? "ping";
      res.status(200).json({ message: ping });
    } catch (error) {
      console.error("Ping endpoint error:", error);
      res
        .status(500)
        .json({ error: "Internal server error", message: "Failed to ping" });
    }
  });

  app.get("/api/demo", handleDemo);

  // 404 handler for API routes
  app.use("/api", (req, res) => {
    res.status(404).json({
      error: "Not Found",
      message: `API endpoint ${req.method} ${req.path} does not exist`,
    });
  });

  return app;
}
