// Lapisan peta untuk Legenda. Setiap layer dimuat dari file GeoJSON di /public/geojson/.
// Selama file belum ada, toggle ditampilkan nonaktif ("belum ada data"); begitu file ada, otomatis aktif.
// Data HARUS berkoordinat WGS84 (EPSG:4326). Urutan array = urutan tumpukan (yang bawah tampil paling atas).
//   defaultOn: true  -> langsung tampil saat halaman dibuka (jika file ada)

export const LAYERS = [
  {
    id: "kel",
    name: "Batas Kelurahan",
    url: "/geojson/batas-kalurahan.geojson",
    color: "#5b6b8c",
    dashed: true,
    defaultOn: true,
    style: { color: "#5b6b8c", weight: 3, dashArray: "8 6", fill: true, fillOpacity: 0 },
  },
  {
    id: "pdk",
    name: "Batas Padukuhan",
    url: "/geojson/batas-padukuhan.geojson",
    color: "#d9a900",
    dashed: true,
    defaultOn: true,
    style: { color: "#d9a900", weight: 2, dashArray: "4 4", fill: true, fillOpacity: 0 },
  },
  {
    id: "ju",
    name: "Jalan Utama",
    url: "/geojson/jalan-utama.geojson",
    color: "#f0603c",
    style: { color: "#f0603c", weight: 5 },
  },
  {
    id: "jl",
    name: "Jalan Lokal",
    url: "/geojson/jalan-lokal.geojson",
    color: "#9aa6bd",
    style: { color: "#9aa6bd", weight: 3 },
  },
  {
    id: "sg",
    name: "Sungai",
    url: "/geojson/sungai.geojson",
    color: "#0d5cff",
    style: { color: "#2f7bff", weight: 4, opacity: 0.85 },
  },
];

// Nama atribut (kolom tabel SHP) yang dipakai sebagai label saat di-hover, dicoba berurutan.
export const NAME_PROPS = ["NAMOBJ", "WADMKD", "NAMA", "Nama", "NAME", "Name", "name", "DUSUN", "Dusun", "PADUKUHAN", "Padukuhan", "REMARK"];
