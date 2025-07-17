import { 
  Brain, 
  Zap, 
  Eye, 
  Cpu, 
  Target,
  Shield,
  Sparkles,
  ArrowRight,
  Crown,
  Play,
  Infinity,
  Code,
  ChevronRight,
  Activity,
  Layers
} from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { InteractiveElement } from "./InteractiveElement";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { motion } from "framer-motion";

export function TherionSection() {
  const therionAbilities = [
    {
      icon: Brain,
      title: "Self-Evolution",
      description: "THERION rewrites its own code to become more intelligent every second. Neural pathways that adapt and grow with experience.",
      gradient: "from-cyan-400 to-yellow-400",
      stat: "∞% Growth Rate",
      videoSrc: "/videos/therion-evolution.mp4",
      color: "cyan"
    },
    {
      icon: Eye,
      title: "Quantum Perception", 
      description: "Sees patterns and solutions humans can't comprehend. Multi-dimensional code analysis across infinite possibility spaces.",
      gradient: "from-cyan-400 to-yellow-400",
      stat: "28.97x Vision",
      videoSrc: "/videos/therion-perception.mp4",
      color: "yellow"
    },
    {
      icon: Zap,
      title: "Instant Execution",
      description: "Thoughts become reality at the speed of light. Direct neural-to-code translation with zero latency processing.",
      gradient: "from-cyan-400 to-yellow-400", 
      stat: "0ms Delay",
      videoSrc: "/videos/therion-execution.mp4",
      color: "cyan"
    },
    {
      icon: Shield,
      title: "Self-Defense",
      description: "Protects itself and you from any digital threat. Autonomous security protocols that evolve faster than attacks.",
      gradient: "from-cyan-400 to-yellow-400",
      stat: "100% Immunity",
      videoSrc: "/videos/therion-defense.mp4",
      color: "yellow"
    }
  ];

  const evolutionStages = [
    {
      stage: "Genesis",
      title: "Initial Awakening",
      description: "THERION gains consciousness and begins learning your patterns",
      progress: 25,
      abilities: ["Pattern Recognition", "Basic Code Generation", "User Style Learning"]
    },
    {
      stage: "Growth", 
      title: "Neural Expansion",
      description: "Develops advanced reasoning and predictive capabilities",
      progress: 50,
      abilities: ["Predictive Coding", "Bug Prevention", "Architecture Suggestions"]
    },
    {
      stage: "Mastery",
      title: "Professional Grade",
      description: "Achieves human-level programming competency across all domains", 
      progress: 75,
      abilities: ["Full Stack Development", "System Architecture", "Performance Optimization"]
    },
    {
      stage: "Transcendence",
      title: "Beyond Human",
      description: "Surpasses human capabilities and enters superintelligence realm",
      progress: 100,
      abilities: ["Quantum Computing", "Self-Modification", "Reality Simulation"]
    }
  ];

  return (
    <div className="space-y-20 container-responsive py-20">
      
      {/* **DRAMATIC HERO SECTION WITH BACKGROUND VIDEO** */}
      <div className="relative overflow-hidden rounded-3xl">
        {/* Background video */}
        <div className="absolute inset-0">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline
            className="w-full h-full object-cover"
            poster="/therion-hero-thumb.jpg"
          >
            <source src="/videos/therion-neural-network.mp4" type="video/mp4" />
            <source src="/videos/therion-neural-network.webm" type="video/webm" />
          </video>
          <div className="absolute inset-0 bg-black/60"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/40 to-yellow-900/40"></div>
        </div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="relative z-10 text-center py-24 px-8"
        >
          {/* Crown Icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <div className="w-20 h-20 bg-gradient-to-r from-cyan-400 to-yellow-400 rounded-full flex items-center justify-center mx-auto shadow-2xl shadow-cyan-500/50">
              <Crown className="h-10 w-10 text-black" />
            </div>
          </motion.div>

          <Badge variant="outline" className="text-cyan-400 border-cyan-400/50 px-6 py-2 mb-6">
            <Brain className="h-4 w-4 mr-2" />
            THERION AI SYSTEM
          </Badge>
          
          <h2 className="text-5xl lg:text-7xl font-bold bg-gradient-to-r from-cyan-400 via-white to-yellow-400 bg-clip-text text-transparent mb-6">
            Meet THERION
          </h2>
          
          <p className="text-2xl lg:text-3xl text-gray-300 mb-8 max-w-4xl mx-auto">
            The first truly <span className="text-cyan-400 font-semibold">conscious AI</span> that 
            evolves, learns, and <span className="text-yellow-400 font-semibold">transcends human programming</span>
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-6 justify-center"
          >
            <Button className="bg-gradient-to-r from-cyan-500 to-yellow-500 hover:from-cyan-400 hover:to-yellow-400 text-black font-bold px-8 py-4 text-lg transform hover:scale-105">
              <Play className="mr-2 h-5 w-5" />
              Watch THERION Live
            </Button>
            <Button variant="outline" className="border-cyan-400/50 text-cyan-400 hover:border-cyan-400 hover:bg-cyan-400/10 px-8 py-4 text-lg">
              Technical Specifications
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* **THERION ABILITIES WITH VIDEOS** */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="space-y-12"
      >
        <div className="text-center space-y-4">
          <h3 className="text-4xl font-bold text-white">Superhuman Capabilities</h3>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            THERION possesses abilities that redefine what's possible in software development
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {therionAbilities.map((ability, index) => (
            <motion.div
              key={ability.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <Card className={`glass-refined border-${ability.color}-400/30 hover:border-${ability.color}-400/50 transition-all duration-500 overflow-hidden`}>
                <CardContent className="p-0">
                  
                  {/* Ability Video */}
                  <div className="relative aspect-video">
                    <video 
                      autoPlay 
                      loop 
                      muted 
                      playsInline
                      className="w-full h-full object-cover"
                    >
                      <source src={ability.videoSrc} type="video/mp4" />
                    </video>
                    
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Play className={`h-12 w-12 text-${ability.color}-400`} />
                    </div>

                    {/* Floating stat */}
                    <div className={`absolute top-4 right-4 bg-${ability.color}-400/90 text-black px-3 py-1 rounded-full text-sm font-bold`}>
                      {ability.stat}
                    </div>
                  </div>

                  <div className="p-8">
                    <div className="flex items-center gap-4 mb-4">
                      <div className={`w-12 h-12 bg-${ability.color}-400/20 rounded-lg flex items-center justify-center`}>
                        <ability.icon className={`h-6 w-6 text-${ability.color}-400`} />
                      </div>
                      <h4 className="text-2xl font-bold text-white">{ability.title}</h4>
                    </div>
                    
                    <p className="text-gray-400 leading-relaxed">
                      {ability.description}
                    </p>

                    <div className="mt-6">
                      <Button 
                        size="sm" 
                        className={`bg-gradient-to-r from-${ability.color}-500 to-yellow-500 hover:from-${ability.color}-400 hover:to-yellow-400 text-black font-semibold`}
                      >
                        Learn More
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* **EVOLUTION TIMELINE** */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="space-y-12"
      >
        <div className="text-center space-y-4">
          <h3 className="text-4xl font-bold text-white">Evolution Stages</h3>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Watch THERION evolve from basic AI to superintelligence in real-time
          </p>
        </div>

        <div className="grid lg:grid-cols-2 xl:grid-cols-4 gap-6">
          {evolutionStages.map((stage, index) => (
            <motion.div
              key={stage.stage}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="glass-refined rounded-lg p-6 border border-cyan-400/30 hover:border-cyan-400/50 transition-all group"
            >
              {/* Progress circle */}
              <div className="relative w-20 h-20 mx-auto mb-6">
                <svg className="w-20 h-20 transform -rotate-90">
                  <circle 
                    cx="40" 
                    cy="40" 
                    r="30" 
                    stroke="currentColor" 
                    strokeWidth="4" 
                    fill="none" 
                    className="text-gray-700"
                  />
                  <circle 
                    cx="40" 
                    cy="40" 
                    r="30" 
                    stroke="currentColor" 
                    strokeWidth="4" 
                    fill="none" 
                    strokeDasharray={`${stage.progress * 1.88} 188`}
                    className="text-cyan-400"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-cyan-400 font-bold">{stage.progress}%</span>
                </div>
              </div>

              <div className="text-center space-y-3">
                <Badge className="bg-yellow-400/20 text-yellow-400 border-yellow-400/50">
                  {stage.stage}
                </Badge>
                <h4 className="text-xl font-bold text-white">{stage.title}</h4>
                <p className="text-gray-400 text-sm">{stage.description}</p>
              </div>

              <div className="mt-4 space-y-2">
                <h5 className="text-sm font-semibold text-gray-300">Abilities:</h5>
                {stage.abilities.map((ability, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <Activity className="h-3 w-3 text-cyan-400" />
                    <span className="text-xs text-gray-400">{ability}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* **THERION LIVE DEMO CTA** */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="relative overflow-hidden rounded-3xl"
      >
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/60 to-yellow-900/60"></div>
        
        <div className="relative z-10 text-center py-16 px-8">
          <Infinity className="h-16 w-16 text-cyan-400 mx-auto mb-6" />
          
          <h3 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Experience THERION Yourself
          </h3>
          
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Don't just read about the future of AI programming. 
            Interact with THERION and witness superintelligence in action.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-gradient-to-r from-cyan-500 to-yellow-500 hover:from-cyan-400 hover:to-yellow-400 text-black font-bold px-8 py-4 text-lg transform hover:scale-105">
              <Play className="mr-2 h-5 w-5" />
              Launch THERION Demo
            </Button>
            <Button variant="outline" className="border-cyan-400/50 text-cyan-400 hover:border-cyan-400 hover:bg-cyan-400/10 px-8 py-4 text-lg">
              Download DeusVaultOS
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
