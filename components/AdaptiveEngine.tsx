import { useEffect, useState } from 'react';

export interface UserContext {
  deviceType: 'mobile' | 'tablet' | 'desktop';
  userType: 'developer' | 'enterprise' | 'startup' | 'student' | 'hobbyist' | 'creator' | 'gamer' | 'small-business' | 'unknown';
  visitCount: number;
  preferredContent: string[];
  accessibilityNeeds: {
    reducedMotion: boolean;
    highContrast: boolean;
    largeText: boolean;
  };
  connectionSpeed: 'slow' | 'fast' | 'unknown';
  timeOfDay: 'morning' | 'afternoon' | 'evening' | 'night';
  previousInteractions: string[];
}

export function useAdaptiveEngine() {
  const [userContext, setUserContext] = useState<UserContext>({
    deviceType: 'desktop',
    userType: 'unknown',
    visitCount: 0,
    preferredContent: [],
    accessibilityNeeds: {
      reducedMotion: false,
      highContrast: false,
      largeText: false,
    },
    connectionSpeed: 'unknown',
    timeOfDay: 'afternoon',
    previousInteractions: [],
  });

  const [adaptedContent, setAdaptedContent] = useState<{
    heroMessage: string;
    primaryCTA: string;
    featuredContent: string[];
    navigationStyle: string;
  }>({
    heroMessage: '',
    primaryCTA: '',
    featuredContent: [],
    navigationStyle: 'standard',
  });

  // Device Detection
  useEffect(() => {
    const detectDevice = () => {
      const width = window.innerWidth;
      if (width < 768) return 'mobile';
      if (width < 1024) return 'tablet';
      return 'desktop';
    };

    const updateDeviceType = () => {
      setUserContext(prev => ({
        ...prev,
        deviceType: detectDevice()
      }));
    };

    updateDeviceType();
    window.addEventListener('resize', updateDeviceType);
    return () => window.removeEventListener('resize', updateDeviceType);
  }, []);

  // Accessibility Detection
  useEffect(() => {
    const mediaQueries = {
      reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)'),
      highContrast: window.matchMedia('(prefers-contrast: high)'),
    };

    const updateAccessibility = () => {
      setUserContext(prev => ({
        ...prev,
        accessibilityNeeds: {
          reducedMotion: mediaQueries.reducedMotion.matches,
          highContrast: mediaQueries.highContrast.matches,
          largeText: prev.accessibilityNeeds.largeText, // User preference
        }
      }));
    };

    updateAccessibility();
    
    Object.values(mediaQueries).forEach(mq => {
      mq.addEventListener('change', updateAccessibility);
    });

    return () => {
      Object.values(mediaQueries).forEach(mq => {
        mq.removeEventListener('change', updateAccessibility);
      });
    };
  }, []);

  // Connection Speed Detection
  useEffect(() => {
    if ('connection' in navigator) {
      const connection = (navigator as any).connection;
      const effectiveType = connection?.effectiveType;
      
      setUserContext(prev => ({
        ...prev,
        connectionSpeed: ['slow-2g', '2g', '3g'].includes(effectiveType) ? 'slow' : 'fast'
      }));
    }
  }, []);

  // Time of Day Detection
  useEffect(() => {
    const getTimeOfDay = () => {
      const hour = new Date().getHours();
      if (hour < 6) return 'night';
      if (hour < 12) return 'morning';
      if (hour < 18) return 'afternoon';
      return 'evening';
    };

    setUserContext(prev => ({
      ...prev,
      timeOfDay: getTimeOfDay()
    }));
  }, []);

  // User Type Detection (based on interactions and URL params)
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const utmSource = urlParams.get('utm_source');
    const ref = document.referrer;

    let detectedUserType: UserContext['userType'] = 'unknown';

    // Detect based on referrer or UTM
    if (utmSource?.includes('github') || ref.includes('github.com')) {
      detectedUserType = 'developer';
    } else if (utmSource?.includes('enterprise') || ref.includes('linkedin.com')) {
      detectedUserType = 'enterprise';
    } else if (ref.includes('university') || ref.includes('edu')) {
      detectedUserType = 'student';
    }

    setUserContext(prev => ({
      ...prev,
      userType: detectedUserType
    }));
  }, []);

  // Visit Count (localStorage)
  useEffect(() => {
    const visitCount = parseInt(localStorage.getItem('dv_visit_count') || '0') + 1;
    localStorage.setItem('dv_visit_count', visitCount.toString());
    
    setUserContext(prev => ({
      ...prev,
      visitCount
    }));
  }, []);

  // Content Adaptation Logic
  useEffect(() => {
    const adaptContent = () => {
      let heroMessage = 'Revolutionary Development Environment';
      let primaryCTA = 'Download Free';
      let featuredContent: string[] = [];
      let navigationStyle = 'standard';

      // 🎯 NEW ACCESSIBLE MESSAGING STRATEGY - STEPPING STONE TO FULL OS
      switch (userContext.userType) {
        case 'developer':
          heroMessage = 'Build AI that codes with you';
          primaryCTA = 'Start Building';
          featuredContent = ['AI Pair Programming', 'Code Generation', 'Smart Debugging'];
          break;
        case 'enterprise':
          heroMessage = 'AI that grows your business';
          primaryCTA = 'See How It Works';
          featuredContent = ['Business Automation', 'Team Productivity', 'Smart Analytics'];
          break;
        case 'startup':
          heroMessage = 'From idea to AI in minutes';
          primaryCTA = 'Build Your MVP';
          featuredContent = ['Rapid Prototyping', 'MVP Development', 'Growth Tools'];
          break;
        case 'student':
          heroMessage = 'Learn AI by building it';
          primaryCTA = 'Start Learning Free';
          featuredContent = ['Interactive Tutorials', 'Portfolio Projects', 'Career Skills'];
          break;
        case 'hobbyist':
          heroMessage = 'Turn your ideas into AI reality';
          primaryCTA = 'Explore & Create';
          featuredContent = ['No Coding Required', 'Creative Projects', 'Community Support'];
          break;
        case 'creator':
          heroMessage = 'AI that amplifies your content';
          primaryCTA = 'Boost Your Content';
          featuredContent = ['Content Automation', 'Creative AI Tools', 'Audience Growth'];
          break;
        case 'gamer':
          heroMessage = 'Build AI for your gaming world';
          primaryCTA = 'Level Up Now';
          featuredContent = ['Game AI', 'Streaming Tools', 'Community Bots'];
          break;
        case 'small-business':
          heroMessage = 'AI that works for your business';
          primaryCTA = 'Automate Today';
          featuredContent = ['Customer Service', 'Process Automation', 'Growth Analytics'];
          break;
        default:
          // 🎨 ACCESSIBLE MESSAGING FOR EVERYONE - BRIDGE TO FULL OS
          if (userContext.timeOfDay === 'morning') {
            heroMessage = 'Turn your morning ideas into AI reality';
          } else if (userContext.timeOfDay === 'evening') {
            heroMessage = 'Build AI that works while you sleep';
          } else {
            heroMessage = 'Create AI that actually helps you';
          }
          primaryCTA = 'Try It Now';
          featuredContent = ['No Coding Required', 'Ready in Minutes', 'Join 50k+ Creators'];
      }

      // Adapt navigation for mobile
      if (userContext.deviceType === 'mobile') {
        navigationStyle = 'mobile-optimized';
      }

      // Adapt for accessibility
      if (userContext.accessibilityNeeds.reducedMotion) {
        navigationStyle = 'minimal-motion';
      }

      // Adapt for returning users
      if (userContext.visitCount > 1) {
        heroMessage = 'Welcome Back! Ready to Code?';
        primaryCTA = 'Continue Where You Left Off';
      }

      setAdaptedContent({
        heroMessage,
        primaryCTA,
        featuredContent,
        navigationStyle,
      });
    };

    adaptContent();
  }, [userContext]);

  // Track interactions
  const trackInteraction = (interaction: string) => {
    setUserContext(prev => ({
      ...prev,
      previousInteractions: [...prev.previousInteractions.slice(-9), interaction]
    }));
    
    // Store in localStorage for persistence
    const stored = JSON.parse(localStorage.getItem('dv_interactions') || '[]');
    localStorage.setItem('dv_interactions', JSON.stringify([...stored.slice(-9), interaction]));
  };

  // Smart section recommendations
  const getRecommendedSections = () => {
    const { userType, deviceType, previousInteractions } = userContext;
    
    const sectionPriority = {
      developer: ['features', 'marketplace', 'therion', 'hero', 'user-segments', 'cta'],
      enterprise: ['hero', 'user-segments', 'features', 'cta', 'marketplace', 'therion'],
      startup: ['hero', 'features', 'cta', 'marketplace', 'user-segments', 'therion'],
      student: ['hero', 'features', 'user-segments', 'marketplace', 'therion', 'cta'],
      hobbyist: ['hero', 'features', 'user-segments', 'marketplace', 'therion', 'cta'],
      creator: ['marketplace', 'features', 'hero', 'user-segments', 'therion', 'cta'],
      gamer: ['features', 'marketplace', 'hero', 'user-segments', 'therion', 'cta'],
      'small-business': ['hero', 'features', 'cta', 'user-segments', 'marketplace', 'therion'],
      unknown: ['hero', 'features', 'user-segments', 'marketplace', 'therion', 'cta'],
    };

    return sectionPriority[userType] || sectionPriority.unknown;
  };

  return {
    userContext,
    adaptedContent,
    trackInteraction,
    getRecommendedSections,
  };
}

export default useAdaptiveEngine;
