import { motion } from "framer-motion";
import { Book, Code, Zap, Star, ArrowRight, ExternalLink } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";

interface DocumentationPageProps {
  onNavigateBack: () => void;
}

export function DocumentationPage({ onNavigateBack }: DocumentationPageProps) {
  const docSections = [
    {
      title: "Getting Started",
      description: "Quick setup and first steps",
      icon: Zap,
      items: [
        "Installation Guide",
        "First Project Setup", 
        "Interface Overview",
        "Basic Commands"
      ]
    },
    {
      title: "Development Guide",
      description: "Core development features",
      icon: Code,
      items: [
        "AI Assistant Integration",
        "Code Generation",
        "Project Templates",
        "Version Control"
      ]
    },
    {
      title: "Advanced Features",
      description: "Power user capabilities",
      icon: Star,
      items: [
        "Custom Environments",
        "Plugin Development",
        "API Integration",
        "Performance Optimization"
      ]
    }
  ];

  const quickLinks = [
    {
      title: "API Reference",
      description: "Complete API documentation",
      url: "#api-reference"
    },
    {
      title: "Examples",
      description: "Code examples and tutorials",
      url: "#examples"
    },
    {
      title: "Troubleshooting",
      description: "Common issues and solutions",
      url: "#troubleshooting"
    },
    {
      title: "Community",
      description: "Join our developer community",
      url: "#community"
    }
  ];

  const codeExample = `// Initialize DeusVaultOS Environment
import { DeusVault } from '@deusvault/core';

const vault = new DeusVault({
  aiAssistant: true,
  autoOptimize: true,
  projectType: 'fullstack'
});

// Create new project with AI assistance
await vault.createProject({
  name: 'my-awesome-app',
  template: 'react-typescript',
  features: ['tailwind', 'testing', 'deployment']
});

// Start development with live AI feedback
vault.startDevelopment({
  hotReload: true,
  aiSuggestions: true,
  codeAnalysis: true
});`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black py-12">
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Button
            variant="outline"
            onClick={onNavigateBack}
            className="mb-8 border-cyan-400/50 text-cyan-400 hover:bg-cyan-400/10"
          >
            ← Back to Home
          </Button>
          
          <Badge className="mb-6 bg-gradient-to-r from-cyan-600 to-green-600 text-white px-8 py-3 text-lg">
            <Book className="h-5 w-5 mr-2" />
            Documentation
          </Badge>
          
          <h1 className="text-5xl md:text-7xl mb-8 bg-gradient-to-r from-white via-cyan-200 to-green-200 bg-clip-text text-transparent">
            Developer Docs
          </h1>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Everything you need to master DeusVaultOS development. From basic setup to advanced customization.
          </p>
        </motion.div>

        {/* Documentation Sections */}
        <motion.div
          className="grid md:grid-cols-3 gap-8 mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {docSections.map((section, index) => (
            <Card 
              key={index}
              className="bg-gray-900/50 backdrop-blur-md border-gray-600/30 hover:border-cyan-400/50 transition-all duration-300 group cursor-pointer"
            >
              <CardContent className="p-8">
                <section.icon className="h-12 w-12 text-cyan-400 mb-4 group-hover:text-cyan-300 transition-colors" />
                <h3 className="text-2xl text-white mb-4 group-hover:text-cyan-300 transition-colors">
                  {section.title}
                </h3>
                <p className="text-gray-400 mb-6">{section.description}</p>
                <ul className="space-y-2">
                  {section.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="text-gray-300 flex items-center">
                      <ArrowRight className="h-4 w-4 text-cyan-400 mr-2" />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* Quick Start Code Example */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl text-white mb-8 text-center">
            Quick Start Example
          </h2>
          
          <Card className="bg-gray-900/50 backdrop-blur-md border-gray-600/30">
            <CardContent className="p-8">
              <pre className="text-gray-300 overflow-x-auto">
                <code>{codeExample}</code>
              </pre>
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          className="grid md:grid-cols-2 gap-8 mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          {quickLinks.map((link, index) => (
            <Card 
              key={index}
              className="bg-gray-900/50 backdrop-blur-md border-gray-600/30 hover:border-cyan-400/50 transition-all duration-300 group cursor-pointer"
            >
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <h3 className="text-xl text-white mb-2 group-hover:text-cyan-300 transition-colors">
                    {link.title}
                  </h3>
                  <p className="text-gray-400">{link.description}</p>
                </div>
                <ArrowRight className="h-6 w-6 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* Features Overview */}
        <motion.div
          className="bg-gray-900/30 backdrop-blur-md rounded-xl p-8 border border-gray-600/30"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <h3 className="text-2xl text-white mb-6 text-center">Core Features</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-600 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <h4 className="text-lg text-white mb-2">Lightning Fast</h4>
              <p className="text-gray-400">Optimized performance for rapid development cycles</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-600 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Code className="h-8 w-8 text-white" />
              </div>
              <h4 className="text-lg text-white mb-2">AI-Powered</h4>
              <p className="text-gray-400">Intelligent code suggestions and automated optimizations</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-600 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-white" />
              </div>
              <h4 className="text-lg text-white mb-2">Extensible</h4>
              <p className="text-gray-400">Customize and extend with plugins and integrations</p>
            </div>
          </div>
        </motion.div>

        {/* Help Section */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
        >
          <h3 className="text-2xl text-white mb-4">Need Help?</h3>
          <p className="text-gray-400 mb-6">
            Join our community or reach out for support
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button 
              variant="outline"
              className="border-cyan-400/50 text-cyan-400 hover:bg-cyan-400/10"
              onClick={() => window.open('https://github.com/AngeloGkOne/DeusVaultOS_WebsiteRepo/discussions', '_blank')}
            >
              Community Forum
              <ExternalLink className="h-4 w-4 ml-2" />
            </Button>
            <Button 
              variant="outline"
              className="border-green-400/50 text-green-400 hover:bg-green-400/10"
              onClick={() => window.open('https://github.com/AngeloGkOne/DeusVaultOS_WebsiteRepo/issues', '_blank')}
            >
              Report Issues
              <ExternalLink className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
