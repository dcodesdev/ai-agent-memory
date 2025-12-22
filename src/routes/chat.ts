import { streamText, stepCountIs } from "ai"
import { openai } from "@ai-sdk/openai"
import { z } from "zod"
import { tools } from "../tools"
import { res } from "../utils"

const chatRequestSchema = z
  .object({
    prompt: z.string().optional(),
    message: z.string().optional(),
  })
  .refine((data) => data.prompt || data.message, {
    message: "Either 'prompt' or 'message' field is required",
  })

export async function handleChat(req: Request) {
  const body = await req.json()
  const validated = chatRequestSchema.safeParse(body)

  if (!validated.success) {
    return res.json(
      {
        error: "Validation error",
        details: validated.error.issues[0]?.message || "Unknown error",
      },
      400
    )
  }

  const prompt = validated.data.prompt || validated.data.message!

  const result = streamText({
    model: openai("gpt-4o-mini"),
    system:
      "You are a helpful AI assistant that can perform various tasks using tools.",
    prompt,
    tools,
    stopWhen: stepCountIs(10),
  })

  return result.toTextStreamResponse()
}
