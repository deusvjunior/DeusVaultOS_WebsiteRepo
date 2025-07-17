import React, { useEffect, useRef } from 'react';

const CyberpunkLoadingScreen: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let frame = 0;
    const width = window.innerWidth;
    const height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    function draw() {
      frame++;
      ctx.clearRect(0, 0, width, height);
      // Neon gradient background
      const grad = ctx.createLinearGradient(0, 0, width, height);
      grad.addColorStop(0, '#00e1ff');
      grad.addColorStop(0.5, '#1a1d20');
      grad.addColorStop(1, '#ffd700');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);
      // Animated particles
      for (let i = 0; i < 60; i++) {
        const x = Math.sin(frame * 0.02 + i) * 200 + width / 2 + Math.cos(i) * 300;
        const y = Math.cos(frame * 0.015 + i * 2) * 120 + height / 2 + Math.sin(i) * 200;
        ctx.beginPath();
        ctx.arc(x, y, 8 + Math.sin(frame * 0.03 + i) * 4, 0, 2 * Math.PI);
        ctx.fillStyle = `rgba(${200 + i * 2},${220 - i * 3},255,0.7)`;
        ctx.shadowColor = '#00e1ff';
        ctx.shadowBlur = 16;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
      // Glowing cyberpunk text
      ctx.font = 'bold 3.2rem Orbitron, monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = '#00e1ff';
      ctx.shadowColor = '#ffd700';
      ctx.shadowBlur = 24;
      ctx.fillText('DEUSVAULTOS', width / 2, height / 2 - 40);
      ctx.font = '1.2rem Orbitron, monospace';
      ctx.shadowBlur = 12;
      ctx.fillStyle = '#ffd700';
      ctx.fillText('Loading the Kingdom of Heaven...', width / 2, height / 2 + 32);
      ctx.shadowBlur = 0;
      requestAnimationFrame(draw);
    }
    draw();
    return () => {
      ctx.clearRect(0, 0, width, height);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
};

export default CyberpunkLoadingScreen;
