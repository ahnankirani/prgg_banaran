import { SUB_COLORS } from "@/data/places";

const R = 15.915; // keliling lingkaran = 100
const fmt = (n) => n.toLocaleString("id-ID");

// items: [{ label, value }] — warna diambil berurutan dari SUB_COLORS
export default function Donut({ items, centerLabel = "Total" }) {
  const total = items.reduce((s, it) => s + it.value, 0);

  let offset = 0;
  const arcs = items.map((it, i) => {
    const len = total ? (it.value / total) * 100 : 0;
    const arc = { ...it, i, len, offset };
    offset += len;
    return arc;
  });

  return (
    <div className="flex items-center gap-3.5">
      <div className="relative size-[110px] flex-none">
        <svg className="size-full -rotate-90" viewBox="0 0 42 42" aria-hidden="true">
          <circle cx="21" cy="21" r={R} fill="none" stroke="#eef0f4" strokeWidth="7" />
          {arcs
            .filter((a) => a.value > 0)
            .map((a) => (
              <circle
                key={a.label}
                cx="21"
                cy="21"
                r={R}
                fill="none"
                stroke={SUB_COLORS[a.i % SUB_COLORS.length]}
                strokeWidth="7"
                strokeDasharray={`${a.len} ${100 - a.len}`}
                strokeDashoffset={-a.offset}
              />
            ))}
        </svg>
        <div className="absolute inset-0 grid place-content-center text-center text-[13px] leading-[1.15] font-semibold">
          <span>
            <b className="text-lg">{fmt(total)}</b>
            <br />
            {centerLabel}
          </span>
        </div>
      </div>
      <div className="flex-1 text-[11px]">
        {items.map((it, i) => (
          <div key={it.label} className="flex min-h-[22px] items-center gap-1.5">
            <i className="size-[9px] flex-none rounded-[2px]" style={{ background: SUB_COLORS[i % SUB_COLORS.length] }} />
            <span className="flex-1">{it.label}</span>
            <b>{fmt(it.value)}</b>
          </div>
        ))}
      </div>
    </div>
  );
}
