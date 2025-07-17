import { motion } from "framer-motion";
import {
    ArrowRight,
    ChevronDown,
    Coins,
    Cpu,
    Download,
    Infinity,
    Shield,
    Users
} from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { VideoPlaceholder } from "./VideoPlaceholder";

export function AccurateHeroSection() {
  return (
    <section className="min-h-screen relative overflow-hidden">
      {/* Minimal Background - Maximum transparency for 3D scene */}
      <div className="absolute inset-0 bg-black/5" />
      
      {/* Hero Content */}
      <div className="container mx-auto px-6 pt-32 pb-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[calc(100vh-200px)]">
          
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Status Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Badge className="bg-gradient-to-r from-cyan-600/70 to-purple-600/70 backdrop-blur-sm px-6 py-3 text-white border border-cyan-400/30">
                <Cpu className="h-4 w-4 mr-2" />
                DeusVault OS AI Platform - Open Source Rolling Release
              </Badge>
            </motion.div>

            {/* Main Headline */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-6"
            >
              <h1 className="text-5xl md:text-7xl lg:text-8xl leading-tight">
                <span className="bg-gradient-to-r from-white via-cyan-200 to-purple-200 bg-clip-text text-transparent" style={{ textShadow: '0 2px 30px rgba(0,0,0,0.9)' }}>
                  The AI Platform
                </span>
                <br />
                <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent" style={{ textShadow: '0 2px 30px rgba(0,0,0,0.9)' }}>
                  That Builds Itself
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-gray-100 max-w-2xl leading-relaxed" style={{ textShadow: '0 1px 15px rgba(0,0,0,0.8)' }}>
                Self-evolving development environment with marketplace economy, 
                community governance, and AI that learns from every interaction.
              </p>
            </motion.div>

            {/* Key Value Props */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-4"
            >
              {[
                { icon: <Shield className="h-5 w-5" />, text: "Open Source\nNo Lock-in" },
                { icon: <Infinity className="h-5 w-5" />, text: "Self-Evolving\nAI Platform" },
                { icon: <Users className="h-5 w-5" />, text: "Community\nGovernance" }
              ].map((item, index) => (
                <div key={index} className="backdrop-blur-sm bg-black/10 rounded-xl p-4 border border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="text-cyan-400 bg-cyan-400/10 p-2 rounded-lg">
                      {item.icon}
                    </div>
                    <span className="text-white text-sm font-medium whitespace-pre-line" style={{ textShadow: '0 1px 8px rgba(0,0,0,0.8)' }}>
                      {item.text}
                    </span>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button 
                size="lg"
                className="text-lg px-8 py-6 bg-gradient-to-r from-cyan-600/80 to-purple-600/80 backdrop-blur-sm text-white border border-cyan-400/30 hover:scale-105 transition-all duration-300"
                style={{ textShadow: '0 1px 6px rgba(0,0,0,0.8)' }}
              >
                <Download className="h-5 w-5 mr-2" />
                Download OS Image
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
              
              <Button 
                variant="outline"
                size="lg"
                className="text-lg px-8 py-6 border-white/30 text-white backdrop-blur-sm bg-white/5 hover:bg-white/10 transition-all duration-300"
                style={{ textShadow: '0 1px 6px rgba(0,0,0,0.8)' }}
              >
                Join Community
              </Button>
            </motion.div>

            {/* Status Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="flex items-center gap-6 text-sm text-gray-300"
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span style={{ textShadow: '0 1px 4px rgba(0,0,0,0.8)' }}>Platform Online</span>
              </div>
              <div className="flex items-center gap-2">
                <Coins className="h-4 w-4 text-yellow-400" />
                <span style={{ textShadow: '0 1px 4px rgba(0,0,0,0.8)' }}>Economy Active</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-cyan-400" />
                <span style={{ textShadow: '0 1px 4px rgba(0,0,0,0.8)' }}>Community Growing</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Video Demo */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <div className="relative">
              <VideoPlaceholder 
                placeholder="DeusVault OS Platform Demo"
                className="w-full"
                autoplay={false}
                loop={false}
                overlay={true}
              />
              
              {/* Video Overlay Info */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="backdrop-blur-md bg-black/40 rounded-xl p-4 border border-white/20">
                  <h3 className="text-white font-semibold mb-2" style={{ textShadow: '0 1px 6px rgba(0,0,0,0.8)' }}>
                    Live Platform Demo
                  </h3>
                  <p className="text-gray-200 text-sm" style={{ textShadow: '0 1px 4px rgba(0,0,0,0.6)' }}>
                    See the self-evolving AI in action with real marketplace interactions
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-gray-400 text-sm" style={{ textShadow: '0 1px 4px rgba(0,0,0,0.8)' }}>
              Explore Platform
            </span>
            <ChevronDown className="h-6 w-6 text-gray-400 animate-bounce" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};
