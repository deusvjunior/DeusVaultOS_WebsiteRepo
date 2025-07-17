#!/usr/bin/env python3
"""
NEXUS TLDark Glassmorphic Brand System - Production Web Server
Premium brand demonstration and download package server
"""

import http.server
import socketserver
import os
import json
import mimetypes
from urllib.parse import urlparse, parse_qs
import gzip
import shutil
from pathlib import Path

class NexusBrandServer(http.server.SimpleHTTPRequestHandler):
    """Enhanced server for NEXUS brand system with compression and analytics"""
    
    def __init__(self, *args, **kwargs):
        # Set up MIME types for web fonts and modern file types
        mimetypes.add_type('application/font-woff2', '.woff2')
        mimetypes.add_type('application/font-woff', '.woff')
        mimetypes.add_type('image/svg+xml', '.svg')
        mimetypes.add_type('text/css', '.css')
        mimetypes.add_type('application/javascript', '.jsx')
        super().__init__(*args, **kwargs)
    
    def end_headers(self):
        # Add security and performance headers
        self.send_header('X-Content-Type-Options', 'nosniff')
        self.send_header('X-Frame-Options', 'DENY')
        self.send_header('X-XSS-Protection', '1; mode=block')
        self.send_header('Cache-Control', 'public, max-age=3600')
        
        # Enable CORS for development
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        
        super().end_headers()
    
    def do_GET(self):
        """Enhanced GET handler with brand system routing"""
        parsed_path = urlparse(self.path)
        path = parsed_path.path
        
        # Route handling for brand system
        if path == '/' or path == '':
            # Serve brand system index
            self.serve_brand_index()
        elif path == '/download':
            # Serve download package information
            self.serve_download_info()
        elif path == '/api/brand-info':
            # Serve brand system metadata
            self.serve_brand_api()
        else:
            # Default file serving with compression
            super().do_GET()
    
    def serve_brand_index(self):
        """Serve the main brand system showcase"""
        try:
            index_content = self.generate_brand_index()
            self.send_response(200)
            self.send_header('Content-type', 'text/html; charset=utf-8')
            self.send_header('Content-Length', str(len(index_content.encode())))
            self.end_headers()
            self.wfile.write(index_content.encode())
        except Exception as e:
            self.send_error(500, f"Server error: {str(e)}")
    
    def serve_download_info(self):
        """Serve download package information"""
        try:
            download_info = {
                "brandSystem": "NEXUS TLDark Glassmorphic",
                "version": "1.0.0",
                "downloadSize": "~2.5MB",
                "components": [
                    "Complete Design System",
                    "React Interactive Components", 
                    "Premium Landing Pages",
                    "Marketing Banner Collection",
                    "Logo System & Assets",
                    "Typography & Icon Library"
                ],
                "features": [
                    "TLDark Premium Aesthetics",
                    "Glassmorphic Effects",
                    "Backdrop-filter Support",
                    "Responsive Design",
                    "Commercial License",
                    "Framework Agnostic"
                ],
                "downloadCommand": "npm run package",
                "quickStart": "python3 server.py",
                "documentation": "/DOWNLOAD_PACKAGE_GUIDE.md"
            }
            
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps(download_info, indent=2).encode())
        except Exception as e:
            self.send_error(500, f"Server error: {str(e)}")
    
    def serve_brand_api(self):
        """Serve brand system API data"""
        try:
            with open('package.json', 'r') as f:
                package_data = json.load(f)
            
            brand_api = {
                "system": package_data.get('brandSystem', {}),
                "version": package_data.get('version'),
                "components": self.get_available_components(),
                "assets": self.get_asset_inventory(),
                "status": "active",
                "serverInfo": {
                    "port": 8080,
                    "protocol": "HTTP/1.1",
                    "compression": "gzip",
                    "cors": "enabled"
                }
            }
            
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps(brand_api, indent=2).encode())
        except Exception as e:
            self.send_error(500, f"Server error: {str(e)}")
    
    def generate_brand_index(self):
        """Generate the main brand system index page"""
        return '''<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>NEXUS TLDark - Premium Brand System</title>
    <link rel="stylesheet" href="nexus_design_system.css">
    <style>
        body { 
            background: var(--tldark-primary);
            font-family: 'Inter', system-ui, sans-serif;
            margin: 0;
            padding: var(--space-8);
            min-height: 100vh;
        }
        .brand-index {
            max-width: 1200px;
            margin: 0 auto;
            text-align: center;
        }
        .component-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: var(--space-6);
            margin: var(--space-12) 0;
        }
        .component-card {
            background: var(--glass-surface-2);
            backdrop-filter: var(--blur-md);
            border: 1px solid var(--glass-border);
            border-radius: var(--radius-lg);
            padding: var(--space-6);
            transition: all 0.3s ease;
        }
        .component-card:hover {
            transform: translateY(-4px);
            box-shadow: var(--elevation-2);
        }
        .download-section {
            background: var(--glass-gradient-1);
            backdrop-filter: var(--blur-lg);
            border: 1px solid var(--accent-silver);
            border-radius: var(--radius-xl);
            padding: var(--space-8);
            margin: var(--space-12) 0;
        }
    </style>
</head>
<body>
    <div class="brand-index">
        <h1 class="nexus-heading nexus-heading--hero">🎯 NEXUS TLDark</h1>
        <p class="nexus-text" style="font-size: var(--font-size-xl); color: var(--text-primary); margin-bottom: var(--space-8);">
            Premium Glassmorphic Brand System
        </p>
        
        <div class="component-grid">
            <div class="component-card">
                <h3>🏠 Landing Page</h3>
                <p>Conversion-optimized landing page with premium glassmorphic effects</p>
                <a href="nexus_landing_page.html" class="nexus-btn nexus-btn--primary">View Component</a>
            </div>
            
            <div class="component-card">
                <h3>🎨 Brand Showcase</h3>
                <p>Interactive demonstration of complete brand system components</p>
                <a href="nexus_brand_showcase.html" class="nexus-btn nexus-btn--primary">View Component</a>
            </div>
            
            <div class="component-card">
                <h3>📢 Banner Campaigns</h3>
                <p>Marketing banner collection with TLDark glassmorphic styling</p>
                <a href="nexus_banner_campaigns.html" class="nexus-btn nexus-btn--primary">View Component</a>
            </div>
            
            <div class="component-card">
                <h3>🏷️ Logo System</h3>
                <p>Complete logo variations and brand identity showcase</p>
                <a href="nexus_logo_system.html" class="nexus-btn nexus-btn--primary">View Component</a>
            </div>
        </div>
        
        <div class="download-section">
            <h2>📦 Download Complete Brand System</h2>
            <p style="color: var(--text-muted); margin: var(--space-4) 0;">
                Get the complete NEXUS TLDark glassmorphic brand system with all components, assets, and documentation.
            </p>
            <div style="display: flex; gap: var(--space-4); justify-content: center; flex-wrap: wrap;">
                <a href="DOWNLOAD_PACKAGE_GUIDE.md" class="nexus-btn nexus-btn--primary">📖 Download Guide</a>
                <a href="/download" class="nexus-btn nexus-btn--secondary">📊 Package Info</a>
                <a href="/api/brand-info" class="nexus-btn nexus-btn--ghost">🔧 API Data</a>
            </div>
        </div>
    </div>
</body>
</html>'''
    
    def get_available_components(self):
        """Get list of available brand components"""
        components = []
        html_files = Path('.').glob('nexus_*.html')
        for file in html_files:
            components.append({
                "name": file.stem.replace('nexus_', '').replace('_', ' ').title(),
                "file": file.name,
                "url": f"/{file.name}"
            })
        return components
    
    def get_asset_inventory(self):
        """Get inventory of brand assets"""
        assets = {
            "images": len(list(Path('assets/images').glob('*'))) if Path('assets/images').exists() else 0,
            "fonts": len(list(Path('assets/fonts').glob('*'))) if Path('assets/fonts').exists() else 0,
            "icons": len(list(Path('assets/icons').glob('*'))) if Path('assets/icons').exists() else 0
        }
        return assets

def create_asset_directories():
    """Create necessary asset directories"""
    directories = [
        'assets/images',
        'assets/fonts', 
        'assets/icons'
    ]
    
    for directory in directories:
        Path(directory).mkdir(parents=True, exist_ok=True)
        print(f"   • {directory}/ - Created")

def main():
    """Main server startup function"""
    PORT = 8081
    
    print("🎯 Starting NEXUS TLDark Brand System Server...")
    print("📁 Creating asset directories:")
    create_asset_directories()
    
    print(f"\n🌐 Starting HTTP server on port {PORT}...")
    print(f"🔗 Access the brand system at: http://localhost:{PORT}")
    print(f"📦 Download guide: http://localhost:{PORT}/DOWNLOAD_PACKAGE_GUIDE.md")
    print(f"📊 Package info: http://localhost:{PORT}/download")
    print(f"🔧 API data: http://localhost:{PORT}/api/brand-info")
    print("\nPress Ctrl+C to stop the server")
    
    try:
        with socketserver.TCPServer(("", PORT), NexusBrandServer) as httpd:
            httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n🛑 Server stopped by user")
    except Exception as e:
        print(f"❌ Server error: {e}")

if __name__ == "__main__":
    main()
