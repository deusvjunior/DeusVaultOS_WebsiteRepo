import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { 
  Check, 
  X, 
  Crown, 
  Zap, 
  AlertTriangle, 
  Shield,
  Brain,
  Infinity,
  Target,
  Star,
  ChevronRight,
  Globe
} from "lucide-react";
import { motion } from "framer-motion";

export function ComparisonSection() {
  const comparisons = [
    {
      category: "AI Intelligence",
      deusVault: "Self-evolving THERION Protocol",
      openDan: "Basic task automation",
      advantage: "Neural vs scripted",
      icon: <Brain className="h-5 w-5" />
    },
    {
      category: "Development Focus",
      deusVault: "Professional development environment",
      openDan: "Personal AI assistant only",
      advantage: "Enterprise vs consumer",
      icon: <Target className="h-5 w-5" />
    },
    {
      category: "Environment Management",
      deusVault: "Unlimited parallel environments",
      openDan: "Single container limitation",
      advantage: "Scalable vs restricted",
      icon: <Infinity className="h-5 w-5" />
    },
    {
      category: "Platform Coverage",
      deusVault: "Universal platform support",
      openDan: "Limited platform scope",
      advantage: "Complete vs partial",
      icon: <Globe className="h-5 w-5" />
    },
    {
      category: "Game Development",
      deusVault: "Professional gaming tools",
      openDan: "No game development support",
      advantage: "Full suite vs none",
      icon: <Star className="h-5 w-5" />
    },
    {
      category: "Setup Complexity",
      deusVault: "Zero configuration required",
      openDan: "Manual setup and maintenance",
      advantage: "Instant vs complex",
      icon: <Zap className="h-5 w-5" />
    }
  ];

  const openDanLimitations = [
    {
      title: "Limited Scope",
      description: "Focuses on personal AI agents rather than professional development environments",
      impact: "Not suitable for professional software development workflows"
    },
    {
      title: "Static System",
      description: "No learning capabilities or evolution over time",
      impact: "Cannot adapt to user needs or improve performance"
    },
    {
      title: "Platform Restrictions",
      description: "Limited to specific platforms and use cases",
      impact: "Cannot provide universal development environment"
    },
    {
      title: "No Development Tools",
      description: "Lacks professional development environment features",
      impact: "Requires separate tools and complex setup"
    }
  ];

  return (
    <section className="section-spacing bg-gradient-to-b from-brand-neutral-900 to-brand-neutral-950">
      <div className="content-container">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <Badge className="glass-morphism refined-border px-6 py-3 text-sm font-medium mb-8">
            <AlertTriangle className="h-4 w-4 mr-3 text-brand-primary" />
            Competitive Analysis
          </Badge>
          
          <h2 className="text-hero text-white mb-6">
            Deus Vault vs OpenDan.ai
          </h2>
          
          <p className="text-subtitle text-brand-neutral-300 max-w-4xl mx-auto">
            A comprehensive comparison of professional development environments.
          </p>
        </motion.div>

        {/* OpenDan Limitations */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h3 className="text-title text-white mb-12 text-center">
            OpenDan.ai Limitations
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            {openDanLimitations.map((limitation, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="glass-morphism refined-border h-full">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-2 rounded-lg bg-red-500/20 text-red-400 flex-shrink-0">
                        <X className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="text-body font-semibold text-white mb-3">
                          {limitation.title}
                        </h4>
                        <p className="text-caption text-brand-neutral-300 mb-3 leading-relaxed">
                          {limitation.description}
                        </p>
                        <p className="text-caption text-red-400">
                          <strong>Impact:</strong> {limitation.impact}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Head-to-Head Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h3 className="text-title text-white mb-12 text-center">
            Feature Comparison
          </h3>
          
          <Card className="glass-morphism refined-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-brand-neutral-800">
                    <th className="text-left p-6 text-brand-neutral-300 font-medium">Feature</th>
                    <th className="text-center p-6 bg-brand-primary/5">
                      <div className="flex items-center justify-center gap-2">
                        <Crown className="h-5 w-5 text-brand-primary" />
                        <span className="brand-text font-semibold">Deus Vault</span>
                      </div>
                    </th>
                    <th className="text-center p-6 bg-red-500/5">
                      <div className="flex items-center justify-center gap-2">
                        <AlertTriangle className="h-5 w-5 text-red-400" />
                        <span className="text-red-300 font-semibold">OpenDan.ai</span>
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
                      className="border-b border-brand-neutral-800 hover:bg-brand-neutral-900/50 transition-colors"
                    >
                      <td className="p-6">
                        <div className="flex items-center gap-3">
                          <div className="text-brand-primary">
                            {comp.icon}
                          </div>
                          <span className="text-white font-medium">{comp.category}</span>
                        </div>
                      </td>
                      
                      <td className="p-6 bg-brand-primary/5">
                        <div className="text-center">
                          <div className="flex items-center justify-center gap-2 mb-2">
                            <div className="p-1 bg-green-500/20 rounded-full">
                              <Check className="h-4 w-4 text-green-400" />
                            </div>
                            <span className="text-green-300 font-medium">{comp.deusVault}</span>
                          </div>
                          <Badge className="bg-brand-primary/20 text-brand-primary border-brand-primary/30 text-xs">
                            {comp.advantage}
                          </Badge>
                        </div>
                      </td>
                      
                      <td className="p-6 bg-red-500/5">
                        <div className="text-center">
                          <div className="flex items-center justify-center gap-2">
                            <div className="p-1 bg-red-500/20 rounded-full">
                              <X className="h-4 w-4 text-red-400" />
                            </div>
                            <span className="text-red-300">{comp.openDan}</span>
                          </div>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </motion.div>

        {/* The Verdict */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center glass-morphism refined-border rounded-2xl p-12"
        >
          <h3 className="text-title text-white mb-12">
            The Clear Choice
          </h3>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="text-6xl font-bold brand-text mb-4">100%</div>
              <div className="text-brand-neutral-300 font-medium">Professional Focus</div>
            </div>
            <div className="text-center">
              <div className="text-6xl font-bold text-green-400 mb-4">∞</div>
              <div className="text-brand-neutral-300 font-medium">Development Power</div>
            </div>
            <div className="text-center">
              <div className="text-6xl font-bold text-red-400 mb-4">0</div>
              <div className="text-brand-neutral-300 font-medium">Setup Complexity</div>
            </div>
          </div>
          
          <div className="max-w-4xl mx-auto mb-12">
            <p className="text-body text-brand-neutral-300 mb-6 leading-relaxed">
              While OpenDan.ai serves as a basic personal assistant, Deus Vault provides a complete professional development environment. The choice is clear for serious developers.
            </p>
          </div>
          
          <Button 
            size="lg"
            className="brand-gradient text-white border-0 px-12 py-6 text-lg font-medium shadow-2xl hover:shadow-brand-primary/25 interactive-element focus-ring"
          >
            <Crown className="mr-3 h-6 w-6" />
            Choose Deus Vault
            <ChevronRight className="ml-3 h-6 w-6" />
          </Button>
        </motion.div>

      </div>
    </section>
  );
}