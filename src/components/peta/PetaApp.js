"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { CATEGORIES, PLACES } from "@/data/places";
import { LAYERS } from "@/data/layers";
import MapView from "./MapView";
import Legend from "./Legend";
import CategoryPanel from "./CategoryPanel";
import KependudukanPanel from "./KependudukanPanel";
import StatistikModal from "@/components/statistik/StatistikModal";
import DetailPanel from "./DetailPanel";
import SearchModal from "./SearchModal";
import { chip, overlay, searchIcon } from "./ui";

// Tab statistik (bukan titik di peta): isinya panel data kependudukan.
const KEPENDUDUKAN = "Kependudukan";
const CHIPS = [...CATEGORIES.map((c) => c.name), KEPENDUDUKAN];

export default function PetaApp() {
  const [cat, setCat] = useState(null);
  const [sub, setSub] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [statId, setStatId] = useState(null); // topik statistik yang sedang dibuka (jendela besar)
  const [layerOn, setLayerOn] = useState({});
  const [available, setAvailable] = useState({});

  // Cek file GeoJSON mana yang sudah ada di /public/geojson/, lalu nyalakan yang defaultOn.
  useEffect(() => {
    let off = false;
    Promise.all(
      LAYERS.map((l) =>
        fetch(l.url, { method: "HEAD" })
          .then((r) => r.ok)
          .catch(() => false),
      ),
    ).then((found) => {
      if (off) return;
      const avail = {};
      const on = {};
      LAYERS.forEach((l, i) => {
        avail[l.id] = found[i];
        if (found[i] && l.defaultOn) on[l.id] = true;
      });
      setAvailable(avail);
      setLayerOn(on);
    });
    return () => {
      off = true;
    };
  }, []);

  const selected = useMemo(() => PLACES.find((p) => p.id === selectedId) ?? null, [selectedId]);
  const visible = useMemo(
    () => PLACES.filter((p) => p.lat != null && (!cat || cat === KEPENDUDUKAN || p.cat === cat) && (!sub || p.sub === sub)),
    [cat, sub],
  );

  const toggleCat = (name) => {
    setSelectedId(null);
    setSub(null);
    setCat((prev) => (prev === name ? null : name));
  };
  const closeCat = () => {
    setCat(null);
    setSub(null);
  };
  const select = useCallback((id) => {
    setCat(null);
    setSub(null);
    setSelectedId(id);
    setSearchOpen(false);
  }, []);
  const closeSearch = useCallback(() => setSearchOpen(false), []);
  const closeStat = useCallback(() => setStatId(null), []);

  return (
    <main className="relative min-h-[520px] flex-1">
      <MapView places={visible} selected={selected} onSelect={select} layerOn={layerOn} />

      <button
        type="button"
        onClick={() => setSearchOpen(true)}
        className={`${overlay} top-5 left-1/2 flex h-10 w-[min(460px,calc(100%-32px))] -translate-x-1/2 cursor-text items-center gap-3.5 rounded-xl bg-white px-[18px] text-left text-sm text-[#666] shadow-peta`}
      >
        <svg className={searchIcon} viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="11" cy="11" r="7" />
          <path d="M20 20l-4-4" />
        </svg>
        Cari produk atau tempat...
      </button>

      <div className={`${overlay} top-[68px] left-1/2 flex max-w-[calc(100%-32px)] -translate-x-1/2 gap-2.5 overflow-x-auto px-1.5 pt-1.5 pb-2.5`}>
        {CHIPS.map((name) => (
          <button key={name} type="button" className={chip(cat === name)} onClick={() => toggleCat(name)}>
            {name}
          </button>
        ))}
      </div>

      <Legend layerOn={layerOn} available={available} onToggle={(id) => setLayerOn((s) => ({ ...s, [id]: !s[id] }))} />

      {cat === KEPENDUDUKAN && !selected && <KependudukanPanel onClose={closeCat} onOpen={setStatId} />}
      {cat && cat !== KEPENDUDUKAN && !selected && (
        <CategoryPanel cat={cat} sub={sub} onSub={setSub} onClose={closeCat} onSelect={select} />
      )}
      {selected && <DetailPanel key={selected.id} place={selected} onClose={() => setSelectedId(null)} />}

      {searchOpen && <SearchModal onClose={closeSearch} onSelect={select} />}
      {statId && <StatistikModal key={statId} initialId={statId} onClose={closeStat} />}
    </main>
  );
}
