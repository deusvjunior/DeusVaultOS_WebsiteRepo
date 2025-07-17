import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { 
  Check, 
  X, 
  Crown, 
  Zap, 
  Clock,
  Brain,
  Infinity,
  Shield,
  Sparkles,
  ArrowRight,
  AlertTriangle
} from "lucide-react";
import { motion } from "framer-motion";

export function MicrosoftComparisonSection() {
  const comparisons = [
    {
      category: "Setup Time",
      microsoft: "Hours of configuration",
      deusVault: "Zero configuration required",
      advantage: "50x faster setup",
      icon: <Clock className="h-5 w-5" />
    },
    {
      category: "AI Integration",
      microsoft: "Limited Copilot features",
      deusVault: "Full THERION AI ecosystem",
      advantage: "Complete AI workflow",
      icon: <Brain className="h-5 w-5" />
    },
    {
      category: "Platform Support",
      microsoft: "Windows-centric",
      deusVault: "Universal platform support",
      advantage: "True cross-platform",
      icon: <Infinity className="h-5 w-5" />
    },
    {
      category: "Development Tools",
      microsoft: "Separate installations",
      deusVault: "Everything pre-configured",
      advantage: "Complete environment",
      icon: <Zap className="h-5 w-5" />
    },
    {
      category: "Performance",
      microsoft: "Resource intensive",
      deusVault: "Optimized for speed",
      advantage: "60% faster builds",
      icon: <Sparkles className="h-5 w-5" />
    },
    {
      category: "Cost Model",
      microsoft: "Expensive subscriptions",
      deusVault: "Free with earning potential",
      advantage: "Earn while you code",
      icon: <Crown className="h-5 w-5" />
    }
  ];

  const microsoftPainPoints = [
    {
      title: "Complex Setup Process",
      description: "Hours spent configuring Visual Studio, installing SDKs, and setting up development environments",
      impact: "Productivity lost before you even start coding",
      severity: "high"
    },
    {
      title: "Platform Lock-in",
      description: "Primarily Windows-focused with limited cross-platform development capabilities",
      impact: "Restricts your deployment options and target audience",
      severity: "high"
    },
    {
      title: "Expensive Licensing",
      description: "Professional features require expensive Visual Studio subscriptions",
      impact: "High ongoing costs for professional development teams",
      severity: "medium"
    },
    {
      title: "Limited AI Integration",
      description: "Copilot is just basic autocompletion, not a complete AI development partner",
      impact: "Missing out on true AI-powered development acceleration",
      severity: "medium"
    }
  ];

  const deusVaultAdvantages = [
    "Zero configuration - ready to code in seconds",
    "Universal platform support out of the box",
    "Complete AI development partner, not just autocomplete",
    "Free to use with potential to earn tokens",
    "No vendor lock-in - true open ecosystem",
    "Enterprise-grade performance from day one"
  ];

  const handleChooseDeus = () => {
    window.open('https://deusvault.com/download', '_blank');
  };

  const handleLearnMore = () => {
    window.open('https://docs.deusvault.com/vs-microsoft', '_blank');
  };

  return (
    <section className="section-premium bg-gradient-to-b from-brand-neutral-950 to-brand-neutral-900 relative">
      
      {/* Background Effects */}
      <div className="absolute inset-0 bg-neural-grid opacity-10" />
      
      <div className="content-wrapper relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <Badge className="glass-premium px-8 py-4 font-caption mb-8">
            <AlertTriangle className="h-5 w-5 mr-3 text-brand-primary" />
            Why Developers Are Switching
          </Badge>
          
          <h2 className="font-hero text-premium-white mb-8">
            Deus Vault vs <span className="text-red-400">Microsoft</span>
          </h2>
          
          <p className="font-subtitle text-premium-muted max-w-4xl mx-auto">
            Compare the traditional Microsoft development experience with Deus Vault's 
            AI-powered, zero-configuration approach.
          </p>
        </motion.div>

        {/* Microsoft Pain Points */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h3 className="font-title text-premium-white text-center mb-12">
            Microsoft Development Challenges
          </h3>
          
          <div className="grid md:grid-cols-2 gap-8">
            {microsoftPainPoints.map((pain, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="card-premium h-full border-red-500/20">
                  <CardContent className="p-8">
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-xl flex-shrink-0 ${
                        pain.severity === 'high' 
                          ? 'bg-red-500/20 text-red-400' 
                          : 'bg-orange-500/20 text-orange-400'
                      }`}>
                        <X className="h-6 w-6" />
                      </div>
                      <div>
                        <h4 className="font-subtitle text-premium-white mb-4">
                          {pain.title}
                        </h4>
                        <p className="font-body-sm text-premium-muted mb-4 leading-relaxed">
                          {pain.description}
                        </p>
                        <div className="glass-premium rounded-lg p-3">
                          <p className="font-body-sm text-red-400 font-medium">
                            <strong>Impact:</strong> {pain.impact}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Direct Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h3 className="font-title text-premium-white text-center mb-12">
            Feature-by-Feature Comparison
          </h3>
          
          <Card className="card-premium overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-brand-neutral-700">
                    <th className="text-left p-6 font-subtitle text-premium-muted">Feature</th>
                    <th className="text-center p-6 bg-red-500/5">
                      <div className="flex items-center justify-center gap-3">
                        <div className="w-8 h-8 bg-red-500/20 rounded-lg flex items-center justify-center">
                          <span className="text-red-400 font-bold text-sm">MS</span>
                        </div>
                        <span className="font-subtitle text-red-300">Microsoft</span>
                      </div>
                    </th>
                    <th className="text-center p-6 bg-brand-primary/5">
                      <div className="flex items-center justify-center gap-3">
                        <Crown className="h-6 w-6 text-brand-primary" />
                        <span className="font-subtitle text-brand-gradient">Deus Vault</span>
                      </div>
                    </th>
                  </tr>
                </thead>
                
                <tbody>
                  {comparisons.map((comp, index) => (
                    <motion.tr
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="border-b border-brand-neutral-800 hover:bg-brand-neutral-900/30 transition-colors"
                    >
                      <td className="p-6">
                        <div className="flex items-center gap-4">
                          <div className="text-brand-primary">
                            {comp.icon}
                          </div>
                          <span className="font-body text-premium-white">{comp.category}</span>
                        </div>
                      </td>
                      
                      <td className="p-6 bg-red-500/5">
                        <div className="text-center">
                          <div className="flex items-center justify-center gap-3 mb-2">
                            <div className="p-1 bg-red-500/20 rounded-full">
                              <X className="h-4 w-4 text-red-400" />
                            </div>
                            <span className="font-body-sm text-red-300">{comp.microsoft}</span>
                          </div>
                        </div>
                      </td>
                      
                      <td className="p-6 bg-brand-primary/5">
                        <div className="text-center">
                          <div className="flex items-center justify-center gap-3 mb-2">
                            <div className="p-1 bg-green-500/20 rounded-full">
                              <Check className="h-4 w-4 text-green-400" />
                            </div>
                            <span className="font-body-sm text-green-300">{comp.deusVault}</span>
                          </div>
                          <Badge className="brand-gradient-premium text-white font-medium text-xs px-3 py-1">
                            {comp.advantage}
                          </Badge>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </motion.div>

        {/* Why Choose Deus Vault */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center card-premium rounded-3xl p-12"
        >
          <h3 className="font-title text-premium-white mb-12">
            The Modern Developer's Choice
          </h3>
          
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              {deusVaultAdvantages.map((advantage, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-4 glass-premium rounded-xl p-4"
                >
                  <div className="p-2 bg-green-500/20 rounded-lg">
                    <Check className="h-5 w-5 text-green-400" />
                  </div>
                  <span className="font-body text-premium-white">{advantage}</span>
                </motion.div>
              ))}
            </div>
          </div>
          
          <div className="text-center mb-12">
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div>
                <div className="font-hero text-brand-primary mb-2">10x</div>
                <div className="font-body text-premium-muted">Faster Setup</div>
              </div>
              <div>
                <div className="font-hero text-green-400 mb-2">$0</div>
                <div className="font-body text-premium-muted">Monthly Cost</div>
              </div>
              <div>
                <div className="font-hero text-brand-accent mb-2">∞</div>
                <div className="font-body text-premium-muted">Platforms</div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button 
              onClick={handleChooseDeus}
              className="button-premium text-white px-12 py-6 font-subtitle interactive-premium focus-premium"
            >
              <Crown className="mr-3 h-6 w-6" />
              Switch to Deus Vault
              <ArrowRight className="ml-3 h-6 w-6" />
            </Button>
            
            <Button 
              variant="outline"
              onClick={handleLearnMore}
              className="glass-premium text-premium-white px-12 py-6 font-subtitle interactive-premium focus-premium"
            >
              <Sparkles className="mr-3 h-6 w-6" />
              See Full Comparison
            </Button>
          </div>
        </motion.div>

      </div>
    </section>
  );
}