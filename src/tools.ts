import { tool } from "ai"
import { z } from "zod"
import { createMemory, getMemories, deleteMemory } from "./db"

export const tools = {
  getCurrentTime: tool({
    description: "Get the current date and time",
    inputSchema: z.object({}),
    execute: async () => {
      return { time: new Date().toISOString() }
    },
  }),
  createMemory: tool({
    description: "Store a new memory or piece of information that should be remembered for future conversations. Use this to save important facts, user preferences, context, or any information that might be useful later.",
    inputSchema: z.object({
      content: z.string().describe("The memory content to store. Should be clear, concise, and contain the key information to remember."),
    }),
    execute: async ({ content }) => {
      const memory = await createMemory(content)
      return {
        id: memory.id,
        content: memory.content,
        created_at: memory.created_at.toISOString(),
        message: "Memory stored successfully",
      }
    },
  }),
  getMemories: tool({
    description: "Retrieve stored memories. Use this to recall previously stored information, user preferences, or context from past conversations.",
    inputSchema: z.object({
      limit: z.number().optional().default(100).describe("Maximum number of memories to retrieve. Defaults to 100."),
    }),
    execute: async ({ limit }) => {
      const memories = await getMemories(limit)
      return {
        memories: memories.map((m) => ({
          id: m.id,
          content: m.content,
          created_at: m.created_at.toISOString(),
        })),
        count: memories.length,
      }
    },
  }),
  deleteMemory: tool({
    description: "Delete a specific memory by its ID. Use this when a memory is no longer relevant, incorrect, or the user wants to remove it.",
    inputSchema: z.object({
      id: z.number().describe("The ID of the memory to delete."),
    }),
    execute: async ({ id }) => {
      const deleted = await deleteMemory(id)
      return {
        deleted,
        message: deleted ? "Memory deleted successfully" : "Memory not found",
      }
    },
  }),
}
