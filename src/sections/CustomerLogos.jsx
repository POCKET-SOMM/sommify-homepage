import { useIsMobile } from "../hooks/useMediaQuery.js";
import { LogoMarquee } from "../components/LogoMarquee.jsx";
import { PARTNERS } from "./logos.js";

export function CustomerLogos() {
  const isMobile = useIsMobile();

  // Render the logos ~40% larger than their base heights (a touch smaller on mobile).
  const scale = isMobile ? 1.12 : 1.4;
  const elements = PARTNERS.map((p) => ({ ...p, height: Math.round(p.height * scale) }));

  return (
    <section
      style={{
        background: "#fff",
        borderTop: "1px solid rgba(0,0,0,0.06)",
        padding: isMobile ? "44px 0 46px" : "62px 0 64px",
      }}
    >
      <div
        style={{
          textAlign: "center", fontFamily: "var(--sans)", fontSize: isMobile ? 11.5 : 12.5,
          letterSpacing: isMobile ? "0.18em" : "0.22em", textTransform: "uppercase",
          color: "var(--accent, var(--muted))", marginBottom: isMobile ? 32 : 40,
          padding: isMobile ? "0 22px" : 0, lineHeight: 1.5,
        }}
      >
        Trusted by customers across several markets
      </div>
      <LogoMarquee
        elements={elements}
        cellWidth={isMobile ? 168 : 230}
        cellHeight={isMobile ? 108 : 140}
        gradientColor="white"
      />
    </section>
  );
}
