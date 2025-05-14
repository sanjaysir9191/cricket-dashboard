#!/bin/bash
set -e  # Exit immediately if a command exits with a non-zero status

echo "=== Cricket Dashboard Setup and Run Script ==="

# Check if Docker is running
if ! docker info >/dev/null 2>&1; then
  echo "Docker is not running. Starting Docker..."
  sudo systemctl start docker
  sleep 5
fi

# Clean up any existing containers
echo "Stopping and removing existing containers..."
docker-compose down 2>/dev/null || true

# Make sure the nginx.conf file exists
if [ -d ./nginx.conf ]; then
  echo "nginx.conf is a directory. Removing it..."
  rm -rf ./nginx.conf
fi

if [ ! -f ./nginx.conf ]; then
  echo "Creating nginx.conf file..."
  cat > nginx.conf << 'EOF'
# This file will be loaded by Nginx as /etc/nginx/conf.d/nginx.conf
server {
    listen 80 default_server;
    
    access_log /var/log/nginx/access.log;
    error_log /var/log/nginx/error.log;

    location / {
        # Use the service name with container_name for reliability
        proxy_pass http://web:5000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        
        # Add longer timeouts for stability
        proxy_connect_timeout 120s;
        proxy_read_timeout 120s;
    }
}
EOF
fi

# Bring up the containers
echo "Starting Docker containers..."
docker-compose up -d

# Check container status
echo "Checking container status..."
docker-compose ps

# Show logs if there are errors
if docker-compose ps | grep -q "Exit"; then
  echo "Some containers exited. Showing logs..."
  docker-compose logs
  exit 1
fi

echo "=== Setup complete! ==="
echo "Web application is available at: http://localhost:5000"
echo "Nginx proxy is available at: http://localhost:8012"
echo ""
echo "To view logs: docker-compose logs -f"
echo "To stop the application: docker-compose down"