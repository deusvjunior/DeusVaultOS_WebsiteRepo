import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface ShaderTextProps {
  text: string;
  className?: string;
  duration?: number;
  delay?: number;
  onComplete?: () => void;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  color: string;
  opacity: number;
  char: string;
}

export function ShaderText({ text, className = '', duration = 3000, delay = 0, onComplete }: ShaderTextProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showText, setShowText] = useState(false);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>();

  useEffect(() => {
    const timer = setTimeout(() => {
      startDissolveAnimation();
    }, delay);

    return () => clearTimeout(timer);
  }, [text, delay]);

  const startDissolveAnimation = () => {
    if (!canvasRef.current || !textRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const textElement = textRef.current;
    
    if (!ctx) return;

    // Set canvas size
    const rect = textElement.getBoundingClientRect();
    canvas.width = rect.width * 2; // High DPI
    canvas.height = rect.height * 2;
    canvas.style.width = rect.width + 'px';
    canvas.style.height = rect.height + 'px';
    ctx.scale(2, 2);

    // Get computed styles
    const computedStyle = window.getComputedStyle(textElement);
    const fontSize = parseFloat(computedStyle.fontSize);
    const fontFamily = computedStyle.fontFamily;
    const fontWeight = computedStyle.fontWeight;

    setIsAnimating(true);

    // Create particles from text
    createTextParticles(ctx, text, fontSize, fontFamily, fontWeight, rect.width, rect.height);

    // Start animation
    animateParticles(ctx, () => {
      setIsAnimating(false);
      setShowText(true);
      onComplete?.();
    });
  };

  const createTextParticles = (
    ctx: CanvasRenderingContext2D,
    text: string,
    fontSize: number,
    fontFamily: string,
    fontWeight: string,
    width: number,
    height: number
  ) => {
    // Set font for measurement
    ctx.font = `${fontWeight} ${fontSize}px ${fontFamily}`;
    ctx.fillStyle = '#00e1ff';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Clear previous particles
    particlesRef.current = [];

    // Create particles for each character
    const lines = text.split('\n');
    const lineHeight = fontSize * 1.2;
    const totalHeight = lines.length * lineHeight;
    const startY = (height - totalHeight) / 2 + fontSize / 2;

    lines.forEach((line, lineIndex) => {
      const lineWidth = ctx.measureText(line).width;
      const startX = (width - lineWidth) / 2;
      const y = startY + lineIndex * lineHeight;

      [...line].forEach((char, charIndex) => {
        if (char === ' ') return;

        const charWidth = ctx.measureText(char).width;
        const x = startX + ctx.measureText(line.slice(0, charIndex)).width + charWidth / 2;

        // Create multiple particles per character
        const particleCount = Math.max(3, Math.floor(charWidth / 2));
        
        for (let i = 0; i < particleCount; i++) {
          const particle: Particle = {
            x: x + (Math.random() - 0.5) * charWidth,
            y: y + (Math.random() - 0.5) * fontSize * 0.3,
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2,
            life: 0,
            maxLife: duration + Math.random() * 1000,
            size: Math.random() * 3 + 1,
            color: ['#00e1ff', '#34d399', '#fbbf24'][Math.floor(Math.random() * 3)],
            opacity: 0,
            char: char
          };
          
          particlesRef.current.push(particle);
        }
      });
    });
  };

  const animateParticles = (ctx: CanvasRenderingContext2D, onComplete: () => void) => {
    const animate = () => {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

      let activeParticles = 0;

      particlesRef.current.forEach(particle => {
        particle.life += 16; // ~60fps
        
        // Phase 1: Dissolve in (particles move to form text)
        const phase1Duration = duration * 0.6;
        const phase2Duration = duration * 0.4;
        
        if (particle.life < phase1Duration) {
          // Dissolve in phase
          const progress = particle.life / phase1Duration;
          particle.opacity = Math.sin(progress * Math.PI) * 0.8;
          
          // Particles move toward their final position
          particle.x += particle.vx * (1 - progress);
          particle.y += particle.vy * (1 - progress);
          
          activeParticles++;
        } else if (particle.life < phase1Duration + phase2Duration) {
          // Hold phase
          particle.opacity = 0.9;
          activeParticles++;
        } else {
          // Fade out
          const fadeProgress = (particle.life - phase1Duration - phase2Duration) / (particle.maxLife - phase1Duration - phase2Duration);
          particle.opacity = Math.max(0, 1 - fadeProgress);
          
          if (particle.opacity > 0) {
            activeParticles++;
          }
        }

        // Draw particle
        if (particle.opacity > 0) {
          ctx.save();
          ctx.globalAlpha = particle.opacity;
          ctx.fillStyle = particle.color;
          ctx.shadowBlur = 10;
          ctx.shadowColor = particle.color;
          
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fill();
          
          ctx.restore();
        }
      });

      if (activeParticles > 0) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        onComplete();
      }
    };

    animate();
  };

  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div className="relative">
      <div
        ref={textRef}
        className={`${className} ${showText ? 'opacity-100' : 'opacity-0'} transition-opacity duration-1000`}
      >
        {text}
      </div>
      
      {isAnimating && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 pointer-events-none"
          style={{ zIndex: 10 }}
        />
      )}
    </div>
  );
}