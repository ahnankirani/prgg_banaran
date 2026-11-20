"use client";

import { useRef, useState } from "react";

const W = 900;
const H = 340;
const ML = 64;
const MR = 24;
const MT = 16;
const MB = 36;

const fmt = (n) => n.toLocaleString("id-ID");

function niceStep(max, ticks = 4) {
  const raw = max / ticks;
  const p = 10 ** Math.floor(Math.log10(raw || 1));
  const f = raw / p;
  return (f <= 1 ? 1 : f <= 2 ? 2 : f <= 5 ? 5 : 10) * p;
}

// Kurva halus monoton (tidak "overshoot" di bawah 0 atau di atas titik data).
function monotonePath(pts) {
  const n = pts.length;
  if (n < 2) return `M${pts[0][0]},${pts[0][1]}`;
  const dx = [];
  const m = [];
  for (let i = 0; i < n - 1; i++) {
    dx[i] = pts[i + 1][0] - pts[i][0];
    m[i] = (pts[i + 1][1] - pts[i][1]) / dx[i];
  }
  const t = [m[0]];
  for (let i = 1; i < n - 1; i++) t[i] = m[i - 1] * m[i] <= 0 ? 0 : (m[i - 1] + m[i]) / 2;
  t[n - 1] = m[n - 2];
  for (let i = 0; i < n - 1; i++) {
    if (m[i] === 0) {
      t[i] = 0;
      t[i + 1] = 0;
    } else {
      const a = t[i] / m[i];
      const b = t[i + 1] / m[i];
      const s = a * a + b * b;
      if (s > 9) {
        const tau = 3 / Math.sqrt(s);
        t[i] = tau * a * m[i];
        t[i + 1] = tau * b * m[i];
      }
    }
  }
  let d = `M${pts[0][0]},${pts[0][1]}`;
  for (let i = 0; i < n - 1; i++) {
    const [x0, y0] = pts[i];
    const [x1, y1] = pts[i + 1];
    const h = dx[i] / 3;
    d += ` C${x0 + h},${y0 + t[i] * h} ${x1 - h},${y1 - t[i + 1] * h} ${x1},${y1}`;
  }
  return d;
}

