import { handleRoot } from "./routes/index"
import { handleHealth } from "./routes/health"
import { handleChat } from "./routes/chat"
import { runMigrations } from "./migrate"

await runMigrations()
console.log("Migrations completed")

const server = Bun.serve({
  port: process.env.PORT || 8080,
  async fetch(req) {
    const url = new URL(req.url)

    if (url.pathname === "/" && req.method === "GET") {
      return handleRoot()
    }

    if (url.pathname === "/health" && req.method === "GET") {
      return handleHealth()
    }

    if (url.pathname === "/chat" && req.method === "POST") {
      return handleChat(req)
    }

    return new Response("Not Found", { status: 404 })
  },
})

console.log(`Server running at http://localhost:${server.port}`)
