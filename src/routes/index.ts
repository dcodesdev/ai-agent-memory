import { res } from "../utils"

export async function handleRoot() {
  return res.json({
    message: "AI Agent API",
    endpoints: {
      POST: "/chat - Send a prompt to the AI agent",
      GET: "/health - Health check",
    },
  })
}
