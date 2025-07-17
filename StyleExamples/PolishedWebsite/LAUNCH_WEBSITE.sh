#!/bin/bash

# NEXUS HYPERION WEBSITE LAUNCHER
# Cinema-Grade Brand System Deployment

echo "╔══════════════════════════════════════════════════════════════════════════════╗"
echo "║                    🏰 NEXUS HYPERION DEPLOYMENT SYSTEM 🏰                    ║"
echo "║                       CINEMA-GRADE BRAND EXPERIENCE                          ║"
echo "╚══════════════════════════════════════════════════════════════════════════════╝"
echo ""
echo "🚀 LAUNCHING NEXUS HYPERION BRAND SYSTEM..."
echo "📍 Server will start on: http://localhost:8082"
echo ""
echo "Available Pages:"
echo "  • Main Landing:    http://localhost:8082/nexus_hyperion_landing.html"
echo "  • Dashboard:       http://localhost:8082/nexus_hyperion_dashboard.html"
echo "  • Brand Showcase:  http://localhost:8082/nexus_brand_showcase.html"
echo "  • Logo System:     http://localhost:8082/nexus_logo_system.html"
echo ""
echo "Press Ctrl+C to stop the server"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Start the Python server
python3 server.py
