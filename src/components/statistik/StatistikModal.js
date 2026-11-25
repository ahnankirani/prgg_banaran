"use client";

import { useEffect, useState } from "react";
import { ALL_ID, SERIES_COLORS, STATISTIK_DUMMY, SUBJECTS, YEARS } from "@/data/statistik";
import LineChart from "./LineChart";
import StatTable from "./StatTable";

const fmt = (n) => n.toLocaleString("id-ID");
const lastYear = YEARS[YEARS.length - 1];

const withColors = (subject) =>
  subject.series.map((s, i) => ({ ...s, color: SERIES_COLORS[i % SERIES_COLORS.length] }));

const idOf = (subject, series) => `${subject.id}:${series.key}`;

// Data yang tercentang saat jendela pertama kali dibuka pada "Semua Statistik" (untuk data kependudukan).
const DEFAULT_SELECTED = ["penduduk:jml", "kk:kk"];

const ChartIcon = () => (
  <svg className="size-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M6 20V10M12 20V4M18 20v-7" strokeLinecap="round" />
  </svg>
);
const GridIcon = () => (
  <svg className="size-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24" aria-hidden="true">
    <rect x="3" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
    <rect x="14" y="14" width="7" height="7" rx="1" />
  </svg>
);

function ChartOrTable({ view, series, autoMin = false }) {
  return view === "grafik" ? (
    <div className="p-5 sm:p-7">
      <div className="mb-3 flex items-center gap-2 text-slate-600">
        <svg className="size-5 fill-none stroke-brand stroke-2" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M3 17l6-6 4 4 8-8M15 7h6v6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Tren per tahun
      </div>
      <LineChart years={YEARS} series={series} autoMin={autoMin} />
    </div>
  ) : (
    <StatTable years={YEARS} series={series} />
  );
}

