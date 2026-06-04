"use client";

import { useEffect, useRef } from "react";
import { LAND_W, LAND_H, LAND_B64 } from "@/lib/landmask";

/**
 * Planet — a dense rotating dot-grid Earth with orange continents on a blue
 * sea (real Natural Earth coastlines, baked into a bit-mask), tilted on its
 * axis. Glowing trajectory arcs ease out of the surface, fly, and land
 * elsewhere; the point of impact lingers, rotating and fading with the globe.
 *
 * Pure Canvas 2D — no WebGL/3D dependency. Theme-aware, pauses off-screen,
 * renders a static frame when reduced motion is set.
 */

type Vec3 = { x: number; y: number; z: number };

const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5));
const POINT_COUNT = 5200;
const ARC_SEGMENTS = 130;
const TILT = -0.41; // ~23.5° axial tilt, like Earth
const RADIUS_FRACTION = 0.34;

/* ---------- real Earth land mask (sampled by lat/lon) ---------- */
const LAND_MASK = (() => {
  const bin = typeof atob !== "undefined" ? atob(LAND_B64) : "";
  const u = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) u[i] = bin.charCodeAt(i);
  return u;
})();
function landAt(x: number, y: number, z: number): boolean {
  const lat = Math.asin(Math.max(-1, Math.min(1, y))) * (180 / Math.PI);
  const lon = Math.atan2(z, x) * (180 / Math.PI);
  let ix = Math.floor(((lon + 180) / 360) * LAND_W);
  let iy = Math.floor(((90 - lat) / 180) * LAND_H);
  if (ix < 0) ix = 0; else if (ix >= LAND_W) ix = LAND_W - 1;
  if (iy < 0) iy = 0; else if (iy >= LAND_H) iy = LAND_H - 1;
  const idx = iy * LAND_W + ix;
  return ((LAND_MASK[idx >> 3] >> (idx & 7)) & 1) === 1;
}

/* ---------- geometry helpers ---------- */
function fromLatLon(latDeg: number, lonDeg: number): Vec3 {
  const lat = (latDeg * Math.PI) / 180;
  const lon = (lonDeg * Math.PI) / 180;
  return { x: Math.cos(lat) * Math.cos(lon), y: Math.sin(lat), z: Math.cos(lat) * Math.sin(lon) };
}
function rotate(p: Vec3, ay: number, ax: number): Vec3 {
  const cy = Math.cos(ay), sy = Math.sin(ay);
  const x = p.x * cy + p.z * sy;
  const z = -p.x * sy + p.z * cy;
  const cx = Math.cos(ax), sx = Math.sin(ax);
  return { x, y: p.y * cx - z * sx, z: p.y * sx + z * cx };
}
const dot = (a: Vec3, b: Vec3) => a.x * b.x + a.y * b.y + a.z * b.z;
function slerp(a: Vec3, b: Vec3, t: number): Vec3 {
  const d = Math.min(1, Math.max(-1, dot(a, b)));
  const omega = Math.acos(d);
  if (omega < 1e-4) return a;
  const so = Math.sin(omega);
  const s0 = Math.sin((1 - t) * omega) / so;
  const s1 = Math.sin(t * omega) / so;
  return { x: a.x * s0 + b.x * s1, y: a.y * s0 + b.y * s1, z: a.z * s0 + b.z * s1 };
}
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

