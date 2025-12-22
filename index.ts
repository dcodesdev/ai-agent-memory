import { generateText, stepCountIs, tool } from "ai"
import { openai } from "@ai-sdk/openai"
import { z } from "zod"

async function main() {
  const prompt = process.argv.slice(2).join(" ") || "What time is it?"

  console.log(`Prompt: ${prompt}\n`)

  const result = await generateText({
    model: openai("gpt-4o-mini"),
    system:
      "You are a helpful AI assistant that can perform various tasks using tools.",
    prompt,
    tools: {
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
    },
    stopWhen: stepCountIs(10),
    onStepFinish: ({ toolResults }) => {
      if (toolResults.length > 0) {
        console.log("\nTool results:")
        console.dir(toolResults, { depth: null })
      }
    },
  })

  console.log("\nResponse:", result.text)
  console.log("\nSteps:", result.steps.length)
}

main().catch(console.error)
