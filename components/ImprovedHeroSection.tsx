import { motion } from "framer-motion";
import { ArrowRight, Code, Download, Play, Star, Users } from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

export function ImprovedHeroSection() {
  const handleDownload = () => {
    // Track conversion event
    (window as any).gtag?.('event', 'cta_click', {
      event_category: 'conversion',
      event_label: 'hero_download'
    });
    window.open('https://github.com/deusvault/releases', '_blank');
  };

  const handleDemo = () => {
    // Track demo event
    (window as any).gtag?.('event', 'demo_request', {
      event_category: 'engagement',
      event_label: 'hero_demo'
    });
    window.open('https://demo.deusvault.com', '_blank');
  };

  const socialProof = [
    { icon: <Star className="h-4 w-4" />, text: "4.9/5", subtext: "GitHub Rating" },
    { icon: <Users className="h-4 w-4" />, text: "50k+", subtext: "Developers" },
    { icon: <Code className="h-4 w-4" />, text: "Open", subtext: "Source" }
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center py-12 overflow-hidden">
      {/* Minimal background overlay to let 3D scene show through */}
      <div className="absolute inset-0 bg-black/20">
        {/* Subtle accent gradients that don't block the 3D background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 20% 80%, rgba(0, 225, 255, 0.08) 0%, transparent 50%),
                             radial-gradient(circle at 80% 20%, rgba(57, 255, 20, 0.08) 0%, transparent 50%)`
          }} />
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Column - Value Proposition - Transparent background */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="backdrop-blur-sm bg-black/10 rounded-2xl p-8 border border-white/10"
          >
            {/* Trust Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-6"
            >
              <Badge className="bg-gradient-to-r from-cyan-600/90 to-green-600/90 backdrop-blur-sm text-white px-6 py-2 text-sm border border-cyan-400/30">
                <Star className="h-4 w-4 mr-2" />
                Rated #1 Development Environment 2024
              </Badge>
            </motion.div>

            {/* Main Headline - Enhanced visibility */}
            <motion.h1
              className="text-5xl md:text-7xl lg:text-8xl mb-8 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              style={{ textShadow: '0 2px 20px rgba(0,0,0,0.8)' }}
            >
              <span className="block bg-gradient-to-r from-white via-cyan-200 to-green-200 bg-clip-text text-transparent">
                Build Software
              </span>
              <span className="block bg-gradient-to-r from-cyan-400 via-green-400 to-yellow-400 bg-clip-text text-transparent">
                Like a God
              </span>
            </motion.h1>
            
            {/* Value Proposition - Enhanced readability */}
            <motion.p
              className="text-xl md:text-2xl text-white leading-relaxed mb-8 max-w-2xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              style={{ textShadow: '0 1px 10px rgba(0,0,0,0.7)' }}
            >
              The AI-powered development environment that{" "}
              <span className="text-cyan-300 font-semibold">writes code with you</span>,{" "}
              <span className="text-green-300 font-semibold">deploys anywhere</span>, and{" "}
              <span className="text-yellow-300 font-semibold">evolves automatically</span>.
              <span className="block mt-4 text-lg text-gray-200">
                Zero configuration. Maximum productivity.
              </span>
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <Button 
                size="lg" 
                className="text-xl px-8 py-4 bg-gradient-to-r from-cyan-600 to-green-600 hover:from-cyan-500 hover:to-green-500 text-white shadow-xl hover:shadow-2xl transition-all duration-300 group"
                onClick={handleDownload}
              >
                <Download className="h-6 w-6 mr-3 group-hover:animate-bounce" />
                Download Free
                <ArrowRight className="h-6 w-6 ml-3 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                className="text-xl px-8 py-4 border-2 border-cyan-400/50 text-cyan-400 hover:bg-cyan-400/10 hover:border-cyan-400 transition-all duration-300 group"
                onClick={handleDemo}
              >
                <Play className="h-5 w-5 mr-3 group-hover:scale-110 transition-transform" />
                Watch Demo
              </Button>
            </motion.div>

            {/* Social Proof */}
            <motion.div
              className="flex items-center gap-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
            >
              {socialProof.map((proof, index) => (
                <div key={index} className="flex items-center gap-2 text-gray-400">
                  <div className="text-cyan-400">
                    {proof.icon}
                  </div>
                  <div>
                    <div className="text-white font-semibold">{proof.text}</div>
                    <div className="text-sm">{proof.subtext}</div>
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Column - Product Demo/Visual - Glass morphism with transparency */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {/* Terminal Mockup - Enhanced glass effect */}
            <div className="relative bg-black/30 backdrop-blur-md rounded-xl border border-white/20 shadow-2xl">
              {/* Terminal Header */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-white/5">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <div className="ml-4 text-sm text-gray-300">DeusVaultOS Terminal</div>
              </div>
              
              {/* Terminal Content */}
              <div className="p-6 font-mono text-sm">
                <div className="text-green-400 mb-2">$ deus init new-project</div>
                <div className="text-gray-300 mb-4">
                  <div>🚀 Initializing DeusVaultOS project...</div>
                  <div>🤖 AI analyzing requirements...</div>
                  <div>⚡ Setting up optimal environment...</div>
                  <div className="text-green-400">✨ Project ready in 3.2 seconds!</div>
                </div>
                
                <div className="text-cyan-400 mb-2">$ deus ai "create a REST API for users"</div>
                <div className="text-gray-300 mb-4">
                  <div>🧠 THERION AI understanding request...</div>
                  <div>📝 Generated models, routes, and tests</div>
                  <div>🔧 Auto-configured database</div>
                  <div className="text-green-400">✅ API ready for deployment</div>
                </div>
                
                <div className="text-yellow-400 mb-2">$ deus deploy --production</div>
                <div className="text-gray-300">
                  <div>🌍 Deploying to optimal regions...</div>
                  <div className="text-green-400">🎉 Live at https://your-api.deusvault.app</div>
                </div>
                
                <div className="mt-4 text-cyan-400 animate-pulse">_</div>
              </div>
            </div>

            {/* Floating Stats */}
            <motion.div
              className="absolute -top-6 -right-6 bg-gradient-to-r from-cyan-600 to-green-600 rounded-lg p-4 text-white shadow-xl"
              animate={{ y: [-5, 5, -5] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="text-2xl font-bold">3.2s</div>
              <div className="text-sm opacity-90">Setup Time</div>
            </motion.div>

            <motion.div
              className="absolute -bottom-6 -left-6 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg p-4 text-white shadow-xl"
              animate={{ y: [5, -5, 5] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            >
              <div className="text-2xl font-bold">99.7%</div>
              <div className="text-sm opacity-90">AI Accuracy</div>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom Trust Bar */}
        <motion.div
          className="mt-16 pt-8 border-t border-gray-700/30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <p className="text-center text-gray-400 mb-4">
            Trusted by developers at world-class companies
          </p>
          <div className="flex justify-center items-center gap-8 opacity-60">
            {['Google', 'Microsoft', 'Amazon', 'Meta', 'OpenAI'].map((company, index) => (
              <div key={index} className="text-lg text-gray-500 font-medium">
                {company}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
