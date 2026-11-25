"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV = [
  { href: "/", label: "Beranda" },
  { href: "/peta", label: "Peta" },
];

export default function Header({ compact = false }) {
  const pathname = usePathname();

  return (
    <header
      className={`sticky top-0 z-[1200] flex flex-none items-center justify-between bg-white max-[1100px]:px-6 max-[700px]:h-auto max-[700px]:flex-wrap max-[700px]:gap-2 max-[700px]:px-4 max-[700px]:py-3 ${
        compact ? "h-[72px] px-10 shadow-[0_1px_0_#e3e7ee]" : "h-24 px-14"
      }`}
    >
      <Link href="/" className="flex items-center gap-3">
        <Image
          src="/images/logo-banaran.jpg"
          alt="Logo Kalurahan Banaran"
          width={150}
          height={150}
          priority
          className={`flex-none object-contain ${compact ? "size-16" : "size-20"}`}
        />
        <div>
          <h1
            className={`font-serif leading-none font-bold max-[700px]:text-2xl ${compact ? "text-2xl" : "text-[32px]"}`}
          >
            Kalurahan Banaran
          </h1>
          <span className={`font-serif text-muted ${compact ? "text-[15px]" : "text-[19px]"}`}>Kapanewon Galur</span>
        </div>
      </Link>

      <nav
        className={`flex items-center max-[1100px]:mr-0 ${compact ? "mr-10 gap-3" : "mr-[100px] gap-[22px]"}`}
      >
        {NAV.map((n) => {
          const active = pathname === n.href;
          return (
            <Link
              key={n.href}
              href={n.href}
              className={`rounded-full font-raleway font-semibold max-[700px]:px-3.5 max-[700px]:py-1.5 max-[700px]:text-base ${
                compact ? "px-[18px] py-1.5 text-[17px]" : "px-5 py-2 text-xl"
              } ${active ? "bg-brand text-white" : "text-brand-dark"}`}
            >
              {n.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
