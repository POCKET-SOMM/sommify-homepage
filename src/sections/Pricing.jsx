import { useState } from "react";
import { IconCheck } from "../components/icons.jsx";
import { useIsMobile } from "../hooks/useMediaQuery.js";
import { useModals } from "../components/ModalProvider.jsx";
import { Button } from "../components/Button.jsx";

function Check() {
  return (
    <svg
      width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#18181b"
      strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"
      style={{ display: "block", flex: "0 0 auto", marginTop: 3 }}
    >
      <path d="M5 12.5l4.5 4.5L19 7" />
    </svg>
  );
}

// Animated download glyph: an arrow above a tray line. When `active`, the arrow
// drops down and the tray line fades out — reading as a download in motion.
function DownloadAnim({ active, size = 16 }) {
  return (
    <svg
      width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      style={{ display: "block", overflow: "visible" }}
    >
      <g
        style={{
          transform: active ? "translateY(4px)" : "translateY(0)",
          transition: "transform .3s cubic-bezier(.2,.7,.2,1)",
        }}
      >
        <path d="M12 3v11" />
        <path d="M7 10.5l5 5 5-5" />
      </g>
      <path
        d="M5 20h14"
        style={{ opacity: active ? 0 : 1, transition: "opacity .2s ease" }}
      />
    </svg>
  );
}

// "Transparent contract" term — styled like the other terms but darker/heavier
// and clickable, with the animated download glyph and a magenta hover colour.
function ContractLink({ isMobile }) {
  const [hover, setHover] = useState(false);
  return (
    <button
      type="button"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onFocus={() => setHover(true)}
      onBlur={() => setHover(false)}
      // TODO: wire to the real contract PDF download
      style={{
        display: "inline-flex", alignItems: "center", gap: 7,
        background: "transparent", border: "none", padding: 0, cursor: "pointer",
        fontFamily: "var(--sans)", fontSize: isMobile ? 14 : 15.5, fontWeight: 550,
        letterSpacing: "-0.01em",
        color: hover ? "#D11174" : "#18181b",
        transition: "color .2s ease",
      }}
    >
      Transparent contract
      <DownloadAnim active={hover} size={isMobile ? 15 : 16} />
    </button>
  );
}

const HATCH_BG =
  "repeating-linear-gradient(45deg, rgba(0,0,0,0.035) 0, rgba(0,0,0,0.035) 1px, transparent 1px, transparent 7px)";

function PriceCard({ hatch, eyebrow, price, unit, sub, features, cta, ctaArrow, isMobile, onCta }) {
  const [hover, setHover] = useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        flex: "1 1 0", minWidth: isMobile ? 0 : 320, maxWidth: isMobile ? "none" : 460,
        display: "flex", flexDirection: "column", background: "var(--card)",
        backgroundImage: hatch ? HATCH_BG : undefined,
        border: hatch ? "1px solid rgba(0,0,0,0.18)" : "1px solid rgba(0,0,0,0.10)",
        borderRadius: isMobile ? 20 : 24,
        boxShadow: isMobile
          ? "0 30px 70px -50px rgba(0,0,0,0.28), 0 6px 18px -14px rgba(0,0,0,0.10)"
          : hatch
            ? "0 40px 90px -54px rgba(0,0,0,0.30), 0 8px 24px -18px rgba(0,0,0,0.12)"
            : "0 40px 90px -54px rgba(0,0,0,0.28), 0 8px 24px -18px rgba(0,0,0,0.10)",
        padding: isMobile ? "28px 24px 26px" : "40px 40px 36px",
        transform: !isMobile && hover ? "scale(1.025)" : "scale(1)",
        transition: "transform .25s cubic-bezier(.2,.7,.2,1)",
      }}
    >
      <div
        style={{
          fontFamily: "var(--sans)", fontSize: isMobile ? 11.5 : 12.5,
          letterSpacing: isMobile ? "0.2em" : "0.22em", textTransform: "uppercase",
          color: "#71717a", marginBottom: isMobile ? 16 : 22,
        }}
      >
        {eyebrow}
      </div>

      <div style={{ display: "flex", alignItems: "baseline", gap: 8, flexWrap: "wrap" }}>
        <span
          style={{
            fontFamily: "var(--sans)", fontWeight: 450, fontSize: isMobile ? 48 : 64, lineHeight: 0.9,
            letterSpacing: "-0.01em", color: "#18181b",
          }}
        >
          {price}
        </span>
        {unit && (
          <span
            style={{
              fontFamily: "var(--sans)", fontSize: isMobile ? 13.5 : 17, color: "#71717a",
              fontWeight: 450, whiteSpace: "nowrap",
            }}
          >
            {unit}
          </span>
        )}
      </div>
      <div
        style={{
          fontFamily: "var(--sans)", fontSize: isMobile ? 13.5 : 14.5, color: "#71717a",
          marginTop: isMobile ? 10 : 12,
        }}
      >
        {sub}
      </div>

      <div style={{ height: 1, background: "rgba(0,0,0,0.08)", margin: isMobile ? "22px 0 4px" : "28px 0 4px" }} />

      <div
        style={{
          display: "flex", flexDirection: "column", gap: isMobile ? 13 : 15,
          padding: isMobile ? "18px 0 24px" : "20px 0 30px",
        }}
      >
        {features.map((f) => (
          <div key={f} style={{ display: "flex", alignItems: "flex-start", gap: isMobile ? 11 : 12 }}>
            {isMobile ? (
              <IconCheck size={15} color="#18181b" stroke={2.2} style={{ marginTop: 2 }} />
            ) : (
              <Check />
            )}
            <span
              style={{
                fontFamily: "var(--sans)", fontSize: isMobile ? 14.5 : 15.5, lineHeight: 1.4,
                color: "#3f3f46",
              }}
            >
              {f}
            </span>
          </div>
        ))}
      </div>

      {/* <div style={{ marginTop: "auto" }}>
        <Button variant="black" size="lg" block arrow={ctaArrow} onClick={onCta}>
          {cta}
        </Button>
      </div> */}
    </div>
  );
}

