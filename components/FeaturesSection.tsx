import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { 
  Code2, 
  Brain, 
  Gamepad2, 
  Layers, 
  Zap, 
  ArrowRight,
  Sparkles
} from "lucide-react";
import { motion } from "framer-motion";

export function FeaturesSection() {
  const coreFeatures = [
    {
      icon: <Brain className="h-10 w-10" />,
      title: "THERION AI Core",
      description: "Advanced neural AI that learns your coding patterns and writes alongside you. True AI pair programming.",
      benefits: ["Natural language to code", "Bug prediction", "Performance optimization", "Style learning"],
      metrics: { accuracy: "99.7%", speed: "Real-time", learning: "Continuous" }
    },
    {
      icon: <Layers className="h-10 w-10" />,
      title: "Parallel Environments",
      description: "Run unlimited development environments simultaneously with zero conflicts and instant switching.",
      benefits: ["Perfect isolation", "Instant switching", "Resource sharing", "Zero overhead"],
      metrics: { containers: "Unlimited", overhead: "< 1%", switching: "< 25ms" }
    },
    {
      icon: <Code2 className="h-10 w-10" />,
      title: "Universal Deployment",
      description: "Deploy to any platform from a single codebase. Desktop, mobile, web, cloud—all from one environment.",
      benefits: ["Native mobile apps", "Progressive web apps", "Cloud deployment", "Desktop packages"],
      metrics: { platforms: "All Major", setup: "Zero Config", speed: "One-Click" }
    },
    {
      icon: <Gamepad2 className="h-10 w-10" />,
      title: "Gaming Suite",
      description: "Complete game development environment with Unity, Unreal, and professional modding tools.",
      benefits: ["Unity & Unreal ready", "Advanced modding tools", "Performance profiling", "Asset management"],
      metrics: { engines: "All Major", performance: "Studio Grade", setup: "Pre-loaded" }
    }
  ];

  const handleFeatureCTA = (feature: string) => {
    window.open(`https://deusvault.com/features/${feature.toLowerCase().replace(/\s+/g, '-')}`, '_blank');
  };

  return (
    <section id="section-1" className="snap-section bg-gradient-to-b from-cyber-dark-900 via-cyber-dark-800 to-cyber-dark-900 relative">
      
      {/* Subtle Background */}
      <div className="absolute inset-0 bg-dots-subtle opacity-10" />
      
      <div className="container-refined section-refined">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <Badge className="glass-refined px-6 py-3 font-caption mb-8 border-cyber-cyan/30">
            <Sparkles className="h-4 w-4 mr-3 text-cyber-cyan" />
            Core Capabilities
          </Badge>
          
          <h2 className="font-hero mb-6">
            Everything You Need to <span className="text-gradient">Build Faster</span>
          </h2>
          
          <p className="font-subtitle max-w-4xl mx-auto">
            A complete development environment that eliminates setup time and accelerates creation with AI.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {coreFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="card-refined h-full interactive-refined">
                <CardContent className="p-8">
                  
                  {/* Feature Header */}
                  <div className="flex items-start gap-6 mb-6">
                    <div className="text-cyber-cyan">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="font-title mb-2">
                        {feature.title}
                      </h3>
                    </div>
                  </div>
                  
                  {/* Description */}
                  <p className="font-body mb-8">
                    {feature.description}
                  </p>
                  
                  {/* Benefits */}
                  <div className="mb-8">
                    <h4 className="font-subtitle mb-4 text-cyber-white">Key Benefits:</h4>
                    <div className="grid grid-cols-2 gap-3">
                      {feature.benefits.map((benefit, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <div className="w-1.5 h-1.5 bg-cyber-cyan rounded-full" />
                          <span className="font-body-sm text-cyber-dark-300">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Metrics */}
                  <div className="glass-refined rounded-lg p-6 mb-6">
                    <div className="grid grid-cols-3 gap-4">
                      {Object.entries(feature.metrics).map(([key, value]) => (
                        <div key={key} className="text-center">
                          <div className="font-body text-accent-cyan font-semibold mb-1">
                            {value}
                          </div>
                          <div className="font-caption capitalize">
                            {key}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* CTA */}
                  <Button 
                    onClick={() => handleFeatureCTA(feature.title)}
                    className="w-full button-refined font-body interactive-refined focus-refined"
                  >
                    Learn More
                    <ArrowRight className="ml-3 h-4 w-4" />
                  </Button>
                  
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Platform Support */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="card-refined rounded-xl p-12 text-center"
        >
          <h3 className="font-title mb-8">
            Universal Platform Support
          </h3>
          
          <div className="grid md:grid-cols-5 gap-6 mb-8">
            {["Linux", "Windows", "macOS", "Mobile", "Cloud"].map((platform, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass-refined rounded-lg p-6 interactive-refined"
              >
                <div className="font-subtitle text-cyber-white mb-2">
                  {platform}
                </div>
                <div className="font-caption text-cyber-dark-400">
                  Native support
                </div>
              </motion.div>
            ))}
          </div>
          
          <p className="font-body mb-8 max-w-3xl mx-auto">
            One environment. Every platform. <span className="text-accent-cyan">Infinite possibilities.</span>
          </p>
          
          <Button 
            className="button-primary px-8 py-4 font-subtitle interactive-refined focus-refined"
          >
            <Zap className="mr-3 h-5 w-5" />
            Get Started Now
            <ArrowRight className="ml-3 h-5 w-5" />
          </Button>
        </motion.div>

      </div>
    </section>
  );
}