function hexToRgb(hex: string): [number, number, number] {
  let h = hex.trim().replace("#", "");
  if (h.length === 3) h = h.split("").map((c) => c + c).join("");
  const n = parseInt(h || "ffffff", 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}
const rgba = (c: [number, number, number], a: number) => `rgba(${c[0]},${c[1]},${c[2]},${a})`;
const rgb = (c: [number, number, number]) => `rgb(${c[0]},${c[1]},${c[2]})`;

type Arc = { a: Vec3; b: Vec3; height: number; color: "sea" | "land"; period: number; offset: number };
// Endpoints picked on real land so arcs read as routes between cities/regions.
const ARCS: Arc[] = [
  { a: fromLatLon(40, -3), b: fromLatLon(25, 55), height: 0.32, color: "sea", period: 7.6, offset: 0 },     // Iberia → Gulf
  { a: fromLatLon(1, 103), b: fromLatLon(-26, 28), height: 0.3, color: "land", period: 9.2, offset: 3.4 },  // SE Asia → S Africa
  { a: fromLatLon(35, 139), b: fromLatLon(34, -118), height: 0.34, color: "sea", period: 10.8, offset: 6.4 }, // Tokyo → LA
];

// Major world capitals / metros [lat, lon, brightness]. They glow like city
// lights from orbit — brighter where the megacities are.
const CITIES: [number, number, number][] = [
  [51.51, -0.13, 1], [48.86, 2.35, 0.85], [40.42, -3.7, 0.78], [52.52, 13.4, 0.8], [41.9, 12.5, 0.75],
  [55.75, 37.62, 0.9], [41.01, 28.98, 0.85], [30.04, 31.24, 0.9], [6.52, 3.38, 0.85], [-26.2, 28.04, 0.78],
  [25.2, 55.27, 0.9], [35.69, 51.39, 0.82], [24.86, 67.01, 0.85], [28.61, 77.21, 1], [19.08, 72.88, 0.95],
  [23.81, 90.41, 0.82], [13.76, 100.5, 0.85], [1.35, 103.82, 0.92], [-6.21, 106.85, 0.95], [39.9, 116.4, 1],
  [31.23, 121.47, 1], [22.32, 114.17, 0.92], [37.57, 126.98, 0.95], [35.68, 139.69, 1], [-33.87, 151.21, 0.85],
  [40.71, -74.01, 1], [34.05, -118.24, 0.95], [41.88, -87.63, 0.85], [43.65, -79.38, 0.8], [19.43, -99.13, 0.95],
  [4.71, -74.07, 0.8], [-12.05, -77.04, 0.78], [-23.55, -46.63, 0.95], [-34.6, -58.38, 0.85], [38.9, -77.04, 0.82],
  [6.46, 3.38, 0.7], [-1.29, 36.82, 0.72], [14.6, 120.98, 0.85], [37.98, 23.73, 0.72], [59.91, 10.75, 0.65],
];

export default function Planet({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const container = canvas.parentElement;
    if (!ctx || !container) return;

    const N = POINT_COUNT;
    const px = new Float32Array(N);
    const py = new Float32Array(N);
    const pz = new Float32Array(N);
    const isLand = new Uint8Array(N);
    for (let i = 0; i < N; i++) {
      const y = 1 - (i / (N - 1)) * 2;
      const r = Math.sqrt(Math.max(0, 1 - y * y));
      const theta = i * GOLDEN_ANGLE;
      const x = Math.cos(theta) * r;
      const z = Math.sin(theta) * r;
      px[i] = x; py[i] = y; pz[i] = z;
      isLand[i] = landAt(x, y, z) ? 1 : 0;
    }
    const sx = new Float32Array(N);
    const sy = new Float32Array(N);
    const sdp = new Float32Array(N);
    const cityVec = CITIES.map(([la, lo]) => fromLatLon(la, lo));

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let width = 0, height = 0, radius = 0, cx = 0, cy = 0;

    const readPalette = () => {
      const s = getComputedStyle(document.documentElement);
      const isDark = document.documentElement.classList.contains("dark");
      return {
        sea: hexToRgb(s.getPropertyValue("--accent") || "#2eb6d8"),
        land: hexToRgb(s.getPropertyValue("--accent-2") || "#f1701f"),
        fg: hexToRgb(s.getPropertyValue("--foreground") || "#e8eef2"),
        cityCore: (isDark ? [255, 243, 214] : [150, 84, 10]) as [number, number, number],
        cityGlow: (isDark ? [255, 196, 110] : [205, 120, 28]) as [number, number, number],
        cityAlpha: isDark ? 1 : 0.5,
      };
    };
    let pal = readPalette();

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = container.clientWidth;
      height = container.clientHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      radius = Math.min(width, height) * RADIUS_FRACTION;
      cx = width / 2;
      cy = height / 2;
    };
    resize();

    const project = (p: Vec3) => ({ x: cx + p.x * radius, y: cy - p.y * radius, z: p.z });
    const arcPoint = (arc: Arc, tt: number, angle: number) => {
      const base = slerp(arc.a, arc.b, tt);
      const lift = 1 + arc.height * Math.sin(Math.PI * tt);
      return project(rotate({ x: base.x * lift, y: base.y * lift, z: base.z * lift }, angle, TILT));
    };

    const drawComet = (arc: Arc, angle: number, prog: number, col: [number, number, number], fade: number) => {
      let prev: { x: number; y: number } | null = null;
      let head: { x: number; y: number } | null = null;
      for (let i = 0; i <= ARC_SEGMENTS; i++) {
        const tt = i / ARC_SEGMENTS;
        if (tt > prog) break;
        const p = arcPoint(arc, tt, angle);
        if (prev) {
          const headness = tt / Math.max(prog, 1e-3);
          ctx.strokeStyle = rgba(col, (0.06 + 0.94 * headness) * fade);
          ctx.lineWidth = 0.8 + 2.2 * headness;
          ctx.beginPath();
          ctx.moveTo(prev.x, prev.y);
          ctx.lineTo(p.x, p.y);
          ctx.stroke();
        }
        prev = p;
        head = p;
      }
      if (head && fade > 0.02) {
        ctx.save();
        ctx.shadowBlur = 16;
        ctx.shadowColor = rgba(col, 0.9 * fade);
        ctx.fillStyle = rgba(col, fade);
        ctx.beginPath();
        ctx.arc(head.x, head.y, 2.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = rgba(pal.fg, 0.85 * fade);
        ctx.beginPath();
        ctx.arc(head.x, head.y, 1.0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    };

    const drawArc = (arc: Arc, angle: number, t: number) => {
      const local = ((t + arc.offset) % arc.period) / arc.period;
      const travelFrac = 0.45;
      const col = arc.color === "sea" ? pal.sea : pal.land;
      ctx.lineCap = "round";

      const traveling = local < travelFrac;
      const a = traveling ? 0 : (local - travelFrac) / (1 - travelFrac);
      const routeFade = traveling ? 1 : 1 - a;

      ctx.beginPath();
      for (let i = 0; i <= ARC_SEGMENTS; i++) {
        const p = arcPoint(arc, i / ARC_SEGMENTS, angle);
        if (i === 0) ctx.moveTo(p.x, p.y); else ctx.lineTo(p.x, p.y);
      }
      ctx.strokeStyle = rgba(col, 0.16 * (0.35 + 0.65 * routeFade));
      ctx.lineWidth = 1;
      ctx.stroke();

      if (traveling) {
        const prog = easeInOut(local / travelFrac);
        drawComet(arc, angle, prog, col, 1);
        if (prog < 0.22) {
          const s = arcPoint(arc, 0, angle);
          const k = 1 - prog / 0.22;
          ctx.save();
          ctx.shadowBlur = 10;
          ctx.shadowColor = rgba(col, 0.5 * k);
          ctx.fillStyle = rgba(col, 0.8 * k);
          ctx.beginPath();
          ctx.arc(s.x, s.y, 2 * k + 0.5, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
        return;
      }

      drawComet(arc, angle, 1, col, (1 - a) * 0.9);

      const land = arcPoint(arc, 1, angle);
      const depth01 = (land.z + 1) / 2;
      const df = Math.pow(Math.max(0, depth01), 1.3);

      if (a < 0.4) {
        const rr = a / 0.4;
        const rad = 2 + rr * radius * 0.14;
        ctx.save();
        ctx.shadowBlur = 12;
        ctx.shadowColor = rgba(col, 0.5 * (1 - rr) * df);
        ctx.strokeStyle = rgba(col, 0.85 * (1 - rr) * df);
        ctx.lineWidth = 2 * (1 - rr) + 0.4;
        ctx.beginPath();
        ctx.arc(land.x, land.y, rad, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }

      const ia = (1 - a) * df;
      if (ia > 0.02) {
        ctx.save();
        ctx.shadowBlur = 14;
        ctx.shadowColor = rgba(col, 0.85 * ia);
        ctx.fillStyle = rgba(col, ia);
        ctx.beginPath();
        ctx.arc(land.x, land.y, 2.3, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = rgba(pal.fg, 0.8 * ia);
        ctx.beginPath();
        ctx.arc(land.x, land.y, 1.0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    };

    const draw = (angle: number, t: number) => {
      ctx.clearRect(0, 0, width, height);

      const cosY = Math.cos(angle), sinY = Math.sin(angle);
      const cosX = Math.cos(TILT), sinX = Math.sin(TILT);
      for (let i = 0; i < N; i++) {
        const x = px[i], y = py[i], z = pz[i];
        const x1 = x * cosY + z * sinY;
        const z1 = -x * sinY + z * cosY;
        const y2 = y * cosX - z1 * sinX;
        const z2 = y * sinX + z1 * cosX;
        sx[i] = cx + x1 * radius;
        sy[i] = cy - y2 * radius;
        sdp[i] = (z2 + 1) / 2;
      }

      // sea pass
      ctx.fillStyle = rgb(pal.sea);
      for (let i = 0; i < N; i++) {
        if (isLand[i]) continue;
        const d = sdp[i];
        ctx.globalAlpha = 0.05 + d * d * 0.4;
        const s = 0.5 + d * 0.9;
        ctx.fillRect(sx[i] - s / 2, sy[i] - s / 2, s, s);
      }
      // land pass (continents — brighter & larger so they read)
      ctx.fillStyle = rgb(pal.land);
      for (let i = 0; i < N; i++) {
        if (!isLand[i]) continue;
        const d = sdp[i];
        ctx.globalAlpha = 0.22 + Math.pow(d, 1.3) * 0.78;
        const s = 0.85 + d * 1.7;
        ctx.fillRect(sx[i] - s / 2, sy[i] - s / 2, s, s);
      }
      ctx.globalAlpha = 1;

      // city lights — major capitals glow on the front face, fading at the limb
      for (let i = 0; i < cityVec.length; i++) {
        const r = rotate(cityVec[i], angle, TILT);
        const depth = (r.z + 1) / 2;
        if (depth < 0.45) continue;
        const df = Math.min(1, (depth - 0.45) / 0.5);
        const mag = CITIES[i][2];
        const twinkle = 0.78 + 0.22 * Math.sin(t * 2.1 + i * 1.7);
        const alpha = df * df * mag * twinkle * pal.cityAlpha;
        if (alpha < 0.03) continue;
        const X = cx + r.x * radius;
        const Y = cy - r.y * radius;
        ctx.save();
        // soft warm bloom
        ctx.shadowBlur = 9 + 12 * df;
        ctx.shadowColor = rgba(pal.cityGlow, 0.95 * alpha);
        ctx.fillStyle = rgba(pal.cityGlow, 0.55 * alpha);
        ctx.beginPath();
        ctx.arc(X, Y, 1.4 + 1.5 * mag, 0, Math.PI * 2);
        ctx.fill();
        // bright warm-white core
        ctx.shadowBlur = 4;
        ctx.fillStyle = rgba(pal.cityCore, Math.min(1, alpha * 1.15));
        ctx.beginPath();
        ctx.arc(X, Y, 0.8 + 0.7 * mag, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      for (const arc of ARCS) drawArc(arc, angle, t);
    };

    let raf = 0;
    let running = false;
    const start = performance.now();
    const loop = (now: number) => {
      const t = (now - start) / 1000;
      draw(t * 0.1, t);
      if (running) raf = requestAnimationFrame(loop);
    };
    const startLoop = () => {
      if (running) return;
      running = true;
      raf = requestAnimationFrame(loop);
    };
    const stopLoop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    if (reduced) draw(0.6, 1.8);
    else startLoop();

    const ro = new ResizeObserver(() => {
      resize();
      if (reduced) draw(0.6, 1.8);
    });
    ro.observe(container);

    const mo = new MutationObserver(() => {
      pal = readPalette();
      if (reduced) draw(0.6, 1.8);
    });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    const io = new IntersectionObserver(
      ([entry]) => {
        if (reduced) return;
        if (entry.isIntersecting) startLoop();
        else stopLoop();
      },
      { threshold: 0 }
    );
    io.observe(canvas);

    return () => {
      stopLoop();
      ro.disconnect();
      mo.disconnect();
      io.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
