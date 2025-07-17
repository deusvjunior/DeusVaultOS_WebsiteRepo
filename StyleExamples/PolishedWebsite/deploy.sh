#!/bin/bash
echo "🚀 NEXUS TLDark Brand System - Deployment Script"

# Check if Python is available
if command -v python3 &> /dev/null; then
    echo "🐍 Starting Python server..."
    python3 server.py
elif command -v python &> /dev/null; then
    echo "🐍 Starting Python server..."
    python server.py
elif command -v node &> /dev/null && [ -f "package.json" ]; then
    echo "📦 Installing dependencies..."
    npm install
    echo "🚀 Starting Node.js server..."
    npm run serve
else
    echo "❌ No compatible server found"
    echo "Please install Python 3 or Node.js to run the brand system"
    exit 1
fi
