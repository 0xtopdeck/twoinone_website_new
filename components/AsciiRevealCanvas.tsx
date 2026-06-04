"use client";

import { useEffect, useRef } from "react";

/**
 * AsciiRevealCanvas — samples a photo into a grid of ASCII characters (chosen
 * from a dark→light ramp) and "materializes" them with a diagonal wavefront and
 * a glowing scan edge (in the theme accent), then holds. No motion/wind — meant
 * for the Construction & Sulfur hero intros. Crossfade to the real photo is
 * handled by the page.
 *
 * Pure Canvas 2D, same-origin image so getImageData is allowed.
 */

const CELL = 11;
const REVEAL = 2.2; // seconds for the sweep
const DEFAULT_RAMP = " .:-=+*#%@";

type Cell = { r: number; g: number; b: number; lum: number; ci: number };

function hexToRgb(hex: string): [number, number, number] {
  let h = hex.trim().replace("#", "");
  if (h.length === 3) h = h.split("").map((c) => c + c).join("");
  const n = parseInt(h || "2eb6d8", 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

export default function AsciiRevealCanvas({
  src,
  charset = DEFAULT_RAMP,
  className,
}: {
  src: string;
  charset?: string;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const container = canvas.parentElement;
    if (!ctx || !container) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const off = document.createElement("canvas");
    const offCtx = off.getContext("2d", { willReadFrequently: true });
    const ramp = charset.length ? charset : DEFAULT_RAMP;

    let width = 0, height = 0, cols = 0, rows = 0, cellW = 0, cellH = 0;
    let grid: Cell[] = [];
    let imgLoaded = false;
    let accent: [number, number, number] = hexToRgb(
      getComputedStyle(document.documentElement).getPropertyValue("--accent") || "#2eb6d8"
    );

    const img = new Image();
    img.decoding = "async";

    const sample = () => {
      if (!imgLoaded || !offCtx || width === 0 || height === 0) return;
      cols = Math.max(1, Math.floor(width / CELL));
      rows = Math.max(1, Math.floor(height / CELL));
      off.width = cols;
      off.height = rows;
      const ia = img.width / img.height;
      const ga = cols / rows;
      let sw: number, sh: number, sx: number, sy: number;
      if (ia > ga) { sh = img.height; sw = sh * ga; sx = (img.width - sw) / 2; sy = 0; }
      else { sw = img.width; sh = sw / ga; sx = 0; sy = (img.height - sh) / 2; }
      offCtx.clearRect(0, 0, cols, rows);
      offCtx.drawImage(img, sx, sy, sw, sh, 0, 0, cols, rows);
      const data = offCtx.getImageData(0, 0, cols, rows).data;
      grid = new Array(cols * rows);
      for (let i = 0; i < cols * rows; i++) {
        const r = data[i * 4], g = data[i * 4 + 1], b = data[i * 4 + 2];
        const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
        const ci = Math.max(0, Math.min(ramp.length - 1, Math.round(lum * (ramp.length - 1))));
        grid[i] = { r, g, b, lum, ci };
      }
      cellW = width / cols;
      cellH = height / rows;
    };

    img.onload = () => { imgLoaded = true; sample(); if (reduced) draw(99); };
    img.src = src;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = container.clientWidth;
      height = container.clientHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      sample();
    };
    resize();

    function draw(t: number) {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      if (!imgLoaded || cols === 0) return;
      ctx.font = `${Math.floor(cellH * 0.95)}px ui-monospace, monospace`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      const prog = reduced ? 99 : t / REVEAL;

      for (let y = 0; y < rows; y++) {
        const yNorm = y / rows;
        const cy = y * cellH + cellH / 2;
        for (let x = 0; x < cols; x++) {
          const cell = grid[y * cols + x];
          const ch = ramp[cell.ci];
          if (ch === " " || ch === undefined) continue;
          const xNorm = x / cols;
          const front = xNorm * 0.4 + yNorm * 0.6; // diagonal wavefront
          const local = prog - front;
          if (local <= 0) continue; // not yet reached
          const fade = Math.min(1, local / 0.16);
          const scan = local < 0.14 ? 1 - local / 0.14 : 0; // glowing leading edge
          let r = cell.r, g = cell.g, b = cell.b;
          if (scan > 0.02) {
            r += (accent[0] - r) * scan * 0.85;
            g += (accent[1] - g) * scan * 0.85;
            b += (accent[2] - b) * scan * 0.85;
          }
          const a = Math.min(1, (0.3 + cell.lum * 0.72) * fade + scan * 0.4);
          ctx.fillStyle = `rgba(${r | 0},${g | 0},${b | 0},${a})`;
          ctx.fillText(ch, x * cellW + cellW / 2, cy);
        }
      }
    }

    let raf = 0;
    let running = false;
    const start = performance.now();
    const loop = (now: number) => {
      draw((now - start) / 1000);
      if (running) raf = requestAnimationFrame(loop);
    };
    if (!reduced) {
      running = true;
      raf = requestAnimationFrame(loop);
    }

    const ro = new ResizeObserver(() => {
      resize();
      if (reduced) draw(99);
    });
    ro.observe(container);

    const mo = new MutationObserver(() => {
      accent = hexToRgb(
        getComputedStyle(document.documentElement).getPropertyValue("--accent") || "#2eb6d8"
      );
    });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
      mo.disconnect();
      img.onload = null;
    };
  }, [src, charset]);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
