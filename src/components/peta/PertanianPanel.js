"use client";

import { useState } from "react";
import { KOMODITAS, LAHAN, PERTANIAN_DUMMY } from "@/data/pertanian";
import { closeBtn, panel, panelHead } from "./ui";

const fmt = (n) => n.toLocaleString("id-ID");

const sectionTitle = "mb-2 text-xs font-bold tracking-wide text-slate-500 uppercase";

// Panel "Pertanian", mengikuti diagram kebutuhan data:
//   Kategori : Lahan Sawah, Lahan Nonsawah, Komoditas Pertanian
//   Output   : Peta Persebaran Lahan, Informasi Komoditas, Dashboard Statistik Luas Lahan Pertanian
// initialKomoditasId: komoditas yang langsung dibuka detailnya (mis. dipilih dari pencarian).
export default function PertanianPanel({ layerOn, onToggleLayer, available, onOpenStat, onClose, initialKomoditasId = null }) {
  const [komoditasId, setKomoditasId] = useState(initialKomoditasId);
  const komoditas = KOMODITAS.find((k) => k.id === komoditasId) ?? null;

  return (
    <aside className={panel}>
      <div className={panelHead}>
        <h2 className="flex items-center gap-2.5 text-center text-[17px] font-bold">
          <span className="grid size-7 flex-none place-items-center rounded-[7px] bg-link">
            <svg className="size-4 fill-none stroke-white stroke-2" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 22V9M12 9c0-3 2-5 5-5 0 3-2 5-5 5zM12 13c0-3-2-5-5-5 0 3 2 5 5 5zM12 17c0-3 2-5 5-5 0 3-2 5-5 5z" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          Pertanian
        </h2>
        <button type="button" className={closeBtn} onClick={onClose} aria-label="Tutup">
          &times;
        </button>
      </div>

      {/* Output: peta persebaran lahan sawah & nonsawah */}
      <section className="mb-5">
        <h3 className={sectionTitle}>Peta Persebaran Lahan</h3>
        <div className="flex flex-col gap-2">
          {LAHAN.map((l) => {
            const on = Boolean(layerOn[l.id]);
            const hasData = available[l.id] !== false;
            return (
              <label
                key={l.id}
                className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm shadow-[0_1px_5px_rgba(0,0,0,.22)] ${
                  hasData ? "cursor-pointer bg-white hover:bg-soft" : "cursor-not-allowed bg-slate-50 opacity-60"
                }`}
              >
                <input
                  type="checkbox"
                  checked={on}
                  disabled={!hasData}
                  onChange={() => onToggleLayer(l.id)}
                  className="size-4 cursor-pointer accent-[#2B5A8E]"
                />
                <i className="size-3.5 flex-none rounded-[3px] border" style={{ background: l.color, borderColor: l.color }} />
                <span className="flex-1 font-medium">{l.name}</span>
                <span className="text-xs text-slate-500">{fmt(l.luas)} ha</span>
              </label>
            );
          })}
        </div>
      </section>

      {/* Output: informasi komoditas */}
      <section className="mb-5">
        <h3 className={sectionTitle}>Komoditas Pertanian</h3>
        {komoditas ? (
          <div className="rounded-lg bg-card p-3.5">
            <button
              type="button"
              onClick={() => setKomoditasId(null)}
              className="mb-2 cursor-pointer text-xs font-medium text-link"
            >
              ← Semua komoditas
            </button>
            <div className="flex items-center justify-between gap-2">
              <h4 className="text-base font-bold">{komoditas.nama}</h4>
              <span
                className="rounded-full px-2.5 py-0.5 text-[11px] font-semibold text-white"
                style={{ background: komoditas.lahan === "Sawah" ? "#4caf50" : "#d9962a" }}
              >
                Lahan {komoditas.lahan}
              </span>
            </div>
            <p className="mt-2 text-[12.5px] leading-[1.45]">{komoditas.deskripsi}</p>
            <dl className="mt-3 grid grid-cols-2 gap-2 text-xs">
              <div>
                <dt className="font-bold">Luas tanam</dt>
                <dd className="text-[#333]">{fmt(komoditas.luas)} ha</dd>
              </div>
              <div>
                <dt className="font-bold">Produksi</dt>
                <dd className="text-[#333]">{fmt(komoditas.produksi)} ton</dd>
              </div>
              <div className="col-span-2">
                <dt className="font-bold">Musim tanam</dt>
                <dd className="text-[#333]">{komoditas.musim}</dd>
              </div>
            </dl>
          </div>
        ) : (
          <div className="flex flex-col gap-1.5">
            {KOMODITAS.map((k) => (
              <button
                key={k.id}
                type="button"
                onClick={() => setKomoditasId(k.id)}
                className="flex cursor-pointer items-center justify-between gap-2 rounded-md bg-card px-2.5 py-[7px] text-left text-[13px] hover:bg-soft"
              >
                <span>{k.nama}</span>
                <span className="text-[11px] text-slate-500">
                  {k.lahan} · {fmt(k.luas)} ha
                </span>
              </button>
            ))}
          </div>
        )}
      </section>

      {/* Output: dashboard statistik */}
      <button
        type="button"
        onClick={onOpenStat}
        className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-md bg-brand p-[9px] text-center text-sm font-bold text-white shadow-[0_1px_5px_rgba(0,0,0,.22)] hover:bg-brand-dark"
      >
        <svg className="size-4 flex-none fill-none stroke-white stroke-2" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M6 20V10M12 20V4M18 20v-7" strokeLinecap="round" />
        </svg>
        Dashboard Statistik Luas Lahan Pertanian
      </button>

      {PERTANIAN_DUMMY && (
        <p className="mt-3 text-center text-[11px] text-[#888] italic">Data & peta contoh (dummy), belum data resmi.</p>
      )}
    </aside>
  );
}
