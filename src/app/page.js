import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const STATS = [
  { label: "Jumlah Penduduk", value: "1000" },
  { label: "Kepala Keluarga", value: "1000" },
  { label: "Luas Wilayah", value: "1000" },
  { label: "Jumlah Padukuhan", value: "1000" },
];

// Gambar diambil dari /public/images/. Jika file belum ada, gradient dipakai sebagai cadangan.
const PRODUK = [
  {
    kategori: "Wisata",
    nama: "Pantai Trisik",
    img: "pantai-trisik.jpg",
    fallback: "linear-gradient(180deg,#2a4f8f 0%,#f08a2c 55%,#e6572a 70%,#2c3b52 100%)",
    deskripsi:
      "Pantai Trisik terletak di arah tenggara Kulon Progo tepatnya di Banaran, Galur. Pantai Trisik merupakan pantai yang landai berupa hamparan pasir hitam.",
  },
  {
    kategori: "Pertanian",
    nama: "Konservasi Mangrove",
    img: "mangrove.jpg",
    fallback: "linear-gradient(180deg,#3a8de0 0%,#7fc1f0 40%,#2a8a3a 55%,#1d4fa8 100%)",
    deskripsi:
      "Kawasan konservasi mangrove Banaran terletak di Kalurahan/Desa Banaran, Kapanewon Galur, Kabupaten Kulon Progo, di sekitar wilayah muara Sungai Progo",
  },
  {
    kategori: "Ekonomi Kreatif",
    nama: "Lele Asap",
    img: "lele-asap.jpg",
    fallback: "linear-gradient(135deg,#2f5a2e,#7d5a2c 60%,#3d2a18)",
    deskripsi:
      "Kampung Lele Asap Banaran adalah sentra kuliner tradisional dan wisata olahan lele asap yang terletak di Padukuhan Jati, Kalurahan Banaran, Kapanewon Galur",
  },
  {
    kategori: "Ekonomi Kreatif",
    nama: "Batik Tulis",
    img: "batik-tulis.jpg",
    fallback: "linear-gradient(135deg,#5b2a6b,#c9a46a 60%,#f1e4c6)",
    deskripsi:
      "Batik Tulis Banaran merupakan salah satu produk kerajinan batik khas yang berkembang di Dusun Banaran, Kalurahan Banaran, Kapanewon Galur, Kabupaten Kulon Progo,",
  },
];

const LOKASI = [
  ["Kapanewon", "Galur"],
  ["Kabupaten", "Kulon Progo"],
  ["Provinsi", "Daerah Istimewa Yogyakarta"],
];

export default function Home() {
  return (
    <div className="flex flex-1 flex-col bg-sky-page">
      <Header />

      {/* Hero */}
      <section
        className="relative h-[710px] flex-none bg-cover bg-center bg-no-repeat text-center text-white max-[700px]:h-auto max-[700px]:pb-6"
        style={{
          backgroundImage:
            "linear-gradient(rgba(60,110,190,.35),rgba(60,110,190,.35)), url(/images/hero-banaran.jpg), linear-gradient(180deg,#6f9fd8 0%,#9ec1e6 45%,#4f7fae 70%,#2b3f50 100%)",
        }}
      >
        <h2 className="pt-[180px] font-serif text-[72px] font-bold [text-shadow:0_2px_10px_rgba(0,0,0,.2)] max-[700px]:px-4 max-[700px]:pt-[70px] max-[700px]:pb-6 max-[700px]:text-[40px]">
          Kalurahan Banaran
        </h2>
        <div className="absolute inset-x-[72px] top-[456px] grid grid-cols-4 gap-10 max-[1100px]:inset-x-6 max-[1100px]:gap-4 max-[700px]:static max-[700px]:grid-cols-2 max-[700px]:gap-3 max-[700px]:px-4">
          {STATS.map((s) => (
            <div key={s.label} className="rounded-lg bg-brand-soft px-4 pt-3 pb-2.5 text-center shadow-[0_4px_10px_rgba(0,0,0,.15)]">
              <h3 className="font-serif text-2xl font-semibold text-[#444] max-[700px]:text-base">{s.label}</h3>
              <p className="mt-1 text-[32px] font-bold text-brand-dark max-[700px]:text-2xl">{s.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Lokasi */}
      <section
        id="lokasi"
        className="relative z-[5] mx-auto -mt-10 grid w-full max-w-[1306px] grid-cols-2 gap-10 px-[103px] max-[1100px]:px-6 max-[700px]:mt-6 max-[700px]:grid-cols-1 max-[700px]:gap-5"
      >
        <div className="h-72 overflow-hidden rounded-3xl bg-white px-10 py-6 shadow-[0_4px_12px_rgba(0,0,0,.18)] max-[700px]:h-auto">
          <h3 className="mb-4 font-serif text-[32px] font-semibold text-[#4a4a52]">Lokasi Geografis</h3>
          <dl className="grid gap-y-3 font-serif text-[25px] max-[700px]:text-[19px]">
            {LOKASI.map(([k, v]) => (
              <div key={k} className="grid grid-cols-2">
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="h-72 overflow-hidden rounded-3xl bg-white shadow-[0_4px_12px_rgba(0,0,0,.18)] max-[700px]:h-[260px]">
          <iframe
            className="size-full border-0"
            src="https://maps.google.com/maps?q=Banaran,+Galur,+Kulon+Progo&output=embed"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Peta Kalurahan Banaran"
          />
        </div>
      </section>

      {/* Produk unggulan */}
      <section className="mx-auto mt-[139px] w-[calc(100%-32px)] max-w-[1384px] rounded-[32px] bg-white px-12 pt-14 pb-[72px] max-[700px]:mt-12 max-[700px]:px-4 max-[700px]:py-8">
        <h2 className="mb-6 pl-2.5 text-[40px] font-bold text-[#4a4d57]">Produk Unggulan</h2>
        <div className="grid grid-cols-4 gap-8 max-[1100px]:grid-cols-2 max-[700px]:grid-cols-1">
          {PRODUK.map((p) => (
            <article key={p.nama} className="flex flex-col rounded-[28px] bg-card px-[33px] pt-10 pb-7">
              <div
                role="img"
                aria-label={p.nama}
                className="aspect-[234/177] w-full rounded-[2px] bg-cover bg-center"
                style={{ backgroundImage: `url(/images/${p.img}), ${p.fallback}` }}
              />
              <div className="flex flex-1 flex-col px-[3px]">
                <div className="mt-3 mb-2 text-lg font-medium text-link">{p.kategori}</div>
                <h3 className="mb-1.5 text-lg font-medium">{p.nama}</h3>
                <p className="flex-1 text-justify text-xs leading-tight">{p.deskripsi}</p>
                <Link href="/peta" className="mt-5 inline-flex items-center gap-2 text-[17px] font-medium text-link">
                  learn more
                  <svg className="size-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
