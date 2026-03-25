"use client";

import { useEffect, useRef } from "react";

const PARTICLE_COUNT = 70;
const REPEL_RADIUS = 130;   // px — particles flee the cursor within this radius
const CONNECT_DIST = 100;   // px — draw lines between nearby particles
const REPEL_FORCE = 5;      // strength of repulsion

interface Particle {
    x: number; y: number;
    ox: number; oy: number;   // original (home) position
    vx: number; vy: number;
    r: number;
    alpha: number;
}

export default function FloatingParticles() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mouse = useRef({ x: -9999, y: -9999 });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let raf: number;
        let w = 0, h = 0;
        const particles: Particle[] = [];

        const resize = () => {
            w = canvas.width = window.innerWidth;
            h = canvas.height = window.innerHeight;
        };

        const spawn = (): Particle => {
            const x = Math.random() * (w || window.innerWidth);
            const y = Math.random() * (h || window.innerHeight);
            return {
                x, y, ox: x, oy: y,
                vx: (Math.random() - 0.5) * 0.3,
                vy: (Math.random() - 0.5) * 0.3,
                r: Math.random() * 1.6 + 0.5,
                alpha: Math.random() * 0.45 + 0.1,
            };
        };

        resize();
        window.addEventListener("resize", resize);

        for (let i = 0; i < PARTICLE_COUNT; i++) particles.push(spawn());

        // Track mouse
        const onMouseMove = (e: MouseEvent) => {
            mouse.current = { x: e.clientX, y: e.clientY };
        };
        const onMouseLeave = () => {
            mouse.current = { x: -9999, y: -9999 };
        };
        window.addEventListener("mousemove", onMouseMove, { passive: true });
        window.addEventListener("mouseleave", onMouseLeave);

        const getAccent = () =>
            getComputedStyle(document.documentElement).getPropertyValue("--accent").trim() || "#00ffcc";
        const isLight = () =>
            getComputedStyle(document.documentElement).getPropertyValue("--mode").trim() === "light";

        /** Convert any 3-or-6-char hex to rgba(r,g,b,a) — canvas needs real color values */
        const hexToRgba = (hex: string, alpha: number) => {
            let h = hex.replace("#", "").trim();
            if (h.length === 3) h = h.split("").map((c) => c + c).join("");
            const r = parseInt(h.slice(0, 2), 16);
            const g = parseInt(h.slice(2, 4), 16);
            const b = parseInt(h.slice(4, 6), 16);
            if (isNaN(r) || isNaN(g) || isNaN(b)) return `rgba(0,255,204,${alpha})`;
            return `rgba(${r},${g},${b},${alpha})`;
        };

        const draw = () => {
            ctx.clearRect(0, 0, w, h);
            const accent = getAccent();
            const alphaMod = isLight() ? 0.3 : 1;
            const mx = mouse.current.x;
            const my = mouse.current.y;

            // Draw cursor glow using proper rgba — avoids invalid hex+alpha format
            if (mx > 0 && mx < w) {
                const grad = ctx.createRadialGradient(mx, my, 0, mx, my, REPEL_RADIUS);
                grad.addColorStop(0, hexToRgba(accent, 0.12));
                grad.addColorStop(1, hexToRgba(accent, 0));
                ctx.fillStyle = grad;
                ctx.fillRect(0, 0, w, h);
            }

            // Update + draw particles
            for (const p of particles) {
                // Drift lazily
                p.x += p.vx;
                p.y += p.vy;

                // Wrap
                if (p.x < -10) p.x = w + 10;
                if (p.x > w + 10) p.x = -10;
                if (p.y < -10) p.y = h + 10;
                if (p.y > h + 10) p.y = -10;

                // Mouse repulsion
                const dx = p.x - mx;
                const dy = p.y - my;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < REPEL_RADIUS && dist > 0) {
                    const force = (REPEL_RADIUS - dist) / REPEL_RADIUS;
                    p.vx += (dx / dist) * force * REPEL_FORCE * 0.08;
                    p.vy += (dy / dist) * force * REPEL_FORCE * 0.08;
                }

                // Friction — keeps velocity bounded
                p.vx *= 0.97;
                p.vy *= 0.97;

                // Draw dot
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = accent;
                ctx.globalAlpha = p.alpha * alphaMod;
                ctx.fill();
            }

            // Connection lines between nearby particles
            ctx.lineWidth = 0.6;
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const a = particles[i];
                    const b = particles[j];
                    const dx = a.x - b.x;
                    const dy = a.y - b.y;
                    const d = Math.sqrt(dx * dx + dy * dy);
                    if (d < CONNECT_DIST) {
                        const lineAlpha = (1 - d / CONNECT_DIST) * 0.25 * alphaMod;
                        ctx.globalAlpha = lineAlpha;
                        ctx.strokeStyle = accent;
                        ctx.beginPath();
                        ctx.moveTo(a.x, a.y);
                        ctx.lineTo(b.x, b.y);
                        ctx.stroke();
                    }
                }
            }

            ctx.globalAlpha = 1;
            raf = requestAnimationFrame(draw);
        };

        draw();

        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener("resize", resize);
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mouseleave", onMouseLeave);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none"
            style={{ zIndex: 0, width: "100vw", height: "100vh" }}
        />
    );
}
