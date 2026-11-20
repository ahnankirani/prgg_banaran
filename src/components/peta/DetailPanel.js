"use client";

import { categoryColor } from "@/data/places";
import { closeBtn, panel, panelHead } from "./ui";

const isHttp = (u) => typeof u === "string" && /^https?:\/\//i.test(u);

export default function DetailPanel({ place, onClose }) {
  const rows = [
    ["Alamat", place.alamat],
    ["Jenis", place.jenis],
    ["Fasilitas", place.fasilitas],
    ["Kontak", place.kontak],
  ].filter(([, v]) => v);

  return (
    <aside className={panel}>
      <div className={panelHead}>
        <h2 className="text-center text-[17px] font-bold">{place.nama.toUpperCase()}</h2>
        <button type="button" className={closeBtn} onClick={onClose} aria-label="Tutup">
          &times;
        </button>
      </div>

      <div className="mt-1.5 mb-3.5 grid h-[170px] w-full place-items-center overflow-hidden rounded-[10px] bg-[#e8ebf1] text-xs text-[#888]">
        {place.foto ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img className="size-full object-contain" src={place.foto} alt={place.nama} />
        ) : (
          <span>Foto belum tersedia</span>
        )}
      </div>

      <span
        className="mb-2 inline-block rounded-full px-2.5 py-0.5 text-[11px] font-semibold text-white"
        style={{ background: categoryColor(place.cat) }}
      >
        {place.cat} · {place.sub}
      </span>
      <p className="text-justify text-[12.5px] leading-[1.45]">{place.deskripsi}</p>

      <dl className="mt-3.5 grid gap-2 text-xs">
        {rows.map(([k, v]) => (
          <div key={k}>
            <dt className="font-bold">{k}</dt>
            <dd className="break-words text-[#333]">{v}</dd>
          </div>
        ))}
        {place.lat == null && (
          <div>
            <dt className="font-bold">Lokasi</dt>
            <dd className="text-[#333]">Koordinat belum tersedia, belum bisa ditampilkan di peta.</dd>
          </div>
        )}
        {isHttp(place.sumber) && (
          <div>
            <dt className="font-bold">Sumber data</dt>
            <dd>
              <a className="text-link underline" href={place.sumber} target="_blank" rel="noopener noreferrer">
                Buka sumber
              </a>
            </dd>
          </div>
        )}
      </dl>
    </aside>
  );
}
