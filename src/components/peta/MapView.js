"use client";

import { useEffect, useRef, useState } from "react";
import "leaflet/dist/leaflet.css";
import { categoryColor } from "@/data/places";
import { LAYERS } from "@/data/layers";
import { overlay } from "./ui";

const CENTER = [-7.96, 110.22];

// Pin dibuat dengan inline style karena HTML-nya dirender oleh Leaflet, bukan React.
function pinIcon(L, color, active) {
  const style = [
    "width:22px;height:22px;border-radius:50% 50% 50% 0",
    `transform:rotate(-45deg)${active ? " scale(1.35)" : ""}`,
    "border:2px solid #fff",
    `background:${color}`,
    `box-shadow:${active ? "0 0 0 3px rgba(13,92,255,.5)," : ""}0 1px 4px rgba(0,0,0,.4)`,
  ].join(";");
  return L.divIcon({
    className: "",
    html: `<div style="${style}"></div>`,
    iconSize: [22, 22],
    iconAnchor: [11, 22],
  });
}

export default function MapView({ places, selected, onSelect, layerOn }) {
  const elRef = useRef(null);
  const ctxRef = useRef(null); // { L, map, group, markers, layers }
  const onSelectRef = useRef(onSelect);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    onSelectRef.current = onSelect;
  });

  // Inisialisasi peta (hanya di browser)
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const L = (await import("leaflet")).default;
      if (cancelled || !elRef.current) return;
      const map = L.map(elRef.current, { zoomControl: false, center: CENTER, zoom: 14 });
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: "&copy; OpenStreetMap contributors",
      }).addTo(map);
      ctxRef.current = { L, map, group: L.layerGroup().addTo(map), markers: new Map(), layers: {} };
      setReady(true);
    })();
    return () => {
      cancelled = true;
      ctxRef.current?.map.remove();
      ctxRef.current = null;
    };
  }, []);

  // Marker mengikuti daftar tempat yang terlihat
  useEffect(() => {
    const ctx = ctxRef.current;
    if (!ready || !ctx) return;
    const { L, map, group, markers } = ctx;
    group.clearLayers();
    markers.clear();
    places.forEach((p) => {
      const color = categoryColor(p.cat);
      const marker = L.marker([p.lat, p.lng], { icon: pinIcon(L, color, false), title: p.nama });
      marker.bindTooltip(p.nama);
      marker.on("click", () => onSelectRef.current(p.id));
      group.addLayer(marker);
      markers.set(p.id, { marker, color });
    });
    if (places.length) {
      map.fitBounds(L.latLngBounds(places.map((p) => [p.lat, p.lng])), { padding: [70, 70], maxZoom: 16 });
    }
  }, [ready, places]);

  // Sorot marker terpilih & arahkan peta ke sana
  useEffect(() => {
    const ctx = ctxRef.current;
    if (!ready || !ctx) return;
    const { L, map, markers } = ctx;
    markers.forEach(({ marker, color }, id) => marker.setIcon(pinIcon(L, color, id === selected?.id)));
    if (selected && selected.lat != null) {
      map.flyTo([selected.lat, selected.lng], Math.max(map.getZoom(), 16), { duration: 0.6 });
    }
  }, [ready, selected]);

  // Lapisan Legenda (GeoJSON)
  useEffect(() => {
    const ctx = ctxRef.current;
    if (!ready || !ctx) return;
    LAYERS.forEach((layer) => {
      if (!layer.geojson) return;
      if (!ctx.layers[layer.id]) ctx.layers[layer.id] = ctx.L.geoJSON(layer.geojson, { style: layer.style });
      const obj = ctx.layers[layer.id];
      if (layerOn[layer.id]) obj.addTo(ctx.map);
      else ctx.map.removeLayer(obj);
    });
  }, [ready, layerOn]);

  const zoomBtn = "h-[30px] w-[34px] cursor-pointer text-xl text-[#0f2552]";

  return (
    <>
      <div ref={elRef} className="absolute inset-0 z-[1]" />
      <div
        className={`${overlay} right-4 bottom-4 flex flex-col overflow-hidden rounded-[10px] bg-white shadow-peta max-[820px]:hidden`}
      >
        <button type="button" aria-label="Perbesar" className={zoomBtn} onClick={() => ctxRef.current?.map.zoomIn()}>
          +
        </button>
        <button
          type="button"
          aria-label="Perkecil"
          className={`${zoomBtn} border-t border-[#e3e7ee]`}
          onClick={() => ctxRef.current?.map.zoomOut()}
        >
          &minus;
        </button>
      </div>
    </>
  );
}
