import { motion } from "framer-motion";
import { CheckCircle, Cpu, Shield, Zap, Globe, Code, Users, Download } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";

export function EnterpriseSection() {
  const enterpriseFeatures = [
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Enterprise Security",
      description: "SOC 2 Type II certified with end-to-end encryption, SSO integration, and advanced audit trails.",
      benefits: ["Zero-trust architecture", "Compliance ready (SOX, HIPAA)", "Advanced threat detection"]
    },
    {
      icon: <Cpu className="h-8 w-8" />,
      title: "Scalable Performance",
      description: "Handle thousands of developers with auto-scaling infrastructure and optimized resource management.",
      benefits: ["Auto-scaling workloads", "Global CDN delivery", "99.99% uptime SLA"]
    },
    {
      icon: <Code className="h-8 w-8" />,
      title: "Custom Integrations",
      description: "Seamlessly integrate with your existing enterprise tools and workflows through our robust API.",
      benefits: ["REST & GraphQL APIs", "Webhook support", "Custom plugin development"]
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Team Management",
      description: "Advanced role-based access control, team analytics, and centralized policy management.",
      benefits: ["RBAC & permissions", "Team analytics", "Centralized governance"]
    }
  ];

  const customerLogos = [
    { name: "TechCorp", logo: "TC" },
    { name: "DevSolutions", logo: "DS" },
    { name: "CloudSys", logo: "CS" },
    { name: "InnovateTech", logo: "IT" },
    { name: "NextGen Dev", logo: "NG" },
    { name: "ScaleUp", logo: "SU" }
  ];

  const handleEnterpriseContact = () => {
    window.open('mailto:enterprise@deusvault.com?subject=Enterprise%20Demo%20Request', '_blank');
  };

  const handleScheduleDemo = () => {
    window.open('https://calendly.com/deusvault/enterprise-demo', '_blank');
  };

  return (
    <section className="py-24 bg-gradient-to-br from-gray-900 via-blue-900/20 to-gray-900 relative overflow-hidden">
      {/* Professional Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(45deg, rgba(59, 130, 246, 0.1) 0%, transparent 25%), 
                           linear-gradient(-45deg, rgba(147, 197, 253, 0.1) 0%, transparent 25%),
                           radial-gradient(circle at 50% 50%, rgba(96, 165, 250, 0.05) 0%, transparent 50%)`
        }} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Badge className="mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 text-lg">
            <Globe className="h-5 w-5 mr-2" />
            Enterprise Ready
          </Badge>
          
          <h2 className="text-5xl md:text-6xl mb-8 bg-gradient-to-r from-white via-blue-200 to-indigo-200 bg-clip-text text-transparent">
            Built for Enterprise Scale
          </h2>
          
          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Transform your organization's development workflow with enterprise-grade security,
            <span className="block mt-4 text-blue-300">scalability, and support that grows with your team.</span>
          </p>
        </motion.div>

        {/* Customer Logos */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <p className="text-center text-gray-400 mb-8 text-lg">Trusted by leading enterprises worldwide</p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-70">
            {customerLogos.map((customer, index) => (
              <div 
                key={index}
                className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-lg hover:scale-110 transition-transform duration-300"
              >
                {customer.logo}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Enterprise Features Grid */}
        <motion.div
          className="grid lg:grid-cols-2 gap-8 mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {enterpriseFeatures.map((feature, index) => (
            <Card 
              key={index}
              className="bg-gray-900/50 backdrop-blur-md border-blue-500/20 hover:border-blue-400/40 transition-all duration-300 group"
            >
              <CardContent className="p-8">
                <div className="flex items-start gap-6">
                  <div className="p-4 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-2xl text-white mb-4 group-hover:text-blue-300 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-gray-300 leading-relaxed mb-6 text-lg">
                      {feature.description}
                    </p>
                    
                    <ul className="space-y-2">
                      {feature.benefits.map((benefit, benefitIndex) => (
                        <li key={benefitIndex} className="flex items-center text-gray-400">
                          <CheckCircle className="h-4 w-4 text-green-400 mr-3 flex-shrink-0" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* ROI Stats */}
        <motion.div
          className="bg-gradient-to-r from-blue-600/10 via-indigo-600/10 to-purple-600/10 backdrop-blur-md rounded-3xl p-12 border-2 border-blue-500/20 mb-20"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <div className="text-center mb-12">
            <h3 className="text-4xl md:text-5xl mb-6 bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Enterprise Impact
            </h3>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              See the measurable benefits organizations achieve with DeusVaultOS
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { stat: "65%", label: "Faster Development", sublabel: "Time to Market" },
              { stat: "$2.4M", label: "Annual Savings", sublabel: "Tool Consolidation" },
              { stat: "99.99%", label: "Uptime SLA", sublabel: "Enterprise Grade" },
              { stat: "3 Days", label: "Deployment Time", sublabel: "Enterprise Setup" }
            ].map((metric, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl text-white mb-2 font-bold">{metric.stat}</div>
                <div className="text-lg text-blue-300 mb-1">{metric.label}</div>
                <div className="text-sm text-gray-400">{metric.sublabel}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          <h3 className="text-3xl md:text-4xl text-white mb-6">
            Ready to Transform Your Development Organization?
          </h3>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Get a personalized demo and see how DeusVaultOS can accelerate your team's productivity.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg"
              className="text-lg px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-xl hover:shadow-2xl transition-all duration-300"
              onClick={handleScheduleDemo}
            >
              <Zap className="h-5 w-5 mr-2" />
              Schedule Demo
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              className="text-lg px-8 py-4 border-blue-400/50 text-blue-400 hover:bg-blue-400/10"
              onClick={handleEnterpriseContact}
            >
              Contact Enterprise Sales
            </Button>
          </div>
          
          <p className="text-sm text-gray-400 mt-6">
            Custom pricing • Dedicated support • Implementation assistance included
          </p>
        </motion.div>
      </div>
    </section>
  );
}
