"use client";

import { useEffect, useState } from "react";
import { CATEGORIES, PLACES } from "@/data/places";
import { chip, searchIcon } from "./ui";

export default function SearchModal({ onClose, onSelect }) {
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState(null);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  const q = query.trim().toLowerCase();
  const rows = PLACES.filter(
    (p) =>
      (!cat || p.cat === cat) &&
      (!q || [p.nama, p.cat, p.sub].some((v) => v.toLowerCase().includes(q))),
  );

  return (
    <div
      className="fixed inset-0 z-[3000] flex items-center justify-center bg-black/55 p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="max-h-[calc(100vh-32px)] w-[min(560px,100%)] overflow-auto rounded-3xl bg-white px-6 pt-7 pb-8"
        role="dialog"
        aria-modal="true"
        aria-label="Cari"
      >
        <div className="flex h-[38px] items-center gap-3.5 rounded-[10px] px-[18px] shadow-[0_2px_8px_rgba(0,0,0,.18)]">
          <svg className={searchIcon} viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="11" cy="11" r="7" />
            <path d="M20 20l-4-4" />
          </svg>
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari produk atau tempat..."
            className="min-w-0 flex-1 text-sm outline-none"
          />
        </div>

        <div className="mt-4 mb-[22px] flex flex-wrap justify-center gap-3">
          {CATEGORIES.map((c) => (
            <button
              key={c.name}
              type="button"
              className={chip(cat === c.name)}
              onClick={() => setCat((prev) => (prev === c.name ? null : c.name))}
            >
              {c.name}
            </button>
          ))}
        </div>

        <table className="w-full border-collapse text-sm">
          <thead>
            <tr>
              <th className="bg-soft px-3.5 py-[11px] text-left font-medium">Nama</th>
              <th className="bg-soft px-3.5 py-[11px] text-left font-medium">Kategori</th>
            </tr>
          </thead>
          <tbody>
            {rows.length ? (
              rows.map((p) => (
                <tr key={p.id} onClick={() => onSelect(p.id)} className="cursor-pointer hover:bg-[#f4f7fc]">
                  <td className="border-b border-[#eceef2] px-3.5 py-[11px]">{p.nama}</td>
                  <td className="border-b border-[#eceef2] px-3.5 py-[11px]">{p.cat}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={2} className="p-[18px] text-center text-muted">
                  Tidak ditemukan
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
