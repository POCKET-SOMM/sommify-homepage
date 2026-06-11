import { useIsMobile } from "../hooks/useMediaQuery.js";
import { LogoMarquee } from "../components/LogoMarquee.jsx";
import { PRESS } from "./logos.js";

export function News() {
  const isMobile = useIsMobile();

  // Render the logos ~40% larger than their base heights (a touch smaller on mobile).
  const scale = isMobile ? 1.12 : 1.4;
  const elements = PRESS.map((p) => ({ ...p, height: Math.round(p.height * scale) }));

  return (
    <section
      style={{
        background: "var(--surface)",
        padding: isMobile ? "8px 0 64px" : "40px 0 84px",
      }}
    >
      <div
        style={{
          textAlign: "center", fontFamily: "var(--sans)", fontSize: isMobile ? 11.5 : 12.5,
          letterSpacing: isMobile ? "0.2em" : "0.22em", textTransform: "uppercase",
          color: "var(--accent, var(--muted))", marginBottom: isMobile ? 34 : 46,
        }}
      >
        In the press
      </div>
      <LogoMarquee
        elements={elements}
        cellWidth={isMobile ? 176 : 250}
        cellHeight={isMobile ? 108 : 140}
        gradientColor="white"
      />
    </section>
  );
}
