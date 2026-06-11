export function SocialIcon({ n, s = 20 }) {
  const wrap = (inner, fill) => (
    <svg
      width={s}
      height={s}
      viewBox="0 0 24 24"
      fill={fill ? "currentColor" : "none"}
      stroke={fill ? "none" : "currentColor"}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ display: "block" }}
    >
      {inner}
    </svg>
  );
  if (n === "linkedin")
    return wrap(
      <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.2 8h4.6V23H.2V8zm7.4 0h4.4v2.05h.06c.6-1.1 2.07-2.26 4.26-2.26 4.56 0 5.4 3 5.4 6.9V23h-4.6v-6.4c0-1.53-.03-3.5-2.13-3.5-2.13 0-2.46 1.66-2.46 3.38V23H7.6V8z" />,
      true
    );
  if (n === "x")
    return wrap(
      <path d="M18.9 2H22l-7.5 8.6L23.3 22h-6.9l-5.4-7-6.2 7H1.7l8-9.2L1 2h7l4.9 6.5L18.9 2zm-2.4 18h1.9L7.6 4H5.6l10.9 16z" />,
      true
    );
  if (n === "instagram")
    return wrap(
      <g>
        <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" />
        <circle cx="12" cy="12" r="4.4" />
        <circle cx="17.6" cy="6.4" r="1.1" fill="currentColor" stroke="none" />
      </g>
    );
  if (n === "youtube")
    return wrap(
      <g>
        <rect x="2" y="5" width="20" height="14" rx="4" />
        <path d="M10 8.8l5 3.2-5 3.2z" fill="currentColor" stroke="none" />
      </g>
    );
  if (n === "crunchbase")
    return (
      <svg
        width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor"
        strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" style={{ display: "block" }}
      >
        <rect x="2.5" y="2.5" width="19" height="19" rx="5" />
        {/* c */}
        <path d="M11.4 10.7a2.2 2.2 0 1 0 0 3.6" />
        {/* b */}
        <path d="M14.2 8.4v6.8" />
        <circle cx="16" cy="13.3" r="1.9" />
      </svg>
    );
  return null;
}
