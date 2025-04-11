#!/bin/bash

PORT=3000

# Check if anything is using the port
PID=$(lsof -ti tcp:$PORT)

if [ -n "$PID" ]; then
  echo "⚠️ Port $PORT is in use by PID $PID. Killing it..."
  sudo kill -9 $PID
else
  echo "✅ Port $PORT is free."
fi

# Recompile
echo "🛠️  Compiling TypeScript..."
npx tsc

# Start fresh with PM2
echo "🚀 Starting server with PM2..."
pm2 delete instant-replay-api >/dev/null 2>&1
pm2 start dist/index.js --name instant-replay-api --update-env

echo "📡 Server is running on port $PORT"
