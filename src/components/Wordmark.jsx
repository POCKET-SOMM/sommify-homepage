/* Classic loupe mark — the magnifying-glass logo (mirrors public/lupa.svg).
   Fills use currentColor so it follows the wordmark's `color`. */
function LupaMark({ size }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: "block", color: "currentColor", flexShrink: 0 }}
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18.4361 25.9425C25.4845 25.9425 31.1983 20.2286 31.1983 13.1802C31.1983 6.13183 25.4845 0.417969 18.4361 0.417969C11.3877 0.417969 5.67383 6.13183 5.67383 13.1802C5.67383 20.2286 11.3877 25.9425 18.4361 25.9425ZM18.437 22.5389C23.6058 22.5389 27.796 18.3487 27.796 13.1799C27.796 8.01108 23.6058 3.82091 18.437 3.82091C13.2681 3.82091 9.07798 8.01108 9.07798 13.1799C9.07798 18.3487 13.2681 22.5389 18.437 22.5389Z"
        fill="currentColor"
      />
      <rect
        x="9.24023"
        y="18.8521"
        width="4.25409"
        height="13.0684"
        rx="2"
        transform="rotate(45 9.24023 18.8521)"
        fill="currentColor"
      />
      <path
        opacity="0.6"
        d="M18.4362 20.9788C26.2354 20.9788 26.2354 13.1796 26.2354 13.1796C26.2354 13.1796 23.3993 17.4334 18.4362 13.1796C13.4731 8.92585 10.637 13.1796 10.637 13.1796C10.637 13.1796 10.637 20.9788 18.4362 20.9788Z"
        fill="currentColor"
      />
      <path
        d="M18.4349 20.9788C10.6357 20.9788 10.6357 13.1797 10.6357 13.1797C10.6357 13.1797 13.4718 17.4334 18.4349 13.1797C23.398 8.92591 26.2341 13.1797 26.2341 13.1797C26.2341 13.1797 26.2341 20.9788 18.4349 20.9788Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function Wordmark({ size = 24, color = "#0a0a0a" }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 7, color }}>
      <LupaMark size={Math.round(size * 0.95)} />
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

/* ---- Swirl mark — on the back burner. To restore: re-add `import { useId }
   from "react";` at the top, swap <LupaMark> for <SwirlMark> in Wordmark above
   (it also wants className="sommify-wordmark" on the wrapper for the hover
   animation), and uncomment this block.

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
---- */
