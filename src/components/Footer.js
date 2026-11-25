const ROW = "mb-1 flex items-center gap-3 text-[15px] leading-normal";
const ICON = "size-[30px] flex-none";
const SOCIAL_ICON = "size-[38px]";

export default function Footer({ flush = false }) {
  return (
    <footer
      className={`grid flex-none grid-cols-[340px_414px_1fr_auto] items-center bg-brand text-white max-[1100px]:grid-cols-2 max-[1100px]:gap-7 max-[1100px]:px-8 max-[1100px]:py-9 max-[700px]:grid-cols-1 ${
        flush
          ? "px-[60px] py-5"
          : "mt-[216px] px-[104px] py-9 max-[700px]:mt-20"
      }`}
    >
      <div className="flex items-center gap-4">
        <div className="size-9 flex-none rounded-lg bg-white" />
        <div>
          <strong className="block text-[17px] font-bold">
            Kalurahan Banaran
          </strong>
          <small className="text-sm">Kapanewon Galur</small>
        </div>
      </div>

      <div>
        <h4 className="mb-1.5 text-sm font-medium">Alamat Kantor</h4>
        <div className={ROW}>
          <svg
            className={ICON}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
          >
            <path d="M12 22s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12z" />
            <circle cx="12" cy="10" r="2.6" />
          </svg>
          <span>
            Jl. Pantai Trisik, Dusun 7, Banaran, Kec. Galur, Kabupaten Kulon
            Progo
            <br />
            Daerah Istimewa Yogyakarta
          </span>
        </div>
      </div>

      <div>
        <h4 className="mb-1.5 text-sm font-medium">Kontak</h4>
        <div className={ROW}>
          <svg className={ICON} viewBox="0 0 24 24" fill="currentColor">
            <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.6a1 1 0 0 1-.25 1z" />
          </svg>
          <span>0812-3551-2366</span>
        </div>
        <div className={ROW}>
          <svg
            className={ICON}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
          >
            <rect x="2.5" y="5" width="19" height="14" rx="1" />
            <path d="m3 6 9 7 9-7" />
          </svg>
          <span>banaran.galur.desa@gmail.com</span>
        </div>
      </div>

      <div className="flex gap-6">
        <a
          href="https://www.instagram.com/kalurahan_banaran"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram Kalurahan Banaran"
        >
          <svg
            className={SOCIAL_ICON}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          >
            <rect x="3" y="3" width="18" height="18" rx="5" />
            <circle cx="12" cy="12" r="4" />
            <circle cx="17.3" cy="6.7" r="1" fill="currentColor" />
          </svg>
        </a>
        <a
          href="https://web.facebook.com/pages/Kelurahan-Banaran-Galur-Kulon-Progo/1308101145942949?_rdc=1&_rdr#"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Facebook"
        >
          <svg
            className={SOCIAL_ICON}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          >
            <circle cx="12" cy="12" r="9.5" />
            <path d="M13.5 21v-8h2.6l.4-3h-3V8.2c0-.9.3-1.5 1.6-1.5h1.5V4.1c-.3 0-1.2-.1-2.2-.1-2.2 0-3.7 1.3-3.7 3.8V10H8v3h2.7v8" />
          </svg>
        </a>
        <a
          href="https://www.youtube.com/watch?v=qHIsQ95pGoA"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="youtube"
        >
          <svg
            className={SOCIAL_ICON}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
          >
            <rect x="2.5" y="5.5" width="19" height="13" rx="3.8" />
            <path d="M10 9.3v5.4l4.7-2.7z" fill="currentColor" />
          </svg>
        </a>
      </div>
    </footer>
  );
}
