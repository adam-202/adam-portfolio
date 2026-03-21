import React, { useEffect, useRef } from 'react';

const BackgroundGrid: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    
    // Mouse interaction
    let mouseX = width / 2;
    let mouseY = height / 2;

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    handleResize();

    const gridSize = 40;
    const dotSize = 1;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Dynamic offset based on mouse to create parallax
      const offsetX = (mouseX - width / 2) * 0.05;
      const offsetY = (mouseY - height / 2) * 0.05;

      ctx.strokeStyle = 'rgba(34, 211, 238, 0.08)'; // Blueprint Cyan low opacity
      ctx.lineWidth = 1;

      // Draw Grid Lines
      ctx.beginPath();
      for (let x = offsetX % gridSize; x < width; x += gridSize) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      for (let y = offsetY % gridSize; y < height; y += gridSize) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      ctx.stroke();

      // Draw Intersections (Technical dots)
      ctx.fillStyle = 'rgba(34, 211, 238, 0.3)';
      for (let x = offsetX % gridSize; x < width; x += gridSize) {
        for (let y = offsetY % gridSize; y < height; y += gridSize) {
          // Highlight dots near mouse
          const dist = Math.hypot(x - mouseX, y - mouseY);
          const size = dist < 200 ? dotSize * 2 : dotSize;
          const alpha = dist < 200 ? 0.6 : 0.3;
          
          ctx.fillStyle = `rgba(34, 211, 238, ${alpha})`;
          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      requestAnimationFrame(draw);
    };

    const animId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none"
    />
  );
};

export default BackgroundGrid;
