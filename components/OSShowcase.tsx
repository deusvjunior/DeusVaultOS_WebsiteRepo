import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { InteractiveElement } from './InteractiveElement';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { 
  Play, 
  Maximize2, 
  Terminal, 
  Code, 
  Gamepad2, 
  Brain,
  Monitor,
  Eye
} from 'lucide-react';

export function OSShowcase() {
  const [activeDemo, setActiveDemo] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const demos = [
    {
      title: "Parallel Development Matrix",
      description: "Run unlimited coding environments simultaneously",
      icon: <Code className="h-6 w-6" />,
      color: "from-cyan-500 to-yellow-500",
      mockup: "desktop-coding"
    },
    {
      title: "THERION AI Command Center", 
      description: "Your AI agents working in real-time",
      icon: <Brain className="h-6 w-6" />,
      color: "from-yellow-500 to-cyan-500",
      mockup: "ai-dashboard"
    },
    {
      title: "Game Development Suite",
      description: "Professional game creation tools",
      icon: <Gamepad2 className="h-6 w-6" />,
      color: "from-cyan-400 to-yellow-400", 
      mockup: "game-studio"
    },
    {
      title: "Neural Interface",
      description: "Direct brain-computer interaction",
      icon: <Eye className="h-6 w-6" />,
      color: "from-yellow-400 to-cyan-400",
      mockup: "neural-interface"
    }
  ];

  useEffect(() => {
    let interval: ReturnType<typeof setTimeout>;
    if (isPlaying) {
      interval = setInterval(() => {
        setActiveDemo(prev => (prev + 1) % demos.length);
      }, 4000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, demos.length]);

  const MockupWindow = ({ type, title, children }: { type: string, title: string, children: React.ReactNode }) => (
    <div className="bg-gray-900/90 backdrop-blur-md rounded-lg border border-gray-700/50 overflow-hidden shadow-2xl">
      {/* Window Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-800/50 border-b border-gray-700/50">
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            <div className="w-3 h-3 bg-cyan-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-cyan-400 rounded-full"></div>
          </div>
          <span className="text-gray-300 text-sm ml-2">{title}</span>
        </div>
        <div className="flex items-center gap-2">
          <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
            <Maximize2 className="h-3 w-3" />
          </Button>
        </div>
      </div>
      {/* Window Content */}
      <div className="p-0">
        {children}
      </div>
    </div>
  );

  const renderMockup = (type: string) => {
    switch (type) {
      case "desktop-coding":
        return (
          <div className="grid grid-cols-2 gap-2 p-4 min-h-[400px]">
            <MockupWindow type="vscode" title="VSCode - React Project">
              <div className="p-4 space-y-2 bg-gray-900 text-sm">
                <div className="flex items-center gap-2 text-cyan-400">
                  <span className="text-yellow-400">import</span>
                  <span className="text-cyan-300">React</span>
                  <span className="text-yellow-400">from</span>
                  <span className="text-yellow-400">'react'</span>
                </div>
                <div className="flex items-center gap-2 text-blue-400">
                  <span className="text-purple-400">import</span>
                  <span className="text-green-400">{'{ useState }'}</span>
                  <span className="text-purple-400">from</span>
                  <span className="text-yellow-400">'react'</span>
                </div>
                <div className="mt-4 space-y-1">
                  <div className="text-purple-400">function <span className="text-blue-400">App</span>() {'{'}</div>
                  <div className="ml-4 text-blue-400">const [count, setCount] = <span className="text-green-400">useState</span>(0);</div>
                  <div className="ml-4 text-purple-400">return (</div>
                  <div className="ml-8 text-gray-300">&lt;<span className="text-red-400">div</span>&gt;</div>
                  <div className="ml-12 text-gray-300">&lt;<span className="text-red-400">h1</span>&gt;Count: {'{count}'}&lt;/<span className="text-red-400">h1</span>&gt;</div>
                  <div className="ml-8 text-gray-300">&lt;/<span className="text-red-400">div</span>&gt;</div>
                  <div className="ml-4 text-purple-400">);</div>
                  <div className="text-purple-400">{'}'}</div>
                </div>
                <div className="flex gap-2 mt-4">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-green-400 text-xs">Live Reload Active</span>
                </div>
              </div>
            </MockupWindow>
            
            <MockupWindow type="terminal" title="Terminal - System Monitor">
              <div className="p-4 bg-black text-green-400 text-sm">
                <div>$ htop</div>
                <div className="mt-2 space-y-1">
                  <div>CPU: [||||||||||||||||||||||||||||] 97%</div>
                  <div>RAM: [||||||||||||||||--------] 65%</div>
                  <div>GPU: [||||||||||||||||||||||||] 89%</div>
                  <div className="text-cyan-400">THERION Agents Active: 5</div>
                  <div className="text-purple-400">Parallel VSCode Instances: 8</div>
                  <div className="text-yellow-400">Active Projects: 12</div>
                </div>
              </div>
            </MockupWindow>
            
            <MockupWindow type="vscode" title="VSCode - Python AI">
              <div className="p-4 space-y-2 bg-gray-900 text-sm">
                <div className="text-orange-400"># AI Model Training</div>
                <div className="flex items-center gap-2">
                  <span className="text-purple-400">import</span>
                  <span className="text-green-400">tensorflow</span>
                  <span className="text-purple-400">as</span>
                  <span className="text-blue-400">tf</span>
                </div>
                <div className="mt-4 space-y-1">
                  <div className="text-blue-400">model = tf.keras.Sequential([</div>
                  <div className="ml-4 text-green-400">tf.keras.layers.Dense(128, activation='relu'),</div>
                  <div className="ml-4 text-green-400">tf.keras.layers.Dropout(0.2),</div>
                  <div className="ml-4 text-green-400">tf.keras.layers.Dense(10)</div>
                  <div className="text-blue-400">])</div>
                </div>
                <div className="mt-4 p-2 bg-gray-800 rounded text-xs">
                  <div className="text-green-400">Training Progress: 89%</div>
                  <div className="w-full bg-gray-700 rounded-full h-1 mt-1">
                    <div className="bg-green-500 h-1 rounded-full" style={{width: '89%'}}></div>
                  </div>
                </div>
              </div>
            </MockupWindow>
            
            <MockupWindow type="browser" title="Chrome - Live Preview">
              <div className="p-4 bg-white text-black">
                <div className="space-y-4">
                  <div className="text-center">
                    <h1 className="text-2xl text-purple-600">My App</h1>
                    <p className="text-gray-600">Built with Deus Vault</p>
                  </div>
                  <div className="flex justify-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white text-2xl">
                      0
                    </div>
                  </div>
                  <div className="flex justify-center gap-4">
                    <button className="px-4 py-2 bg-blue-500 text-white rounded">+</button>
                    <button className="px-4 py-2 bg-red-500 text-white rounded">-</button>
                  </div>
                </div>
              </div>
            </MockupWindow>
          </div>
        );
      
      case "ai-dashboard":
        return (
          <div className="p-4 min-h-[400px] bg-gradient-to-br from-purple-900/20 to-blue-900/20">
            <div className="grid grid-cols-3 gap-4 h-full">
              <div className="col-span-2 space-y-4">
                <div className="bg-black/50 rounded-lg p-4 border border-purple-500/30">
                  <h3 className="text-purple-400 mb-3">THERION Command Center</h3>
                  <div className="space-y-2">
                    {['System Architect', 'Security Guardian', 'Performance Optimizer', 'AI Assistant', 'Neural Interface'].map((agent, i) => (
                      <div key={i} className="flex items-center justify-between p-2 bg-gray-800/50 rounded">
                        <span className="text-white text-sm">{agent}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                          <span className="text-green-400 text-xs">ACTIVE</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="bg-black/50 rounded-lg p-4 border border-blue-500/30">
                  <h3 className="text-blue-400 mb-3">Real-time Analytics</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-2xl text-green-400">28.97x</div>
                      <div className="text-xs text-gray-400">Intelligence Multiplier</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl text-purple-400">∞</div>
                      <div className="text-xs text-gray-400">Processing Power</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="bg-black/50 rounded-lg p-4 border border-yellow-500/30">
                  <h3 className="text-yellow-400 mb-3">System Status</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-xs text-gray-400">CPU</span>
                      <span className="text-green-400 text-xs">Optimal</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-xs text-gray-400">Memory</span>
                      <span className="text-green-400 text-xs">Efficient</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-xs text-gray-400">Security</span>
                      <span className="text-green-400 text-xs">Fortified</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-black/50 rounded-lg p-4 border border-cyan-500/30">
                  <h3 className="text-cyan-400 mb-3">Learning Progress</h3>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-cyan-500 h-2 rounded-full animate-pulse" style={{width: '87%'}}></div>
                  </div>
                  <div className="text-xs text-gray-400 mt-1">87% - Continuously Evolving</div>
                </div>
              </div>
            </div>
          </div>
        );
      
      case "game-studio":
        return (
          <div className="p-4 min-h-[400px] bg-gradient-to-br from-green-900/20 to-emerald-900/20">
            <div className="grid grid-cols-4 gap-4 h-full">
              <div className="col-span-3">
                <div className="bg-black/70 rounded-lg h-full p-4 border border-green-500/30">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-green-400">3D Game Viewport</h3>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="border-green-500/50 text-green-400">
                        <Play className="h-3 w-3 mr-1" />
                        Play
                      </Button>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 rounded h-64 flex items-center justify-center border border-green-500/20">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-4 mx-auto">
                        <Gamepad2 className="h-8 w-8 text-green-400" />
                      </div>
                      <div className="text-green-400">3D Scene Rendering</div>
                      <div className="text-xs text-gray-400">60 FPS | Real-time lighting</div>
                    </div>
                  </div>
                  
                  <div className="mt-4 grid grid-cols-3 gap-2 text-xs">
                    <div className="bg-gray-800/50 p-2 rounded">
                      <div className="text-green-400">Triangles: 2.4M</div>
                    </div>
                    <div className="bg-gray-800/50 p-2 rounded">
                      <div className="text-blue-400">Shaders: 127</div>
                    </div>
                    <div className="bg-gray-800/50 p-2 rounded">
                      <div className="text-purple-400">Objects: 1,847</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="bg-black/50 rounded-lg p-3 border border-green-500/30">
                  <h4 className="text-green-400 text-sm mb-2">Scene Hierarchy</h4>
                  <div className="space-y-1 text-xs">
                    <div className="text-white">🌍 World</div>
                    <div className="text-gray-400 ml-2">📦 Player</div>
                    <div className="text-gray-400 ml-2">🏠 Buildings</div>
                    <div className="text-gray-400 ml-2">🌳 Environment</div>
                    <div className="text-gray-400 ml-2">💡 Lighting</div>
                  </div>
                </div>
                
                <div className="bg-black/50 rounded-lg p-3 border border-emerald-500/30">
                  <h4 className="text-emerald-400 text-sm mb-2">Assets</h4>
                  <div className="grid grid-cols-2 gap-1 text-xs">
                    <div className="bg-gray-800/50 p-1 rounded text-center">🎮 Models</div>
                    <div className="bg-gray-800/50 p-1 rounded text-center">🎨 Textures</div>
                    <div className="bg-gray-800/50 p-1 rounded text-center">🔊 Audio</div>
                    <div className="bg-gray-800/50 p-1 rounded text-center">✨ Effects</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      
      case "neural-interface":
        return (
          <div className="p-4 min-h-[400px] bg-gradient-to-br from-orange-900/20 to-red-900/20">
            <div className="text-center">
              <div className="relative">
                <div className="w-32 h-32 mx-auto mb-6 relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-red-500 rounded-full animate-pulse"></div>
                  <div className="absolute inset-2 bg-black rounded-full flex items-center justify-center">
                    <Eye className="h-12 w-12 text-orange-400 animate-pulse" />
                  </div>
                  <div className="absolute inset-0 border-2 border-orange-500/30 rounded-full animate-spin"></div>
                </div>
                
                <h3 className="text-2xl text-orange-400 mb-2">Neural Interface Active</h3>
                <p className="text-gray-400 mb-6">Direct brain-computer communication established</p>
                
                <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                  <div className="bg-black/50 p-4 rounded-lg border border-orange-500/30">
                    <div className="text-orange-400 text-xl">127</div>
                    <div className="text-xs text-gray-400">Thoughts/min</div>
                  </div>
                  <div className="bg-black/50 p-4 rounded-lg border border-red-500/30">
                    <div className="text-red-400 text-xl">98.7%</div>
                    <div className="text-xs text-gray-400">Sync Rate</div>
                  </div>
                </div>
                
                <div className="mt-6 space-y-2">
                  <div className="bg-black/30 p-3 rounded-lg border border-orange-500/20">
                    <div className="text-orange-300 text-sm">💭 "Create a new React component"</div>
                    <div className="text-xs text-gray-500 mt-1">→ Executing in VSCode...</div>
                  </div>
                  <div className="bg-black/30 p-3 rounded-lg border border-red-500/20">
                    <div className="text-red-300 text-sm">💡 "Optimize database queries"</div>
                    <div className="text-xs text-gray-500 mt-1">→ AI analyzing...</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      
      default:
        return <div className="p-8 text-center text-gray-400">Demo not found</div>;
    }
  };

  return (
    <section className="py-24 bg-gradient-to-b from-black via-purple-900/10 to-black relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <InteractiveElement id="os-showcase-header" className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Badge className="mb-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 text-lg">
              <Monitor className="h-5 w-5 mr-2" />
              Live OS Demo
            </Badge>
            <h2 className="text-4xl md:text-6xl mb-6 bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
              See Deus Vault in Action
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              This isn't just a concept - it's your new reality. Watch the OS that thinks, learns, and evolves.
            </p>
          </motion.div>
        </InteractiveElement>

        {/* Demo Controls */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {demos.map((demo, index) => (
            <InteractiveElement key={index} id={`demo-${index}`} xpReward={20}>
              <motion.button
                className={`flex items-center gap-3 px-6 py-3 rounded-lg border transition-all duration-300 ${
                  activeDemo === index
                    ? `bg-gradient-to-r ${demo.color} border-transparent text-white shadow-lg`
                    : 'bg-black/30 border-gray-600/50 text-gray-300 hover:border-gray-500/70'
                }`}
                onClick={() => setActiveDemo(index)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className={`p-2 rounded ${activeDemo === index ? 'bg-white/20' : 'bg-gray-700/50'}`}>
                  {demo.icon}
                </div>
                <div className="text-left">
                  <div className="text-sm">{demo.title}</div>
                  <div className="text-xs opacity-80">{demo.description}</div>
                </div>
              </motion.button>
            </InteractiveElement>
          ))}
        </div>

        {/* Play Controls */}
        <div className="flex justify-center gap-4 mb-8">
          <InteractiveElement id="demo-play-control" xpReward={15}>
            <Button
              onClick={() => setIsPlaying(!isPlaying)}
              className={`px-6 py-3 ${isPlaying ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'}`}
            >
              <Play className="h-4 w-4 mr-2" />
              {isPlaying ? 'Pause Demo' : 'Auto Play'}
            </Button>
          </InteractiveElement>
        </div>

        {/* Main Demo Window */}
        <InteractiveElement id={`active-demo-${activeDemo}`} xpReward={40}>
          <Card className="max-w-7xl mx-auto bg-black/70 backdrop-blur-md border-purple-500/30 shadow-2xl overflow-hidden">
            <CardContent className="p-0">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeDemo}
                  initial={{ opacity: 0, x: 300 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -300 }}
                  transition={{ duration: 0.5, type: "spring" }}
                  className="min-h-[500px]"
                >
                  {renderMockup(demos[activeDemo].mockup)}
                </motion.div>
              </AnimatePresence>
            </CardContent>
          </Card>
        </InteractiveElement>

        {/* Live Stats */}
        <InteractiveElement id="os-stats" xpReward={25} className="mt-16">
          <div className="bg-gradient-to-r from-purple-600/10 to-blue-600/10 backdrop-blur-md rounded-2xl p-8 border border-purple-500/20">
            <div className="text-center mb-8">
              <h3 className="text-2xl text-white mb-4">Live System Performance</h3>
              <p className="text-gray-300">Real metrics from active Deus Vault instances</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <motion.div whileHover={{ scale: 1.1 }}>
                <div className="text-4xl text-green-400 mb-2">99.97%</div>
                <div className="text-green-200 text-sm">Uptime</div>
                <div className="w-2 h-2 bg-green-500 rounded-full mx-auto mt-2 animate-pulse"></div>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.1 }}>
                <div className="text-4xl text-blue-400 mb-2">2.3ms</div>
                <div className="text-blue-200 text-sm">Response Time</div>
                <div className="w-2 h-2 bg-blue-500 rounded-full mx-auto mt-2 animate-pulse"></div>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.1 }}>
                <div className="text-4xl text-purple-400 mb-2">847</div>
                <div className="text-purple-200 text-sm">Active Users</div>
                <div className="w-2 h-2 bg-purple-500 rounded-full mx-auto mt-2 animate-pulse"></div>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.1 }}>
                <div className="text-4xl text-yellow-400 mb-2">12.4k</div>
                <div className="text-yellow-200 text-sm">Projects Built</div>
                <div className="w-2 h-2 bg-yellow-500 rounded-full mx-auto mt-2 animate-pulse"></div>
              </motion.div>
            </div>
          </div>
        </InteractiveElement>
      </div>
    </section>
  );
}