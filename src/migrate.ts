import { SQL } from "bun"
import { readdir } from "fs/promises"
import { join } from "path"

const dbUrl = process.env.DATABASE_URL_MEMORY_DB
if (!dbUrl) {
  throw new Error("DATABASE_URL_MEMORY_DB environment variable is not set")
}

const db = new SQL(dbUrl)

export async function runMigrations() {
  const dbName = new URL(dbUrl!).pathname.slice(1)

  try {
    const url = new URL(dbUrl!)
    url.pathname = "/postgres"
    const adminDb = new SQL(url.toString())

    const [exists] = await adminDb`
        SELECT 1 FROM pg_database WHERE datname = ${dbName}
      `

    if (!exists) {
      await adminDb.unsafe(`CREATE DATABASE ${dbName}`)
      console.log(`Created database: ${dbName}`)
    }
  } catch (err) {
    console.warn("Could not ensure database exists:", err)
  }

  await db`
    CREATE TABLE IF NOT EXISTS migrations (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) UNIQUE NOT NULL,
      executed_at TIMESTAMP DEFAULT NOW()
    )
  `

  const migrationsDir = join(import.meta.dir, "..", "migrations")
  const files = (await readdir(migrationsDir))
    .filter((f) => f.endsWith(".sql"))
    .sort()

  for (const file of files) {
    const [existing] = await db`
      SELECT name FROM migrations WHERE name = ${file}
    `

    if (existing) {
      console.log(`Skipping ${file} (already executed)`)
      continue
    }

    const sqlContent = await Bun.file(join(migrationsDir, file)).text()
    const statements = sqlContent
      .split(";")
      .map((s) => s.trim())
      .filter((s) => s.length > 0)

    for (const statement of statements) {
      await db.unsafe(statement)
    }

    await db`INSERT INTO migrations (name) VALUES (${file})`

    console.log(`Executed migration: ${file}`)
  }
}