// Tampilan satu topik: kartu angka tahun terbaru + grafik tren / tabel.
function SubjectView({ subject, view }) {
  const series = withColors(subject);

  return (
    <>
      <div className="mb-5 grid gap-4" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))" }}>
        {series.map((s) => (
          <div key={s.key} className="rounded-2xl border border-slate-200 bg-white px-5 py-4">
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <i className="size-2.5 flex-none rounded-full" style={{ background: s.color }} />
              {s.label}
            </div>
            <div className="mt-2 text-3xl font-bold text-slate-900">{fmt(s.values[s.values.length - 1])}</div>
            <div className="mt-2 text-xs text-slate-400">
              {s.unit} • {lastYear}
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white">
        <ChartOrTable view={view} series={series} />
      </div>
    </>
  );
}

// "Semua Statistik": pilihan data (centang) di ATAS, lalu SATU grafik/tabel gabungan di bawahnya.
function AllView({ subjects, selected, toggle, onClear, view }) {
  const [scale, setScale] = useState("asli"); // "asli" | "indeks"

  const colorOf = (id) => SERIES_COLORS[selected.indexOf(id) % SERIES_COLORS.length];

  const chosen = selected
    .map((id) => {
      const [sid, key] = id.split(":");
      const subject = subjects.find((s) => s.id === sid);
      const s = subject?.series.find((x) => x.key === key);
      if (!s) return null;
      const base = s.values[0] || 1;
      const values = scale === "indeks" ? s.values.map((v) => Math.round((v / base) * 1000) / 10) : s.values;
      const label = s.label === subject.title ? s.label : `${subject.title} · ${s.label}`;
      return { key: id, label, unit: scale === "indeks" ? "indeks" : s.unit, values, color: colorOf(id) };
    })
    .filter(Boolean);

  const scaleBtn = (id, label) => (
    <button
      type="button"
      onClick={() => setScale(id)}
      aria-pressed={scale === id}
      className={`cursor-pointer rounded-md px-3 py-1.5 text-xs font-semibold ${
        scale === id ? "bg-brand text-white" : "text-slate-600 hover:bg-slate-50"
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="rounded-2xl border border-slate-200 bg-white">
      {/* 1. Pilih data (dikelompokkan per topik) */}
      <div className="border-b border-slate-100 px-5 py-4">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-800">Pilih data</h3>
          {selected.length > 0 && (
            <button type="button" onClick={onClear} className="cursor-pointer text-xs font-medium text-link">
              Hapus semua
            </button>
          )}
        </div>
        <div className="grid gap-x-6 gap-y-3 md:grid-cols-2">
          {subjects.map((subject) => (
            <div key={subject.id}>
              <div className="mb-1.5 text-xs font-semibold tracking-wide text-slate-500 uppercase">{subject.title}</div>
              <div className="flex flex-wrap gap-1.5">
                {subject.series.map((s) => {
                  const id = idOf(subject, s);
                  const checked = selected.includes(id);
                  return (
                    <label
                      key={id}
                      className={`flex cursor-pointer items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs select-none ${
                        checked
                          ? "border-brand bg-brand-soft font-semibold text-brand-dark"
                          : "border-slate-200 text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggle(id)}
                        className="size-3.5 cursor-pointer accent-[#2B5A8E]"
                      />
                      {checked && <i className="size-2 flex-none rounded-full" style={{ background: colorOf(id) }} />}
                      {s.label}
                    </label>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Kontrol skala */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 px-5 py-3">
        <p className="text-xs text-slate-500">
          {chosen.length === 0
            ? "Centang data di atas untuk menampilkannya pada grafik."
            : chosen.length === 1
              ? "Centang data lain untuk membandingkan."
              : `${chosen.length} data dibandingkan.`}
          {scale === "indeks" && " Indeks: nilai 2021 = 100, agar data berbeda skala tetap sebanding."}
        </p>
        <div className="flex gap-1 rounded-lg border border-slate-200 bg-white p-1">
          {scaleBtn("asli", "Nilai asli")}
          {scaleBtn("indeks", "Indeks (2021 = 100)")}
        </div>
      </div>

      {/* 3. Satu grafik / tabel gabungan */}
      {chosen.length ? (
        <ChartOrTable view={view} series={chosen} autoMin={scale === "indeks"} />
      ) : (
        <div className="grid h-64 place-items-center text-sm text-slate-400">Belum ada data yang dipilih</div>
      )}
    </div>
  );
}

// Jendela statistik per tahun (dipakai oleh panel Kependudukan dan Pertanian di halaman Peta).
//   subjects        : daftar topik (default: data kependudukan)
//   defaultSelected : data yang tercentang saat "Semua Statistik" dibuka
//   label           : nama jendela (untuk aksesibilitas)
export default function StatistikModal({
  initialId,
  onClose,
  subjects = SUBJECTS,
  defaultSelected = DEFAULT_SELECTED,
  label = "Statistik kependudukan",
}) {
  const [subjectId, setSubjectId] = useState(initialId ?? ALL_ID);
  const [view, setView] = useState("grafik");
  const [selected, setSelected] = useState(defaultSelected); // id data yang dicentang (urut waktu dipilih)

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  const isAll = subjectId === ALL_ID;
  const subject = isAll ? null : (subjects.find((s) => s.id === subjectId) ?? subjects[0]);

  const toggle = (id) => setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  const toggleBtn = (id, text, icon) => (
    <button
      type="button"
      onClick={() => setView(id)}
      aria-pressed={view === id}
      className={`flex cursor-pointer items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold ${
        view === id ? "bg-brand-dark text-white" : "text-slate-600 hover:bg-slate-50"
      }`}
    >
      {icon}
      {text}
    </button>
  );

  const navItem = (id, title) => (
    <li key={id} className="flex-none">
      <button
        type="button"
        onClick={() => setSubjectId(id)}
        aria-current={id === subjectId}
        className={`w-full cursor-pointer rounded-lg px-4 py-3 text-left text-base whitespace-nowrap lg:whitespace-normal ${
          id === subjectId ? "bg-brand-soft font-semibold text-brand-dark" : "text-slate-800 hover:bg-slate-50"
        }`}
      >
        {title}
      </button>
    </li>
  );

  return (
    <div
      className="fixed inset-0 z-[3000] flex items-center justify-center bg-black/55 p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={label}
        className="relative max-h-[calc(100vh-32px)] w-[min(1200px,100%)] overflow-auto rounded-3xl bg-slate-50 p-5 font-sans sm:p-7"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Tutup"
          className="absolute top-3 right-4 z-10 size-9 cursor-pointer text-3xl leading-none text-slate-600"
        >
          &times;
        </button>

        <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
          {/* Sidebar subjek */}
          <aside className="h-fit overflow-hidden rounded-2xl border border-slate-200 bg-white">
            <div className="bg-brand px-5 py-3.5 text-lg font-bold text-white">Subjek Statistik</div>
            <ul className="flex gap-1 overflow-x-auto p-2.5 lg:block lg:space-y-1 lg:overflow-visible">
              {navItem(ALL_ID, "Semua Statistik")}
              {subjects.map((s) => navItem(s.id, s.title))}
            </ul>
          </aside>

          {/* Konten */}
          <section className="min-w-0">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3 pr-10">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">{isAll ? "Semua Statistik" : subject.title}</h2>
                {STATISTIK_DUMMY && (
                  <p className="mt-1 text-xs text-amber-700">Data contoh (dummy), belum data resmi.</p>
                )}
              </div>
              <div className="flex gap-1 rounded-xl border border-slate-200 bg-white p-1">
                {toggleBtn("grafik", "Grafik", <ChartIcon />)}
                {toggleBtn("tabel", "Tabel", <GridIcon />)}
              </div>
            </div>

            {isAll ? (
              <AllView
                subjects={subjects}
                selected={selected}
                toggle={toggle}
                onClear={() => setSelected([])}
                view={view}
              />
            ) : (
              <SubjectView key={subject.id} subject={subject} view={view} />
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
