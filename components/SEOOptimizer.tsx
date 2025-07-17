import { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  ogImage?: string;
  canonicalUrl?: string;
  structuredData?: object;
}

export function SEOOptimizer({
  title = "DeusVaultOS - The Future of Development Environments",
  description = "Build software like a god with the AI-powered development environment that writes code with you, deploys anywhere, and evolves automatically. Zero configuration. Maximum productivity.",
  keywords = [
    "development environment",
    "AI coding assistant",
    "software development",
    "programming tools",
    "developer productivity",
    "code generation",
    "enterprise development",
    "open source IDE",
    "professional coding",
    "development automation"
  ],
  ogImage = "/og-image.jpg",
  canonicalUrl,
  structuredData
}: SEOProps) {

  useEffect(() => {
    // Update document title
    document.title = title;

    // Update meta tags
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords.join(', '));
    
    // Open Graph tags
    updateMetaTag('og:title', title, 'property');
    updateMetaTag('og:description', description, 'property');
    updateMetaTag('og:image', ogImage, 'property');
    updateMetaTag('og:type', 'website', 'property');
    updateMetaTag('og:site_name', 'DeusVaultOS', 'property');
    
    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image', 'name');
    updateMetaTag('twitter:title', title, 'name');
    updateMetaTag('twitter:description', description, 'name');
    updateMetaTag('twitter:image', ogImage, 'name');
    updateMetaTag('twitter:creator', '@deusvaultos', 'name');
    
    // Technical SEO
    updateMetaTag('robots', 'index,follow', 'name');
    updateMetaTag('googlebot', 'index,follow', 'name');
    updateMetaTag('viewport', 'width=device-width, initial-scale=1.0', 'name');
    updateMetaTag('theme-color', '#00e1ff', 'name');
    
    // Canonical URL
    if (canonicalUrl) {
      updateLinkTag('canonical', canonicalUrl);
    }
    
    // Structured Data (JSON-LD)
    if (structuredData) {
      updateStructuredData(structuredData);
    } else {
      // Default structured data for DeusVaultOS
      const defaultStructuredData = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "DeusVaultOS",
        "description": description,
        "applicationCategory": "DeveloperApplication",
        "operatingSystem": "Linux, macOS, Windows",
        "softwareVersion": "1.0.0",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "publisher": {
          "@type": "Organization",
          "name": "DeusVault",
          "url": "https://deusvault.com"
        },
        "screenshot": ogImage,
        "downloadUrl": "https://github.com/deusvault/releases",
        "featureList": [
          "AI-powered code generation",
          "Zero configuration setup",
          "Universal deployment",
          "Real-time collaboration",
          "Enterprise security"
        ],
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "ratingCount": "1250",
          "bestRating": "5"
        }
      };
      updateStructuredData(defaultStructuredData);
    }

  }, [title, description, keywords, ogImage, canonicalUrl, structuredData]);

  const updateMetaTag = (name: string, content: string, attribute: string = 'name') => {
    let element = document.querySelector(`meta[${attribute}="${name}"]`) as HTMLMetaElement;
    
    if (!element) {
      element = document.createElement('meta');
      element.setAttribute(attribute, name);
      document.head.appendChild(element);
    }
    
    element.setAttribute('content', content);
  };

  const updateLinkTag = (rel: string, href: string) => {
    let element = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement;
    
    if (!element) {
      element = document.createElement('link');
      element.setAttribute('rel', rel);
      document.head.appendChild(element);
    }
    
    element.setAttribute('href', href);
  };

  const updateStructuredData = (data: object) => {
    // Remove existing structured data
    const existing = document.querySelector('script[type="application/ld+json"]');
    if (existing) {
      existing.remove();
    }

    // Add new structured data
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(data);
    document.head.appendChild(script);
  };

  return null; // This component doesn't render anything
}

// SEO utilities for different page types
export const seoConfigs = {
  home: {
    title: "DeusVaultOS - AI-Powered Development Environment | Build Software Like a God",
    description: "Transform your development workflow with the AI-powered environment that writes code with you, deploys anywhere, and evolves automatically. Zero configuration, maximum productivity.",
    keywords: [
      "AI development environment",
      "code generation",
      "software development",
      "programming tools",
      "developer productivity",
      "automated coding",
      "enterprise development",
      "professional IDE"
    ]
  },
  
  features: {
    title: "Features - DeusVaultOS | AI Coding Assistant & Development Tools",
    description: "Discover DeusVaultOS features: AI pair programming, universal deployment, real-time collaboration, enterprise security, and more. Built for professional developers.",
    keywords: [
      "AI coding assistant",
      "development features",
      "code completion",
      "automated deployment",
      "team collaboration",
      "development tools"
    ]
  },
  
  enterprise: {
    title: "Enterprise Solutions - DeusVaultOS | Professional Development Platform",
    description: "Scale your development team with DeusVaultOS Enterprise. SOC 2 certified, advanced security, custom integrations, and dedicated support for large organizations.",
    keywords: [
      "enterprise development",
      "professional coding platform",
      "team development tools",
      "enterprise security",
      "scalable development",
      "custom integrations"
    ]
  },
  
  pricing: {
    title: "Pricing - DeusVaultOS | Free for Individuals, Professional for Teams",
    description: "Choose the perfect DeusVaultOS plan: Free for individual developers, Professional for teams, Enterprise for large organizations. No hidden fees.",
    keywords: [
      "development environment pricing",
      "IDE pricing",
      "developer tools cost",
      "enterprise development pricing",
      "professional coding tools"
    ]
  }
};

// Performance-optimized preloading
export function preloadCriticalResources() {
  const resources = [
    { href: '/og-image.jpg', as: 'image' },
    { href: 'https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&display=swap', as: 'style' },
    { href: 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap', as: 'style' }
  ];

  resources.forEach(resource => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = resource.href;
    link.as = resource.as;
    document.head.appendChild(link);
  });
}
