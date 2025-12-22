# ai-agent-memory

AI agent web server built with Vercel AI SDK and Bun.

## Setup

1. Install dependencies:
```bash
bun install
```

2. Set your OpenAI API key:
```bash
export OPENAI_API_KEY=your_api_key_here
```

## Usage

Start the server:
```bash
bun run index.ts
```

The server will run on `http://localhost:3000` (or the port specified in `PORT` env var).

## API Endpoints

### POST /chat
Send a prompt to the AI agent.

**Request:**
```json
{
  "prompt": "What time is it?"
}
```

**Response:**
```json
{
  "text": "The current time is...",
  "steps": 2,
  "toolResults": [...]
}
```

### GET /health
Health check endpoint.

### GET /
API information.

## Features

The agent includes three tools:
- **calculate**: Perform mathematical calculations
- **getCurrentTime**: Get the current date and time
- **echo**: Echo back a message

This project was created using `bun init` in bun v1.3.5. [Bun](https://bun.com) is a fast all-in-one JavaScript runtime.
