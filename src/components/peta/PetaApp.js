"use client";

import { useCallback, useMemo, useState } from "react";
import { CATEGORIES, PLACES } from "@/data/places";
import MapView from "./MapView";
import Legend from "./Legend";
import CategoryPanel from "./CategoryPanel";
import DetailPanel from "./DetailPanel";
import SearchModal from "./SearchModal";
import { chip, overlay, searchIcon } from "./ui";

export default function PetaApp() {
  const [cat, setCat] = useState(null);
  const [sub, setSub] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [layerOn, setLayerOn] = useState({});

  const selected = useMemo(() => PLACES.find((p) => p.id === selectedId) ?? null, [selectedId]);
  const visible = useMemo(
    () => PLACES.filter((p) => p.lat != null && (!cat || p.cat === cat) && (!sub || p.sub === sub)),
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
        {CATEGORIES.map((c) => (
          <button key={c.name} type="button" className={chip(cat === c.name)} onClick={() => toggleCat(c.name)}>
            {c.name}
          </button>
        ))}
      </div>

      <Legend layerOn={layerOn} onToggle={(id) => setLayerOn((s) => ({ ...s, [id]: !s[id] }))} />

      {cat && !selected && (
        <CategoryPanel cat={cat} sub={sub} onSub={setSub} onClose={closeCat} onSelect={select} />
      )}
      {selected && <DetailPanel key={selected.id} place={selected} onClose={() => setSelectedId(null)} />}

      {searchOpen && <SearchModal onClose={closeSearch} onSelect={select} />}
    </main>
  );
}
