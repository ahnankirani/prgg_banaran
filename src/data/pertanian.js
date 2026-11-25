// DATA DUMMY — ganti dengan data pertanian asli Kalurahan Banaran.
// Mengikuti diagram kebutuhan data: (1) luas lahan pertanian (sawah & nonsawah),
// (2) persebaran lahan (peta, lihat public/geojson/lahan-*.geojson), (3) komoditas pertanian.
// Angka konsisten: luas sawah = jumlah rinciannya, luas nonsawah = jumlah rinciannya, total = sawah + nonsawah.

import { YEARS } from "./statistik";

export const PERTANIAN_DUMMY = true;
export { YEARS };

const teknis = [210, 208, 206, 205, 203, 201];
const setengah = [95, 95, 94, 93, 93, 92];
const tadah = [120, 118, 117, 115, 114, 112];
const pekarangan = [180, 183, 186, 189, 191, 194];
const tegalan = [140, 139, 137, 136, 135, 133];
const lainnya = [60, 62, 64, 66, 68, 70];

const sum = (...arrs) => arrs[0].map((_, i) => arrs.reduce((s, a) => s + a[i], 0));
const sawah = sum(teknis, setengah, tadah);
const nonsawah = sum(pekarangan, tegalan, lainnya);

// Format sama dengan SUBJECTS di statistik.js, sehingga dipakai oleh jendela statistik yang sama
// ("Dashboard Statistik Luas Lahan Pertanian").
export const PERTANIAN_SUBJECTS = [
  {
    id: "luas",
    title: "Luas Lahan Pertanian",
    series: [
      { key: "sawah", label: "Lahan Sawah", unit: "ha", values: sawah },
      { key: "nonsawah", label: "Lahan Nonsawah", unit: "ha", values: nonsawah },
      { key: "total", label: "Total Lahan Pertanian", unit: "ha", values: sum(sawah, nonsawah) },
    ],
  },
  {
    id: "sawah",
    title: "Rincian Lahan Sawah",
    series: [
      { key: "teknis", label: "Irigasi Teknis", unit: "ha", values: teknis },
      { key: "setengah", label: "Irigasi Setengah Teknis", unit: "ha", values: setengah },
      { key: "tadah", label: "Tadah Hujan", unit: "ha", values: tadah },
    ],
  },
  {
    id: "nonsawah",
    title: "Rincian Lahan Nonsawah",
    series: [
      { key: "pekarangan", label: "Pekarangan", unit: "ha", values: pekarangan },
      { key: "tegalan", label: "Tegalan/Kebun", unit: "ha", values: tegalan },
      { key: "lainnya", label: "Lainnya", unit: "ha", values: lainnya },
    ],
  },
  {
    id: "komoditas",
    title: "Luas Tanam Komoditas",
    series: [
      { key: "padi", label: "Padi", unit: "ha", values: [380, 376, 372, 368, 365, 360] },
      { key: "jagung", label: "Jagung", unit: "ha", values: [60, 62, 63, 64, 65, 66] },
      { key: "cabai", label: "Cabai Merah", unit: "ha", values: [35, 38, 40, 43, 45, 48] },
      { key: "bawang", label: "Bawang Merah", unit: "ha", values: [28, 30, 32, 33, 35, 36] },
      { key: "semangka", label: "Semangka", unit: "ha", values: [45, 47, 48, 50, 52, 54] },
      { key: "kelapa", label: "Kelapa", unit: "ha", values: [70, 70, 71, 71, 72, 72] },
    ],
  },
];

const last = (arr) => arr[arr.length - 1];

// Ringkasan lahan tahun terbaru untuk panel peta (warna sama dengan lapisan peta).
export const LAHAN = [
  { id: "sawah", name: "Lahan Sawah", luas: last(sawah), color: "#4caf50" },
  { id: "nonsawah", name: "Lahan Nonsawah", luas: last(nonsawah), color: "#f0b44c" },
];

// "Informasi Komoditas". luas = luas tanam tahun terbaru (ha), produksi dalam ton.
export const KOMODITAS = [
  { id: "padi", nama: "Padi", lahan: "Sawah", luas: 360, produksi: 2160, musim: "2 kali tanam per tahun", deskripsi: "Komoditas utama di lahan sawah beririgasi dan tadah hujan." },
  { id: "jagung", nama: "Jagung", lahan: "Sawah", luas: 66, produksi: 330, musim: "Musim kemarau (palawija)", deskripsi: "Ditanam bergilir dengan padi saat air irigasi berkurang." },
  { id: "cabai", nama: "Cabai Merah", lahan: "Nonsawah", luas: 48, produksi: 288, musim: "Sepanjang tahun", deskripsi: "Ditanam di lahan pasir/tegalan dengan sistem sumur renteng." },
  { id: "bawang", nama: "Bawang Merah", lahan: "Nonsawah", luas: 36, produksi: 360, musim: "Musim kemarau", deskripsi: "Komoditas bernilai tinggi pada lahan pasir dekat pesisir." },
  { id: "semangka", nama: "Semangka", lahan: "Nonsawah", luas: 54, produksi: 1620, musim: "Musim kemarau", deskripsi: "Buah musiman yang banyak dibudidayakan di lahan pasir pesisir." },
  { id: "kelapa", nama: "Kelapa", lahan: "Nonsawah", luas: 72, produksi: 130, musim: "Panen sepanjang tahun", deskripsi: "Tanaman tahunan di pekarangan dan tegalan." },
];
