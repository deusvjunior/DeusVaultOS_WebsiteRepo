import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { 
  Crown, 
  Shield, 
  Download, 
  Github, 
  Twitter, 
  MessageCircle,
  Mail,
  Globe,
  Zap,
  Brain,
  ExternalLink
} from "lucide-react";
import { motion } from "framer-motion";

export function Footer() {
  const quickLinks = [
    { name: "Download", icon: <Download className="h-4 w-4" />, href: "#" },
    { name: "Documentation", icon: <Globe className="h-4 w-4" />, href: "#" },
    { name: "Community", icon: <MessageCircle className="h-4 w-4" />, href: "#" },
    { name: "Support", icon: <Mail className="h-4 w-4" />, href: "#" }
  ];

  const coreFeatures = [
    "THERION AI Protocol",
    "Parallel Development Environments", 
    "Enhanced VS Code Integration",
    "Universal Platform Support",
    "Professional Gaming Tools",
    "Zero-Configuration Setup"
  ];

  const socialLinks = [
    { icon: <Twitter className="h-5 w-5" />, platform: "Twitter", href: "#" },
    { icon: <Github className="h-5 w-5" />, platform: "GitHub", href: "#" },
    { icon: <MessageCircle className="h-5 w-5" />, platform: "Discord", href: "#" },
    { icon: <Mail className="h-5 w-5" />, platform: "Email", href: "#" }
  ];

  const companyLinks = [
    { name: "About", href: "#" },
    { name: "Careers", href: "#" },
    { name: "Press", href: "#" },
    { name: "Privacy", href: "#" },
    { name: "Terms", href: "#" }
  ];

  return (
    <footer className="bg-gradient-to-t from-brand-neutral-950 via-brand-neutral-900 to-brand-neutral-950 section-spacing">
            <div className="content-container max-w-7xl mx-auto px-6 lg:px-8">{/* ... */}
        
        {/* Main Footer Content */}
        <div className="grid lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-4 mb-8">
                {/* Logo */}
                <div className="w-12 h-12 brand-gradient rounded-xl flex items-center justify-center">
                  <Crown className="h-6 w-6 text-white" />
                </div>
                
                <div>
                  <h3 className="text-2xl font-semibold text-white">Deus Vault</h3>
                  <p className="text-brand-neutral-400 text-sm">Professional Development OS</p>
                </div>
              </div>
              
              <p className="text-body text-brand-neutral-300 leading-relaxed mb-8 max-w-lg">
                The self-evolving development environment that transforms how you create software. 
                Built for professionals who demand excellence.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button 
                  size="default" 
                  className="brand-gradient text-white border-0 px-6 py-3 font-medium interactive-element focus-ring"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download Now
                </Button>
                
                <Button 
                  variant="outline" 
                  size="default" 
                  className="glass-morphism refined-border text-brand-neutral-200 hover:bg-brand-primary/10 px-6 py-3 font-medium interactive-element focus-ring"
                >
                  <Github className="mr-2 h-4 w-4" />
                  View Source
                  <ExternalLink className="ml-2 h-3 w-3" />
                </Button>
              </div>
              
              <div className="flex flex-wrap items-center gap-3">
                <Badge className="glass-morphism refined-border px-3 py-1 text-xs">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-gentle-pulse" />
                  System Active
                </Badge>
                <Badge className="glass-morphism refined-border px-3 py-1 text-xs">
                  <Brain className="h-3 w-3 mr-2 text-brand-primary" />
                  AI Online
                </Badge>
                <Badge className="glass-morphism refined-border px-3 py-1 text-xs">
                  <Zap className="h-3 w-3 mr-2 text-brand-primary" />
                  Ready
                </Badge>
              </div>
            </motion.div>
          </div>
          
          {/* Quick Links */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h4 className="text-lg font-semibold text-white mb-6">Quick Links</h4>
              <div className="space-y-4">
                {quickLinks.map((link, index) => (
                  <a 
                    key={index}
                    href={link.href}
                    className="flex items-center gap-3 text-brand-neutral-300 hover:text-brand-primary transition-colors group focus-ring rounded-lg p-2 -m-2"
                  >
                    <div className="text-brand-neutral-500 group-hover:text-brand-primary transition-colors">
                      {link.icon}
                    </div>
                    <span className="font-medium">{link.name}</span>
                  </a>
                ))}
              </div>
            </motion.div>
          </div>
          
          {/* Core Features */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h4 className="text-lg font-semibold text-white mb-6">Core Features</h4>
              <div className="space-y-3">
                {coreFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3 text-brand-neutral-300">
                    <div className="w-1.5 h-1.5 bg-brand-primary rounded-full flex-shrink-0" />
                    <span className="text-sm font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
          
        </div>
        
        <Separator className="bg-brand-neutral-800 mb-12" />
        
        {/* Bottom Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="flex flex-col lg:flex-row justify-between items-center gap-8"
        >
          
          {/* Copyright & Company Links */}
          <div className="flex flex-col lg:flex-row items-center gap-6">
            <div className="text-center lg:text-left">
              <p className="text-brand-neutral-400 text-sm">
                © 2024 Deus Vault. All rights reserved.
              </p>
            </div>
            
            <div className="flex items-center gap-6">
              {companyLinks.map((link, index) => (
                <a 
                  key={index}
                  href={link.href}
                  className="text-brand-neutral-400 hover:text-brand-primary text-sm font-medium transition-colors focus-ring rounded px-2 py-1 -m-1"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
          
          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.href}
                className="glass-morphism refined-border rounded-lg w-10 h-10 flex items-center justify-center interactive-element focus-ring"
                aria-label={social.platform}
              >
                <div className="text-brand-neutral-400 hover:text-brand-primary transition-colors">
                  {social.icon}
                </div>
              </a>
            ))}
          </div>
          
        </motion.div>
        
        {/* Final Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12 pt-8 border-t border-brand-neutral-800"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Shield className="h-4 w-4 text-green-400" />
            <span className="text-green-400 text-sm font-medium">All systems operational</span>
            <div className="w-2 h-2 bg-green-400 rounded-full animate-gentle-pulse" />
          </div>
          <p className="text-brand-neutral-400 text-sm">
            Transforming development environments since 2024
          </p>
        </motion.div>
        
      </div>
    </footer>
  );
}