/**
 * 🧠 THERION AI SECTION - COMPLETELY REBUILT FOR STABILITY
 * 
 * Professional showcase of THERION AI capabilities with:
 * - Simple, stable layout design
 * - Performance-optimized animations
 * - Clear value proposition presentation
 * - Zero crashes or black screen issues
 * 
 * @author THERION_3D_EXPERIENCE_ENGINEER
 * @version 3.0.0 - STABILITY FOCUSED
 */

import { 
  Brain, 
  Zap, 
  Eye, 
  Cpu, 
  Target,
  Shield,
  Sparkles,
  ArrowRight
} from "lucide-react";
import { motion } from "framer-motion";

export function TherionSection() {
  const features = [
    {
      icon: Brain,
      title: "Self-Evolution",
      description: "THERION continuously improves its capabilities through advanced machine learning",
      color: "text-cyan-400"
    },
    {
      icon: Eye,
      title: "Advanced Perception",
      description: "Understands context and patterns to provide intelligent assistance",
      color: "text-yellow-400"
    },
    {
      icon: Zap,
      title: "Instant Response",
      description: "Lightning-fast processing for immediate development support",
      color: "text-cyan-400"
    },
    {
      icon: Shield,
      title: "Security First",
      description: "Built-in security protocols protect your code and data",
      color: "text-yellow-400"
    }
  ];

  return (
    <section className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/20 via-black to-yellow-900/20" />
      
      {/* Content Container */}
      <div className="container-responsive relative z-10 flex flex-col justify-center min-h-screen">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center bg-gradient-to-r from-cyan-400/20 to-yellow-400/20 border border-cyan-400/30 rounded-full px-6 py-3 mb-8">
            <Brain className="h-5 w-5 mr-3 text-cyan-400" />
            <span className="text-cyan-300 font-medium">THERION AI PROTOCOL</span>
          </div>
          
          <h2 className="display-title mb-6">
            <span className="bg-gradient-to-r from-cyan-400 to-yellow-400 bg-clip-text text-transparent">
              Intelligent Development Assistant
            </span>
          </h2>
          
          <p className="subtitle text-gray-300 max-w-3xl mx-auto">
            THERION is your AI-powered development companion that understands your code,
            anticipates your needs, and accelerates your workflow with intelligent automation.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 hover:border-cyan-400/50 transition-all duration-300"
            >
              <feature.icon className={`h-8 w-8 mb-4 ${feature.color}`} />
              <h3 className="text-lg font-semibold mb-3 text-white">{feature.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Key Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-gray-900/80 to-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-6 text-white">Why THERION Changes Everything</h3>
            <div className="grid md:grid-cols-3 gap-6 text-sm">
              <div>
                <div className="text-cyan-400 font-semibold mb-2">📈 Productivity Boost</div>
                <p className="text-gray-300">Automate repetitive tasks and focus on what matters most</p>
              </div>
              <div>
                <div className="text-yellow-400 font-semibold mb-2">🎯 Smart Suggestions</div>
                <p className="text-gray-300">Get intelligent code completions and optimization tips</p>
              </div>
              <div>
                <div className="text-cyan-400 font-semibold mb-2">🔄 Continuous Learning</div>
                <p className="text-gray-300">Adapts to your coding style and project requirements</p>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
