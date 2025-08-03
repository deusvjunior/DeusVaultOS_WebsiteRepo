import { motion } from 'framer-motion';
import {
    ArrowLeft,
    CheckCircle,
    Clock,
    Download,
    Globe,
    HardDrive,
    Monitor,
    Shield,
    Smartphone,
    Star,
    Users,
    Zap
} from 'lucide-react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

interface DownloadPageProps {
  onBack: () => void;
}

export function DownloadPage({ onBack }: DownloadPageProps) {
  const downloadOptions = [
    {
      title: "DeusVaultOS Desktop",
      description: "Full-featured development environment for Windows, macOS, and Linux",
      icon: <Monitor className="h-8 w-8 text-cyan-400" />,
      version: "v2.1.0",
      size: "2.4 GB",
      platforms: ["Windows 11", "macOS 13+", "Ubuntu 20.04+"],
      features: [
        "Complete IDE with AI assistant",
        "Docker integration",
        "Cloud synchronization",
        "Plugin ecosystem",
        "Advanced debugging tools"
      ],
      price: "Free",
      popular: true,
      downloads: "2.3M+"
    },
    {
      title: "DeusVaultOS Cloud",
      description: "Browser-based development environment with enterprise features",
      icon: <Globe className="h-8 w-8 text-green-400" />,
      version: "Cloud",
      size: "Instant",
      platforms: ["Any Browser", "Chrome", "Firefox", "Safari"],
      features: [
        "No installation required",
        "Real-time collaboration",
        "Enterprise security",
        "Auto-scaling resources",
        "Advanced analytics"
      ],
      price: "From $19/month",
      popular: false,
      downloads: "500K+ users"
    },
    {
      title: "DeusVaultOS Mobile",
      description: "Code review and project management on your mobile device",
      icon: <Smartphone className="h-8 w-8 text-purple-400" />,
      version: "v1.8.0",
      size: "120 MB",
      platforms: ["iOS 15+", "Android 12+", "iPadOS"],
      features: [
        "Code review tools",
        "Project monitoring",
        "Team notifications",
        "Git integration",
        "Offline synchronization"
      ],
      price: "Free",
      popular: false,
      downloads: "800K+"
    }
  ];

  const systemRequirements = {
    minimum: {
      ram: "8 GB RAM",
      storage: "5 GB available space",
      processor: "Intel i5 / AMD Ryzen 5",
      graphics: "DirectX 11 compatible"
    },
    recommended: {
      ram: "16 GB RAM",
      storage: "20 GB available space (SSD)",
      processor: "Intel i7 / AMD Ryzen 7",
      graphics: "Dedicated GPU with 4GB VRAM"
    }
  };

  const releaseNotes = [
    {
      version: "v2.1.0",
      date: "July 2025",
      highlights: [
        "Enhanced AI code completion",
        "New theme customization",
        "Performance improvements",
        "Bug fixes and stability"
      ]
    },
    {
      version: "v2.0.5",
      date: "June 2025",
      highlights: [
        "Docker Desktop integration",
        "Advanced debugging features",
        "Cloud sync improvements"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-cyan-900/20 to-green-900/20 p-8">
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
          className="text-cyan-400 hover:bg-cyan-400/10"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Main
        </Button>
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">
            Download DeusVaultOS
          </h1>
          <p className="text-gray-400 mt-2">Get started with the most advanced development environment</p>
        </div>
      </motion.div>

      {/* Stats Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-12"
      >
        <Card className="bg-gradient-to-r from-cyan-900/40 to-green-900/40 backdrop-blur-xl border-cyan-400/30">
          <CardContent className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-2xl font-bold text-cyan-400">3.6M+</div>
                <div className="text-sm text-gray-300">Total Downloads</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-400">4.9/5</div>
                <div className="text-sm text-gray-300">User Rating</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-400">50+</div>
                <div className="text-sm text-gray-300">Languages Supported</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-yellow-400">24/7</div>
                <div className="text-sm text-gray-300">AI Assistant</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Download Options */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12"
      >
        {downloadOptions.map((option, index) => (
          <motion.div
            key={option.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
          >
            <Card className={`bg-black/40 backdrop-blur-xl border-white/10 hover:border-cyan-400/50 transition-all duration-300 h-full relative ${
              option.popular ? 'ring-2 ring-cyan-400/50' : ''
            }`}>
              {option.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-cyan-400 text-black font-semibold">
                    <Star className="h-3 w-3 mr-1" />
                    Most Popular
                  </Badge>
                </div>
              )}
              <CardHeader>
                <div className="flex items-center gap-3">
                  {option.icon}
                  <div>
                    <CardTitle className="text-white">{option.title}</CardTitle>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="text-xs">
                        {option.version}
                      </Badge>
                      <span className="text-sm text-gray-400">{option.size}</span>
                    </div>
                  </div>
                </div>
                <p className="text-gray-400">{option.description}</p>
              </CardHeader>
              <CardContent>
                {/* Platforms */}
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-cyan-400 mb-2">Platforms</h4>
                  <div className="flex flex-wrap gap-2">
                    {option.platforms.map((platform) => (
                      <Badge
                        key={platform}
                        variant="outline"
                        className="text-xs border-white/20 text-gray-300"
                      >
                        {platform}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Features */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-green-400 mb-2">Features</h4>
                  <ul className="space-y-1">
                    {option.features.map((feature) => (
                      <li key={feature} className="text-sm text-gray-300 flex items-center gap-2">
                        <CheckCircle className="h-3 w-3 text-green-400 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Stats */}
                <div className="mb-6 flex justify-between text-sm text-gray-400">
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    {option.downloads}
                  </div>
                  <div className="text-lg font-bold text-green-400">{option.price}</div>
                </div>

                {/* Download Button */}
                <Button 
                  className={`w-full ${
                    option.popular 
                      ? 'bg-gradient-to-r from-cyan-500 to-green-500 hover:from-cyan-600 hover:to-green-600' 
                      : 'bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800'
                  }`}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download {option.title.split(' ')[1]}
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* System Requirements */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12"
      >
        <Card className="bg-black/40 backdrop-blur-xl border-white/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <HardDrive className="h-5 w-5 text-yellow-400" />
              System Requirements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-semibold text-yellow-400 mb-3">Minimum Requirements</h4>
                <div className="space-y-2">
                  {Object.entries(systemRequirements.minimum).map(([key, value]) => (
                    <div key={key} className="flex justify-between text-sm">
                      <span className="text-gray-400 capitalize">{key}:</span>
                      <span className="text-gray-300">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-green-400 mb-3">Recommended</h4>
                <div className="space-y-2">
                  {Object.entries(systemRequirements.recommended).map(([key, value]) => (
                    <div key={key} className="flex justify-between text-sm">
                      <span className="text-gray-400 capitalize">{key}:</span>
                      <span className="text-gray-300">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black/40 backdrop-blur-xl border-white/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Clock className="h-5 w-5 text-purple-400" />
              Release Notes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {releaseNotes.map((release) => (
                <div key={release.version}>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline" className="text-purple-400 border-purple-400/30">
                      {release.version}
                    </Badge>
                    <span className="text-sm text-gray-400">{release.date}</span>
                  </div>
                  <ul className="space-y-1">
                    {release.highlights.map((highlight) => (
                      <li key={highlight} className="text-sm text-gray-300 flex items-center gap-2">
                        <Zap className="h-3 w-3 text-purple-400 flex-shrink-0" />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Security & Trust */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="text-center"
      >
        <Card className="bg-gradient-to-r from-green-900/40 to-cyan-900/40 backdrop-blur-xl border-green-400/30">
          <CardContent className="p-8">
            <Shield className="h-12 w-12 text-green-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-4">Secure & Trusted</h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              DeusVaultOS is digitally signed, virus-free, and trusted by millions of developers worldwide. 
              All downloads are secured with enterprise-grade encryption.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Badge variant="outline" className="border-green-400/30 text-green-300">
                ✓ Code Signed
              </Badge>
              <Badge variant="outline" className="border-green-400/30 text-green-300">
                ✓ Virus Free
              </Badge>
              <Badge variant="outline" className="border-green-400/30 text-green-300">
                ✓ SOC 2 Compliant
              </Badge>
              <Badge variant="outline" className="border-green-400/30 text-green-300">
                ✓ GDPR Ready
              </Badge>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}