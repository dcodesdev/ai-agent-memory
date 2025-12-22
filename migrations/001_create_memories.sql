CREATE TABLE IF NOT EXISTS memories (
  id SERIAL PRIMARY KEY,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_memories_created_at ON memories(created_at);

