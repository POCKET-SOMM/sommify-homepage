import { useId } from "react";

/* ---- swirl geometry: a repeating 76-unit wave band, clipped to the bowl ---- */
const WAVELENGTH = 76;

function wavePath(mirror) {
  const s = mirror ? -1 : 1;
  let d = "M -190 0";
  for (let x = -190; x < 160; x += WAVELENGTH) {
    d +=
      ` C ${x + 14} ${-16 * s}, ${x + 28} ${-16 * s}, ${x + 38} 0` +
      ` C ${x + 48} ${16 * s}, ${x + 62} ${16 * s}, ${x + 76} 0`;
  }
  return d + " L 190 60 L -190 60 Z";
}

const WAVE_FRONT = wavePath(false);
const WAVE_BACK = wavePath(true);

/* Move this into your global stylesheet if you prefer —
   the inline <style> below is just the zero-setup version. */
const swirlCss = `
  .sommify-wordmark .swirl-front,
  .sommify-wordmark .swirl-back { will-change: transform; }
  .sommify-wordmark:hover .swirl-front {
    animation: sommify-swirl-front 1s cubic-bezier(0.55, 0, 0.2, 1);
  }
  .sommify-wordmark:hover .swirl-back {
    animation: sommify-swirl-back 1.3s cubic-bezier(0.55, 0, 0.25, 1);
  }
  @keyframes sommify-swirl-front {
    from { transform: translateX(0); } to { transform: translateX(-76px); }
  }
  @keyframes sommify-swirl-back {
    from { transform: translateX(0); } to { transform: translateX(76px); }
  }
  @media (prefers-reduced-motion: reduce) {
    .sommify-wordmark:hover .swirl-front,
    .sommify-wordmark:hover .swirl-back { animation: none; }
  }
`;

function SwirlMark({ size }) {
  const clipId = useId();
  return (
    <svg
      width={size}
      height={size}
      viewBox="-42 -31 84 84"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: "block", color: "currentColor", flexShrink: 0, marginTop: 3 }}
      aria-hidden="true"
    >
      <clipPath id={clipId}>
        <circle r="38" />
      </clipPath>
      <g clipPath={`url(#${clipId})`}>
        <path className="swirl-back" d={WAVE_BACK} fill="currentColor" opacity="0.45" />
        <path className="swirl-front" d={WAVE_FRONT} fill="currentColor" />
      </g>
    </svg>
  );
}

export function Wordmark({ size = 24, color = "#0a0a0a" }) {
  return (
    <div
      className="sommify-wordmark"
      style={{ display: "flex", alignItems: "center", gap: 4, color }}
    >
      <style>{swirlCss}</style>
      <SwirlMark size={size} />
      <span
        style={{
          fontFamily: "var(--sans)",
          fontWeight: 700,
          fontSize: size,
          letterSpacing: "-0.03em",
          color,
        }}
      >
        sommify
      </span>
    </div>
  );
}