"use client";

import { ALL_ID, SUBJECTS } from "@/data/statistik";
import { closeBtn, panel, panelHead } from "./ui";

// Daftar topik kependudukan. Klik salah satu untuk membuka statistik per tahunnya.
export default function KependudukanPanel({ onClose, onOpen }) {
  return (
    <aside className={panel}>
      <div className={panelHead}>
        <h2 className="flex items-center gap-2.5 text-center text-[17px] font-bold">
          <span className="grid size-7 flex-none place-items-center rounded-[7px] bg-link">
            <svg className="size-4 fill-none stroke-white stroke-2" viewBox="0 0 24 24">
              <circle cx="9" cy="8" r="3.2" />
              <path d="M3 20v-1a5 5 0 0 1 5-5h2a5 5 0 0 1 5 5v1M16 5.2a3.2 3.2 0 0 1 0 5.6M21 20v-1a5 5 0 0 0-3-4.6" />
            </svg>
          </span>
          Kependudukan
        </h2>
        <button type="button" className={closeBtn} onClick={onClose} aria-label="Tutup">
          &times;
        </button>
      </div>

      <button
        type="button"
        onClick={() => onOpen(ALL_ID)}
        className="mb-3 flex w-full cursor-pointer items-center justify-center gap-2 rounded-md bg-brand p-[9px] text-sm font-bold text-white shadow-[0_1px_5px_rgba(0,0,0,.22)] hover:bg-brand-dark"
      >
        <svg className="size-4 fill-none stroke-white stroke-2" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M6 20V10M12 20V4M18 20v-7" strokeLinecap="round" />
        </svg>
        Statistik
      </button>

      <div className="flex flex-col gap-2">
        {SUBJECTS.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => onOpen(s.id)}
            className="cursor-pointer rounded-md bg-white p-[7px] text-center text-sm font-medium shadow-[0_1px_5px_rgba(0,0,0,.22)] hover:bg-soft"
          >
            {s.title}
          </button>
        ))}
      </div>
    </aside>
  );
}
