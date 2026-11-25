"use client";

import { useEffect, useState } from "react";
import { CATEGORIES, PLACES } from "@/data/places";
import { KOMODITAS, LAHAN } from "@/data/pertanian";
import { SUBJECTS } from "@/data/statistik";
import { chip, searchIcon } from "./ui";

// Item yang bisa dicari. type menentukan apa yang terjadi saat dipilih (ditangani PetaApp):
//   place        -> buka detail tempat di peta
//   pertanian    -> buka tab Pertanian (komoditas: langsung ke detail komoditasnya)
//   kependudukan -> buka jendela statistik pada topik itu
const ITEMS = [
  ...PLACES.map((p) => ({ key: p.id, type: "place", id: p.id, nama: p.nama, cat: p.cat, sub: p.sub })),
  ...LAHAN.map((l) => ({ key: `lahan:${l.id}`, type: "pertanian", id: null, nama: l.name, cat: "Pertanian", sub: "Lahan" })),
  ...KOMODITAS.map((k) => ({ key: `komoditas:${k.id}`, type: "pertanian", id: k.id, nama: k.nama, cat: "Pertanian", sub: "Komoditas" })),
  ...SUBJECTS.map((s) => ({ key: `stat:${s.id}`, type: "kependudukan", id: s.id, nama: s.title, cat: "Kependudukan", sub: "Statistik" })),
];

const SEARCH_CATEGORIES = [...CATEGORIES.map((c) => c.name), "Pertanian", "Kependudukan"];

export default function SearchModal({ onClose, onSelect }) {
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState(null);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  const q = query.trim().toLowerCase();
  const rows = ITEMS.filter(
    (it) =>
      (!cat || it.cat === cat) &&
      (!q || [it.nama, it.cat, it.sub].some((v) => v.toLowerCase().includes(q))),
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
        <div className="flex items-center gap-3">
          <div className="flex h-[38px] min-w-0 flex-1 items-center gap-3.5 rounded-[10px] px-[18px] shadow-[0_2px_8px_rgba(0,0,0,.18)]">
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
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Hapus teks pencarian"
                className="cursor-pointer text-lg leading-none text-slate-400 hover:text-slate-600"
              >
                &times;
              </button>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup pencarian"
            className="grid size-9 flex-none cursor-pointer place-items-center rounded-full text-2xl leading-none text-slate-600 hover:bg-slate-100"
          >
            &times;
          </button>
        </div>

        <div className="mt-4 mb-[22px] flex flex-wrap justify-center gap-3">
          {SEARCH_CATEGORIES.map((name) => (
            <button
              key={name}
              type="button"
              className={chip(cat === name)}
              onClick={() => setCat((prev) => (prev === name ? null : name))}
            >
              {name}
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
              rows.map((it) => (
                <tr key={it.key} onClick={() => onSelect(it)} className="cursor-pointer hover:bg-[#f4f7fc]">
                  <td className="border-b border-[#eceef2] px-3.5 py-[11px]">{it.nama}</td>
                  <td className="border-b border-[#eceef2] px-3.5 py-[11px]">{it.cat}</td>
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
