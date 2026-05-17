#!/bin/bash

# Deployment script for Fake Internship Detector
# Run this on your VPS after initial setup

set -e  # Exit on error

echo "🚀 Starting deployment..."

# Configuration
APP_DIR="/var/www/fake-internship-detector"
BACKEND_DIR="$APP_DIR/Backend/fake-internship-detector-backend"
FRONTEND_DIR="$APP_DIR/Frontend"

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if running as deploy user
if [ "$USER" != "deploy" ]; then
    echo -e "${RED}❌ Please run this script as 'deploy' user${NC}"
    exit 1
fi

# Navigate to app directory
cd $APP_DIR

# Pull latest changes
echo -e "${YELLOW}📥 Pulling latest changes from Git...${NC}"
git pull origin main

# Backend deployment
echo -e "${YELLOW}🔧 Deploying Backend...${NC}"
cd $BACKEND_DIR

# Install dependencies
echo "Installing backend dependencies..."
npm install --production

# Restart backend
echo "Restarting backend service..."
pm2 restart internship-backend || pm2 start server.js --name "internship-backend"

# Frontend deployment
echo -e "${YELLOW}🎨 Deploying Frontend...${NC}"
cd $FRONTEND_DIR

# Install dependencies
echo "Installing frontend dependencies..."
npm install

# Build frontend
echo "Building frontend..."
npm run build

# Restart frontend
echo "Restarting frontend service..."
pm2 restart internship-frontend || pm2 start npm --name "internship-frontend" -- start

# Save PM2 configuration
pm2 save

# Show status
echo -e "${GREEN}✅ Deployment complete!${NC}"
echo ""
echo "Application Status:"
pm2 status

echo ""
echo -e "${GREEN}🎉 Your application is now running!${NC}"
echo "Frontend: http://YOUR_DOMAIN (port 3000)"
echo "Backend: http://YOUR_DOMAIN/api (port 5000)"
echo ""
echo "View logs with: pm2 logs"
