import { streamText, stepCountIs } from "ai"
import { openai } from "@ai-sdk/openai"
import { z, ZodError } from "zod"
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
  try {
    const body = await req.json()
    const validated = chatRequestSchema.parse(body)
    const prompt = validated.prompt || validated.message!

    const result = streamText({
      model: openai("gpt-4o-mini"),
      system:
        "You are a helpful AI assistant that can perform various tasks using tools.",
      prompt,
      tools,
      stopWhen: stepCountIs(10),
    })

    return result.toTextStreamResponse()
  } catch (error) {
    if (error instanceof ZodError) {
      return res.json(
        {
          error: "Validation error",
          details: error.issues,
        },
        400
      )
    }
    return res.json(
      {
        error: error instanceof Error ? error.message : "Unknown error",
      },
      500
    )
  }
}
