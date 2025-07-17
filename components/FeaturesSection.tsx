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
  Sparkles,
  CheckCircle,
  Download
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
    <section id="section-1" className="snap-section relative py-24 overflow-hidden">
      
      {/* Transparent Background - Let 3D scene show through */}
      <div className="absolute inset-0 bg-black/10" />
      
      {/* Optional accent areas for contrast */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />
        <div className="absolute bottom-1/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-400/50 to-transparent" />
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        
        {/* Section Header - Semi-transparent */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="backdrop-blur-sm bg-black/20 rounded-2xl p-8 border border-white/10 inline-block">
            <Badge className="bg-gradient-to-r from-cyan-500/80 to-yellow-400/80 backdrop-blur-sm px-6 py-3 mb-8 border border-cyan-400/30 text-white">
              <Sparkles className="h-4 w-4 mr-3 text-cyan-300" />
              Core Capabilities
            </Badge>
            
            <h2 className="text-4xl md:text-6xl mb-6 bg-gradient-to-r from-cyan-200 via-yellow-200 to-cyan-200 bg-clip-text text-transparent" style={{ textShadow: '0 2px 20px rgba(0,0,0,0.8)' }}>
              Everything You Need to <span className="bg-gradient-to-r from-cyan-400 to-yellow-400 bg-clip-text text-transparent">Build Faster</span>
            </h2>
            
            <p className="text-xl text-white max-w-4xl mx-auto" style={{ textShadow: '0 1px 10px rgba(0,0,0,0.7)' }}>
              A complete development environment that eliminates setup time and accelerates creation with AI.
            </p>
          </div>
        </motion.div>

        {/* Features Grid - Mixed transparency */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {coreFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              {/* Alternate between semi-transparent and more opaque cards */}
              <Card className={`h-full transition-all duration-300 hover:scale-105 ${
                index % 2 === 0 
                  ? 'bg-black/20 backdrop-blur-sm border-white/20' // Transparent cards
                  : 'bg-black/40 backdrop-blur-md border-cyan-400/30' // More opaque cards
              }`}>
                <CardContent className="p-8">
                  
                  {/* Feature Header */}
                  <div className="flex items-start gap-6 mb-6">
                    <div className="text-cyan-400 bg-cyan-400/10 p-3 rounded-xl backdrop-blur-sm">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="text-2xl text-white mb-2" style={{ textShadow: '0 1px 8px rgba(0,0,0,0.8)' }}>
                        {feature.title}
                      </h3>
                      <p className="text-lg text-gray-200 leading-relaxed" style={{ textShadow: '0 1px 6px rgba(0,0,0,0.6)' }}>
                        {feature.description}
                      </p>
                    </div>
                  </div>
                  
                  {/* Benefits List */}
                  <ul className="space-y-3 mb-8">
                    {feature.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-center gap-3 text-gray-200" style={{ textShadow: '0 1px 4px rgba(0,0,0,0.6)' }}>
                        <CheckCircle className="h-5 w-5 text-cyan-400 flex-shrink-0" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                  
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Call to Action - Transparent */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="backdrop-blur-sm bg-black/20 rounded-2xl p-8 border border-white/10 inline-block">
            <h3 className="text-3xl text-white mb-4" style={{ textShadow: '0 2px 15px rgba(0,0,0,0.8)' }}>
              Ready to Build Something Amazing?
            </h3>
            <p className="text-lg text-gray-200 mb-8 max-w-2xl mx-auto" style={{ textShadow: '0 1px 8px rgba(0,0,0,0.7)' }}>
              Join thousands of developers who've accelerated their workflow with DeusVaultOS.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-cyan-500/80 to-yellow-400/80 backdrop-blur-sm text-white border border-cyan-400/30 hover:scale-105 transition-all duration-300"
                style={{ textShadow: '0 1px 4px rgba(0,0,0,0.8)' }}
              >
                <Download className="h-5 w-5 mr-2 text-yellow-300" />
                Download Now
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-cyan-400/30 text-cyan-200 backdrop-blur-sm bg-cyan-400/10 hover:bg-yellow-400/20 transition-all duration-300"
                style={{ textShadow: '0 1px 4px rgba(0,0,0,0.8)' }}
              >
                View Documentation
              </Button>
            </div>
          </div>
        </motion.div>
        
      </div>
    </section>
  );
};