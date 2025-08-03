import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Book, 
  Code, 
  ExternalLink, 
  FileText, 
  GitBranch, 
  PlayCircle, 
  Search, 
  Terminal, 
  Zap 
} from 'lucide-react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

interface DocumentationPageProps {
  onBack: () => void;
}

export function DocumentationPage({ onBack }: DocumentationPageProps) {
  const docSections = [
    {
      title: "Getting Started",
      description: "Quick setup and installation guide for DeusVaultOS",
      icon: <PlayCircle className="h-6 w-6 text-green-400" />,
      articles: [
        { title: "Installation Guide", time: "5 min read", badge: "Essential" },
        { title: "First Project Setup", time: "10 min read", badge: "Beginner" },
        { title: "Environment Configuration", time: "8 min read", badge: "Setup" },
        { title: "Troubleshooting Common Issues", time: "6 min read", badge: "Help" }
      ],
      color: "green"
    },
    {
      title: "Development Guide",
      description: "Comprehensive development workflows and best practices",
      icon: <Code className="h-6 w-6 text-cyan-400" />,
      articles: [
        { title: "Project Structure", time: "12 min read", badge: "Architecture" },
        { title: "AI Assistant Integration", time: "15 min read", badge: "AI" },
        { title: "Code Generation Patterns", time: "18 min read", badge: "Advanced" },
        { title: "Testing & Quality Assurance", time: "20 min read", badge: "QA" }
      ],
      color: "cyan"
    },
    {
      title: "API Reference",
      description: "Complete API documentation and code examples",
      icon: <Terminal className="h-6 w-6 text-purple-400" />,
      articles: [
        { title: "Core API Methods", time: "25 min read", badge: "Reference" },
        { title: "Plugin Development", time: "30 min read", badge: "Advanced" },
        { title: "Event Handling", time: "15 min read", badge: "Events" },
        { title: "Configuration API", time: "12 min read", badge: "Config" }
      ],
      color: "purple"
    },
    {
      title: "Deployment",
      description: "Production deployment and scaling strategies",
      icon: <GitBranch className="h-6 w-6 text-yellow-400" />,
      articles: [
        { title: "Production Setup", time: "20 min read", badge: "Production" },
        { title: "Docker Integration", time: "15 min read", badge: "Docker" },
        { title: "CI/CD Pipelines", time: "25 min read", badge: "DevOps" },
        { title: "Scaling Guidelines", time: "30 min read", badge: "Scale" }
      ],
      color: "yellow"
    }
  ];

  const quickLinks = [
    { title: "GitHub Repository", icon: <GitBranch className="h-4 w-4" />, external: true },
    { title: "Community Discord", icon: <ExternalLink className="h-4 w-4" />, external: true },
    { title: "Issue Tracker", icon: <FileText className="h-4 w-4" />, external: true },
    { title: "Video Tutorials", icon: <PlayCircle className="h-4 w-4" />, external: true }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900/20 to-cyan-900/20 p-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-4 mb-8"
      >
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="text-cyan-400 hover:bg-cyan-400/10"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Main
        </Button>
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            Documentation
          </h1>
          <p className="text-gray-400 mt-2">Complete guides and API reference for DeusVaultOS</p>
        </div>
      </motion.div>

      {/* Search Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-8"
      >
        <div className="relative max-w-xl">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search documentation..."
            className="w-full pl-10 pr-4 py-3 bg-black/40 backdrop-blur-xl border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400/50"
          />
        </div>
      </motion.div>

      {/* Quick Links */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-12"
      >
        <h2 className="text-xl font-semibold text-white mb-4">Quick Links</h2>
        <div className="flex flex-wrap gap-3">
          {quickLinks.map((link, index) => (
            <Button
              key={link.title}
              variant="outline"
              className="border-white/20 text-gray-300 hover:bg-white/10"
            >
              {link.icon}
              <span className="ml-2">{link.title}</span>
              {link.external && <ExternalLink className="h-3 w-3 ml-2" />}
            </Button>
          ))}
        </div>
      </motion.div>

      {/* Documentation Sections */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-8"
      >
        {docSections.map((section, index) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
          >
            <Card className="bg-black/40 backdrop-blur-xl border-white/10 hover:border-cyan-400/50 transition-all duration-300 h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-white">
                  {section.icon}
                  {section.title}
                </CardTitle>
                <p className="text-gray-400">{section.description}</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {section.articles.map((article, idx) => (
                    <div
                      key={article.title}
                      className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <Book className="h-4 w-4 text-gray-400" />
                        <div>
                          <div className="text-white font-medium">{article.title}</div>
                          <div className="text-sm text-gray-400">{article.time}</div>
                        </div>
                      </div>
                      <Badge 
                        variant="outline" 
                        className={`text-xs border-${section.color}-400/30 text-${section.color}-300`}
                      >
                        {article.badge}
                      </Badge>
                    </div>
                  ))}
                </div>
                <Button 
                  className={`w-full mt-4 bg-gradient-to-r from-${section.color}-500 to-blue-500 hover:from-${section.color}-600 hover:to-blue-600`}
                >
                  <Zap className="h-4 w-4 mr-2" />
                  Browse {section.title}
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Getting Help Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-12 text-center"
      >
        <Card className="bg-gradient-to-r from-purple-900/40 to-cyan-900/40 backdrop-blur-xl border-purple-400/30">
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold text-white mb-4">Need Help?</h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Join our community of developers, get instant support, and access exclusive resources.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600">
                Join Discord Community
              </Button>
              <Button variant="outline" className="border-cyan-400/50 text-cyan-400 hover:bg-cyan-400/10">
                Schedule Support Call
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}