import { motion } from "framer-motion";
import {
    ArrowRight,
    Code,
    Coins,
    Download,
    Globe,
    Heart,
    Users,
    Zap
} from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { VideoPlaceholder } from "./VideoPlaceholder";

export function AccurateCTASection() {
  const communityStats = [
    { icon: <Users className="h-6 w-6" />, label: "Netizens", value: "Growing Community", accent: "In the Kingdom of Digital Heaven" },
    { icon: <Code className="h-6 w-6" />, label: "Open Source", value: "Free Forever", accent: "No lock-in, full ownership" },
    { icon: <Coins className="h-6 w-6" />, label: "Economy", value: "Earn & Create", accent: "Marketplace royalties system" },
    { icon: <Heart className="h-6 w-6" />, label: "Community", value: "24/7 Support", accent: "Guidance and resources" }
  ];

  const downloadOptions = [
    {
      title: "Platform Download",
      description: "Complete OS image with AI platform",
      action: "Download ISO",
      highlight: "Recommended",
      features: ["Full OS installation", "All platform features", "Community access", "Marketplace integration"]
    },
    {
      title: "Join Community",
      description: "Connect with fellow netizens",
      action: "Join Discord",
      highlight: "Active",
      features: ["24/7 community support", "Development discussions", "Marketplace guidance", "Platform updates"]
    },
    {
      title: "Developer Access",
      description: "Contribute to the ecosystem",
      action: "GitHub Repository",
      highlight: "Open Source",
      features: ["Source code access", "Contribution guidelines", "Issue tracking", "Development roadmap"]
    }
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Ultra-minimal Background */}
      <div className="absolute inset-0 bg-black/5" />
      
      {/* Subtle accent elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/3 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/70 to-transparent" />
        <div className="absolute bottom-1/3 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-400/70 to-transparent" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Main CTA Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Badge className="mb-8 bg-gradient-to-r from-cyan-600/70 to-purple-600/70 backdrop-blur-sm text-white px-8 py-3 text-lg border border-cyan-400/30">
            <Globe className="h-5 w-5 mr-2" />
            Join the Digital Kingdom
          </Badge>
          
          <h2 className="text-5xl md:text-7xl mb-8 bg-gradient-to-r from-white via-cyan-200 to-purple-200 bg-clip-text text-transparent" style={{ textShadow: '0 2px 30px rgba(0,0,0,0.9)' }}>
            Ready to Transform 
            <span className="block bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Your Digital Life?
            </span>
          </h2>
          
          <p className="text-xl md:text-2xl text-gray-100 max-w-4xl mx-auto leading-relaxed mb-12" style={{ textShadow: '0 1px 15px rgba(0,0,0,0.8)' }}>
            Download DeusVault OS and join a community where technology serves humanity.
            <span className="block mt-4 text-cyan-300">No fees. No lock-in. Just pure potential.</span>
          </p>

          {/* Primary CTA */}
          <motion.div
            className="mb-16"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              size="lg" 
              className="text-2xl px-16 py-8 bg-gradient-to-r from-cyan-600/80 to-purple-600/80 backdrop-blur-sm hover:from-cyan-500/90 hover:to-purple-500/90 text-white shadow-2xl hover:shadow-cyan-500/25 transition-all duration-500 border border-cyan-400/30"
              style={{ textShadow: '0 1px 8px rgba(0,0,0,0.8)' }}
            >
              <Download className="h-8 w-8 mr-4" />
              Download DeusVault OS
              <ArrowRight className="h-8 w-8 ml-4" />
            </Button>
          </motion.div>
        </motion.div>

        {/* Community Demo Video */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-20"
        >
          <VideoPlaceholder 
            placeholder="Community & Economy in Action"
            className="w-full max-w-5xl mx-auto"
            aspectRatio="16:9"
            autoplay={true}
            loop={true}
            overlay={true}
          />
        </motion.div>

        {/* Community Stats */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {communityStats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-cyan-600/60 to-purple-600/60 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 border border-cyan-400/30">
                <div className="text-white">
                  {stat.icon}
                </div>
              </div>
              <div className="text-lg text-white mb-1 font-semibold" style={{ textShadow: '0 1px 10px rgba(0,0,0,0.8)' }}>
                {stat.value}
              </div>
              <div className="text-sm text-gray-300 mb-2" style={{ textShadow: '0 1px 6px rgba(0,0,0,0.7)' }}>
                {stat.label}
              </div>
              <div className="text-xs text-cyan-300" style={{ textShadow: '0 1px 4px rgba(0,0,0,0.6)' }}>
                {stat.accent}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Download Options */}
        <motion.div
          className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {downloadOptions.map((option, index) => (
            <div 
              key={index} 
              className={`relative rounded-2xl p-8 backdrop-blur-md border transition-all duration-300 hover:scale-105 ${
                index === 0 
                  ? 'bg-gradient-to-br from-cyan-900/30 to-purple-900/30 border-cyan-400/50 shadow-xl' 
                  : 'bg-black/15 border-white/20 hover:border-cyan-400/30'
              }`}
            >
              {index === 0 && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-cyan-600/80 to-purple-600/80 backdrop-blur-sm text-white px-4 py-1 border border-cyan-400/30">
                  {option.highlight}
                </Badge>
              )}
              
              <div className="text-center mb-8">
                <h3 className="text-2xl text-white mb-3" style={{ textShadow: '0 1px 12px rgba(0,0,0,0.8)' }}>
                  {option.title}
                </h3>
                <p className="text-gray-200 mb-6 leading-relaxed" style={{ textShadow: '0 1px 8px rgba(0,0,0,0.7)' }}>
                  {option.description}
                </p>
              </div>

              <ul className="space-y-3 mb-8">
                {option.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-gray-200" style={{ textShadow: '0 1px 6px rgba(0,0,0,0.7)' }}>
                    <Zap className="h-4 w-4 text-cyan-400 mr-3 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              <Button 
                className={`w-full text-lg py-4 transition-all duration-300 ${
                  index === 0
                    ? 'bg-gradient-to-r from-cyan-600/80 to-purple-600/80 backdrop-blur-sm hover:from-cyan-500/90 hover:to-purple-500/90 text-white border border-cyan-400/30'
                    : 'bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border border-white/30'
                }`}
                style={{ textShadow: '0 1px 6px rgba(0,0,0,0.8)' }}
              >
                {option.action}
              </Button>
            </div>
          ))}
        </motion.div>

        {/* Final Message */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          <div className="backdrop-blur-sm bg-black/10 rounded-2xl p-8 border border-white/10 inline-block">
            <p className="text-lg text-gray-200 mb-6 max-w-2xl" style={{ textShadow: '0 1px 8px rgba(0,0,0,0.7)' }}>
              Built for everyone aged 12-55. No computer experience needed.
            </p>
            <p className="text-cyan-300 font-medium" style={{ textShadow: '0 1px 6px rgba(0,0,0,0.6)' }}>
              "You just download and click install - it does everything for you!"
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
