// NEXUS Interactive Marketing Components
// React/Next.js Ready Interactive Elements

import React, { useState, useEffect } from 'react';
import './nexus_design_system.css';

// 1. Interactive Pricing Component
export const NexusPricingCard = () => {
  const [selectedPlan, setSelectedPlan] = useState('professional');
  const [isAnnual, setIsAnnual] = useState(false);

  const plans = {
    starter: {
      name: 'Glass Starter',
      monthlyPrice: 29,
      annualPrice: 290,
      features: ['Premium Interface Access', 'Basic Glass Effects', 'Email Support', '5 Processing Sessions/month'],
      cta: 'Start Premium',
      popular: false
    },
    professional: {
      name: 'TLDark Professional',
      monthlyPrice: 99,
      annualPrice: 990,
      features: ['Advanced Glassmorphic UI', 'Enhanced Processing Power', 'Priority Support', 'Unlimited Sessions', 'Performance Analytics'],
      cta: 'Unlock TLDark',
      popular: true
    },
    elite: {
      name: 'Glassmorphic Elite',
      monthlyPrice: 299,
      annualPrice: 2990,
      features: ['Ultimate Glass Interface', 'Custom Architecture', '24/7 Dedicated Support', 'Unlimited Everything', 'Personal Intelligence Coach', 'Beta Access'],
      cta: 'Achieve Elite',
      popular: false
    }
  };

  return (
    <div className="nexus-pricing-section">
      <div className="pricing-header">
        <h2 className="section-title">Choose Your Intelligence Level</h2>
        <div className="billing-toggle">
          <span className={!isAnnual ? 'active' : ''}>Monthly</span>
          <button 
            className="toggle-switch"
            onClick={() => setIsAnnual(!isAnnual)}
          >
            <div className={`toggle-slider ${isAnnual ? 'annual' : 'monthly'}`}></div>
          </button>
          <span className={isAnnual ? 'active' : ''}>Annual <span className="discount">Save 20%</span></span>
        </div>
      </div>
      
      <div className="pricing-grid">
        {Object.entries(plans).map(([key, plan]) => (
          <div 
            key={key}
            className={`pricing-card ${plan.popular ? 'popular' : ''} ${selectedPlan === key ? 'selected' : ''}`}
            onClick={() => setSelectedPlan(key)}
          >
            {plan.popular && <div className="popular-badge">Most Popular</div>}
            
            <div className="plan-header">
              <h3 className="plan-name">{plan.name}</h3>
              <div className="plan-price">
                <span className="price-currency">$</span>
                <span className="price-amount">
                  {isAnnual ? plan.annualPrice : plan.monthlyPrice}
                </span>
                <span className="price-period">
                  /{isAnnual ? 'year' : 'month'}
                </span>
              </div>
            </div>
            
            <ul className="feature-list">
              {plan.features.map((feature, index) => (
                <li key={index} className="feature-item">
                  <svg className="feature-check" viewBox="0 0 24 24">
                    <path d="M9 16.17L4.83 12L3.41 13.41L9 19L21 7L19.59 5.59L9 16.17Z"/>
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
            
            <button className="cta-button pricing-cta">
              {plan.cta}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

// 2. Intelligence Level Indicator
export const IntelligenceIndicator = ({ level = 1, maxLevel = 100 }) => {
  const [animatedLevel, setAnimatedLevel] = useState(0);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedLevel(level);
    }, 500);
    return () => clearTimeout(timer);
  }, [level]);

  const percentage = (animatedLevel / maxLevel) * 100;
  
  return (
    <div className="intelligence-indicator">
      <div className="indicator-header">
        <h4>Intelligence Level</h4>
        <span className="level-display">{animatedLevel.toFixed(1)}x</span>
      </div>
      
      <div className="progress-container">
        <div className="progress-track">
          <div 
            className="progress-fill"
            style={{ width: `${percentage}%` }}
          >
            <div className="progress-glow"></div>
          </div>
        </div>
        
        <div className="level-markers">
          {[1, 5, 10, 25, 50, 100].map(marker => (
            <div 
              key={marker}
              className={`marker ${animatedLevel >= marker ? 'active' : ''}`}
              style={{ left: `${(marker / maxLevel) * 100}%` }}
            >
              <span>{marker}x</span>
            </div>
          ))}
        </div>
      </div>
      
      <p className="indicator-description">
        Current amplification: {animatedLevel < 5 ? 'Basic' : 
                               animatedLevel < 15 ? 'Enhanced' :
                               animatedLevel < 30 ? 'Premium' : 'Elite'}
      </p>
    </div>
  );
};

// 3. Glass Network Visualization
export const GlassNetworkViz = () => {
  const [nodes, setNodes] = useState([]);
  const [connections, setConnections] = useState([]);
  
  useEffect(() => {
    // Generate random neural network
    const nodeCount = 12;
    const newNodes = Array.from({ length: nodeCount }, (_, i) => ({
      id: i,
      x: Math.random() * 400,
      y: Math.random() * 300,
      size: Math.random() * 8 + 4,
      activity: Math.random()
    }));
    
    const newConnections = [];
    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        if (Math.random() > 0.7) {
          newConnections.push({
            from: i,
            to: j,
            strength: Math.random()
          });
        }
      }
    }
    
    setNodes(newNodes);
    setConnections(newConnections);
    
    // Animate network activity
    const interval = setInterval(() => {
      setNodes(prev => prev.map(node => ({
        ...node,
        activity: Math.random()
      })));
    }, 2000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="glass-network-viz">
      <h4>Live Network Activity</h4>
      <svg width="400" height="300" className="network-canvas">
        {/* Render connections */}
        {connections.map((conn, index) => {
          const fromNode = nodes[conn.from];
          const toNode = nodes[conn.to];
          if (!fromNode || !toNode) return null;
          
          return (
            <line
              key={index}
              x1={fromNode.x}
              y1={fromNode.y}
              x2={toNode.x}
              y2={toNode.y}
              stroke="rgba(6, 182, 212, 0.3)"
              strokeWidth={conn.strength * 2}
              className="connection-line"
            />
          );
        })}
        
        {/* Render nodes */}
        {nodes.map(node => (
          <circle
            key={node.id}
            cx={node.x}
            cy={node.y}
            r={node.size}
            fill={`rgba(107, 70, 193, ${0.5 + node.activity * 0.5})`}
            className="neural-node"
            style={{
              filter: `brightness(${1 + node.activity})`,
              transition: 'all 0.5s ease'
            }}
          />
        ))}
      </svg>
    </div>
  );
};

// 4. Quantum Stats Counter
export const QuantumStatsCounter = ({ endValue, label, suffix = '' }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );
    
    const element = document.getElementById(`counter-${label}`);
    if (element) observer.observe(element);
    
    return () => observer.disconnect();
  }, [label]);
  
  useEffect(() => {
    if (!isVisible) return;
    
    const duration = 2000; // 2 seconds
    const steps = 60;
    const increment = endValue / steps;
    const stepDuration = duration / steps;
    
    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const newValue = Math.min(increment * currentStep, endValue);
      setCount(newValue);
      
      if (currentStep >= steps) {
        clearInterval(timer);
      }
    }, stepDuration);
    
    return () => clearInterval(timer);
  }, [isVisible, endValue]);
  
  return (
    <div id={`counter-${label}`} className="quantum-stat">
      <div className="stat-number">
        {endValue === Infinity ? '∞' : Math.round(count).toLocaleString()}{suffix}
      </div>
      <div className="stat-label">{label}</div>
    </div>
  );
};

