# ai-agent-memory

AI agent built with Vercel AI SDK.

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

Run the agent with a prompt:
```bash
bun run index.ts "What time is it?"
```

Or run without arguments for the default prompt:
```bash
bun run index.ts
```

## Features

The agent includes three tools:
- **calculate**: Perform mathematical calculations
- **getCurrentTime**: Get the current date and time
- **echo**: Echo back a message

This project was created using `bun init` in bun v1.3.5. [Bun](https://bun.com) is a fast all-in-one JavaScript runtime.
