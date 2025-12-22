#!/bin/bash

PROMPT="${1:-What time is it?}"

echo "Testing streaming chat endpoint..."
echo "Prompt: $PROMPT"
echo "---"
curl -X POST http://localhost:3000/chat \
  -H "Content-Type: application/json" \
  -d "{\"prompt\": \"$PROMPT\"}" \
  --no-buffer
echo -e "\n---\nDone!"

