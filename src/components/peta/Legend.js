"use client";

import { useState } from "react";
import { LAYERS } from "@/data/layers";
import { overlay } from "./ui";

export default function Legend({ layerOn, available, onToggle }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`${overlay} bottom-4 left-4 overflow-hidden rounded-[14px] bg-white shadow-peta max-[820px]:top-[130px] max-[820px]:bottom-auto`}
    >
      <button
        type="button"
        className="block w-full cursor-pointer px-[18px] py-2 text-left text-lg text-[#0f2552]"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        Legenda
      </button>

      {open && (
        <div className="w-[250px] px-[18px] pb-3.5">
          {LAYERS.map((l) => {
            const hasData = Boolean(available[l.id]);
            const on = Boolean(layerOn[l.id]);
            return (
              <div key={l.id} className="flex h-[30px] items-center gap-3 text-xs">
                <span
                  className="h-3 w-[34px] flex-none border-2"
                  style={{ borderColor: l.color, borderStyle: l.dashed ? "dashed" : "solid" }}
                />
                <span className="flex-1">
                  {l.name}
                  {!hasData && <div className="text-[10px] text-[#888]">belum ada data</div>}
                </span>
                <button
                  type="button"
                  role="switch"
                  aria-checked={on}
                  aria-label={l.name}
                  disabled={!hasData}
                  onClick={() => onToggle(l.id)}
                  className={`relative h-3.5 w-[26px] flex-none cursor-pointer rounded-full border transition-colors disabled:cursor-not-allowed disabled:opacity-45 after:absolute after:top-px after:size-2.5 after:rounded-full after:bg-white after:shadow-[0_0_2px_rgba(0,0,0,.35)] after:transition-all ${
                    on
                      ? "border-link bg-link after:left-[13px]"
                      : "border-[#cfd3da] bg-[#e1e3e8] after:left-px"
                  }`}
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
