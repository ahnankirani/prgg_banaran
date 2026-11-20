"use client";

import { PLACES, SUB_COLORS, subCategories } from "@/data/places";
import { closeBtn, panel, panelHead } from "./ui";

const R = 15.915; // keliling lingkaran = 100

export default function CategoryPanel({ cat, sub, onSub, onClose, onSelect }) {
  const inCat = PLACES.filter((p) => p.cat === cat);
  const subs = subCategories(cat);
  const counts = subs.map((s) => inCat.filter((p) => p.sub === s).length);
  const total = inCat.length;
  const list = inCat.filter((p) => !sub || p.sub === sub);

  let offset = 0;
  const arcs = counts.map((n, i) => {
    const len = total ? (n / total) * 100 : 0;
    const arc = { n, i, len, offset };
    offset += len;
    return arc;
  });

  return (
    <aside className={panel}>
      <div className={panelHead}>
        <h2 className="flex items-center gap-2.5 text-center text-[17px] font-bold">
          <span className="grid size-7 flex-none place-items-center rounded-[7px] bg-link">
            <svg className="size-4 fill-none stroke-white stroke-2" viewBox="0 0 24 24">
              <ellipse cx="12" cy="6" rx="7" ry="3" />
              <path d="M5 6v6c0 1.7 3 3 7 3s7-1.3 7-3V6M5 12v6c0 1.7 3 3 7 3s7-1.3 7-3v-6" />
            </svg>
          </span>
          {cat}
        </h2>
        <button type="button" className={closeBtn} onClick={onClose} aria-label="Tutup">
          &times;
        </button>
      </div>

      <div className="flex items-center gap-3.5">
        <div className="relative size-[110px] flex-none">
          <svg className="size-full -rotate-90" viewBox="0 0 42 42" aria-hidden="true">
            <circle cx="21" cy="21" r={R} fill="none" stroke="#eef0f4" strokeWidth="7" />
            {arcs
              .filter((a) => a.n > 0)
              .map((a) => (
                <circle
                  key={a.i}
                  cx="21"
                  cy="21"
                  r={R}
                  fill="none"
                  stroke={SUB_COLORS[a.i % SUB_COLORS.length]}
                  strokeWidth="7"
                  strokeDasharray={`${a.len} ${100 - a.len}`}
                  strokeDashoffset={-a.offset}
                />
              ))}
          </svg>
          <div className="absolute inset-0 grid place-content-center text-center text-[13px] leading-[1.15] font-semibold">
            <span>
              <b className="text-lg">{total}</b>
              <br />
              Total
            </span>
          </div>
        </div>
        <div className="flex-1 text-[11px]">
          {subs.map((s, i) => (
            <div key={s} className="flex min-h-[22px] items-center gap-1.5">
              <i className="size-[9px] flex-none rounded-[2px]" style={{ background: SUB_COLORS[i % SUB_COLORS.length] }} />
              <span className="flex-1">{s}</span>
              <b>{counts[i]}</b>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-2">
        {["Semua", ...subs].map((s) => {
          const on = s === "Semua" ? !sub : s === sub;
          return (
            <button
              key={s}
              type="button"
              onClick={() => onSub(s === "Semua" ? null : s)}
              className={`cursor-pointer rounded-md p-[7px] text-center text-sm font-medium shadow-[0_1px_5px_rgba(0,0,0,.22)] ${
                on ? "bg-soft" : "bg-white"
              }`}
            >
              {s}
            </button>
          );
        })}
      </div>

      <div className="mt-3.5 flex flex-col gap-1.5">
        {list.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => onSelect(p.id)}
            className="cursor-pointer rounded-md bg-card px-2.5 py-[7px] text-left text-[13px] hover:bg-soft"
          >
            {p.nama}
          </button>
        ))}
      </div>
    </aside>
  );
}
