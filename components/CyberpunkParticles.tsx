import { useEffect, useRef } from 'react';

interface CyberParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  color: string;
  life: number;
  maxLife: number;
  type: 'dot' | 'line' | 'hex' | 'diamond';
  angle: number;
  trail: { x: number; y: number; opacity: number }[];
}

interface CyberLine {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  opacity: number;
  color: string;
  width: number;
  animated: boolean;
  progress: number;
}

export function CyberpunkParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<CyberParticle[]>([]);
  const linesRef = useRef<CyberLine[]>([]);
  const animationIdRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Cyberpunk color palette
    const colors = [
      '#00f5ff',  // cyber cyan
      '#5eead4',  // mint bright
      '#facc15',  // yellow bright
      '#ffffff',  // white
      '#ccfbf1'   // mint
    ];

    const initParticles = () => {
      particlesRef.current = [];
      const particleCount = Math.min(60, Math.floor(window.innerWidth / 25));
      
      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push(createParticle());
      }
    };

    const initLines = () => {
      linesRef.current = [];
      const lineCount = Math.min(12, Math.floor(window.innerWidth / 150));
      
      for (let i = 0; i < lineCount; i++) {
        linesRef.current.push(createLine());
      }
    };

    const createParticle = (): CyberParticle => {
      const types: CyberParticle['type'][] = ['dot', 'line', 'hex', 'diamond'];
      return {
        x: Math.random() * canvas.width,
        y: canvas.height + 100,
        vx: (Math.random() - 0.5) * 0.8,
        vy: -Math.random() * 3 - 1,
        size: Math.random() * 4 + 1,
        opacity: Math.random() * 0.7 + 0.3,
        color: colors[Math.floor(Math.random() * colors.length)],
        life: 0,
        maxLife: Math.random() * 1500 + 800,
        type: types[Math.floor(Math.random() * types.length)],
        angle: Math.random() * Math.PI * 2,
        trail: []
      };
    };

    const createLine = (): CyberLine => ({
      x1: Math.random() * canvas.width,
      y1: Math.random() * canvas.height,
      x2: Math.random() * canvas.width,
      y2: Math.random() * canvas.height,
      opacity: Math.random() * 0.3 + 0.1,
      color: colors[Math.floor(Math.random() * colors.length)],
      width: Math.random() * 2 + 0.5,
      animated: Math.random() > 0.7,
      progress: 0
    });

    const updateParticle = (particle: CyberParticle) => {
      // Store trail positions
      particle.trail.unshift({ x: particle.x, y: particle.y, opacity: particle.opacity });
      if (particle.trail.length > 8) {
        particle.trail.pop();
      }

      // Update trail opacity
      particle.trail.forEach((point, index) => {
        point.opacity = (particle.opacity * (8 - index)) / 8;
      });

      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.life++;
      particle.angle += 0.02;

      // Add subtle gravitational drift
      particle.vx += (Math.random() - 0.5) * 0.01;
      particle.vy += Math.sin(particle.life * 0.01) * 0.005;

      // Fade out over time
      particle.opacity = Math.max(0, 
        (particle.maxLife - particle.life) / particle.maxLife * 0.8
      );

      // Reset particle when it goes off screen or dies
      if (particle.y < -100 || particle.life >= particle.maxLife || particle.opacity <= 0) {
        Object.assign(particle, createParticle());
      }
    };

    const updateLine = (line: CyberLine) => {
      if (line.animated) {
        line.progress += 0.01;
        if (line.progress >= 1) {
          line.progress = 0;
          Object.assign(line, createLine());
        }
      }
    };

    const drawParticle = (particle: CyberParticle) => {
      // Draw trail
      particle.trail.forEach((point, index) => {
        if (point.opacity > 0) {
          ctx.save();
          ctx.globalAlpha = point.opacity * 0.3;
          ctx.fillStyle = particle.color;
          ctx.shadowBlur = 5;
          ctx.shadowColor = particle.color;
          ctx.beginPath();
          ctx.arc(point.x, point.y, particle.size * 0.3, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      });

      // Draw main particle
      ctx.save();
      ctx.globalAlpha = particle.opacity;
      ctx.translate(particle.x, particle.y);
      ctx.rotate(particle.angle);

      // Create glow effect
      ctx.shadowBlur = 15;
      ctx.shadowColor = particle.color;

      switch (particle.type) {
        case 'dot':
          // Gradient dot
          const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, particle.size);
          gradient.addColorStop(0, particle.color);
          gradient.addColorStop(1, 'transparent');
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(0, 0, particle.size, 0, Math.PI * 2);
          ctx.fill();
          break;

        case 'line':
          // Glowing line
          ctx.strokeStyle = particle.color;
          ctx.lineWidth = particle.size * 0.5;
          ctx.beginPath();
          ctx.moveTo(-particle.size, 0);
          ctx.lineTo(particle.size, 0);
          ctx.stroke();
          break;

        case 'hex':
          // Hexagon
          ctx.strokeStyle = particle.color;
          ctx.lineWidth = 1;
          ctx.beginPath();
          for (let i = 0; i < 6; i++) {
            const angle = (i * Math.PI) / 3;
            const x = Math.cos(angle) * particle.size;
            const y = Math.sin(angle) * particle.size;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.closePath();
          ctx.stroke();
          break;

        case 'diamond':
          // Diamond shape
          ctx.strokeStyle = particle.color;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(0, -particle.size);
          ctx.lineTo(particle.size, 0);
          ctx.lineTo(0, particle.size);
          ctx.lineTo(-particle.size, 0);
          ctx.closePath();
          ctx.stroke();
          break;
      }

      ctx.restore();
    };

    const drawLine = (line: CyberLine) => {
      ctx.save();
      ctx.globalAlpha = line.opacity;
      ctx.strokeStyle = line.color;
      ctx.lineWidth = line.width;
      ctx.shadowBlur = 10;
      ctx.shadowColor = line.color;

      if (line.animated && line.progress < 1) {
        // Animated line drawing
        const currentX = line.x1 + (line.x2 - line.x1) * line.progress;
        const currentY = line.y1 + (line.y2 - line.y1) * line.progress;
        
        ctx.beginPath();
        ctx.moveTo(line.x1, line.y1);
        ctx.lineTo(currentX, currentY);
        ctx.stroke();
      } else {
        // Static line
        ctx.beginPath();
        ctx.moveTo(line.x1, line.y1);
        ctx.lineTo(line.x2, line.y2);
        ctx.stroke();
      }

      ctx.restore();
    };

    const drawConnections = () => {
      // Connect nearby particles
      particlesRef.current.forEach((particle, i) => {
        particlesRef.current.slice(i + 1).forEach(otherParticle => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 120) {
            ctx.save();
            ctx.globalAlpha = (120 - distance) / 120 * 0.2;
            ctx.strokeStyle = particle.color;
            ctx.lineWidth = 0.5;
            ctx.shadowBlur = 5;
            ctx.shadowColor = particle.color;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.stroke();
            ctx.restore();
          }
        });
      });
    };

    const drawScanLines = () => {
      // Horizontal scan lines
      const time = Date.now() * 0.001;
      for (let i = 0; i < 3; i++) {
        const y = (Math.sin(time + i) * 0.5 + 0.5) * canvas.height;
        ctx.save();
        ctx.globalAlpha = 0.1;
        ctx.strokeStyle = colors[i % colors.length];
        ctx.lineWidth = 2;
        ctx.shadowBlur = 20;
        ctx.shadowColor = colors[i % colors.length];
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
        ctx.restore();
      }
    };

    const animate = () => {
      // Clear with fade effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      particlesRef.current.forEach(particle => {
        updateParticle(particle);
        drawParticle(particle);
      });

      // Update and draw lines
      linesRef.current.forEach(line => {
        updateLine(line);
        drawLine(line);
      });

      // Draw connections between particles
      drawConnections();

      // Draw ambient scan lines
      drawScanLines();

      animationIdRef.current = requestAnimationFrame(animate);
    };

    initParticles();
    initLines();
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0"
      style={{ background: 'transparent' }}
    />
  );
}