import { motion } from "framer-motion";
import { Github, ExternalLink, Mail, Shield, Zap } from "lucide-react";

export function ProfessionalFooter() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    {
      icon: <Github className="h-4 w-4" />,
      label: "GitHub Repository",
      href: "https://github.com/AngeloGkOne/DeusVaultOS_WebsiteRepo",
      external: true
    },
    {
      icon: <ExternalLink className="h-4 w-4" />,
      label: "Documentation",
      href: "/docs",
      external: false
    },
    {
      icon: <Mail className="h-4 w-4" />,
      label: "Contact",
      href: "mailto:contact@deusvault.dev",
      external: true
    }
  ];

  const technicalSpecs = [
    {
      icon: <Shield className="h-4 w-4" />,
      title: "Open Source",
      description: "MIT Licensed"
    },
    {
      icon: <Zap className="h-4 w-4" />,
      title: "Performance",
      description: "Sub-second startup"
    }
  ];

  return (
    <footer className="relative border-t" style={{ borderColor: 'var(--glass-border)' }}>
      <div className="tldark-container py-12">
        
        {/* Main Footer Content */}
        <div className="tldark-grid tldark-grid--3 mb-8">
          
          {/* Brand Section */}
          <div>
            <h3 className="tldark-heading text-xl mb-4">
              <span style={{ color: 'var(--text-primary)' }}>DEUS</span>
              <span style={{ color: 'var(--accent-cyan)' }}>VAULT</span>
              <span style={{ color: 'var(--accent-neon-yellow)' }}>OS</span>
            </h3>
            <p className="tldark-text--muted text-sm leading-relaxed mb-4">
              Professional development environment with AI integration, 
              zero configuration, and autonomous evolution capabilities.
            </p>
            <div className="tldark-text--muted text-xs">
              Built with modern web technologies for professional developers.
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="tldark-text font-semibold mb-4">Resources</h4>
            <div className="space-y-3">
              {quickLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.href}
                  target={link.external ? "_blank" : "_self"}
                  rel={link.external ? "noopener noreferrer" : ""}
                  className="flex items-center gap-3 tldark-text--muted hover:text-current transition-colors group"
                  whileHover={{ x: 4 }}
                >
                  <span className="tldark-text--accent group-hover:scale-110 transition-transform">
                    {link.icon}
                  </span>
                  <span className="text-sm">{link.label}</span>
                  {link.external && (
                    <ExternalLink className="h-3 w-3 opacity-50" />
                  )}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Technical Specifications */}
          <div>
            <h4 className="tldark-text font-semibold mb-4">Technical</h4>
            <div className="space-y-4">
              {technicalSpecs.map((spec, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="tldark-text--accent mt-0.5">
                    {spec.icon}
                  </div>
                  <div>
                    <div className="tldark-text text-sm font-medium">{spec.title}</div>
                    <div className="tldark-text--muted text-xs">{spec.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Professional Status Bar */}
        <div className="tldark-glass-card p-4 mb-6">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full tldark-animate-glow" 
                     style={{ background: 'var(--accent-cyan)' }} />
                <span className="tldark-text--muted">System Status:</span>
                <span className="tldark-text">Operational</span>
              </div>
              <div className="text-xs tldark-text--muted">
                Latest: v2.0.0-alpha
              </div>
            </div>
            <div className="text-xs tldark-text--muted">
              Last updated: {new Date().toLocaleDateString()}
            </div>
          </div>
        </div>

        {/* Copyright and Legal */}
        <div className="flex items-center justify-between pt-6 border-t" 
             style={{ borderColor: 'var(--glass-border)' }}>
          <div className="text-xs tldark-text--muted">
            © {currentYear} DeusVaultOS. Professional development environment.
          </div>
          <div className="flex items-center gap-4 text-xs tldark-text--muted">
            <a href="/privacy" className="hover:text-current transition-colors">
              Privacy
            </a>
            <a href="/terms" className="hover:text-current transition-colors">
              Terms
            </a>
            <a href="https://github.com/AngeloGkOne/DeusVaultOS_WebsiteRepo/blob/main/LICENSE" 
               target="_blank" 
               rel="noopener noreferrer"
               className="hover:text-current transition-colors">
              MIT License
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
