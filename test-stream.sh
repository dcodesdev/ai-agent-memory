#!/bin/bash

echo "Testing streaming chat endpoint..."
echo "Prompt: What time is it?"
echo "---"
curl -X POST http://localhost:3000/chat \
  -H "Content-Type: application/json" \
  -d '{"prompt": "What time is it?"}' \
  --no-buffer
echo -e "\n---\nDone!"

