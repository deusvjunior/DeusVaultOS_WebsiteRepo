import { motion } from 'framer-motion';
import {
    ArrowLeft,
    ArrowRight,
    Code,
    Cpu,
    Eye,
    Lightbulb,
    Play,
    Rocket,
    Sparkles,
    Terminal,
    Zap
} from 'lucide-react';

interface DemoPageProps {
  onReturnHome: () => void;
}

export function DemoPage({ onReturnHome }: DemoPageProps) {
  const demoScenarios = [
    {
      title: "Intelligent Code Assistant",
      description: "AI that understands your code and helps you write better implementations",
      videoId: "code-assistant-demo",
      highlights: [
        "Analyzes your comments and writes the implementation",
        "Suggests optimizations and best practices", 
        "Handles edge cases automatically",
        "Refactors code with modern patterns"
      ],
      icon: <Code className="h-8 w-8" />,
      color: "cyan"
    },
    {
      title: "Automated Deployment",
      description: "Streamlined deployment process from development to production",
      videoId: "deployment-demo",
      highlights: [
        "Configures infrastructure automatically",
        "Sets up CI/CD pipelines",
        "Monitors performance and scales as needed",
        "Handles deployments with minimal downtime"
      ],
      icon: <Rocket className="h-8 w-8" />,
      color: "yellow"
    },
    {
      title: "Smart Debugging",
      description: "Advanced debugging tools that help identify and fix issues quickly",
      videoId: "debug-demo", 
      highlights: [
        "Analyzes code for potential issues",
        "Provides clear explanations of bugs",
        "Offers multiple solution approaches",
        "Learns from your development patterns"
      ],
      icon: <Eye className="h-8 w-8" />,
      color: "green"
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/20 via-black to-yellow-900/20"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(0,255,255,0.1),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,255,0,0.1),transparent_50%)]"></div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 px-4 sm:px-6 lg:px-8 py-6"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button
            onClick={onReturnHome}
            className="flex items-center gap-2 text-cyan-400 hover:text-white transition-colors group"
          >
            <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Back to Home</span>
          </button>
          
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-400">Live Demo</span>
          </div>
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
          <div className="inline-flex items-center gap-3 glass-refined rounded-full px-6 py-3 border border-cyan-400/50">
            <Sparkles className="h-5 w-5 text-cyan-400" />
            <span className="text-cyan-400 font-medium">Live Demo</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold bg-gradient-to-r from-cyan-400 via-white to-yellow-400 bg-clip-text text-transparent">
            See How It Works
          </h1>
          
          <p className="text-xl sm:text-2xl text-gray-300 max-w-2xl mx-auto">
            Explore the capabilities of our AI development platform. 
            <span className="text-cyan-400 font-semibold"> See the features</span> that will enhance your workflow.
          </p>
        </div>
      </motion.div>

      {/* Demo Scenarios */}
      <div className="relative z-10 px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-7xl mx-auto space-y-16">
          {demoScenarios.map((scenario, index) => (
            <motion.div
              key={scenario.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true }}
              className={`grid lg:grid-cols-2 gap-8 lg:gap-12 items-center ${
                index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
              }`}
            >
              {/* Content */}
              <div className={`space-y-6 ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                <div className="flex items-center gap-4">
                  <div className={`w-16 h-16 rounded-xl bg-${scenario.color}-400/20 flex items-center justify-center text-${scenario.color}-400`}>
                    {scenario.icon}
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-white">{scenario.title}</h2>
                    <p className="text-gray-400 mt-1">{scenario.description}</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  {scenario.highlights.map((highlight, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * i }}
                      viewport={{ once: true }}
                      className="flex items-center gap-3"
                    >
                      <div className={`w-2 h-2 rounded-full bg-${scenario.color}-400`}></div>
                      <span className="text-gray-300">{highlight}</span>
                    </motion.div>
                  ))}
                </div>
                
                <button className={`flex items-center gap-3 bg-gradient-to-r from-${scenario.color}-500 to-${scenario.color}-400 text-black font-semibold px-6 py-3 rounded-lg hover:shadow-xl hover:shadow-${scenario.color}-500/25 transition-all transform hover:scale-105`}>
                  <Play className="h-5 w-5" />
                  Watch This Demo
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>

              {/* Video */}
              <div className={`${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-cyan-500/20 border border-cyan-400/30 group cursor-pointer">
                  <div className="aspect-video bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
                    <div className="text-center">
                      <div className={`w-20 h-20 rounded-full bg-${scenario.color}-400/20 flex items-center justify-center mx-auto mb-4 group-hover:bg-${scenario.color}-400/30 transition-colors`}>
                        <Play className={`h-8 w-8 text-${scenario.color}-400`} />
                      </div>
                      <p className="text-gray-400">Click to explore features</p>
                    </div>
                  </div>
                  
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className={`w-16 h-16 rounded-full bg-${scenario.color}-400/90 flex items-center justify-center`}>
                      <Play className="h-6 w-6 text-black ml-1" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Tech Stats */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative z-10 px-4 sm:px-6 lg:px-8 py-16"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">The Numbers Don't Lie</h2>
            <p className="text-xl text-gray-400">Real performance from real developers</p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { stat: "10x", label: "Faster Development", icon: <Zap className="h-8 w-8" /> },
              { stat: "95%", label: "Bug Reduction", icon: <Eye className="h-8 w-8" /> },
              { stat: "60s", label: "Deploy Time", icon: <Rocket className="h-8 w-8" /> },
              { stat: "∞", label: "Possibilities", icon: <Lightbulb className="h-8 w-8" /> }
            ].map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center space-y-4"
              >
                <div className="w-20 h-20 bg-cyan-400/20 rounded-2xl flex items-center justify-center mx-auto text-cyan-400">
                  {item.icon}
                </div>
                <div>
                  <div className="text-4xl font-bold text-white">{item.stat}</div>
                  <div className="text-gray-400 font-medium">{item.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative z-10 px-4 sm:px-6 lg:px-8 py-16"
      >
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-4xl sm:text-5xl font-bold text-white">
            Ready to enhance your <span className="text-cyan-400">development workflow</span>?
          </h2>
          
          <p className="text-xl text-gray-300">
            Join the waitlist. Be among the first to experience what development feels like 
            when AI truly understands your vision.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-cyan-500 to-yellow-500 text-black font-bold px-8 py-4 rounded-lg transform hover:scale-105 transition-all shadow-xl hover:shadow-cyan-500/25">
              <span className="flex items-center gap-2">
                <Terminal className="h-5 w-5" />
                Get Beta Access
                <ArrowRight className="h-4 w-4" />
              </span>
            </button>
            
            <button 
              onClick={onReturnHome}
              className="glass-refined border border-cyan-400/50 text-cyan-400 font-semibold px-8 py-4 rounded-lg hover:border-cyan-400 hover:bg-cyan-400/10 transition-all"
            >
              Explore More Features
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
