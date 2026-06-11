import { useState, useRef, useLayoutEffect } from "react";
import { useIsMobile } from "../hooks/useMediaQuery.js";
import { FEATURES } from "./features/data.js";
import {
  MenuOfferPicker, ReplacementPairs, BeauChat, BEAU_USE_CASES, ExportsMock,
} from "./features/DesktopVisuals.jsx";
import PricingCalculator, { PRICING_WINES } from "./features/PricingCalculator.jsx";
import { MenuToOffer } from "./features/MobileVisuals.jsx";

const DESKTOP_VISUALS = {
  menu: MenuOfferPicker,
  match: ReplacementPairs,
  beau: BeauChat,
  pricing: PricingCalculator,
  materials: ExportsMock,
};

// Scales a fixed-width desktop visual down to fit the current (mobile) column.
// Measures the available width and the visual's natural width, then applies a
// uniform transform — and reserves the scaled height so layout stays correct.
function ScaleFit({ children }) {
  const outerRef = useRef(null);
  const innerRef = useRef(null);
  const [scale, setScale] = useState(0);
  const [height, setHeight] = useState(undefined);

  useLayoutEffect(() => {
    const measure = () => {
      if (!outerRef.current || !innerRef.current) return;
      const avail = outerRef.current.clientWidth;
      const natW = innerRef.current.offsetWidth;
      const natH = innerRef.current.offsetHeight;
      if (natW > 0) {
        const s = Math.min(avail / natW, 1);
        setScale(s);
        setHeight(Math.round(natH * s));
      }
    };
    measure();
    // Re-measure when the visual's natural size changes (e.g. images loading).
    const ro = new ResizeObserver(measure);
    if (innerRef.current) ro.observe(innerRef.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  return (
    <div ref={outerRef} style={{ width: "100%", marginTop: 30, height, overflow: "visible" }}>
      <div
        ref={innerRef}
        style={{
          display: "inline-block",
          transform: scale ? `scale(${scale})` : undefined,
          transformOrigin: "top left",
          visibility: scale ? "visible" : "hidden",
        }}
      >
        {children}
      </div>
    </div>
  );
}

function Kicker({ children, mobile }) {
  return (
    <div
      style={{
        fontFamily: "var(--sans)", fontSize: mobile ? 11.5 : 12.5,
        letterSpacing: mobile ? "0.2em" : "0.22em", textTransform: "uppercase",
        color: "var(--accent, var(--muted))", marginBottom: mobile ? 16 : 20,
      }}
    >
      {children}
    </div>
  );
}

function MetaTags({ items, mobile }) {
  if (mobile) {
    return (
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 20 }}>
        {items.map((t) => (
          <span
            key={t}
            style={{
              fontFamily: "var(--sans)", fontSize: 12.5, fontWeight: 500, letterSpacing: "-0.01em",
              color: "#52525b", background: "rgba(0,0,0,0.04)", border: "1px solid rgba(0,0,0,0.06)",
              borderRadius: 999, padding: "6px 12px", whiteSpace: "nowrap",
            }}
          >
            {t}
          </span>
        ))}
      </div>
    );
  }
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 30 }}>
      {items.map((t) => (
        <span
          key={t}
          style={{
            fontFamily: "var(--sans)", fontSize: 12.5, color: "#52525b",
            border: "1px solid rgba(0,0,0,0.14)", borderRadius: 999, padding: "5px 13px", whiteSpace: "nowrap",
          }}
        >
          {t}
        </span>
      ))}
    </div>
  );
}

