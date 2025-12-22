export async function handleRoot() {
  return new Response(
    JSON.stringify({
      message: "AI Agent API",
      endpoints: {
        POST: "/chat - Send a prompt to the AI agent",
        GET: "/health - Health check",
      },
    }),
    {
      headers: { "Content-Type": "application/json" },
    }
  )
}

