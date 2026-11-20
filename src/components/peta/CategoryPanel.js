"use client";

import { PLACES, subCategories } from "@/data/places";
import Donut from "./Donut";
import { closeBtn, panel, panelHead } from "./ui";

export default function CategoryPanel({ cat, sub, onSub, onClose, onSelect }) {
  const inCat = PLACES.filter((p) => p.cat === cat);
  const subs = subCategories(cat);
  const items = subs.map((s) => ({ label: s, value: inCat.filter((p) => p.sub === s).length }));
  const list = inCat.filter((p) => !sub || p.sub === sub);

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

      <Donut items={items} />

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