// Clickable chips that replace the meta tags on the interactive features —
// styled like the meta tags, with the active one filled black/white.
// `options` is [{ value, label }]; `active` is the selected value.
function FeatureChips({ options, active, onSelect, mobile }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: mobile ? 20 : 30 }}>
      {options.map(({ value, label }) => {
        const on = value === active;
        return (
          <button
            key={value}
            onClick={() => onSelect(value)}
            style={{
              fontFamily: "var(--sans)", fontSize: 12.5,
              fontWeight: mobile ? 500 : 400, letterSpacing: mobile ? "-0.01em" : "normal",
              cursor: "pointer", whiteSpace: "nowrap", borderRadius: 999,
              padding: mobile ? "6px 12px" : "5px 13px",
              color: on ? "#fff" : "#52525b",
              background: on ? "#18181b" : mobile ? "rgba(0,0,0,0.04)" : "transparent",
              border: on
                ? "1px solid #18181b"
                : mobile ? "1px solid rgba(0,0,0,0.06)" : "1px solid rgba(0,0,0,0.14)",
              transition: "background .2s ease, color .2s ease, border-color .2s ease",
            }}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}

// Feature 03: use-case chips (in place of the meta tags) driving the Beau chat.
function BeauFeature({ mobile }) {
  const [active, setActive] = useState("offer");
  const options = BEAU_USE_CASES.map((u) => ({ value: u.key, label: u.label }));
  return (
    <>
      <FeatureChips options={options} active={active} onSelect={setActive} mobile={mobile} />
      {mobile ? (
        <ScaleFit><BeauChat exKey={active} /></ScaleFit>
      ) : (
        <div style={{ marginTop: 60, display: "flex", justifyContent: "flex-start" }}>
          <BeauChat exKey={active} />
        </div>
      )}
    </>
  );
}

// Feature 04: bottle chips (in place of the meta tags) driving the calculator.
function PricingFeature({ mobile }) {
  const [wineIndex, setWineIndex] = useState(0);
  const options = PRICING_WINES.map((w, i) => ({ value: i, label: w.name }));
  return (
    <>
      <FeatureChips options={options} active={wineIndex} onSelect={setWineIndex} mobile={mobile} />
      {mobile ? (
        <ScaleFit><PricingCalculator wineIndex={wineIndex} /></ScaleFit>
      ) : (
        <div style={{ marginTop: 60, display: "flex", justifyContent: "flex-start" }}>
          <PricingCalculator wineIndex={wineIndex} />
        </div>
      )}
    </>
  );
}

// ---- desktop: low-key feature list (auto-advancing) + active feature -------
function FeaturesTabbed() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const f = FEATURES[active];
  const Visual = DESKTOP_VISUALS[f.key];
  const short = (k) => k.split("· ")[1] || k;
  const advance = () => setActive((a) => (a + 1) % FEATURES.length);

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      style={{ display: "grid", gridTemplateColumns: "180px 1fr", gap: 64, alignItems: "start" }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 2, paddingTop: 30 }}>
        {FEATURES.map((it, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            style={{
              appearance: "none", display: "block", width: "100%", textAlign: "left", cursor: "pointer",
              background: "transparent", border: "none", padding: "9px 0",
            }}
          >
            <span
              style={{
                fontFamily: "var(--sans)", fontSize: 16, fontWeight: 450, letterSpacing: "-0.01em",
                color: i === active ? "var(--accent, #18181b)" : "#b4b4ba", transition: "color .2s ease",
              }}
            >
              {short(it.kicker)}
            </span>
          </button>
        ))}
      </div>

      <div>
        <div style={{ width: 110, height: 3, borderRadius: 99, background: "rgba(0,0,0,0.08)", overflow: "hidden", marginBottom: 28 }}>
          <div
            key={active}
            onAnimationEnd={advance}
            style={{
              height: "100%", borderRadius: 99, background: "var(--accent, rgba(0,0,0,0.32))",
              animation: "cdGrow 6s linear forwards", animationPlayState: paused ? "paused" : "running",
            }}
          />
        </div>
        <div key={active} className="deck-layer" style={{ animation: "featSwap .42s cubic-bezier(.2,.7,.2,1) both" }}>
          <h2
            style={{
              fontFamily: "var(--sans)", fontWeight: 550, margin: 0,
              fontSize: 40, lineHeight: 1.12, letterSpacing: "-0.02em", color: "#18181b", maxWidth: 540,
            }}
          >
            {f.title}
          </h2>
          <p
            style={{
              fontFamily: "var(--sans)", fontSize: 18, lineHeight: 1.6, color: "#52525b",
              margin: "20px 0 0", maxWidth: 560,
            }}
          >
            {f.body}
          </p>
          {f.key === "beau" ? (
            <BeauFeature />
          ) : f.key === "pricing" ? (
            <PricingFeature />
          ) : (
            <>
              <MetaTags items={f.meta} />
              <div style={{ marginTop: 60, display: "flex", justifyContent: "flex-start" }}>
                <Visual />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// ---- mobile: all five features stacked ------------------------------------
// Feature 01 keeps its bespoke compact card; the rest reuse the desktop visuals
// scaled down to fit the narrow column.
function FeaturesStacked() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 120, marginTop: 48 }}>
      {FEATURES.map((f) => {
        const Desktop = DESKTOP_VISUALS[f.key];
        return (
          <div key={f.key}>
            <Kicker mobile>{f.kicker}</Kicker>
            <h3
              style={{
                fontFamily: "var(--sans)", fontWeight: 500, margin: 0,
                fontSize: 27, lineHeight: 1.14, letterSpacing: "-0.015em", color: "#18181b",
              }}
            >
              {f.title}
            </h3>
            <p style={{ fontFamily: "var(--sans)", fontSize: 15.5, lineHeight: 1.6, color: "#52525b", margin: "13px 0 0" }}>
              {f.body}
            </p>
            {f.key === "beau" ? (
              <BeauFeature mobile />
            ) : f.key === "pricing" ? (
              <PricingFeature mobile />
            ) : (
              <>
                <MetaTags items={f.meta} mobile />
                {f.key === "menu" ? <MenuToOffer /> : <ScaleFit><Desktop /></ScaleFit>}
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}

export function Features() {
  const isMobile = useIsMobile();

  return (
    <section style={{ background: "var(--surface)", borderTop: "1px solid rgba(0,0,0,0.06)", height: isMobile ? 'auto' : 1080 }}>
      <div
        style={{
          maxWidth: 1180, margin: "0 auto",
          padding: isMobile ? "64px 22px 40px" : "110px 56px 90px",
        }}
      >
        {/* <div
          style={{
            maxWidth: 680,
            ...(isMobile ? { marginBottom: 8 } : { textAlign: "center", marginLeft: "auto", marginRight: "auto" }),
          }}
        >
          <Kicker mobile={isMobile}>The platform</Kicker>
          <h2
            style={{
              fontFamily: "var(--serif-news)", fontWeight: 400, margin: 0,
              fontSize: isMobile ? 33 : 50, lineHeight: isMobile ? 1.1 : 1.08,
              letterSpacing: "-0.02em", color: "#18181b",
            }}
          >
            Everything between your catalogue and the close.
          </h2>
          <p
            style={{
              fontFamily: "var(--sans)", fontSize: isMobile ? 16 : 19, lineHeight: isMobile ? 1.55 : 1.6,
              color: "#52525b",
              margin: isMobile ? "16px 0 0" : "22px auto 0",
              maxWidth: isMobile ? "none" : 560,
            }}
          >
            The jobs that used to live in spreadsheets, inboxes and InDesign — now one workflow, from
            a customer's menu to a sent, branded offer.
          </p>
        </div> */}

        {isMobile ? <FeaturesStacked /> : <FeaturesTabbed />}
      </div>
    </section>
  );
}
