import { motion } from 'framer-motion';
import { Brain, Cpu, Zap, Target, Shield, Users } from 'lucide-react';

export function TherionSection() {
  return (
    <div className="container-responsive">
      {/* THERION AI Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <div className="inline-flex items-center gap-3 mb-6">
          <div className="p-3 rounded-xl bg-cyan-500/20 border border-cyan-400/30">
            <Brain className="h-8 w-8 text-cyan-400" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            THERION <span className="text-cyan-400">AI</span>
          </h2>
        </div>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
          Advanced AI assistant that understands your development context and accelerates 
          your workflow with intelligent code generation and project management.
        </p>
      </motion.div>

      {/* THERION Features Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {[
          {
            icon: <Cpu className="h-6 w-6" />,
            title: "Context-Aware Intelligence",
            description: "THERION understands your entire project structure, dependencies, and coding patterns."
          },
          {
            icon: <Zap className="h-6 w-6" />,
            title: "Instant Code Generation",
            description: "Generate boilerplate, components, and entire features with natural language commands."
          },
          {
            icon: <Target className="h-6 w-6" />,
            title: "Smart Debugging",
            description: "AI-powered error detection and resolution suggestions based on your specific codebase."
          },
          {
            icon: <Shield className="h-6 w-6" />,
            title: "Security Analysis",
            description: "Automated security scanning and vulnerability detection with fix recommendations."
          },
          {
            icon: <Users className="h-6 w-6" />,
            title: "Team Collaboration",
            description: "Share AI insights and code suggestions across your development team seamlessly."
          },
          {
            icon: <Brain className="h-6 w-6" />,
            title: "Learning Engine",
            description: "THERION learns from your coding style and project preferences over time."
          }
        ].map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="group"
          >
            <div className="p-6 rounded-xl bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-gray-700/50 hover:border-cyan-400/50 transition-all duration-300 h-full">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-cyan-500/20 text-cyan-400 group-hover:bg-cyan-500/30 transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-white">
                  {feature.title}
                </h3>
              </div>
              <p className="text-gray-300 leading-relaxed">
                {feature.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* THERION Demo Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="max-w-4xl mx-auto"
      >
        <div className="p-8 rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700/50">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-white mb-4">
              Experience THERION AI in Action
            </h3>
            <p className="text-gray-300">
              See how THERION transforms your development workflow with intelligent assistance
            </p>
          </div>

          {/* Code Example */}
          <div className="bg-gray-950 rounded-lg p-6 font-mono text-sm border border-gray-800">
            <div className="flex items-center gap-2 mb-4 text-cyan-400">
              <span className="text-gray-500">$</span>
              <span>therion generate react-component UserProfile --with-tests</span>
            </div>
            <div className="text-green-400 mb-2">✨ Analyzing project structure...</div>
            <div className="text-green-400 mb-2">🎯 Generated UserProfile component with TypeScript</div>
            <div className="text-green-400 mb-2">🧪 Created comprehensive test suite</div>
            <div className="text-green-400">📝 Added to component documentation</div>
          </div>

          {/* CTA */}
          <div className="text-center mt-8">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-lg hover:from-cyan-400 hover:to-blue-500 transition-all duration-300"
            >
              <Brain className="h-5 w-5" />
              Try THERION AI
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
