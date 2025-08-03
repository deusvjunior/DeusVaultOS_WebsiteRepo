import { motion } from 'framer-motion';
import {
    ArrowLeft,
    ArrowRight,
    Book,
    Code,
    Download,
    ExternalLink,
    Github,
    Play,
    Rocket,
    Star,
    Users,
    Zap
} from 'lucide-react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

interface LearnMorePageProps {
  onBack: () => void;
}

export function LearnMorePage({ onBack }: LearnMorePageProps) {
  const features = [
    {
      icon: <Zap className="h-8 w-8" />,
      title: "15 AI Agents",
      description: "Specialized AI agents for every aspect of development - from code generation to deployment automation.",
      details: [
        "Code Assistant: Intelligent code completion and generation",
        "Debug Agent: Automated bug detection and fixing",
        "Deploy Agent: One-click deployment to any platform",
        "Security Agent: Real-time vulnerability scanning",
        "Performance Agent: Automatic optimization suggestions"
      ],
      color: "cyan"
    },
    {
      icon: <Rocket className="h-8 w-8" />,
      title: "Zero Configuration",
      description: "Start coding immediately without complex setup or configuration. Everything works out of the box.",
      details: [
        "Pre-configured development environments",
        "Automatic dependency management",
        "Built-in best practices and linting",
        "Integrated testing frameworks",
        "Smart project templates"
      ],
      color: "yellow"
    },
    {
      icon: <Code className="h-8 w-8" />,
      title: "Multi-Language Support",
      description: "Native support for all major programming languages and frameworks with intelligent switching.",
      details: [
        "JavaScript/TypeScript with React, Vue, Angular",
        "Python with Django, Flask, FastAPI",
        "Go, Rust, Java, C# with full IDE features",
        "Docker and Kubernetes integration",
        "Cloud-native development tools"
      ],
      color: "cyan"
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Team Collaboration",
      description: "Built-in collaboration tools that make team development seamless and productive.",
      details: [
        "Real-time code sharing and editing",
        "Integrated code review workflows",
        "Team chat and video calls",
        "Shared development environments",
        "Project management integration"
      ],
      color: "yellow"
    }
  ];

  const useCases = [
    {
      title: "Rapid Prototyping",
      description: "Go from idea to working prototype in minutes, not hours.",
      icon: <Rocket className="h-6 w-6" />,
      example: "Build a full-stack app with AI assistance in under 30 minutes"
    },
    {
      title: "Enterprise Development",
      description: "Scale development across large teams with consistent practices.",
      icon: <Users className="h-6 w-6" />,
      example: "Deploy standardized environments for 100+ developers instantly"
    },
    {
      title: "Learning & Education",
      description: "Perfect environment for learning new technologies and best practices.",
      icon: <Book className="h-6 w-6" />,
      example: "Interactive tutorials that adapt to your learning pace"
    },
    {
      title: "Open Source Projects",
      description: "Streamlined workflows for open source development and contributions.",
      icon: <Github className="h-6 w-6" />,
      example: "One-click setup for any GitHub repository with smart analysis"
    }
  ];

  const roadmap = [
    {
      quarter: "Q4 2025",
      title: "Initial Release",
      status: "upcoming",
      features: [
        "Core 15 AI Agents",
        "Web-based IDE",
        "Basic collaboration tools",
        "Template marketplace"
      ]
    },
    {
      quarter: "Q1 2026",
      title: "Enhanced AI",
      status: "planned",
      features: [
        "Advanced code generation",
        "Intelligent refactoring",
        "Performance optimization",
        "Security hardening"
      ]
    },
    {
      quarter: "Q2 2026",
      title: "Enterprise Features",
      status: "planned",
      features: [
        "SSO integration",
        "Advanced analytics",
        "Custom AI training",
        "On-premise deployment"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/20 via-black to-yellow-900/20"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(0,255,255,0.1),transparent_50%)]"></div>
      
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 px-4 sm:px-6 lg:px-8 py-6"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-cyan-400 hover:text-white transition-colors group"
          >
            <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Back to Home</span>
          </button>
          
          <Badge variant="outline" className="text-cyan-400 border-cyan-400/50">
            Learn More
          </Badge>
        </div>
      </motion.div>

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="relative z-10 px-4 sm:px-6 lg:px-8 py-12"
      >
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold bg-gradient-to-r from-cyan-400 via-white to-yellow-400 bg-clip-text text-transparent">
            The Future of Development
          </h1>
          
          <p className="text-xl sm:text-2xl text-gray-300 max-w-3xl mx-auto">
            DeusVaultOS combines AI intelligence with developer productivity to create 
            <span className="text-cyan-400 font-semibold"> the most advanced development environment</span> ever built.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-gradient-to-r from-cyan-500 to-yellow-500 hover:from-cyan-400 hover:to-yellow-400 text-black font-bold px-8 py-3">
              <Play className="mr-2 h-5 w-5" />
              Watch Demo
            </Button>
            <Button variant="outline" className="border-cyan-400/50 text-cyan-400 hover:bg-cyan-400/10 px-8 py-3">
              <Download className="mr-2 h-5 w-5" />
              Get Beta Access
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Core Features */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="relative z-10 px-4 sm:px-6 lg:px-8 py-12"
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-12 text-center">Core Features</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <Card className="glass-refined border-cyan-400/30 hover:border-cyan-400/50 transition-all duration-300 h-full">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-white">
                      <div className={`text-${feature.color}-400`}>
                        {feature.icon}
                      </div>
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-gray-300">{feature.description}</p>
                    <div className="space-y-2">
                      {feature.details.map((detail, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <Star className={`h-4 w-4 text-${feature.color}-400 flex-shrink-0 mt-0.5`} />
                          <span className="text-sm text-gray-400">{detail}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Use Cases */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="relative z-10 px-4 sm:px-6 lg:px-8 py-12"
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-12 text-center">Perfect For</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {useCases.map((useCase, index) => (
              <motion.div
                key={useCase.title}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 * index }}
              >
                <Card className="glass-refined border-yellow-400/30 hover:border-yellow-400/50 transition-all duration-300 h-full">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="text-yellow-400">
                        {useCase.icon}
                      </div>
                      <h3 className="text-xl font-semibold text-white">{useCase.title}</h3>
                    </div>
                    <p className="text-gray-300 mb-4">{useCase.description}</p>
                    <div className="bg-black/30 rounded-lg p-3">
                      <p className="text-sm text-cyan-400 italic">"{useCase.example}"</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Roadmap */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="relative z-10 px-4 sm:px-6 lg:px-8 py-12"
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-12 text-center">Development Roadmap</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {roadmap.map((phase, index) => (
              <motion.div
                key={phase.quarter}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <Card className={`glass-refined transition-all duration-300 h-full ${
                  phase.status === 'upcoming' 
                    ? 'border-cyan-400/50 bg-cyan-400/5' 
                    : 'border-gray-600/30'
                }`}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-white">{phase.quarter}</CardTitle>
                      <Badge 
                        variant="outline" 
                        className={phase.status === 'upcoming' ? 'border-cyan-400 text-cyan-400' : 'border-gray-500 text-gray-400'}
                      >
                        {phase.status}
                      </Badge>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-300">{phase.title}</h3>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {phase.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${
                            phase.status === 'upcoming' ? 'bg-cyan-400' : 'bg-gray-500'
                          }`} />
                          <span className="text-sm text-gray-400">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0 }}
        className="relative z-10 px-4 sm:px-6 lg:px-8 py-16"
      >
        <div className="max-w-4xl mx-auto text-center">
          <Card className="glass-refined border-cyan-400/30 bg-gradient-to-r from-cyan-900/20 to-yellow-900/20">
            <CardContent className="p-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                Ready to Transform Your Development?
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Join thousands of developers who are already building the future with DeusVaultOS.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-gradient-to-r from-cyan-500 to-yellow-500 hover:from-cyan-400 hover:to-yellow-400 text-black font-bold px-8 py-3">
                  <Download className="mr-2 h-5 w-5" />
                  Get Beta Access
                </Button>
                <Button 
                  variant="outline" 
                  className="border-cyan-400/50 text-cyan-400 hover:bg-cyan-400/10 px-8 py-3"
                  onClick={() => window.open('https://github.com/deusvault', '_blank')}
                >
                  <Github className="mr-2 h-5 w-5" />
                  View on GitHub
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </div>

              <div className="mt-8 text-sm text-gray-400">
                Beta access • Q4 2025 launch • Open source platform
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </div>
  );
}
