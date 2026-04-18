import { RequestHandler } from "express";
import { DemoResponse } from "@shared/api";

export const handleDemo: RequestHandler = (req, res) => {
  try {
    const response: DemoResponse = {
      message: "Hello from Express server",
    };
    res.status(200).json(response);
  } catch (error) {
    console.error("Demo endpoint error:", error);
    res.status(500).json({
      error: "Internal server error",
      message: "Failed to process demo request",
    });
  }
};
