# ai-agent-memory

AI agent web server built with Vercel AI SDK and Bun, featuring persistent memory storage.

## Setup

1. Install dependencies:

```bash
bun install
```

2. Set your OpenAI API key:

```bash
export OPENAI_API_KEY=your_api_key_here
```

3. Set database connection string:

```bash
export DATABASE_URL_MEMORY_DB=postgresql://user:password@host:port/database
```

## Usage

Start the server:

```bash
bun run start
```

Or for development with watch mode:

```bash
bun run dev
```

The server will run on `http://localhost:8080` (or the port specified in `PORT` env var).

## API Endpoints

### POST /chat

Send a prompt to the AI agent. Returns a streaming text response.

**Request:**

```json
{
  "prompt": "What time is it?"
}
```

Or:

```json
{
  "message": "What time is it?"
}
```

**Response:**

Streaming text response (text/event-stream).

### GET /health

Health check endpoint.

### GET /

API information.

## Features

The agent includes four tools:

- **getCurrentTime**: Get the current date and time
- **createMemory**: Store a new memory or piece of information for future conversations
- **getMemories**: Retrieve stored memories (default limit: 100)
- **deleteMemory**: Delete a specific memory by its ID

## Database

The application uses PostgreSQL for persistent memory storage. Migrations run automatically on startup.

## Deployment

This project is configured for deployment on Neptune. See `neptune.json` for configuration.

To deploy:

1. Provision resources:

```bash
neptune provision
```

2. Set secrets (if needed):

```bash
neptune set-secret OPENAI_API_KEY
```

3. Deploy:

```bash
neptune deploy
```

This project was created using `bun init` in bun v1.3.5. [Bun](https://bun.com) is a fast all-in-one JavaScript runtime.
