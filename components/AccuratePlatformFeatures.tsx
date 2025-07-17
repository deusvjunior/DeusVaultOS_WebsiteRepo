import { motion } from "framer-motion";
import {
    Brain,
    CheckCircle,
    Coins,
    Database,
    Users,
    Zap
} from "lucide-react";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { VideoPlaceholder } from "./VideoPlaceholder";

export function AccuratePlatformFeatures() {
  const platformFeatures = [
    {
      title: "AI Development Environment",
      description: "Preconfigured AI tools and development environment that evolves with your coding patterns",
      icon: <Brain className="h-8 w-8" />,
      features: [
        "Enhanced system performance and hardware utilization",
        "Built-in system upgrade/installation agent", 
        "Immersive and accommodating user experience",
        "Full customization, free and open source distribution"
      ],
      demo: "AI Environment Demo"
    },
    {
      title: "Marketplace Economy",
      description: "Submodule publishing, peer review, and social credit score system with revenue streams",
      icon: <Coins className="h-8 w-8" />,
      features: [
        "Submodule publishing with peer review",
        "Social credit score system", 
        "Revenue streams and accounting",
        "Community resources and 24/7 support and guidance"
      ],
      demo: "Marketplace Demo"
    },
    {
      title: "Community Governance", 
      description: "Employment opportunities through publishing processes with community-driven development",
      icon: <Users className="h-8 w-8" />,
      features: [
        "Employment opportunities through publishing processes",
        "Free, open-source secure banking and data encryption tools",
        "Product ownership and IP protection marketplace money making",
        "Netizens in the kingdom of digital heaven"
      ],
      demo: "Community Demo"
    },
    {
      title: "Cashflow Positive Economy",
      description: "User accounts, submodule ownership, minimum fees with fractional royalties and Web3 custodial wallet",
      icon: <Database className="h-8 w-8" />,
      features: [
        "User account management",
        "Submodule ownership tracking",
        "Minimum fee + fractional royalties system", 
        "Web3 custodial wallet integration"
      ],
      demo: "Economy Demo"
    }
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Minimal Background */}
      <div className="absolute inset-0 bg-black/5" />
      
      {/* Subtle accent lines */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent" />
        <div className="absolute bottom-1/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-400/60 to-transparent" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <Badge className="bg-gradient-to-r from-cyan-600/70 to-purple-600/70 backdrop-blur-sm px-6 py-3 mb-8 border border-cyan-400/30 text-white">
            <Zap className="h-4 w-4 mr-3" />
            Platform Architecture
          </Badge>
          
          <h2 className="text-4xl md:text-6xl mb-6 bg-gradient-to-r from-white via-cyan-200 to-purple-200 bg-clip-text text-transparent" style={{ textShadow: '0 2px 25px rgba(0,0,0,0.9)' }}>
            Complete AI-Driven <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Ecosystem</span>
          </h2>
          
          <p className="text-xl text-gray-100 max-w-4xl mx-auto" style={{ textShadow: '0 1px 12px rgba(0,0,0,0.8)' }}>
            More than an OS - a self-evolving platform with marketplace economy, community governance, and AI that grows with every user interaction.
          </p>
        </motion.div>

        {/* Platform Overview Video */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <VideoPlaceholder 
            placeholder="DeusVault OS Complete Platform Overview"
            className="w-full max-w-4xl mx-auto"
            aspectRatio="16:9"
            autoplay={true}
            loop={true}
            overlay={true}
          />
        </motion.div>

        {/* Core Platform Features */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          {platformFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <Card className={`h-full backdrop-blur-md border transition-all duration-300 hover:scale-105 ${
                index % 2 === 0 
                  ? 'bg-black/10 border-white/20' // Very transparent
                  : 'bg-black/20 border-cyan-400/30' // Slightly more opaque
              }`}>
                <CardContent className="p-8">
                  
                  {/* Feature Header */}
                  <div className="flex items-start gap-6 mb-8">
                    <div className="text-cyan-400 bg-cyan-400/10 p-4 rounded-xl backdrop-blur-sm border border-cyan-400/20">
                      {feature.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl text-white mb-3" style={{ textShadow: '0 1px 10px rgba(0,0,0,0.9)' }}>
                        {feature.title}
                      </h3>
                      <p className="text-lg text-gray-200 leading-relaxed" style={{ textShadow: '0 1px 8px rgba(0,0,0,0.7)' }}>
                        {feature.description}
                      </p>
                    </div>
                  </div>

                  {/* Feature Demo Video */}
                  <div className="mb-8">
                    <VideoPlaceholder 
                      placeholder={feature.demo}
                      className="w-full"
                      aspectRatio="16:9"
                      autoplay={false}
                      loop={true}
                    />
                  </div>
                  
                  {/* Feature List */}
                  <ul className="space-y-3">
                    {feature.features.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-gray-200" style={{ textShadow: '0 1px 6px rgba(0,0,0,0.7)' }}>
                        <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                  
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Platform Architecture Visual */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="backdrop-blur-sm bg-black/10 rounded-2xl p-8 border border-white/10 inline-block mb-12">
            <h3 className="text-3xl text-white mb-6" style={{ textShadow: '0 2px 15px rgba(0,0,0,0.9)' }}>
              Open Source Rolling Release Model
            </h3>
            <div className="max-w-4xl mx-auto">
              <VideoPlaceholder 
                placeholder="Platform Architecture Diagram Animation"
                className="w-full"
                aspectRatio="16:9"
                autoplay={true}
                loop={true}
                overlay={false}
              />
            </div>
          </div>
          
          <p className="text-lg text-gray-200 mb-8 max-w-3xl mx-auto" style={{ textShadow: '0 1px 8px rgba(0,0,0,0.7)' }}>
            Built for ages 12-55, minimal to no computer experience required. Perfect for creative production solutions and gaming performance maximization.
          </p>
        </motion.div>

      </div>
    </section>
  );
};
