/**
 * 🌟 HIGH-QUALITY ATMOSPHERIC PARTICLES
 * 
 * Premium atmospheric particle system with cinematic floating motes.
 * Features smooth physics simulation, interactive elements, and 
 * brand-aligned visual effects for professional atmosphere.
 * 
 * @features
 * - Subtle floating particles with realistic physics
 * - Smooth easing and gentle movement patterns
 * - Brand-aligned cyan/yellow color scheme  
 * - Optimized performance with intelligent rendering
 * - Interactive cursor attraction effects
 * 
 * @author THERION_ATMOSPHERIC_ENGINEER
 * @version 1.0.0 - PREMIUM_ATMOSPHERE
 */

import { useEffect, useRef, useCallback } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  color: string;
  targetOpacity: number;
  life: number;
  maxLife: number;
  angle: number;
  angleSpeed: number;
}

interface AtmosphericParticlesProps {
  className?: string;
  intensity?: 'subtle' | 'medium' | 'cinematic';
  interactive?: boolean;
}

export function AtmosphericParticles({ 
  className = "", 
  intensity = 'subtle',
  interactive = true 
}: AtmosphericParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationIdRef = useRef<number>();
  const mouseRef = useRef({ x: 0, y: 0 });

  const config = {
    subtle: { count: 25, speed: 0.5, size: { min: 1, max: 2.5 }, attraction: 50 },
    medium: { count: 40, speed: 0.8, size: { min: 1, max: 3 }, attraction: 75 },
    cinematic: { count: 60, speed: 1.2, size: { min: 1.5, max: 4 }, attraction: 100 }
  }[intensity];

  const brandColors = [
    '#00FFFF', // Electric cyan
    '#FFD700', // Pure gold yellow
    '#4ECDC4', // Soft mint cyan
    '#FFA500', // Warm orange-yellow
    '#88E5D3', // Light mint
    '#FFE55C', // Light gold
  ];

  const createParticle = useCallback((): Particle => {
    const canvas = canvasRef.current;
    if (!canvas) return {} as Particle;

    return {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * config.speed,
      vy: (Math.random() - 0.5) * config.speed,
      size: config.size.min + Math.random() * (config.size.max - config.size.min),
      opacity: 0,
      targetOpacity: 0.2 + Math.random() * 0.4,
      color: brandColors[Math.floor(Math.random() * brandColors.length)],
      life: 0,
      maxLife: 3000 + Math.random() * 4000,
      angle: Math.random() * Math.PI * 2,
      angleSpeed: (Math.random() - 0.5) * 0.02,
    };
  }, [config, brandColors]);

  const updateParticle = useCallback((particle: Particle, deltaTime: number, canvas: HTMLCanvasElement) => {
    // Gentle floating motion with subtle drift
    particle.angle += particle.angleSpeed;
    particle.vx += Math.sin(particle.angle) * 0.002;
    particle.vy += Math.cos(particle.angle) * 0.002;

    // Interactive attraction to cursor
    if (interactive) {
      const dx = mouseRef.current.x - particle.x;
      const dy = mouseRef.current.y - particle.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < config.attraction && distance > 0) {
        const force = (config.attraction - distance) / config.attraction * 0.0008;
        particle.vx += dx / distance * force;
        particle.vy += dy / distance * force;
      }
    }

    // Apply velocity with gentle damping
    particle.x += particle.vx * deltaTime;
    particle.y += particle.vy * deltaTime;
    particle.vx *= 0.999; // Very gentle damping
    particle.vy *= 0.999;

    // Wrap around screen edges
    if (particle.x < -10) particle.x = canvas.width + 10;
    if (particle.x > canvas.width + 10) particle.x = -10;
    if (particle.y < -10) particle.y = canvas.height + 10;
    if (particle.y > canvas.height + 10) particle.y = -10;

    // Smooth opacity transitions
    particle.life += deltaTime;
    const lifeFactor = particle.life / particle.maxLife;
    
    if (lifeFactor < 0.1) {
      // Fade in
      particle.opacity = particle.targetOpacity * (lifeFactor / 0.1);
    } else if (lifeFactor > 0.9) {
      // Fade out
      particle.opacity = particle.targetOpacity * ((1 - lifeFactor) / 0.1);
    } else {
      // Gentle breathing effect
      const breathe = Math.sin(particle.life * 0.002) * 0.1;
      particle.opacity = particle.targetOpacity + breathe;
    }

    // Reset particle when life expires
    if (particle.life >= particle.maxLife) {
      Object.assign(particle, createParticle());
    }
  }, [config, interactive, createParticle]);

  const drawParticle = useCallback((ctx: CanvasRenderingContext2D, particle: Particle) => {
    ctx.save();
    ctx.globalAlpha = Math.max(0, particle.opacity);
    
    // Create soft gradient glow
    const gradient = ctx.createRadialGradient(
      particle.x, particle.y, 0,
      particle.x, particle.y, particle.size * 2
    );
    gradient.addColorStop(0, particle.color);
    gradient.addColorStop(0.7, particle.color + '66'); // Semi-transparent
    gradient.addColorStop(1, 'transparent');
    
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.size * 2, 0, Math.PI * 2);
    ctx.fill();
    
    // Central bright core
    ctx.fillStyle = particle.color;
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.size * 0.5, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.restore();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let lastTime = 0;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    if (interactive) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    // Initialize particles
    particlesRef.current = Array.from({ length: config.count }, createParticle);

    const animate = (currentTime: number) => {
      const deltaTime = currentTime - lastTime;
      lastTime = currentTime;

      // Clear canvas with subtle fade effect for trails
      ctx.fillStyle = 'rgba(0, 0, 0, 0.02)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particlesRef.current.forEach(particle => {
        updateParticle(particle, deltaTime, canvas);
        drawParticle(ctx, particle);
      });

      animationIdRef.current = requestAnimationFrame(animate);
    };

    animationIdRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (interactive) {
        window.removeEventListener('mousemove', handleMouseMove);
      }
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
    };
  }, [config, createParticle, updateParticle, drawParticle, interactive]);

  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0"
        style={{ 
          background: 'transparent',
          mixBlendMode: 'screen', // Adds beautiful glow blending
        }}
      />
    </div>
  );
}
