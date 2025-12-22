import { tool } from "ai"
import { z } from "zod"

export const tools = {
  calculate: tool({
    description: "Perform mathematical calculations",
    inputSchema: z.object({
      expression: z
        .string()
        .describe("The mathematical expression to evaluate"),
    }),
    execute: async ({ expression }) => {
      try {
        const result = Function(`"use strict"; return (${expression})`)()
        return { result, expression }
      } catch (error) {
        return { error: "Invalid expression", expression }
      }
    },
  }),
  getCurrentTime: tool({
    description: "Get the current date and time",
    inputSchema: z.object({}),
    execute: async () => {
      return { time: new Date().toISOString() }
    },
  }),
  echo: tool({
    description: "Echo back a message",
    inputSchema: z.object({
      message: z.string().describe("The message to echo back"),
    }),
    execute: async ({ message }) => {
      return { echoed: message }
    },
  }),
}
