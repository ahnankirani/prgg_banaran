import ekraf from "./ekraf.json";
import pariwisata from "./pariwisata.json";
import fasum from "./fasum.json";

// Sumber: "Data Sumberdaya Banaran.xlsx" (diekspor ke ekraf.json, pariwisata.json, fasum.json).
// Koordinat Fasum di Excel rusak (angka ilmiah) dan sudah dikoreksi saat ekspor.

export const CATEGORIES = [
  { name: "Ekonomi Kreatif", color: "#e8731a" },
  { name: "Pariwisata", color: "#2d5a8c" },
  { name: "Fasilitas Umum", color: "#8b7fd6" },
];

export const SUB_COLORS = ["#2d5a8c", "#8b7fd6", "#e6b43c", "#2e9d57", "#d6336c", "#17a2b8"];

const humanize = (s) => s.replace(/_/g, " ");

const places = [
  ...ekraf.map((p) => ({ ...p, cat: "Ekonomi Kreatif", sub: p.kategori })),
  ...pariwisata.map((p) => ({ ...p, cat: "Pariwisata", sub: humanize(p.kategori) })),
  ...fasum.map((p) => ({ ...p, cat: "Fasilitas Umum", sub: p.kategori })),
];

export const PLACES = places.map((p) => ({
  id: p.id,
  nama: p.nama,
  cat: p.cat,
  sub: p.sub,
  jenis: p.jenis ?? null,
  alamat: p.alamat,
  lat: p.lat ?? null,
  lng: p.lng ?? null,
  deskripsi: p.deskripsi,
  fasilitas: p.fasilitas ?? null,
  kontak: p.kontak ?? null,
  foto: p.foto ?? null,
  sumber: p.sumber ?? null,
}));

export function subCategories(cat) {
  return [...new Set(PLACES.filter((p) => p.cat === cat).map((p) => p.sub))];
}

export function categoryColor(cat) {
  return CATEGORIES.find((c) => c.name === cat)?.color ?? "#2d5a8c";
}
