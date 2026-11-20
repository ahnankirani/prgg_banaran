// Kelas Tailwind yang dipakai bersama oleh komponen peta.

export const overlay = "absolute z-[1000]";

export const panel =
  "absolute z-[1100] top-4 right-4 max-h-[calc(100%-32px)] w-80 overflow-y-auto rounded-[18px] bg-white p-4 shadow-peta " +
  "max-[820px]:top-auto max-[820px]:bottom-4 max-[820px]:max-h-[55%] max-[820px]:w-[calc(100%-32px)]";

export const panelHead = "relative mb-3 flex min-h-[30px] items-center justify-center px-8";

export const closeBtn =
  "absolute top-1/2 right-0 size-7 -translate-y-1/2 cursor-pointer text-[22px] leading-none text-[#222]";

export const chip = (on) =>
  `cursor-pointer whitespace-nowrap rounded-full px-5 py-1.5 text-sm font-medium text-[#111] shadow-peta ${
    on ? "bg-soft" : "bg-white"
  }`;

export const searchIcon = "size-[18px] flex-none fill-none stroke-[#222] stroke-2";
