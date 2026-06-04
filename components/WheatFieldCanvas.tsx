"use client";

import { useEffect, useRef } from "react";

/**
 * WheatFieldCanvas — renders a photo sampled into a dense grid of characters.
 * Everything that isn't wheat (sky, trees, road) is a STATIC `|`. Only the
 * wheat moves: travelling gusts push the stalk tops over toward the ground
 * (`|` → `/` `\` → `_`) then let them recover, bases anchored, with the wind
 * reversing right→left then left→right. Used as the Agriculture hero intro.
 *
 * Pure Canvas 2D, same-origin image so getImageData is allowed.
 */

const CELL = 10; // px per character cell (smaller = denser)

type Cell = { r: number; g: number; b: number; lum: number; wheat: boolean };

export default function WheatFieldCanvas({ src, className }: { src: string; className?: string }) {
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

    let width = 0, height = 0, cols = 0, rows = 0, cellW = 0, cellH = 0;
    let grid: Cell[] = [];
    let imgLoaded = false;

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
        const yNorm = Math.floor(i / cols) / rows;
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        const sat = max === 0 ? 0 : (max - min) / max;
        // Wheat only: from just under the tree line down, warm/golden and
        // saturated enough. (Sky, the dark-green trees, and the road fail this.)
        const wheat = yNorm > 0.42 && sat > 0.16 && r >= g - 18 && lum > 0.15;
        grid[i] = { r, g, b, lum, wheat };
      }
      cellW = width / cols;
      cellH = height / rows;
    };

    img.onload = () => { imgLoaded = true; sample(); if (reduced) draw(0); };
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
      ctx.font = `bold ${Math.floor(cellH * 1.05)}px ui-monospace, monospace`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      // Wind direction reverses (R→L then L→R); gust bands travel with it.
      const dir = -Math.cos(t * 0.85);
      const travel = Math.sin(t * 0.85) * 3.0;

      for (let y = 0; y < rows; y++) {
        const yNorm = y / rows;
        const cy = y * cellH + cellH / 2;
        // amplitude fades IN slowly across the transition rows under the trees,
        // then tapers down so the foreground bases stay anchored
        const rampIn = Math.min(1, Math.max(0, (yNorm - 0.42) / 0.08));
        const topF = rampIn * Math.min(1, Math.max(0, (1 - yNorm) * 1.7));
        for (let x = 0; x < cols; x++) {
          const cell = grid[y * cols + x];
          if (cell.lum < 0.05) continue;
          const cx = x * cellW + cellW / 2;

          if (!cell.wheat) {
            // static, dim, upright
            ctx.fillStyle = `rgba(${cell.r},${cell.g},${cell.b},${0.18 + cell.lum * 0.44})`;
            ctx.fillText("|", cx, cy);
            continue;
          }

          const xNorm = x / cols;
          // wheat leans with the wind; travelling gusts add waves on top; the
          // whole field swings back through upright as the wind reverses.
          const phase = xNorm * 6 + yNorm * 1.5 - travel;
          const gust = 0.5 + 0.5 * Math.sin(phase);
          const lean = dir * topF * (0.4 + 0.6 * gust);
          const ab = Math.abs(lean);
          const sym = ab < 0.14 ? "|" : lean > 0 ? "/" : "\\"; // only |, /, \ — never flat
          const dx = lean * cellW * 2.2;            // tops lean sideways
          const dy = ab * cellH * 0.35;             // a gentle dip, no flattening
          ctx.fillStyle = `rgba(${cell.r},${cell.g},${cell.b},${0.36 + cell.lum * 0.72})`;
          ctx.fillText(sym, cx + dx, cy + dy);
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
      if (reduced) draw(0);
    });
    ro.observe(container);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
      img.onload = null;
    };
  }, [src]);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