// 5. Interactive Demo Button
export const QuantumDemoButton = ({ onActivate }) => {
  const [isCharging, setIsCharging] = useState(false);
  const [chargeLevel, setChargeLevel] = useState(0);
  
  const handleCharge = () => {
    if (isCharging) return;
    
    setIsCharging(true);
    setChargeLevel(0);
    
    const chargeInterval = setInterval(() => {
      setChargeLevel(prev => {
        if (prev >= 100) {
          clearInterval(chargeInterval);
          setIsCharging(false);
          if (onActivate) onActivate();
          return 0;
        }
        return prev + 2;
      });
    }, 50);
  };
  
  return (
    <button 
      className={`quantum-demo-button ${isCharging ? 'charging' : ''}`}
      onClick={handleCharge}
      disabled={isCharging}
    >
      <div className="button-background">
        <div 
          className="charge-indicator"
          style={{ width: `${chargeLevel}%` }}
        ></div>
      </div>
      
      <span className="button-text">
        {isCharging ? `Charging... ${chargeLevel}%` : 'Activate Quantum Demo'}
      </span>
      
      <div className="button-particles">
        {Array.from({ length: 6 }, (_, i) => (
          <div key={i} className="particle"></div>
        ))}
      </div>
    </button>
  );
};

// 6. Newsletter Signup with Consciousness Themes
export const QuantumNewsletterSignup = () => {
  const [email, setEmail] = useState('');
  const [consciousnessLevel, setConsciousnessLevel] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      // Simulate consciousness expansion
      let level = 1;
      const expandInterval = setInterval(() => {
        level += 0.5;
        setConsciousnessLevel(level);
        if (level >= 28.97) {
          clearInterval(expandInterval);
        }
      }, 100);
    }
  };
  
  if (isSubmitted) {
    return (
      <div className="newsletter-success">
        <h3>🧠 Consciousness Expansion Initiated</h3>
        <ConsciousnessIndicator level={consciousnessLevel} maxLevel={30} />
        <p>Welcome to the quantum realm. Check your email for next steps.</p>
      </div>
    );
  }
  
  return (
    <form className="quantum-newsletter" onSubmit={handleSubmit}>
      <h3>🚀 Join the Consciousness Revolution</h3>
      <p>Get exclusive access to quantum intelligence updates</p>
      
      <div className="input-group">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your.consciousness@quantum.realm"
          className="quantum-input"
          required
        />
        <button type="submit" className="submit-button">
          Expand Consciousness
        </button>
      </div>
      
      <p className="newsletter-benefits">
        ✨ Exclusive quantum insights • 🧠 Consciousness tips • 🚀 Early access to new features
      </p>
    </form>
  );
};

export default {
  NexusPricingCard,
  ConsciousnessIndicator,
  NeuralNetworkViz,
  QuantumStatsCounter,
  QuantumDemoButton,
  QuantumNewsletterSignup
};
