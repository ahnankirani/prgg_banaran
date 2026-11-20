"use client";

import { useState } from "react";

const fmt = (n) => n.toLocaleString("id-ID");

// series: [{ key, label, values[] }]
// query: (opsional) kata kunci dari luar. Jika diisi, kolom "Cari…" bawaan disembunyikan.
export default function StatTable({ years, series, query: externalQuery }) {
  const [year, setYear] = useState("all");
  const [ownQuery, setOwnQuery] = useState("");
  const controlled = externalQuery !== undefined;
  const query = controlled ? externalQuery : ownQuery;
  const setQuery = setOwnQuery;

  const rows = years.map((yr, i) => ({ year: yr, vals: series.map((s) => s.values[i]) })).reverse();
  const q = query.trim();
  const filtered = rows.filter(
    (r) =>
      (year === "all" || String(r.year) === year) &&
      (!q || [r.year, ...r.vals].some((v) => String(v).includes(q) || fmt(v).includes(q))),
  );

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 p-5">
        <label className="flex items-center gap-2 text-sm text-slate-700">
          Tahun:
          <select
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm"
          >
            <option value="all">Semua Tahun</option>
            {years
              .slice()
              .reverse()
              .map((yr) => (
                <option key={yr} value={String(yr)}>
                  {yr}
                </option>
              ))}
          </select>
        </label>
        {!controlled && (
          <div className="flex w-full max-w-[260px] items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm">
            <svg className="size-4 flex-none fill-none stroke-slate-400 stroke-2" viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="11" cy="11" r="7" />
              <path d="M20 20l-4-4" />
            </svg>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari..."
              className="min-w-0 flex-1 outline-none"
            />
          </div>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[520px] border-collapse text-left text-sm">
          <thead>
            <tr className="bg-brand text-white">
              <th className="px-5 py-3.5 font-semibold">Tahun</th>
              {series.map((s) => (
                <th key={s.key} className="px-5 py-3.5 font-semibold">
                  {s.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length ? (
              filtered.map((r, i) => (
                <tr key={r.year} className={i % 2 ? "bg-slate-50" : "bg-white"}>
                  <td className="px-5 py-4 font-bold text-slate-800">{r.year}</td>
                  {r.vals.map((v, j) => (
                    <td key={series[j].key} className="px-5 py-4 text-slate-700">
                      {fmt(v)}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={series.length + 1} className="px-5 py-6 text-center text-slate-500">
                  Tidak ada data
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
