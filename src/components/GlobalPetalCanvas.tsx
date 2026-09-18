"use client";

import React, { useEffect, useRef } from "react";

// Pre-rendered offscreen sprite canvases
function createPetalSprites(): HTMLCanvasElement[] {
  if (typeof document === "undefined") return [];

  const SPRITE_SIZE = 64;
  const sprites: HTMLCanvasElement[] = [];

  // Helper to create an offscreen canvas
  const makeCanvas = (): [HTMLCanvasElement, CanvasRenderingContext2D | null] => {
    const c = document.createElement("canvas");
    c.width = SPRITE_SIZE;
    c.height = SPRITE_SIZE;
    const ctx = c.getContext("2d");
    return [c, ctx];
  };

  // 1. Blush Rose Petal (Deep rich romantic pink)
  {
    const [c, ctx] = makeCanvas();
    if (ctx) {
      const cx = SPRITE_SIZE / 2;
      const cy = SPRITE_SIZE / 2;

      const grad = ctx.createRadialGradient(cx - 6, cy - 8, 4, cx, cy, 28);
      grad.addColorStop(0, "#FFF5F4");
      grad.addColorStop(0.45, "#F08A88");
      grad.addColorStop(1, "#B84240");

      ctx.save();
      ctx.translate(cx, cy);
      ctx.beginPath();
      ctx.moveTo(0, -26);
      ctx.bezierCurveTo(-18, -16, -26, 4, -22, 18);
      ctx.bezierCurveTo(-18, 28, -6, 28, 0, 26);
      ctx.bezierCurveTo(6, 28, 18, 28, 22, 18);
      ctx.bezierCurveTo(26, 4, 18, -16, 0, -26);
      ctx.closePath();

      ctx.fillStyle = grad;
      ctx.fill();
      ctx.strokeStyle = "#94302E";
      ctx.lineWidth = 1.2;
      ctx.stroke();

      // Petal inner spine highlight
      ctx.beginPath();
      ctx.moveTo(0, -20);
      ctx.bezierCurveTo(-6, -4, -6, 12, 0, 22);
      ctx.strokeStyle = "rgba(255, 255, 255, 0.7)";
      ctx.lineWidth = 1.0;
      ctx.stroke();

      ctx.restore();
      sprites.push(c);
    }
  }

  // 2. Pale Pink Rose Petal
  {
    const [c, ctx] = makeCanvas();
    if (ctx) {
      const cx = SPRITE_SIZE / 2;
      const cy = SPRITE_SIZE / 2;

      const grad = ctx.createRadialGradient(cx - 5, cy - 8, 4, cx, cy, 28);
      grad.addColorStop(0, "#FFFDFC");
      grad.addColorStop(0.5, "#E57572");
      grad.addColorStop(1, "#A83634");

      ctx.save();
      ctx.translate(cx, cy);
      ctx.beginPath();
      ctx.moveTo(0, -26);
      ctx.bezierCurveTo(-20, -14, -24, 8, -16, 22);
      ctx.bezierCurveTo(-8, 28, 8, 28, 16, 22);
      ctx.bezierCurveTo(24, 8, 20, -14, 0, -26);
      ctx.closePath();

      ctx.fillStyle = grad;
      ctx.fill();
      ctx.strokeStyle = "#8C2A28";
      ctx.lineWidth = 1.2;
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(0, -18);
      ctx.bezierCurveTo(4, -2, 4, 14, 0, 22);
      ctx.strokeStyle = "rgba(255, 255, 255, 0.65)";
      ctx.lineWidth = 0.9;
      ctx.stroke();

      ctx.restore();
      sprites.push(c);
    }
  }

  // 3. Five-Petal Little White Blossom
  {
    const [c, ctx] = makeCanvas();
    if (ctx) {
      const cx = SPRITE_SIZE / 2;
      const cy = SPRITE_SIZE / 2;

      ctx.save();
      ctx.translate(cx, cy);

      // 5 Petals
      for (let i = 0; i < 5; i++) {
        ctx.save();
        ctx.rotate((i * 2 * Math.PI) / 5);

        const grad = ctx.createRadialGradient(0, -14, 2, 0, -12, 14);
        grad.addColorStop(0, "#FFFFFF");
        grad.addColorStop(0.65, "#FCEBE9");
        grad.addColorStop(1, "#E09592");

        ctx.beginPath();
        ctx.ellipse(0, -14, 8, 12, 0, 0, 2 * Math.PI);
        ctx.fillStyle = grad;
        ctx.fill();
        ctx.strokeStyle = "#B85250";
        ctx.lineWidth = 0.9;
        ctx.stroke();
        ctx.restore();
      }

      // Golden pistil & pollen center
      ctx.beginPath();
      ctx.arc(0, 0, 6, 0, 2 * Math.PI);
      ctx.fillStyle = "#E5B842";
      ctx.fill();
      ctx.strokeStyle = "#9C6B18";
      ctx.lineWidth = 0.8;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(0, 0, 2.5, 0, 2 * Math.PI);
      ctx.fillStyle = "#7D5508";
      ctx.fill();

      ctx.restore();
      sprites.push(c);
    }
  }

  // 4. Cherry Blossom Petal (Notched Apex)
  {
    const [c, ctx] = makeCanvas();
    if (ctx) {
      const cx = SPRITE_SIZE / 2;
      const cy = SPRITE_SIZE / 2;

      const grad = ctx.createLinearGradient(cx, cy - 26, cx, cy + 24);
      grad.addColorStop(0, "#FFF5F5");
      grad.addColorStop(0.5, "#F29492");
      grad.addColorStop(1, "#B83A38");

      ctx.save();
      ctx.translate(cx, cy);
      ctx.beginPath();
      ctx.moveTo(0, -20);
      ctx.bezierCurveTo(-8, -28, -20, -16, -20, 2);
      ctx.bezierCurveTo(-20, 16, -10, 26, 0, 26);
      ctx.bezierCurveTo(10, 26, 20, 16, 20, 2);
      ctx.bezierCurveTo(20, -16, 8, -28, 0, -20);
      ctx.closePath();

      ctx.fillStyle = grad;
      ctx.fill();
      ctx.strokeStyle = "#8F2422";
      ctx.lineWidth = 1.2;
      ctx.stroke();

      ctx.restore();
      sprites.push(c);
    }
  }

  // 5. Tiny Soft Green Leaf
  {
    const [c, ctx] = makeCanvas();
    if (ctx) {
      const cx = SPRITE_SIZE / 2;
      const cy = SPRITE_SIZE / 2;

      const grad = ctx.createLinearGradient(cx, cy - 24, cx, cy + 24);
      grad.addColorStop(0, "#E0EFE0");
      grad.addColorStop(0.55, "#6C9960");
      grad.addColorStop(1, "#36592B");

      ctx.save();
      ctx.translate(cx, cy);
      ctx.beginPath();
      ctx.moveTo(0, -24);
      ctx.bezierCurveTo(-14, -12, -18, 10, 0, 24);
      ctx.bezierCurveTo(18, 10, 14, -12, 0, -24);
      ctx.closePath();

      ctx.fillStyle = grad;
      ctx.fill();
      ctx.strokeStyle = "#27421E";
      ctx.lineWidth = 1.1;
      ctx.stroke();

      // Leaf vein
      ctx.beginPath();
      ctx.moveTo(0, -20);
      ctx.lineTo(0, 20);
      ctx.strokeStyle = "rgba(255, 255, 255, 0.7)";
      ctx.lineWidth = 0.8;
      ctx.stroke();

      ctx.restore();
      sprites.push(c);
    }
  }

  return sprites;
}

