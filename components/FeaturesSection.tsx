import { motion } from "framer-motion";
import {
    ArrowRight,
    Brain,
    CheckCircle,
    Cloud,
    Cpu,
    Download,
    Gamepad2,
    Globe,
    Layers,
    MonitorSpeaker,
    Play,
    Shield,
    Sparkles
} from "lucide-react";
import { UserContext } from './AdaptiveEngine';
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";

interface FeaturesSectionProps {
  onNavigateToSubpage?: (subpage: string) => void;
  userContext?: UserContext;
  onBack?: () => void;
}

export function FeaturesSection({ onNavigateToSubpage, userContext, onBack }: FeaturesSectionProps) {
  const heroFeatures = [
    {
      icon: <Brain className="h-8 w-8" />,
      title: "THERION AI Core",
      description: "Advanced AI assistant that learns your coding patterns and provides intelligent assistance. Contextual AI pair programming for better development workflow.",
      videoSrc: "/videos/therion-ai-demo.mp4",
      videoPoster: "/thumbs/therion-ai-thumb.jpg",
      benefits: [
        "Natural language code assistance",
        "Pattern recognition and suggestions", 
        "Performance optimization guidance",
        "Adaptive learning system"
      ],
      metrics: { accuracy: "High", speed: "Fast", learning: "Continuous" },
      color: "cyan"
    },
    {
      icon: <Layers className="h-8 w-8" />,
      title: "Parallel Environments",
      description: "Run multiple development environments simultaneously with proper isolation and quick switching. Optimized for different project needs.",
      videoSrc: "/videos/parallel-environments-demo.mp4",
      videoPoster: "/thumbs/parallel-environments-thumb.jpg",
      benefits: [
        "Environment isolation",
        "Quick environment switching",
        "Resource sharing optimization", 
        "Efficient virtualization"
      ],
      metrics: { containers: "Multiple", overhead: "Optimized", switching: "Fast" },
      color: "yellow"
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: "Universal Deployment",
      description: "Deploy to any platform from a single codebase. Desktop, mobile, web, cloud—all from one unified environment.",
      videoSrc: "/videos/universal-deploy-demo.mp4", 
      videoPoster: "/thumbs/universal-deploy-thumb.jpg",
      benefits: [
        "Native mobile app generation",
        "Progressive web app creation",
        "One-click cloud deployment",
        "Desktop package generation"
      ],
      metrics: { platforms: "All Major", setup: "Zero Config", speed: "One-Click" },
      color: "cyan"
    },
    {
      icon: <Gamepad2 className="h-8 w-8" />,
      title: "Gaming Development Suite",
      description: "Complete game development environment with Unity, Unreal, and professional modding tools pre-configured and optimized.",
      videoSrc: "/videos/gaming-suite-demo.mp4",
      videoPoster: "/thumbs/gaming-suite-thumb.jpg", 
      benefits: [
        "Unity & Unreal Engine ready",
        "Advanced modding toolchain",
        "Real-time performance profiling",
        "Asset pipeline management"
      ],
      metrics: { engines: "All Major", performance: "Studio Grade", setup: "Pre-loaded" },
      color: "yellow"
    }
  ];

  const additionalFeatures = [
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Enterprise Security",
      description: "Bank-grade encryption and security protocols",
      color: "cyan"
    },
    {
      icon: <Cloud className="h-6 w-6" />,
      title: "Cloud Integration", 
      description: "Seamless integration with all major cloud providers",
      color: "yellow"
    },
    {
      icon: <Cpu className="h-6 w-6" />,
      title: "Performance Optimization",
      description: "Automatic resource optimization and scaling", 
      color: "cyan"
    },
    {
      icon: <MonitorSpeaker className="h-6 w-6" />,
      title: "Cross-Platform",
      description: "Works perfectly on Windows, macOS, and Linux",
      color: "yellow"
    }
  ];

  const handleFeatureCTA = (feature: string) => {
    window.open(`https://deusvault.com/features/${feature.toLowerCase().replace(/\s+/g, '-')}`, '_blank');
  };

  return (
    <div className="space-y-20 max-w-7xl mx-auto px-6 lg:px-8 py-20">
      
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center space-y-6"
      >
        <Badge variant="outline" className="text-cyan-400 border-cyan-400/50 px-4 py-2">
          <Sparkles className="h-4 w-4 mr-2" />
          Core Features
        </Badge>
        
        <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold bg-gradient-to-r from-cyan-400 via-white to-yellow-400 bg-clip-text text-transparent"
            style={{ fontFamily: "'Space Grotesk', monospace" }}>
          Everything You Need
        </h2>
        
        <p className="text-base sm:text-lg lg:text-xl text-gray-400 max-w-3xl mx-auto">
          Professional development tools, AI assistance, and deployment solutions 
          all integrated into one powerful environment.
        </p>
      </motion.div>

      {/* Main Features Grid */}
      <div className="grid lg:grid-cols-2 gap-12">
        {heroFeatures.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="group"
          >
            <Card className={`glass-refined border-${feature.color}-400/30 hover:border-${feature.color}-400/50 transition-all duration-300 overflow-hidden`}>
              <CardContent className="p-0">
                
                {/* Video Demo */}
                <div className="relative aspect-video overflow-hidden">
                  <video 
                    autoPlay 
                    loop 
                    muted 
                    playsInline
                    className="w-full h-full object-cover"
                    poster={feature.videoPoster}
                  >
                    <source src={feature.videoSrc} type="video/mp4" />
                  </video>
                  
                  {/* Video overlay */}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                    <Play className={`h-12 w-12 text-${feature.color}-400`} />
                  </div>
                  
                  {/* Feature icon overlay */}
                  <div className={`absolute top-4 left-4 w-12 h-12 bg-${feature.color}-400/20 rounded-lg flex items-center justify-center backdrop-blur-sm`}>
                    <div className={`text-${feature.color}-400`}>
                      {feature.icon}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6">
                  <div className="space-y-3">
                    <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>

                  {/* Benefits */}
                  <div className="space-y-3">
                    <h4 className="text-base sm:text-lg font-semibold text-gray-300">Key Benefits:</h4>
                    <div className="grid grid-cols-1 gap-2">
                      {feature.benefits.map((benefit, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <CheckCircle className={`h-4 w-4 text-${feature.color}-400 flex-shrink-0`} />
                          <span className="text-gray-300 text-sm">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Metrics */}
                  <div className="grid grid-cols-3 gap-4 p-4 bg-black/20 rounded-lg">
                    {Object.entries(feature.metrics).map(([key, value]) => (
                      <div key={key} className="text-center">
                        <div className={`text-lg font-bold text-${feature.color}-400`}>{value}</div>
                        <div className="text-xs text-gray-400 capitalize">{key}</div>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <Button 
                    onClick={() => handleFeatureCTA(feature.title)}
                    className={`w-full bg-gradient-to-r from-${feature.color}-500 to-yellow-500 hover:from-${feature.color}-400 hover:to-yellow-400 text-black font-semibold transition-all transform hover:scale-[1.02]`}
                  >
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Additional Features */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="space-y-8"
      >
        <h3 className="text-3xl font-bold text-center text-white">
          Plus Many More Features
        </h3>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {additionalFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`glass-refined rounded-lg p-6 border border-${feature.color}-400/30 hover:border-${feature.color}-400/50 transition-all group`}
            >
              <div className={`w-12 h-12 bg-${feature.color}-400/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-${feature.color}-400/30 transition-colors`}>
                <div className={`text-${feature.color}-400`}>
                  {feature.icon}
                </div>
              </div>
              <h4 className="font-semibold text-white mb-2">{feature.title}</h4>
              <p className="text-sm text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Bottom CTA */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center space-y-6 bg-gradient-to-r from-cyan-900/30 to-yellow-900/30 rounded-2xl p-12 border border-cyan-400/30"
      >
        <h3 className="text-3xl font-bold text-white">
          Ready to Transform Your Development?
        </h3>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Join thousands of developers who've already upgraded to DeusVaultOS. 
          Download now and experience the future of development.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            onClick={() => onNavigateToSubpage?.('download')}
            className="bg-gradient-to-r from-cyan-500 to-yellow-500 hover:from-cyan-400 hover:to-yellow-400 text-black font-semibold px-8 py-3 transform hover:scale-105"
          >
            <Download className="mr-2 h-5 w-5" />
            Download Free
          </Button>
          <Button 
            onClick={() => onNavigateToSubpage?.('learn-more')}
            variant="outline" 
            className="border-cyan-400/50 text-cyan-400 hover:border-cyan-400 hover:bg-cyan-400/10 px-8 py-3"
          >
            Learn More
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
