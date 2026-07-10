import dotenv from "dotenv";
import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { compileAgent, simulateStep, assistantChat, assistantChatStatus } from "./src/server/agentLogic";
import { notifyContact, validateContactSubmission } from "./src/server/notifyContact";
import { detectGeo } from "./src/server/geo";
import { getModelPricing } from "./src/server/modelPricing";

// Load .env.local first (real secrets, gitignored), then .env as a fallback.
dotenv.config({ path: ".env.local" });
dotenv.config();

// The "compiler" and "simulator" endpoints return deterministic sample
// content built from the request inputs — no API key required.
// The "assistant" endpoint calls the Groq API (GROQ_API_KEY) for real
// chat responses. Shared logic lives in src/server/agentLogic.ts so the
// same behavior is used both here (local/Node dev server) and in
// api/*.ts (Vercel functions).

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
      res.status(500).json({ error: "Failed to compile the agent pipeline." });
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
      res.status(500).json({ error: "Failed to simulate agent execution trace." });
    }
  });

  // API Route: Contact form submission — emails the submission to NOTIFY_EMAIL via Resend
  // and persists it to Supabase (see src/server/notifyContact.ts)
  app.post("/api/contact", async (req, res) => {
    const submission = validateContactSubmission(req.body);
    if ("error" in submission) {
      return res.status(400).json({ error: submission.error });
    }

    try {
      await notifyContact(submission);
      res.json({ received: true });
    } catch (error: any) {
      console.error("Contact form error:", error);
      res.status(500).json({ error: "Failed to send your message. Please try again shortly." });
    }
  });

  // API Route: Personal AI Assistant Multi-turn Chat
  app.post("/api/assistant/chat", async (req, res) => {
    try {
      const { messages, sessionId } = req.body;

      if (!messages || !Array.isArray(messages)) {
        return res.status(400).json({ error: "A valid array of messages is required." });
      }

      res.json(await assistantChat(messages, sessionId));
    } catch (error: any) {
      console.error("Personal Assistant chat error:", error);
      res.status(500).json({ error: "Failed to generate chat response. Please try again shortly." });
    }
  });

  // API Route: Check whether a visitor has hit the free-question limit,
  // without sending a message (used to disable the widget on reopen/refresh).
  app.get("/api/assistant/status", async (req, res) => {
    try {
      const sessionId = typeof req.query.sessionId === "string" ? req.query.sessionId : undefined;
      res.json(await assistantChatStatus(sessionId));
    } catch (error: any) {
      console.error("Assistant status error:", error);
      res.status(500).json({ error: "Failed to check assistant status." });
    }
  });

  // API Route: Detect visitor's country + currency from IP, with live exchange rates
  app.get("/api/geo", async (req, res) => {
    try {
      const forwardedFor = req.headers["x-forwarded-for"];
      const ip = Array.isArray(forwardedFor)
        ? forwardedFor[0]
        : (forwardedFor as string | undefined)?.split(",")[0]?.trim() || req.socket.remoteAddress;

      res.json(await detectGeo(ip));
    } catch (error: any) {
      console.error("Geo detection error:", error);
      res.status(500).json({ error: "Failed to detect location." });
    }
  });

  // API Route: Live AI model token pricing, fetched from Groq's own API
  app.get("/api/model-pricing", async (req, res) => {
    try {
      res.json(await getModelPricing());
    } catch (error: any) {
      console.error("Model pricing error:", error);
      res.status(500).json({ error: "Failed to fetch model pricing." });
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
