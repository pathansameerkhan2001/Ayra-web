"use client";

import React, { useEffect, useRef } from "react";

// Track whether the animation has already run in the current browser session
let hasExecutedInSession = false;

// Pre-render distinct luxury floral/petal sprites on offscreen canvases
function createPetalSprites(): HTMLCanvasElement[] {
  if (typeof document === "undefined") return [];

  const SPRITE_SIZE = 72;
  const sprites: HTMLCanvasElement[] = [];

  const makeCanvas = (): [HTMLCanvasElement, CanvasRenderingContext2D | null] => {
    const c = document.createElement("canvas");
    c.width = SPRITE_SIZE;
    c.height = SPRITE_SIZE;
    const ctx = c.getContext("2d");
    return [c, ctx];
  };

  // 1. Full Peach Blossom (5-petal blossom with apricot-peach gradient & gold pistil)
  {
    const [c, ctx] = makeCanvas();
    if (ctx) {
      const cx = SPRITE_SIZE / 2;
      const cy = SPRITE_SIZE / 2;

      ctx.save();
      ctx.translate(cx, cy);

      // 5 Rounded Petals
      for (let i = 0; i < 5; i++) {
        ctx.save();
        ctx.rotate((i * 2 * Math.PI) / 5);

        const grad = ctx.createRadialGradient(0, -15, 2, 0, -12, 18);
        grad.addColorStop(0, "#FFF9F6");
        grad.addColorStop(0.35, "#FCE9DE");
        grad.addColorStop(0.7, "#F2C2AD");
        grad.addColorStop(1, "#D9886D");

        ctx.beginPath();
        ctx.ellipse(0, -16, 11, 16, 0, 0, 2 * Math.PI);
        ctx.fillStyle = grad;
        ctx.fill();
        ctx.strokeStyle = "rgba(185, 120, 120, 0.6)";
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.restore();
      }

      // Champagne Gold Center
      ctx.beginPath();
      ctx.arc(0, 0, 6.5, 0, 2 * Math.PI);
      const pistilGrad = ctx.createRadialGradient(0, 0, 1, 0, 0, 6.5);
      pistilGrad.addColorStop(0, "#FFFDF9");
      pistilGrad.addColorStop(0.5, "#E6C88A");
      pistilGrad.addColorStop(1, "#A38038");
      ctx.fillStyle = pistilGrad;
      ctx.fill();
      ctx.strokeStyle = "rgba(163, 128, 56, 0.8)";
      ctx.lineWidth = 0.8;
      ctx.stroke();

      ctx.restore();
      sprites.push(c);
    }
  }

  // 2. Romantic Blush Rose Petal
  {
    const [c, ctx] = makeCanvas();
    if (ctx) {
      const cx = SPRITE_SIZE / 2;
      const cy = SPRITE_SIZE / 2;

      const grad = ctx.createRadialGradient(cx - 6, cy - 10, 3, cx, cy, 32);
      grad.addColorStop(0, "#FFF7F7");
      grad.addColorStop(0.4, "#F9E9E6");
      grad.addColorStop(0.75, "#E8B7B5");
      grad.addColorStop(1, "#C87A78");

      ctx.save();
      ctx.translate(cx, cy);
      ctx.beginPath();
      ctx.moveTo(0, -30);
      ctx.bezierCurveTo(-22, -18, -28, 8, -22, 24);
      ctx.bezierCurveTo(-18, 33, -6, 32, 0, 30);
      ctx.bezierCurveTo(6, 32, 18, 33, 22, 24);
      ctx.bezierCurveTo(28, 8, 22, -18, 0, -30);
      ctx.closePath();

      ctx.fillStyle = grad;
      ctx.fill();
      ctx.strokeStyle = "rgba(185, 120, 120, 0.65)";
      ctx.lineWidth = 1;
      ctx.stroke();

      // Delicate center vein
      ctx.beginPath();
      ctx.moveTo(0, -25);
      ctx.quadraticCurveTo(2, 0, 0, 26);
      ctx.strokeStyle = "rgba(255, 255, 255, 0.6)";
      ctx.lineWidth = 0.9;
      ctx.stroke();

      ctx.restore();
      sprites.push(c);
    }
  }

  // 3. Curved Apricot / Nude Petal
  {
    const [c, ctx] = makeCanvas();
    if (ctx) {
      const cx = SPRITE_SIZE / 2;
      const cy = SPRITE_SIZE / 2;

      const grad = ctx.createLinearGradient(12, 12, 60, 60);
      grad.addColorStop(0, "#FFFAF5");
      grad.addColorStop(0.35, "#FCE9DE");
      grad.addColorStop(0.7, "#E8C7B7");
      grad.addColorStop(1, "#C79A83");

      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(0.25);
      ctx.beginPath();
      ctx.moveTo(-16, -26);
      ctx.bezierCurveTo(-3, -32, 18, -24, 25, -6);
      ctx.bezierCurveTo(30, 12, 16, 28, 0, 28);
      ctx.bezierCurveTo(-15, 28, -28, 14, -28, -2);
      ctx.bezierCurveTo(-28, -16, -24, -22, -16, -26);
      ctx.closePath();

      ctx.fillStyle = grad;
      ctx.fill();
      ctx.strokeStyle = "rgba(199, 154, 131, 0.65)";
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.restore();
      sprites.push(c);
    }
  }

  // 4. Delicate Cherry Sakura Petal with Notch
  {
    const [c, ctx] = makeCanvas();
    if (ctx) {
      const cx = SPRITE_SIZE / 2;
      const cy = SPRITE_SIZE / 2;

      const grad = ctx.createRadialGradient(cx, cy - 8, 2, cx, cy, 30);
      grad.addColorStop(0, "#FFFFFF");
      grad.addColorStop(0.4, "#FCE4E4");
      grad.addColorStop(0.8, "#F3B5B5");
      grad.addColorStop(1, "#D67A7A");

      ctx.save();
      ctx.translate(cx, cy);
      ctx.beginPath();
      ctx.moveTo(0, 26);
      ctx.bezierCurveTo(-18, 20, -25, -2, -18, -22);
      ctx.bezierCurveTo(-12, -30, -5, -28, -2, -22);
      ctx.lineTo(0, -18);
      ctx.lineTo(2, -22);
      ctx.bezierCurveTo(5, -28, 12, -30, 18, -22);
      ctx.bezierCurveTo(25, -2, 18, 20, 0, 26);
      ctx.closePath();

      ctx.fillStyle = grad;
      ctx.fill();
      ctx.strokeStyle = "rgba(214, 122, 122, 0.7)";
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.restore();
      sprites.push(c);
    }
  }

  // 5. Champagne Gold Leaf Accent
  {
    const [c, ctx] = makeCanvas();
    if (ctx) {
      const cx = SPRITE_SIZE / 2;
      const cy = SPRITE_SIZE / 2;

      const grad = ctx.createLinearGradient(14, 14, 58, 58);
      grad.addColorStop(0, "#FFFDF7");
      grad.addColorStop(0.4, "#FAF2E3");
      grad.addColorStop(0.75, "#E6C88A");
      grad.addColorStop(1, "#B88E3E");

      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(-0.35);
      ctx.beginPath();
      ctx.moveTo(0, -28);
      ctx.bezierCurveTo(16, -18, 22, 5, 0, 28);
      ctx.bezierCurveTo(-22, 5, -16, -18, 0, -28);
      ctx.closePath();

      ctx.fillStyle = grad;
      ctx.fill();
      ctx.strokeStyle = "rgba(184, 142, 62, 0.7)";
      ctx.lineWidth = 1;
      ctx.stroke();

      // Leaf spine
      ctx.beginPath();
      ctx.moveTo(0, -24);
      ctx.lineTo(0, 24);
      ctx.strokeStyle = "rgba(138, 102, 34, 0.6)";
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
    // If it has already completed for this page lifecycle, do not restart
    if (hasExecutedInSession) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      return;
    }

    hasExecutedInSession = true;

    let animId: number | null = null;
    let isRunning = true;
    let width = window.innerWidth || document.documentElement.clientWidth || 1440;
    let height = window.innerHeight || document.documentElement.clientHeight || 900;
    const isMobile = width < 768;

    const dpr = typeof window !== "undefined" ? Math.min(window.devicePixelRatio || 1, 1.5) : 1;

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

    const sprites = createPetalSprites();
    if (sprites.length === 0) return;

    // Particle count: lighter on mobile, rich on desktop
    const particleCount = isMobile ? 24 : 38;

    // Timing constants (13 seconds total duration: 0-2s burst, 2-10s drift, 10-13s fade out)
    const TOTAL_DURATION_MS = 13000;
    const FADE_START_MS = 10000;
    const startTime = Date.now();

    const particles: PetalParticle[] = [];

    const createParticle = (prewarm: boolean): PetalParticle => {
      const spriteIndex = Math.floor(Math.random() * sprites.length);
      const startX = Math.random() * width;
      const startY = prewarm
        ? Math.random() * (height * 0.85)
        : -40 - Math.random() * (height * 0.4);

      const sizeRand = Math.random();
      let scale: number;
      if (sizeRand < 0.3) {
        scale = 0.28 + Math.random() * 0.08;
      } else if (sizeRand < 0.75) {
        scale = 0.36 + Math.random() * 0.10;
      } else {
        scale = 0.46 + Math.random() * 0.12;
      }

      return {
        x: startX,
        y: startY,
        vx: (Math.random() - 0.45) * 0.5,
        vy: 1.15 + Math.random() * 1.35,
        swaySpeed: 0.014 + Math.random() * 0.02,
        swayAmount: 1.3 + Math.random() * 1.8,
        swayPhase: Math.random() * Math.PI * 2,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.025,
        scale,
        baseOpacity: 0.85 + Math.random() * 0.15,
        spriteIndex,
      };
    };

    // Populate initial batch
    for (let i = 0; i < particleCount; i++) {
      const prewarm = i < particleCount * 0.5;
      particles.push(createParticle(prewarm));
    }

    // Main 60 FPS Render Loop with graceful stop
    const render = () => {
      if (!isRunning) return;

      const elapsed = Date.now() - startTime;

      // When 13s is reached, clear canvas and completely STOP the animation loop
      if (elapsed >= TOTAL_DURATION_MS) {
        ctx.clearRect(0, 0, width, height);
        isRunning = false;
        if (animId) cancelAnimationFrame(animId);
        return;
      }

      // Calculate global fading multiplier (1.0 during 0-10s, fading to 0.0 during 10-13s)
      let globalFade = 1;
      if (elapsed > FADE_START_MS) {
        globalFade = Math.max(0, 1 - (elapsed - FADE_START_MS) / (TOTAL_DURATION_MS - FADE_START_MS));
      }

      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Physics update
        p.swayPhase += p.swaySpeed;
        p.x += p.vx + Math.sin(p.swayPhase) * p.swayAmount;
        p.y += p.vy;
        p.rotation += p.rotationSpeed;

        // Reset if fallen below viewport during entrance phase
        if (p.y > height + 50) {
          if (elapsed < FADE_START_MS) {
            p.y = -40 - Math.random() * 50;
            p.x = Math.random() * width;
            p.vx = (Math.random() - 0.45) * 0.5;
            p.vy = 1.15 + Math.random() * 1.35;
            p.rotation = Math.random() * Math.PI * 2;
            p.spriteIndex = Math.floor(Math.random() * sprites.length);
          }
        }

        // Horizontal screen boundary wrap
        if (p.x < -40) p.x = width + 30;
        if (p.x > width + 40) p.x = -30;

        // Calculate opacity with edge fade & global fade
        let alpha = p.baseOpacity * globalFade;
        if (p.y < 30) {
          alpha *= Math.max(0.2, (p.y + 40) / 70);
        } else if (p.y > height - 60) {
          alpha *= Math.max(0, (height + 50 - p.y) / 110);
        }

        const sprite = sprites[p.spriteIndex];
        if (sprite && alpha > 0.01) {
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rotation);
          ctx.scale(p.scale, p.scale);
          ctx.globalAlpha = Math.min(1, Math.max(0, alpha));
          ctx.drawImage(sprite, -36, -36, 72, 72);
          ctx.restore();
        }
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (animId) cancelAnimationFrame(animId);
      } else {
        const currentElapsed = Date.now() - startTime;
        if (currentElapsed < TOTAL_DURATION_MS && isRunning) {
          animId = requestAnimationFrame(render);
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      isRunning = false;
      if (animId) cancelAnimationFrame(animId);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
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
