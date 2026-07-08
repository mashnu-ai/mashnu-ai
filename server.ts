import dotenv from "dotenv";
import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { compileAgent, simulateStep, assistantChat } from "./src/server/agentLogic";
import { notifyContact } from "./src/server/notifyContact";

// Load .env.local first (real secrets, gitignored), then .env as a fallback.
dotenv.config({ path: ".env.local" });
dotenv.config();

// This server has no external AI API dependency and no API keys required.
// The "compiler", "simulator", "lead qualifier", and "assistant" endpoints
// return realistic, deterministic sample content built from the request
// inputs, so the demo works instantly and costs nothing to host.
// Shared logic lives in src/server/agentLogic.ts so the same behavior is
// used both here (local/Node dev server) and in api/*.ts (Vercel functions).

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route: Compile Agent Pipeline from User Prompt
  app.post("/api/compile-agent", async (req, res) => {
    try {
      const { prompt } = req.body;

      if (!prompt) {
        return res.status(400).json({ error: "Prompt is required to compile an agent pipeline." });
      }

      res.json(compileAgent(prompt));
    } catch (error: any) {
      console.error("Compilation error:", error);
      res.status(500).json({ error: error?.message || "Failed to compile the agent pipeline." });
    }
  });

  // API Route: Simulate Agent Execution Trace Log
  app.post("/api/simulate-step", async (req, res) => {
    try {
      const { compiledAgent, userInput } = req.body;

      if (!compiledAgent || !userInput) {
        return res.status(400).json({ error: "Compiled agent configuration and user input test query are required." });
      }

      res.json(simulateStep(compiledAgent, userInput));
    } catch (error: any) {
      console.error("Simulation error:", error);
      res.status(500).json({ error: error?.message || "Failed to simulate agent execution trace." });
    }
  });

  // API Route: Contact form submission — emails the submission to NOTIFY_EMAIL via Resend
  app.post("/api/contact", async (req, res) => {
    try {
      const { fullName, email, company, useCase } = req.body;

      if (!useCase || !email) {
        return res.status(400).json({ error: "Please include your email and a description of what you want to automate." });
      }

      await notifyContact({ fullName, email, company, useCase });

      res.json({ received: true });
    } catch (error: any) {
      console.error("Contact form error:", error);
      res.status(500).json({ error: error?.message || "Failed to send your message." });
    }
  });

  // API Route: Personal AI Assistant Multi-turn Chat
  app.post("/api/assistant/chat", async (req, res) => {
    try {
      const { messages } = req.body;

      if (!messages || !Array.isArray(messages)) {
        return res.status(400).json({ error: "A valid array of messages is required." });
      }

      res.json(assistantChat(messages));
    } catch (error: any) {
      console.error("Personal Assistant chat error:", error);
      res.status(500).json({ error: error?.message || "Failed to generate chat response." });
    }
  });

  // Serve Frontend Assets: Vite Dev middleware in development, compiled build in production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Mashnu Server] Listening on port ${PORT} in ${process.env.NODE_ENV || "development"} mode.`);
  });
}

startServer();
