import { useState } from "react";
import { SocialIcon } from "./SocialIcon.jsx";
import { SOCIAL_BRAND } from "../config.js";

// Social button used in the footer (icon circle) and Engage (labelled pill).
// On hover/focus the background fills with the platform's brand colour and the
// icon + label turn white. The brand fill lives on an overlay whose opacity
// transitions, so even Instagram's gradient fades in smoothly.
export function SocialLink({ n, href, label, theme = "light", shape = "pill", iconSize, isMobile = false }) {
  const [active, setActive] = useState(false);
  const brand = SOCIAL_BRAND[n];

  const baseColor = theme === "dark" ? "var(--ink-link)" : "#52525b";
  const baseBorder = theme === "dark" ? "rgba(255,255,255,0.16)" : "rgba(0,0,0,0.13)";

  const size =
    iconSize ?? (shape === "icon" ? (isMobile ? 16 : 17) : isMobile ? 16 : 18);

  const shapeStyle =
    shape === "icon"
      ? { width: 38, height: 38 }
      : {
          padding: isMobile ? "8px 15px 8px 13px" : "9px 18px 9px 15px",
          fontFamily: "var(--sans)",
          fontSize: isMobile ? 13.5 : 14.5,
          fontWeight: 500,
        };

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      title={label}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      onFocus={() => setActive(true)}
      onBlur={() => setActive(false)}
      style={{
        position: "relative",
        overflow: "hidden",
        textDecoration: "none",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 999,
        color: active ? "#fff" : baseColor,
        border: `1px solid ${active ? "transparent" : baseBorder}`,
        transition: "color .28s ease, border-color .28s ease",
        ...shapeStyle,
      }}
    >
      {/* brand fill */}
      <span
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background: brand,
          opacity: active ? 1 : 0,
          transition: "opacity .28s ease",
          zIndex: 0,
        }}
      />
      {/* content */}
      <span
        style={{
          position: "relative",
          zIndex: 1,
          display: "inline-flex",
          alignItems: "center",
          gap: shape === "icon" ? 0 : isMobile ? 8 : 10,
        }}
      >
        <SocialIcon n={n} s={size} />
        {shape === "pill" && label}
      </span>
    </a>
  );
}
