import { motion } from 'framer-motion';
import { X, User, Calendar, MapPin, Smartphone, Monitor, Tablet } from 'lucide-react';
import { useState } from 'react';
import { UserContext } from './AdaptiveEngine';

interface PersonalizationBannerProps {
  userContext: UserContext;
  adaptedContent: {
    heroMessage: string;
    primaryCTA: string;
    featuredContent: string[];
    navigationStyle: string;
  };
}

export function PersonalizationBanner({ userContext, adaptedContent }: PersonalizationBannerProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);

  if (!isVisible || userContext.visitCount > 3) return null;

  const getDeviceIcon = () => {
    switch (userContext.deviceType) {
      case 'mobile': return <Smartphone className="h-4 w-4" />;
      case 'tablet': return <Tablet className="h-4 w-4" />;
      default: return <Monitor className="h-4 w-4" />;
    }
  };

  const getPersonalizationMessage = () => {
    // 🎯 NEW ACCESSIBLE MESSAGING - STEPPING STONE STRATEGY
    switch (userContext.userType) {
      case 'developer':
        return `Perfect for developers! Build AI that codes with you.`;
      case 'enterprise':
        return `Great for business! AI that grows your company.`;
      case 'student':
        return `Perfect for learning! Build AI while you learn.`;
      case 'startup':
        return `Ideal for startups! From idea to AI in minutes.`;
      case 'hobbyist':
        return `Perfect for makers! Turn your ideas into AI reality.`;
      case 'creator':
        return `Great for creators! AI that amplifies your content.`;
      case 'gamer':
        return `Awesome for gamers! Build AI for your gaming world.`;
      case 'small-business':
        return `Perfect for small business! AI that works for you.`;
      default:
        if (userContext.visitCount > 1) {
          return `Welcome back! Ready to create AI that helps you?`;
        }
        return `Create AI that actually helps you - no coding required!`;
    }
  };

  return (
    <motion.div
      className="fixed top-20 right-4 z-40 max-w-sm"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ delay: 2 }}
    >
      <div className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 backdrop-blur-xl rounded-lg border border-cyan-400/30 p-4 shadow-xl">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-cyan-400" />
            <span className="text-sm font-medium text-white">Adaptive Experience</span>
          </div>
          <button 
            onClick={() => setIsVisible(false)}
            className="text-white/60 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Main Message */}
        <p className="text-sm text-white/90 mb-3">
          {getPersonalizationMessage()}
        </p>

        {/* Context Info */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs text-white/70">
            {getDeviceIcon()}
            <span>Optimized for {userContext.deviceType}</span>
          </div>
          
          {userContext.userType !== 'unknown' && (
            <div className="flex items-center gap-2 text-xs text-cyan-400">
              <User className="h-3 w-3" />
              <span>Showing {userContext.userType} content</span>
            </div>
          )}

          <div className="flex items-center gap-2 text-xs text-white/70">
            <Calendar className="h-3 w-3" />
            <span>Visit #{userContext.visitCount} • {userContext.timeOfDay}</span>
          </div>
        </div>

        {/* Adaptive Features Toggle */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full mt-3 text-xs text-cyan-400 hover:text-cyan-300 transition-colors"
        >
          {isExpanded ? 'Hide' : 'Show'} adaptive features
        </button>

        {/* Expanded Details */}
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            className="mt-3 pt-3 border-t border-white/10 space-y-2"
          >
            <div className="text-xs text-white/70">
              <div className="font-medium text-white mb-1">Active Adaptations:</div>
              <ul className="space-y-1">
                <li>• Content personalized for {userContext.userType || 'general audience'}</li>
                <li>• {userContext.deviceType} optimized layout</li>
                {userContext.accessibilityNeeds.reducedMotion && (
                  <li>• Reduced motion animations</li>
                )}
                {userContext.connectionSpeed === 'slow' && (
                  <li>• Data saver mode enabled</li>
                )}
                <li>• {userContext.timeOfDay} optimized content</li>
              </ul>
            </div>

            {adaptedContent.featuredContent.length > 0 && (
              <div className="text-xs text-white/70">
                <div className="font-medium text-white mb-1">Featured for you:</div>
                <div className="flex flex-wrap gap-1">
                  {adaptedContent.featuredContent.slice(0, 3).map((item, index) => (
                    <span 
                      key={index}
                      className="px-2 py-1 bg-cyan-400/20 text-cyan-400 rounded text-xs"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

export default PersonalizationBanner;
