#!/bin/bash

APP_DIR="/root/apps/instantReplayServer"
PORT_FILE="$APP_DIR/.port"
TEMPLATE="/etc/nginx/sites-available/api.wallwebdevelopment.com.conf"
NGINX_DEST="/etc/nginx/sites-enabled/api.wallwebdevelopment.com"

if [ -f "$PORT_FILE" ]; then
  APP_PORT=$(cat "$PORT_FILE")
  echo "🔁 Updating NGINX to use port $APP_PORT"

  # Generate a real config with correct port
  sudo sed "s|__APP_PORT__|$APP_PORT|g" "$TEMPLATE" | sudo tee "$NGINX_DEST" > /dev/null

  sudo nginx -t && sudo systemctl reload nginx
  echo "✅ NGINX reloaded to port $APP_PORT"
else
  echo "❌ .port file not found at $PORT_FILE"
  exit 1
fi
