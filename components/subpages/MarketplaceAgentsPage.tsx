import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Bot, Brain, Code, Cpu, Download, Play, Star } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';

interface MarketplaceAgentsPageProps {
  onBack: () => void;
}

export function MarketplaceAgentsPage({ onBack }: MarketplaceAgentsPageProps) {
  const featuredAgents = [
    {
      name: "THERION Code Assistant",
      description: "AI pair programmer that writes, reviews, and optimizes code in real-time",
      icon: <Code className="h-8 w-8 text-cyan-400" />,
      rating: 4.9,
      downloads: "500K",
      capabilities: ["Code Generation", "Bug Detection", "Performance Optimization", "Documentation"],
      languages: ["Python", "TypeScript", "Rust", "Go", "C++"],
      price: "Free"
    },
    {
      name: "Neural Network Designer",
      description: "Drag-and-drop AI model creator with automatic architecture optimization",
      icon: <Brain className="h-8 w-8 text-purple-400" />,
      rating: 4.8,
      downloads: "320K",
      capabilities: ["Model Architecture", "Auto-Optimization", "Training Pipeline", "Deployment"],
      languages: ["PyTorch", "TensorFlow", "JAX", "ONNX"],
      price: "Free"
    },
    {
      name: "DevOps Automation Bot",
      description: "Intelligent CI/CD pipeline management and infrastructure automation",
      icon: <Cpu className="h-8 w-8 text-green-400" />,
      rating: 4.7,
      downloads: "280K",
      capabilities: ["Pipeline Automation", "Infrastructure as Code", "Monitoring", "Security Scans"],
      languages: ["Docker", "Kubernetes", "Terraform", "Ansible"],
      price: "Free"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900/20 via-cyan-900/20 to-blue-900/20 p-8">
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
          Back to Marketplace
        </Button>
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            AI Agents Marketplace
          </h1>
          <p className="text-gray-400 mt-2">Discover intelligent automation for your development workflow</p>
        </div>
      </motion.div>

      {/* Featured Agents Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6"
      >
        {featuredAgents.map((agent, index) => (
          <motion.div
            key={agent.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
          >
            <Card className="bg-black/40 backdrop-blur-xl border-white/10 hover:border-cyan-400/50 transition-all duration-300 h-full">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    {agent.icon}
                    <div>
                      <h3 className="text-xl font-bold text-white">{agent.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="text-sm text-gray-300">{agent.rating}</span>
                        </div>
                        <span className="text-sm text-gray-400">•</span>
                        <span className="text-sm text-gray-400">{agent.downloads} users</span>
                      </div>
                    </div>
                  </div>
                  <Badge variant="secondary" className="bg-green-500/20 text-green-400 border-green-500/30">
                    {agent.price}
                  </Badge>
                </div>

                <p className="text-gray-300 mb-4">{agent.description}</p>

                {/* Capabilities */}
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-cyan-400 mb-2">Capabilities</h4>
                  <div className="flex flex-wrap gap-2">
                    {agent.capabilities.map((capability) => (
                      <Badge
                        key={capability}
                        variant="outline"
                        className="text-xs border-white/20 text-gray-300"
                      >
                        {capability}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Languages/Technologies */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-purple-400 mb-2">Technologies</h4>
                  <div className="flex flex-wrap gap-2">
                    {agent.languages.map((lang) => (
                      <Badge
                        key={lang}
                        variant="outline"
                        className="text-xs border-purple-400/30 text-purple-300"
                      >
                        {lang}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Button className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600">
                    <Download className="h-4 w-4 mr-2" />
                    Install Agent
                  </Button>
                  <Button variant="outline" size="sm" className="border-white/20">
                    <Play className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Browse More Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-12 text-center"
      >
        <Button variant="outline" className="border-cyan-400/50 text-cyan-400 hover:bg-cyan-400/10">
          <Bot className="h-4 w-4 mr-2" />
          Browse All AI Agents
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </motion.div>
    </div>
  );
}
