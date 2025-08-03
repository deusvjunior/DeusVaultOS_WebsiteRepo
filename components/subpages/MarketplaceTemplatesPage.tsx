import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Download, Files, Folder, Layout, Package, Play, Star } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';

interface MarketplaceTemplatesPageProps {
  onBack: () => void;
}

export function MarketplaceTemplatesPage({ onBack }: MarketplaceTemplatesPageProps) {
  const featuredTemplates = [
    {
      name: "AI-Powered SaaS Starter",
      description: "Complete SaaS template with AI integration, authentication, and payment processing",
      icon: <Layout className="h-8 w-8 text-blue-400" />,
      rating: 4.9,
      downloads: "125K",
      tech: ["React", "TypeScript", "Supabase", "Stripe", "OpenAI"],
      features: ["User Authentication", "Payment Integration", "AI Chat", "Admin Dashboard"],
      price: "Free",
      category: "SaaS"
    },
    {
      name: "E-commerce AI Assistant",
      description: "Modern e-commerce platform with intelligent product recommendations",
      icon: <Package className="h-8 w-8 text-green-400" />,
      rating: 4.8,
      downloads: "98K",
      tech: ["Next.js", "Prisma", "PostgreSQL", "Redis", "TensorFlow"],
      features: ["Product Catalog", "AI Recommendations", "Order Management", "Analytics"],
      price: "Free",
      category: "E-commerce"
    },
    {
      name: "DevTools Dashboard",
      description: "Comprehensive developer dashboard with project management and monitoring",
      icon: <Folder className="h-8 w-8 text-purple-400" />,
      rating: 4.7,
      downloads: "156K",
      tech: ["Vue.js", "Node.js", "MongoDB", "Docker", "Grafana"],
      features: ["Project Management", "CI/CD Integration", "Performance Monitoring", "Team Collaboration"],
      price: "Free",
      category: "Developer Tools"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900/20 via-green-900/20 to-purple-900/20 p-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-4 mb-8"
      >
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="text-blue-400 hover:bg-blue-400/10"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Marketplace
        </Button>
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
            Project Templates
          </h1>
          <p className="text-gray-400 mt-2">Ready-to-use templates for rapid development</p>
        </div>
      </motion.div>

      {/* Featured Templates Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6"
      >
        {featuredTemplates.map((template, index) => (
          <motion.div
            key={template.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
          >
            <Card className="bg-black/40 backdrop-blur-xl border-white/10 hover:border-blue-400/50 transition-all duration-300 h-full">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    {template.icon}
                    <div>
                      <h3 className="text-xl font-bold text-white">{template.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-xs border-white/20">
                          {template.category}
                        </Badge>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="text-sm text-gray-300">{template.rating}</span>
                        </div>
                        <span className="text-sm text-gray-400">•</span>
                        <span className="text-sm text-gray-400">{template.downloads} uses</span>
                      </div>
                    </div>
                  </div>
                  <Badge variant="secondary" className="bg-green-500/20 text-green-400 border-green-500/30">
                    {template.price}
                  </Badge>
                </div>

                <p className="text-gray-300 mb-4">{template.description}</p>

                {/* Tech Stack */}
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-blue-400 mb-2">Tech Stack</h4>
                  <div className="flex flex-wrap gap-2">
                    {template.tech.map((tech) => (
                      <Badge
                        key={tech}
                        variant="outline"
                        className="text-xs border-blue-400/30 text-blue-300"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Features */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-green-400 mb-2">Features</h4>
                  <div className="flex flex-wrap gap-2">
                    {template.features.map((feature) => (
                      <Badge
                        key={feature}
                        variant="outline"
                        className="text-xs border-white/20 text-gray-300"
                      >
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Button className="flex-1 bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600">
                    <Download className="h-4 w-4 mr-2" />
                    Use Template
                  </Button>
                  <Button variant="outline" size="sm" className="border-white/20">
                    <Play className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Browse More Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-12 text-center"
      >
        <Button variant="outline" className="border-blue-400/50 text-blue-400 hover:bg-blue-400/10">
          <Files className="h-4 w-4 mr-2" />
          Browse All Templates
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </motion.div>
    </div>
  );
}
