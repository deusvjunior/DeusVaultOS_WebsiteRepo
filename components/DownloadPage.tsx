import { motion } from 'framer-motion';
import {
    ArrowLeft,
    ArrowRight,
    CheckCircle,
    Clock,
    Download,
    Heart,
    Mail,
    Rocket,
    Shield,
    Star,
    Users,
    Zap
} from 'lucide-react';

interface DownloadPageProps {
  onBack: () => void;
}

export function DownloadPage({ onBack }: DownloadPageProps) {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/20 via-black to-yellow-900/20"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(0,255,255,0.1),transparent_50%)]"></div>
      
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 px-4 sm:px-6 lg:px-8 py-6"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-cyan-400 hover:text-white transition-colors group"
          >
            <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Back to Home</span>
          </button>
        </div>
      </motion.div>

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="relative z-10 px-4 sm:px-6 lg:px-8 py-16"
      >
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-3 glass-refined rounded-full px-6 py-3 border border-yellow-400/50">
            <Heart className="h-5 w-5 text-yellow-400 animate-pulse" />
            <span className="text-yellow-400 font-medium">Beta Access</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold bg-gradient-to-r from-cyan-400 via-white to-yellow-400 bg-clip-text text-transparent">
            Get Early Access
          </h1>
          
          <p className="text-xl sm:text-2xl text-gray-300 max-w-3xl mx-auto">
            Join our beta program and be among the first to experience DeusVaultOS. 
            <span className="text-cyan-400 font-semibold">Limited spots available</span> for our Q4 2025 launch.
          </p>
        </div>
      </motion.div>

      {/* The Honest Truth Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative z-10 px-4 sm:px-6 lg:px-8 py-16"
      >
        <div className="max-w-6xl mx-auto">
          <div className="glass-refined rounded-2xl p-8 sm:p-12 border border-cyan-400/30">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-8 text-center">
              Development Status
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-300">
                      <span className="text-yellow-400 font-semibold">Currently in development.</span> The full platform 
                      is being refined and tested to ensure quality and reliability.
                    </p>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-300">
                      <span className="text-cyan-400 font-semibold">Beta program available:</span> Get early access 
                      to preview features and provide feedback that shapes the final product.
                    </p>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-300">
                      <span className="text-green-400 font-semibold">Community feedback:</span> Join a community of developers 
                      helping to build the future of AI-powered development environments.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="text-center space-y-4">
                  <div className="text-6xl sm:text-8xl font-bold text-cyan-400">Q4</div>
                  <div className="text-xl text-gray-300">2025 Launch</div>
                  <p className="text-gray-400">
                    Get ready for the next generation of development tools.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* What You Get Now */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative z-10 px-4 sm:px-6 lg:px-8 py-16"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">What You Get Right Now</h2>
            <p className="text-xl text-gray-400">Early access perks that will make you feel like a VIP</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "AI Agent Beta",
                description: "Test drive 5 of our most powerful agents",
                icon: <Rocket className="h-8 w-8" />,
                perks: ["Code generation that actually works", "Debug assistance that finds real issues", "Performance optimization suggestions", "Direct line to our engineering team"]
              },
              {
                title: "VIP Community",
                description: "Join the inner circle of elite developers",
                icon: <Users className="h-8 w-8" />,
                perks: ["Monthly Q&A with founders", "Beta testing new features first", "Priority support (like, actual humans)", "Networking with industry leaders"]
              },
              {
                title: "Launch Guarantee", 
                description: "Lock in your spot for the full release",
                icon: <Star className="h-8 w-8" />,
                perks: ["Guaranteed early access to full OS", "Special launch pricing (50% off)", "Your feedback shapes the product", "Lifetime updates included"]
              }
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass-refined rounded-xl p-6 border border-cyan-400/30 hover:border-cyan-400/50 transition-colors group"
              >
                <div className="text-cyan-400 mb-4 group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-gray-400 mb-4">{item.description}</p>
                <ul className="space-y-2">
                  {item.perks.map((perk, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-300">{perk}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Sign Up Form */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative z-10 px-4 sm:px-6 lg:px-8 py-16"
      >
        <div className="max-w-2xl mx-auto">
          <div className="glass-refined rounded-2xl p-8 border border-yellow-400/30">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">Ready to Change Everything?</h2>
              <p className="text-gray-300">
                Join <span className="text-yellow-400 font-semibold">10,247</span> developers 
                who are already part of the future.
              </p>
            </div>
            
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="your.email@company.com"
                  className="w-full px-4 py-3 bg-black/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none transition-colors"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  What do you build? (Optional)
                </label>
                <select className="w-full px-4 py-3 bg-black/50 border border-gray-600 rounded-lg text-white focus:border-cyan-400 focus:outline-none transition-colors">
                  <option value="">Select your focus...</option>
                  <option value="web">Web Applications</option>
                  <option value="mobile">Mobile Apps</option>
                  <option value="ai">AI/ML Projects</option>
                  <option value="devops">DevOps/Infrastructure</option>
                  <option value="other">Something Else Amazing</option>
                </select>
              </div>
              
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-cyan-500 to-yellow-500 text-black font-bold py-4 rounded-lg hover:from-cyan-400 hover:to-yellow-400 transition-all transform hover:scale-105 shadow-xl hover:shadow-cyan-500/25"
              >
                <span className="flex items-center justify-center gap-2">
                  <Mail className="h-5 w-5" />
                  Count Me In
                  <ArrowRight className="h-4 w-4" />
                </span>
              </button>
              
              <p className="text-xs text-gray-400 text-center">
                No spam, ever. Unsubscribe with one click. We respect developers too much for BS.
              </p>
            </form>
          </div>
        </div>
      </motion.div>

      {/* Social Proof */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative z-10 px-4 sm:px-6 lg:px-8 py-16"
      >
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="text-2xl font-bold text-white mb-8">Developers Are Already Talking</h3>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: "Finally, AI that doesn't make me want to throw my laptop out the window.",
                author: "Sarah Chen",
                role: "Senior Dev @ Stripe"
              },
              {
                quote: "I've been coding for 15 years. This is the first time I'm genuinely excited about AI tooling.",
                author: "Marcus Rodriguez", 
                role: "Tech Lead @ Netflix"
              },
              {
                quote: "The beta agents saved me 6 hours on a complex refactor. I'm not even kidding.",
                author: "Alex Kim",
                role: "Founder @ TechStartup"
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass-refined rounded-lg p-6 border border-gray-600"
              >
                <p className="text-gray-300 mb-4 italic">"{testimonial.quote}"</p>
                <div>
                  <div className="font-semibold text-white">{testimonial.author}</div>
                  <div className="text-sm text-gray-400">{testimonial.role}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}