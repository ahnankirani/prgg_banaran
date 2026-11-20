// DATA DUMMY — ganti dengan data statistik asli Kalurahan Banaran.
// 7 topik di bawah sama dengan tombol di panel "Kependudukan" pada halaman Peta.
// Tiap topik punya beberapa seri; setiap seri punya satu nilai per tahun (urut sesuai YEARS).
// Angka antar-seri dibuat konsisten (mis. Jumlah Penduduk = Laki-laki + Perempuan), tapi bukan data nyata.

export const STATISTIK_DUMMY = true;

export const YEARS = [2021, 2022, 2023, 2024, 2025, 2026];

// ID khusus untuk tampilan "Statistik" yang menampilkan semua topik sekaligus.
export const ALL_ID = "semua";

// Warna seri diambil berurutan dari palet ini.
export const SERIES_COLORS = ["#2B5A8E", "#6366f1", "#f59e0b", "#0ea5e9", "#ec4899", "#10b981", "#ef4444"];

const laki = [2652, 2671, 2690, 2705, 2711, 2722];
const perempuan = [2688, 2701, 2712, 2718, 2721, 2730];
const penduduk = laki.map((v, i) => v + perempuan[i]);
const kk = [1612, 1634, 1655, 1672, 1688, 1701];
const kkPerempuan = [256, 268, 281, 293, 304, 317];

export const SUBJECTS = [
  {
    id: "penduduk",
    title: "Jumlah Penduduk",
    series: [{ key: "jml", label: "Jumlah Penduduk", unit: "jiwa", values: penduduk }],
  },
  {
    id: "kk",
    title: "Jumlah Kepala Keluarga",
    series: [
      { key: "kk", label: "Jumlah KK", unit: "KK", values: kk },
      { key: "kkl", label: "KK Laki-laki", unit: "KK", values: kk.map((v, i) => v - kkPerempuan[i]) },
      { key: "kkp", label: "KK Perempuan", unit: "KK", values: kkPerempuan },
    ],
  },
  {
    id: "pencaharian",
    title: "Mata Pencaharian",
    series: [
      { key: "tani", label: "Petani", unit: "orang", values: [1320, 1295, 1275, 1255, 1240, 1225] },
      { key: "buruh", label: "Buruh", unit: "orang", values: [800, 820, 835, 850, 860, 872] },
      { key: "wira", label: "Wiraswasta", unit: "orang", values: [480, 498, 515, 530, 540, 552] },
      { key: "dagang", label: "Pedagang", unit: "orang", values: [350, 358, 366, 373, 380, 386] },
      { key: "nelayan", label: "Nelayan", unit: "orang", values: [300, 306, 311, 316, 320, 324] },
      { key: "pns", label: "PNS/TNI/Polri", unit: "orang", values: [195, 199, 203, 207, 210, 213] },
      { key: "lain", label: "Lainnya", unit: "orang", values: [584, 600, 614, 628, 640, 652] },
    ],
  },
  {
    id: "usia",
    title: "Kelompok Usia",
    series: [
      { key: "u0", label: "0–4 th", unit: "jiwa", values: [360, 352, 346, 342, 340, 338] },
      { key: "u5", label: "5–14 th", unit: "jiwa", values: [790, 788, 784, 781, 780, 779] },
      { key: "u15", label: "15–24 th", unit: "jiwa", values: [850, 853, 857, 859, 860, 862] },
      { key: "u25", label: "25–44 th", unit: "jiwa", values: [1490, 1505, 1522, 1535, 1540, 1552] },
      { key: "u45", label: "45–59 th", unit: "jiwa", values: [1070, 1095, 1115, 1130, 1140, 1150] },
      { key: "u60", label: "60+ th", unit: "jiwa", values: [780, 779, 778, 776, 772, 771] },
    ],
  },
  {
    id: "pendidikan",
    title: "Tingkat Pendidikan",
    series: [
      { key: "bs", label: "Belum/Tidak Sekolah", unit: "jiwa", values: [700, 680, 660, 640, 620, 600] },
      { key: "sd", label: "SD", unit: "jiwa", values: [1500, 1490, 1475, 1460, 1450, 1440] },
      { key: "smp", label: "SMP", unit: "jiwa", values: [1150, 1170, 1190, 1200, 1210, 1220] },
      { key: "sma", label: "SMA/SMK", unit: "jiwa", values: [1500, 1540, 1570, 1600, 1620, 1650] },
      { key: "pt", label: "Perguruan Tinggi", unit: "jiwa", values: [490, 492, 507, 523, 532, 542] },
    ],
  },
  {
    id: "gender",
    title: "Jenis Kelamin",
    series: [
      { key: "l", label: "Laki-laki", unit: "jiwa", values: laki },
      { key: "p", label: "Perempuan", unit: "jiwa", values: perempuan },
    ],
  },
  {
    id: "kesejahteraan",
    title: "Tingkat Kesejahteraan",
    series: [
      { key: "pra", label: "Prasejahtera", unit: "KK", values: [260, 248, 236, 225, 214, 205] },
      { key: "ks1", label: "Sejahtera I", unit: "KK", values: [380, 374, 368, 362, 356, 350] },
      { key: "ks2", label: "Sejahtera II", unit: "KK", values: [570, 583, 597, 606, 612, 620] },
      { key: "ks3", label: "Sejahtera III", unit: "KK", values: [350, 375, 400, 418, 438, 455] },
      { key: "ks3p", label: "Sejahtera III Plus", unit: "KK", values: [52, 54, 54, 61, 68, 71] },
    ],
  },
];
