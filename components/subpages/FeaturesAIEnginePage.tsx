import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Brain, Cpu, GitBranch, Play, Sparkles, Zap } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';

interface FeaturesAIEnginePageProps {
  onBack: () => void;
}

export function FeaturesAIEngineePage({ onBack }: FeaturesAIEnginePageProps) {
  const aiFeatures = [
    {
      name: "Neural Code Analysis",
      description: "Advanced AI that understands your codebase structure and suggests optimizations",
      icon: <Brain className="h-8 w-8 text-purple-400" />,
      capabilities: ["Pattern Recognition", "Performance Analysis", "Security Scanning", "Dependency Mapping"],
      metrics: {
        performance: "89% faster analysis",
        accuracy: "96% bug detection",
        coverage: "100% codebase mapping"
      },
      status: "Active"
    },
    {
      name: "Intelligent Auto-Complete",
      description: "Context-aware code completion that learns from your coding patterns",
      icon: <Zap className="h-8 w-8 text-yellow-400" />,
      capabilities: ["Multi-language Support", "Context Learning", "API Integration", "Real-time Suggestions"],
      metrics: {
        performance: "3x faster coding",
        accuracy: "94% suggestion accuracy",
        coverage: "50+ languages"
      },
      status: "Active"
    },
    {
      name: "Automated Testing Engine",
      description: "AI-powered test generation and execution with intelligent coverage analysis",
      icon: <GitBranch className="h-8 w-8 text-green-400" />,
      capabilities: ["Test Generation", "Coverage Analysis", "Regression Testing", "Performance Benchmarks"],
      metrics: {
        performance: "75% test automation",
        accuracy: "91% bug prevention",
        coverage: "85% code coverage"
      },
      status: "Active"
    }
  ];

  const technicalSpecs = [
    {
      category: "AI Model Architecture",
      details: [
        "Transformer-based language models",
        "Custom-trained on 50M+ code repositories",
        "Real-time inference with <100ms latency",
        "Continuous learning from user interactions"
      ]
    },
    {
      category: "Performance Optimization",
      details: [
        "GPU-accelerated inference pipeline",
        "Edge computing for offline development",
        "Adaptive model compression",
        "Multi-threaded processing engine"
      ]
    },
    {
      category: "Security & Privacy",
      details: [
        "End-to-end encryption",
        "Local model execution option",
        "Zero data retention policy",
        "SOC 2 Type II compliance"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-green-900/20 p-8">
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
          className="text-purple-400 hover:bg-purple-400/10"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Features
        </Button>
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            AI Engine Deep Dive
          </h1>
          <p className="text-gray-400 mt-2">Advanced artificial intelligence powering your development workflow</p>
        </div>
      </motion.div>

      {/* AI Features Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-12"
      >
        {aiFeatures.map((feature, index) => (
          <motion.div
            key={feature.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
          >
            <Card className="bg-black/40 backdrop-blur-xl border-white/10 hover:border-purple-400/50 transition-all duration-300 h-full">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    {feature.icon}
                    <div>
                      <h3 className="text-xl font-bold text-white">{feature.name}</h3>
                      <Badge variant="secondary" className="bg-green-500/20 text-green-400 border-green-500/30 mt-1">
                        {feature.status}
                      </Badge>
                    </div>
                  </div>
                </div>

                <p className="text-gray-300 mb-4">{feature.description}</p>

                {/* Capabilities */}
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-purple-400 mb-2">Capabilities</h4>
                  <div className="flex flex-wrap gap-2">
                    {feature.capabilities.map((capability) => (
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

                {/* Performance Metrics */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-cyan-400 mb-2">Performance</h4>
                  <div className="space-y-2">
                    {Object.entries(feature.metrics).map(([key, value]) => (
                      <div key={key} className="flex justify-between text-sm">
                        <span className="text-gray-400 capitalize">{key}:</span>
                        <span className="text-cyan-300 font-medium">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Button */}
                <Button variant="outline" className="w-full border-purple-400/30 text-purple-300 hover:bg-purple-400/10">
                  <Play className="h-4 w-4 mr-2" />
                  View Demo
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Technical Specifications */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12"
      >
        {technicalSpecs.map((spec, index) => (
          <Card key={spec.category} className="bg-black/40 backdrop-blur-xl border-white/10">
            <CardContent className="p-6">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Cpu className="h-5 w-5 text-cyan-400" />
                {spec.category}
              </h3>
              <ul className="space-y-2">
                {spec.details.map((detail) => (
                  <li key={detail} className="text-gray-300 text-sm flex items-start gap-2">
                    <span className="text-cyan-400 mt-1">•</span>
                    {detail}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </motion.div>

      {/* Explore More Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="text-center"
      >
        <Button variant="outline" className="border-purple-400/50 text-purple-400 hover:bg-purple-400/10">
          <Sparkles className="h-4 w-4 mr-2" />
          Explore More AI Features
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </motion.div>
    </div>
  );
}
