import { SQL } from "bun"

const dbUrl = process.env.DATABASE_URL_MEMORY_DB
if (!dbUrl) {
  throw new Error("DATABASE_URL_MEMORY_DB environment variable is not set")
}

const db = new SQL(dbUrl)

export interface Memory {
  id: number
  content: string
  created_at: Date
}

export async function getMemories(limit = 100): Promise<Memory[]> {
  const result = await db`
    SELECT id, content, created_at
    FROM memories
    ORDER BY created_at DESC
    LIMIT ${limit}
  `
  return result.map((row: any) => ({
    id: row.id,
    content: row.content,
    created_at: new Date(row.created_at),
  }))
}

export async function createMemory(content: string): Promise<Memory> {
  const result = await db`
    INSERT INTO memories (content, created_at)
    VALUES (${content}, NOW())
    RETURNING id, content, created_at
  `
  const row = result[0] as any
  return {
    id: row.id,
    content: row.content,
    created_at: new Date(row.created_at),
  }
}

export async function deleteMemory(id: number): Promise<boolean> {
  const result = await db`
    DELETE FROM memories
    WHERE id = ${id}
    RETURNING id
  `
  return result.length > 0
}