export function Pricing() {
  const isMobile = useIsMobile();
  const { openContact, openBooking } = useModals();

  const standard = {
    eyebrow: "Standard",
    price: "€70",
    unit: "/ mo · per seat",
    sub: "Buy seats for your team.",
    features: [
      "No user minimums",
      "Unlimited usage of all features",
      "Custom sales presentation",
      "Multiple language support",
      "Team and user insights",
    ],
    cta: "Contact us",
    onCta: openContact,
  };
  const enterprise = {
    hatch: true,
    eyebrow: "Enterprise",
    price: "Custom",
    sub: "Tailored for your team and company.",
    features: [
      "White label the platform",
      "Custom components",
      "Self-service version for customers",
      "Add internal knowledge base to chat",
      "Direct support Slack channel",
    ],
    cta: "Talk to a founder",
    ctaArrow: true,
    onCta: openBooking,
  };

  return (
    <section style={{ background: "var(--surface)", borderTop: "1px solid rgba(0,0,0,0.06)" }}>
      <div
        style={{
          maxWidth: 1000, margin: "0 auto",
          padding: isMobile ? "64px 22px 60px" : "110px 56px 96px",
        }}
      >
        <div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto" }}>
          <div
            style={{
              fontFamily: "var(--sans)", fontSize: isMobile ? 11.5 : 12.5,
              letterSpacing: isMobile ? "0.2em" : "0.22em", textTransform: "uppercase",
              color: "var(--accent, var(--muted))", marginBottom: isMobile ? 16 : 20,
            }}
          >
            Pricing
          </div>
          <h2
            style={{
              fontFamily: "var(--sans)", fontWeight: 550, margin: 0,
              fontSize: isMobile ? 31 : 50, lineHeight: 1.08, letterSpacing: "-0.02em", color: "#18181b",
            }}
          >
            Simple pricing, friendly terms.
          </h2>

          <div
            style={{
              display: "flex", alignItems: "center", justifyContent: "center", flexWrap: "wrap",
              gap: isMobile ? "8px 14px" : "10px 18px", marginTop: isMobile ? 20 : 26,
              fontFamily: "var(--sans)", fontSize: isMobile ? 14 : 15.5, color: "#52525b",
            }}
          >
            <span>No integration fee</span>
            <span style={{ color: "#d4d4d8" }}>·</span>
            <span>Cancel anytime</span>
            <span style={{ color: "#d4d4d8" }}>·</span>
            <ContractLink isMobile={isMobile} />
          </div>
        </div>

        <div
          style={{
            display: "flex", flexDirection: isMobile ? "column" : "row",
            gap: isMobile ? 18 : 24, justifyContent: "center", alignItems: "stretch",
            marginTop: isMobile ? 36 : 56, flexWrap: "wrap",
          }}
        >
          <PriceCard {...standard} isMobile={isMobile} />
          <PriceCard {...enterprise} isMobile={isMobile} />
        </div>
      </div>
    </section>
  );
}
