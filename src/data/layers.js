// Lapisan peta untuk Legenda. Isi `geojson` dengan data GeoJSON asli (objek FeatureCollection)
// agar toggle aktif. Selama `geojson` null, toggle ditampilkan nonaktif ("belum ada data").
export const LAYERS = [
  { id: "kel", name: "Batas Kelurahan", color: "#5b6b8c", dashed: true, style: { color: "#5b6b8c", weight: 2, dashArray: "6 6", fill: false }, geojson: null },
  { id: "pdk", name: "Batas Padukuhan", color: "#e6c84c", dashed: true, style: { color: "#e6c84c", weight: 2, dashArray: "4 4", fill: false }, geojson: null },
  { id: "ju", name: "Jalan Utama", color: "#f0603c", style: { color: "#f0603c", weight: 5 }, geojson: null },
  { id: "jl", name: "Jalan Lokal", color: "#9aa6bd", style: { color: "#9aa6bd", weight: 3 }, geojson: null },
  { id: "sg", name: "Sungai", color: "#0d5cff", style: { color: "#2f7bff", weight: 4, opacity: 0.85 }, geojson: null },
];
