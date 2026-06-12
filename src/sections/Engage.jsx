import { SocialLink } from "../components/SocialLink.jsx";
import { CTAGroup } from "../components/CTAGroup.jsx";
import { useIsMobile } from "../hooks/useMediaQuery.js";
import { SOCIALS } from "../config.js";

// Centered CTA section (the chosen variant ships without the Beau illustration).
export function Engage() {
  const isMobile = useIsMobile();

  return (
    <section
      style={{
        background: "var(--surface)",
        padding: isMobile ? "64px 22px 68px" : "104px 40px 110px",
        textAlign: "center",
      }}
    >
      <div
        style={{
          display: "flex", flexDirection: "column", alignItems: "center",
          maxWidth: 720, margin: "0 auto", width: "100%",
        }}
      >
        <div
          style={{
            fontFamily: "var(--sans)", fontSize: isMobile ? 11.5 : 12.5,
            letterSpacing: isMobile ? "0.2em" : "0.22em", textTransform: "uppercase",
            color: "var(--accent, var(--muted))", marginBottom: isMobile ? 16 : 22,
          }}
        >
          Let's talk
        </div>
        <h2
          style={{
            fontFamily: "var(--sans)", fontWeight: 550, margin: 0,
            fontSize: isMobile ? 31 : 50, lineHeight: 1.08,
            letterSpacing: "-0.02em", color: "#18181b",
          }}
        >
          Engage with us
        </h2>
        <p
          style={{
            fontFamily: "var(--sans)", fontSize: isMobile ? 16.5 : 19, lineHeight: 1.55,
            color: "#52525b", maxWidth: isMobile ? 340 : 520,
            margin: isMobile ? "18px auto 0" : "24px 0 38px",
          }}
        >
          Book a walkthrough, or talk to a founder about your unique challenge. We know the industry and we love learning more.
        </p>

        <CTAGroup align="center" size="lg" />

        <div
          style={{
            display: "flex", justifyContent: "center", gap: isMobile ? 9 : 12, flexWrap: "wrap",
            marginTop: isMobile ? 36 : 46, paddingTop: isMobile ? 32 : 38,
            borderTop: "1px solid rgba(0,0,0,0.08)", width: "100%",
          }}
        >
          {SOCIALS.map((so) => (
            <SocialLink
              key={so.n}
              n={so.n}
              href={so.href}
              label={so.label}
              theme="light"
              shape="pill"
              isMobile={isMobile}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
