import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Building, 
  CheckCircle, 
  Crown, 
  DollarSign, 
  Globe, 
  Lock, 
  Phone, 
  Shield, 
  Star, 
  TrendingUp, 
  Users, 
  Zap 
} from 'lucide-react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

interface EnterprisePageProps {
  onBack: () => void;
}

export function EnterprisePage({ onBack }: EnterprisePageProps) {
  const enterpriseFeatures = [
    {
      category: "Security & Compliance",
      icon: <Shield className="h-6 w-6 text-green-400" />,
      features: [
        "SOC 2 Type II Compliance",
        "GDPR & CCPA Ready",
        "Advanced Threat Protection",
        "Zero-Trust Architecture",
        "Audit Logging & Monitoring",
        "Data Encryption at Rest & Transit"
      ]
    },
    {
      category: "Administration & Control",
      icon: <Lock className="h-6 w-6 text-blue-400" />,
      features: [
        "Centralized User Management",
        "Role-Based Access Control",
        "Single Sign-On (SSO)",
        "LDAP/Active Directory Integration",
        "Policy Management",
        "Usage Analytics & Reporting"
      ]
    },
    {
      category: "Scalability & Performance",
      icon: <TrendingUp className="h-6 w-6 text-purple-400" />,
      features: [
        "Auto-Scaling Infrastructure",
        "Load Balancing",
        "Global CDN Distribution",
        "99.9% Uptime SLA",
        "Performance Monitoring",
        "Resource Optimization"
      ]
    },
    {
      category: "Support & Services",
      icon: <Phone className="h-6 w-6 text-orange-400" />,
      features: [
        "24/7 Priority Support",
        "Dedicated Account Manager",
        "Custom Training Programs",
        "Implementation Assistance",
        "Migration Services",
        "Regular Health Checks"
      ]
    }
  ];

  const pricingTiers = [
    {
      name: "Professional",
      price: "$49",
      period: "per user/month",
      description: "Perfect for growing development teams",
      features: [
        "Up to 50 users",
        "Advanced AI assistance",
        "Priority support",
        "SSO integration",
        "Basic analytics",
        "99.5% uptime SLA"
      ],
      popular: false,
      color: "blue"
    },
    {
      name: "Enterprise",
      price: "$99",
      period: "per user/month",
      description: "Complete solution for large organizations",
      features: [
        "Unlimited users",
        "Advanced security controls",
        "24/7 dedicated support",
        "Custom integrations",
        "Advanced analytics",
        "99.9% uptime SLA",
        "Compliance reporting",
        "Custom training"
      ],
      popular: true,
      color: "purple"
    },
    {
      name: "Ultimate",
      price: "Custom",
      period: "tailored pricing",
      description: "Enterprise-grade with custom requirements",
      features: [
        "Everything in Enterprise",
        "On-premise deployment",
        "White-label options",
        "Custom development",
        "Dedicated infrastructure",
        "Global support",
        "Success manager",
        "Unlimited customization"
      ],
      popular: false,
      color: "gold"
    }
  ];

  const customerSuccess = [
    {
      company: "TechCorp Global",
      logo: "🏢",
      industry: "Software Development",
      teamSize: "2,500+ developers",
      results: [
        "40% faster development cycles",
        "60% reduction in bugs",
        "$2.8M annual cost savings",
        "95% developer satisfaction"
      ],
      quote: "DeusVaultOS transformed our development workflow. The AI assistance alone saved us months of development time."
    },
    {
      company: "FinanceFlow Inc",
      logo: "🏦",
      industry: "Financial Services",
      teamSize: "800+ engineers",
      results: [
        "SOC 2 compliance achieved",
        "50% improvement in code quality",
        "Zero security incidents",
        "90% reduction in deployment time"
      ],
      quote: "The enterprise security features gave us confidence to migrate our entire infrastructure to DeusVaultOS."
    }
  ];

  const integrations = [
    "GitHub Enterprise", "GitLab", "Bitbucket", "Jira", "Confluence", 
    "Slack", "Microsoft Teams", "Azure DevOps", "AWS", "Google Cloud",
    "Docker Enterprise", "Kubernetes", "Terraform", "Jenkins", "CircleCI"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-blue-900/20 p-8">
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
          className="text-purple-400 hover:bg-purple-400/10"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Main
        </Button>
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            DeusVaultOS Enterprise
          </h1>
          <p className="text-gray-400 mt-2">Enterprise-grade development platform for large organizations</p>
        </div>
      </motion.div>

      {/* Hero Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-12"
      >
        <Card className="bg-gradient-to-r from-purple-900/40 to-blue-900/40 backdrop-blur-xl border-purple-400/30">
          <CardContent className="p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-purple-400">500+</div>
                <div className="text-sm text-gray-300">Enterprise Customers</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-400">1M+</div>
                <div className="text-sm text-gray-300">Enterprise Users</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-400">99.9%</div>
                <div className="text-sm text-gray-300">Uptime SLA</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-orange-400">24/7</div>
                <div className="text-sm text-gray-300">Enterprise Support</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Enterprise Features */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-12"
      >
        <h2 className="text-3xl font-bold text-white mb-8 text-center">Enterprise Features</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {enterpriseFeatures.map((category, index) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <Card className="bg-black/40 backdrop-blur-xl border-white/10 hover:border-purple-400/50 transition-all duration-300 h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-white">
                    {category.icon}
                    {category.category}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {category.features.map((feature) => (
                      <li key={feature} className="text-gray-300 flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Pricing Tiers */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mb-12"
      >
        <h2 className="text-3xl font-bold text-white mb-8 text-center">Enterprise Pricing</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {pricingTiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <Card className={`bg-black/40 backdrop-blur-xl border-white/10 hover:border-purple-400/50 transition-all duration-300 h-full relative ${
                tier.popular ? 'ring-2 ring-purple-400/50 scale-105' : ''
              }`}>
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-purple-400 text-black font-semibold">
                      <Crown className="h-3 w-3 mr-1" />
                      Most Popular
                    </Badge>
                  </div>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl text-white">{tier.name}</CardTitle>
                  <div className="text-3xl font-bold text-purple-400 mb-2">
                    {tier.price}
                    <span className="text-sm text-gray-400 font-normal">/{tier.period}</span>
                  </div>
                  <p className="text-gray-400">{tier.description}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-6">
                    {tier.features.map((feature) => (
                      <li key={feature} className="text-gray-300 flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className={`w-full ${
                      tier.popular 
                        ? 'bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600' 
                        : 'bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800'
                    }`}
                  >
                    {tier.name === 'Ultimate' ? 'Contact Sales' : 'Start Free Trial'}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Customer Success Stories */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mb-12"
      >
        <h2 className="text-3xl font-bold text-white mb-8 text-center">Customer Success Stories</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {customerSuccess.map((customer, index) => (
            <Card key={customer.company} className="bg-black/40 backdrop-blur-xl border-white/10">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-4xl">{customer.logo}</div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{customer.company}</h3>
                    <div className="text-sm text-gray-400">{customer.industry} • {customer.teamSize}</div>
                  </div>
                </div>
                <blockquote className="text-gray-300 italic mb-4">
                  "{customer.quote}"
                </blockquote>
                <div className="grid grid-cols-2 gap-2">
                  {customer.results.map((result) => (
                    <div key={result} className="text-sm text-green-400 flex items-center gap-1">
                      <TrendingUp className="h-3 w-3" />
                      {result}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.div>

      {/* Integrations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="mb-12"
      >
        <h2 className="text-3xl font-bold text-white mb-8 text-center">Enterprise Integrations</h2>
        <Card className="bg-black/40 backdrop-blur-xl border-white/10">
          <CardContent className="p-6">
            <div className="flex flex-wrap gap-3 justify-center">
              {integrations.map((integration) => (
                <Badge
                  key={integration}
                  variant="outline"
                  className="border-purple-400/30 text-purple-300 hover:bg-purple-400/10"
                >
                  {integration}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0 }}
        className="text-center"
      >
        <Card className="bg-gradient-to-r from-purple-900/40 to-blue-900/40 backdrop-blur-xl border-purple-400/30">
          <CardContent className="p-8">
            <Building className="h-12 w-12 text-purple-400 mx-auto mb-4" />
            <h3 className="text-3xl font-bold text-white mb-4">Ready to Transform Your Enterprise?</h3>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Join hundreds of enterprise customers who've revolutionized their development workflows with DeusVaultOS. 
              Get a personalized demo and see the impact on your organization.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-lg px-8 py-3">
                <Phone className="h-5 w-5 mr-2" />
                Schedule Demo
              </Button>
              <Button 
                variant="outline" 
                className="border-purple-400/50 text-purple-400 hover:bg-purple-400/10 text-lg px-8 py-3"
              >
                <DollarSign className="h-5 w-5 mr-2" />
                Get Custom Quote
              </Button>
            </div>
            <div className="flex items-center justify-center gap-4 mt-6 text-sm text-gray-400">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 text-yellow-400" />
                Free 30-day trial
              </div>
              <div className="flex items-center gap-1">
                <Shield className="h-4 w-4 text-green-400" />
                No setup fees
              </div>
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4 text-blue-400" />
                Dedicated support
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}