import { SocialLink } from "../components/SocialLink.jsx";
import { useIsMobile } from "../hooks/useMediaQuery.js";
import { SOCIALS } from "../config.js";

// Footer link columns — hidden for now.
// const COLS = [
//   { h: "Platform", links: ["Menu offers", "Wine-list match", "Beau", "Pricing", "Sales materials"] },
//   { h: "Company", links: ["About", "Careers", "News", "Contact"] },
//   { h: "Resources", links: ["Docs", "Guides", "Changelog", "Status"] },
// ];

export function Footer() {
  const isMobile = useIsMobile();
  return isMobile ? <MobileFooter /> : <DesktopFooter />;
}

function DesktopFooter() {
  return (
    <footer style={{ background: "var(--ink-bg)", color: "var(--ink-fg)" }}>
      <div style={{ maxWidth: 1320, margin: "0 auto", padding: "84px 56px 40px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 60 }}>
          <div style={{ maxWidth: 360 }}>
            <div
              style={{
                fontFamily: "var(--sans)", fontWeight: 600, fontSize: 22, letterSpacing: "-0.02em",
                color: "var(--ink-fg)", marginBottom: 16,
              }}
            >
              sommify
            </div>
            <div
              style={{
                fontFamily: "var(--sans)", fontSize: 15, color: "var(--ink-faint)",
                lineHeight: 1.6, maxWidth: 300,
              }}
            >
              The AI platform for wine sales. Catalogue in, curated offer out.
            </div>
          </div>
          {/* Platform / Company / Resources columns — hidden for now.
          <div style={{ display: "flex", gap: 72, flexWrap: "wrap" }}>
            {COLS.map((c) => (
              <div key={c.h}>
                <div
                  style={{
                    fontFamily: "var(--sans)", fontSize: 13, letterSpacing: "0.14em",
                    textTransform: "uppercase", color: "var(--ink-faint)", marginBottom: 18,
                  }}
                >
                  {c.h}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {c.links.map((l) => (
                    <a
                      key={l}
                      href="#"
                      style={{
                        fontFamily: "var(--sans)", fontSize: 15.5, color: "var(--ink-link)",
                        textDecoration: "none",
                      }}
                    >
                      {l}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
          */}
        </div>

        <div
          style={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
            flexWrap: "wrap", gap: 20, marginTop: 64, paddingTop: 28,
            borderTop: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <div style={{ fontFamily: "var(--sans)", fontSize: 13.5, color: "var(--ink-faint)" }}>
            © 2026 Sommify · All rights reserved
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            {SOCIALS.map((s) => (
              <SocialLink key={s.n} n={s.n} href={s.href} label={s.label} theme="dark" shape="icon" iconSize={17} />
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

function MobileFooter() {
  return (
    <footer style={{ background: "var(--ink-bg)", color: "var(--ink-fg)", padding: "56px 22px 48px" }}>
      <div style={{ marginBottom: 36 }}>
        <div
          style={{
            fontFamily: "var(--sans)", fontWeight: 600, fontSize: 21, letterSpacing: "-0.02em",
            color: "var(--ink-fg)", marginBottom: 12,
          }}
        >
          sommify
        </div>
        <div
          style={{
            fontFamily: "var(--sans)", fontSize: 14.5, color: "var(--ink-faint)",
            lineHeight: 1.6, maxWidth: 280,
          }}
        >
          The AI platform for wine sales. Catalogue in, curated offer out.
        </div>
      </div>
      {/* Platform / Company / Resources columns — hidden for now.
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "32px 24px" }}>
        {COLS.map((c) => (
          <div key={c.h}>
            <div
              style={{
                fontFamily: "var(--sans)", fontSize: 12, letterSpacing: "0.14em",
                textTransform: "uppercase", color: "var(--ink-faint)", marginBottom: 14,
              }}
            >
              {c.h}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
              {c.links.map((l) => (
                <a
                  key={l}
                  href="#"
                  style={{
                    fontFamily: "var(--sans)", fontSize: 14.5, color: "var(--ink-link)",
                    textDecoration: "none",
                  }}
                >
                  {l}
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
      */}
      <div
        style={{
          display: "flex", flexDirection: "column", gap: 18, marginTop: 44, paddingTop: 26,
          borderTop: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <div style={{ display: "flex", gap: 10 }}>
          {SOCIALS.map((s) => (
            <SocialLink key={s.n} n={s.n} href={s.href} label={s.label} theme="dark" shape="icon" iconSize={16} />
          ))}
        </div>
        <div style={{ fontFamily: "var(--sans)", fontSize: 13, color: "var(--ink-faint)" }}>
          © 2026 Sommify · All rights reserved
        </div>
      </div>
    </footer>
  );
}