// series: [{ key, label, color, values[] }]
// highlight: indeks tahun yang disorot (mis. hasil pencarian)
// autoMin: sumbu Y tidak mulai dari 0 (dipakai mode Indeks agar perbedaan kecil tetap terlihat)
export default function LineChart({ years, series, highlight = [], autoMin = false }) {
  const [hover, setHover] = useState(null);
  const [hidden, setHidden] = useState(() => new Set());
  const svgRef = useRef(null);

  const visible = series.filter((s) => !hidden.has(s.key));
  const vals = visible.flatMap((s) => s.values);
  const hi = vals.length ? Math.max(...vals) : 1;
  const lo = vals.length ? Math.min(...vals) : 0;
  let step;
  let yMin = 0;
  let yMax;
  if (autoMin) {
    step = niceStep(hi - lo || hi || 1);
    yMin = Math.floor(lo / step) * step;
    yMax = Math.ceil(hi / step) * step;
    if (yMax === yMin) yMax = yMin + step;
  } else {
    step = niceStep(Math.max(hi, 1));
    yMax = Math.ceil(Math.max(hi, 1) / step) * step;
  }
  const n = years.length;
  const iw = W - ML - MR;
  const ih = H - MT - MB;
  const x = (i) => ML + (n > 1 ? (i * iw) / (n - 1) : iw / 2);
  const y = (v) => MT + ih - ((v - yMin) / (yMax - yMin)) * ih;
  const ticks = [];
  for (let v = yMin; v <= yMax + 1e-9; v += step) ticks.push(Number(v.toFixed(6)));

  const onMove = (e) => {
    const r = svgRef.current.getBoundingClientRect();
    const px = ((e.clientX - r.left) / r.width) * W;
    const i = Math.round((px - ML) / (iw / (n - 1)));
    setHover(Math.min(n - 1, Math.max(0, i)));
  };

  const toggle = (key) =>
    setHidden((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });

  return (
    <div>
      <div className="relative">
        <svg
          ref={svgRef}
          viewBox={`0 0 ${W} ${H}`}
          className="w-full"
          role="img"
          aria-label="Grafik tren per tahun"
          onPointerMove={onMove}
          onPointerLeave={() => setHover(null)}
        >
          {/* grid & sumbu Y */}
          {ticks.map((v) => (
            <g key={v}>
              <line x1={ML} x2={W - MR} y1={y(v)} y2={y(v)} stroke="#eef0f4" />
              <text x={ML - 8} y={y(v) + 4} textAnchor="end" fontSize="12" fill="#64748b">
                {fmt(v)}
              </text>
            </g>
          ))}
          <line x1={ML} x2={ML} y1={MT} y2={MT + ih} stroke="#94a3b8" />
          <line x1={ML} x2={W - MR} y1={MT + ih} y2={MT + ih} stroke="#94a3b8" />

          {/* sumbu X */}
          {years.map((yr, i) => (
            <text key={yr} x={x(i)} y={H - 12} textAnchor="middle" fontSize="12" fill="#475569">
              {yr}
            </text>
          ))}

          {/* garis bantu saat hover */}
          {hover !== null && <line x1={x(hover)} x2={x(hover)} y1={MT} y2={MT + ih} stroke="#94a3b8" />}

          {/* tahun yang disorot oleh pencarian */}
          {highlight.map((i) => (
            <line key={`h${i}`} x1={x(i)} x2={x(i)} y1={MT} y2={MT + ih} stroke="#2B5A8E" strokeDasharray="4 4" opacity="0.6" />
          ))}

          {/* seri */}
          {visible.map((s) => (
            <g key={s.key}>
              <path
                d={monotonePath(s.values.map((v, i) => [x(i), y(v)]))}
                fill="none"
                stroke={s.color}
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              {s.values.map((v, i) => (
                <circle
                  key={i}
                  cx={x(i)}
                  cy={y(v)}
                  r={hover === i || highlight.includes(i) ? 5.5 : 3.5}
                  fill={hover === i || highlight.includes(i) ? s.color : "#fff"}
                  stroke={s.color}
                  strokeWidth="2"
                />
              ))}
            </g>
          ))}
        </svg>

        {hover !== null && visible.length > 0 && (
          <div
            className="pointer-events-none absolute top-3 z-10 min-w-40 border border-slate-300 bg-white px-3 py-2 text-sm shadow-md"
            style={{
              left: `${(x(hover) / W) * 100}%`,
              transform: hover > (n - 1) / 2 ? "translateX(calc(-100% - 12px))" : "translateX(12px)",
            }}
          >
            <div className="mb-1 text-base text-slate-900">{years[hover]}</div>
            {visible.map((s) => (
              <div key={s.key} style={{ color: s.color }}>
                {s.label} : {fmt(s.values[hover])}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* legenda (klik untuk sembunyikan/tampilkan seri) */}
      <div className="mt-2 flex flex-wrap justify-center gap-x-4 gap-y-1 text-sm">
        {series.map((s) => (
          <button
            key={s.key}
            type="button"
            onClick={() => toggle(s.key)}
            aria-pressed={!hidden.has(s.key)}
            className={`flex cursor-pointer items-center gap-1.5 ${hidden.has(s.key) ? "opacity-40 line-through" : ""}`}
            style={{ color: s.color }}
          >
            <svg width="22" height="10" aria-hidden="true">
              <line x1="0" x2="22" y1="5" y2="5" stroke={s.color} strokeWidth="2" />
              <circle cx="11" cy="5" r="3" fill="#fff" stroke={s.color} strokeWidth="2" />
            </svg>
            {s.label}
          </button>
        ))}
      </div>
    </div>
  );
}