interface PetalParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  swaySpeed: number;
  swayAmount: number;
  swayPhase: number;
  rotation: number;
  rotationSpeed: number;
  scale: number;
  baseOpacity: number;
  spriteIndex: number;
}

export const GlobalPetalCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animId: number;
    let isRunning = true;
    let width = window.innerWidth || document.documentElement.clientWidth || 1440;
    let height = window.innerHeight || document.documentElement.clientHeight || 900;
    const isMobile = width < 768;

    // Capped DPR for maximum GPU efficiency & crisp rendering
    const dpr = typeof window !== "undefined" ? Math.min(window.devicePixelRatio || 1, 2) : 1;

    const resizeCanvas = () => {
      width = window.innerWidth || document.documentElement.clientWidth || 1440;
      height = window.innerHeight || document.documentElement.clientHeight || 900;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resizeCanvas();
    // Second check after layout settles
    requestAnimationFrame(resizeCanvas);

    // Create Pre-rendered Sprites
    const sprites = createPetalSprites();
    if (sprites.length === 0) return;

    // Particle count: 38 on desktop, 20 on mobile
    const totalParticles = isMobile ? 20 : 38;
    const particles: PetalParticle[] = [];

    // Helper to initialize a particle
    const createParticle = (prewarm: boolean): PetalParticle => {
      const spriteIndex = Math.floor(Math.random() * sprites.length);
      const startX = Math.random() * width;
      // Prewarm spreads across viewport on frame 1; non-prewarm starts above top
      const startY = prewarm
        ? Math.random() * height * 0.95
        : -40 - Math.random() * (height * 0.5);

      return {
        x: startX,
        y: startY,
        vx: (Math.random() - 0.45) * 0.45,
        vy: 1.1 + Math.random() * 1.3, // Falling speed: 1.1 to 2.4 px/frame
        swaySpeed: 0.012 + Math.random() * 0.016,
        swayAmount: 1.2 + Math.random() * 1.8,
        swayPhase: Math.random() * Math.PI * 2,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.024,
        scale: 0.42 + Math.random() * 0.35, // Size: ~27px to 48px
        baseOpacity: 0.78 + Math.random() * 0.2, // Vibrant opacity: 0.78 to 0.98
        spriteIndex,
      };
    };

    // Populate initial particle pool (half prewarmed, half above top)
    for (let i = 0; i < totalParticles; i++) {
      const prewarm = i < totalParticles * 0.55;
      particles.push(createParticle(prewarm));
    }

    // Main 60 FPS Render Loop
    const render = () => {
      if (!isRunning) return;

      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Update physics
        p.swayPhase += p.swaySpeed;
        p.x += p.vx + Math.sin(p.swayPhase) * p.swayAmount;
        p.y += p.vy;
        p.rotation += p.rotationSpeed;

        // Reset when fallen below screen
        if (p.y > height + 60) {
          p.y = -40 - Math.random() * 80;
          p.x = Math.random() * width;
          p.vx = (Math.random() - 0.45) * 0.45;
          p.vy = 1.1 + Math.random() * 1.3;
          p.rotation = Math.random() * Math.PI * 2;
          p.spriteIndex = Math.floor(Math.random() * sprites.length);
        }

        // Horizontal screen wrap
        if (p.x < -40) p.x = width + 30;
        if (p.x > width + 40) p.x = -30;

        // Smooth vertical opacity fading near edges
        let alpha = p.baseOpacity;
        if (p.y < 40) {
          alpha *= Math.max(0.1, (p.y + 40) / 80);
        } else if (p.y > height - 60) {
          alpha *= Math.max(0, (height + 60 - p.y) / 120);
        }

        // Draw pre-rendered sprite
        const sprite = sprites[p.spriteIndex];
        if (sprite) {
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rotation);
          ctx.scale(p.scale, p.scale);
          ctx.globalAlpha = Math.min(1, Math.max(0, alpha));
          ctx.drawImage(sprite, -32, -32, 64, 64);
          ctx.restore();
        }
      }

      animId = requestAnimationFrame(render);
    };

    // Start animation loop
    animId = requestAnimationFrame(render);

    // Pause on hidden tab, resume on visible
    const handleVisibilityChange = () => {
      if (document.hidden) {
        isRunning = false;
        cancelAnimationFrame(animId);
      } else {
        if (!isRunning) {
          isRunning = true;
          animId = requestAnimationFrame(render);
        }
      }
    };

    // Debounced Resize handler
    let resizeTimer: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        resizeCanvas();
      }, 150);
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      isRunning = false;
      cancelAnimationFrame(animId);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[9000] overflow-hidden"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 9000,
      }}
      aria-hidden="true"
    />
  );
};
