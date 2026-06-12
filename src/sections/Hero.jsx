import { Play } from "lucide-react";
import { RotatingWord } from "../components/RotatingWord.jsx";
import { CTAGroup } from "../components/CTAGroup.jsx";
import { useModals } from "../components/ModalProvider.jsx";
import { useIsMobile } from "../hooks/useMediaQuery.js";

const LEAD =
  // "Catalogue in, curated offer out. sommify pairs your wines to a restaurant's menu, prices every pour, and exports a beautiful branded document.";
  "Catalogue in, curated offers out. The platform helps you select the wines for your customers, prices every pour, and exports beautiful branded documents.";

export function Hero() {
  const isMobile = useIsMobile();
  const { openVideo } = useModals();

  if (isMobile) {
    return (
      <div style={{ background: "#fff", padding: "40px 22px 0", overflow: "hidden" }}>
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              fontFamily: "var(--sans)", fontSize: 11.5, letterSpacing: "0.2em",
              textTransform: "uppercase", color: "var(--accent, #9a9a9a)", marginBottom: 20,
            }}
          >
            AI platform for wine sales
          </div>
          <h1
            style={{
              fontFamily: "var(--sans)", fontWeight: 550, margin: 0,
              fontSize: 52, lineHeight: 0.98, letterSpacing: "-0.01em", color: "#0a0a0a",
            }}
          >
            <span style={{ display: "block" }}>The platform</span>
            <span style={{ display: "block" }}>for</span>
            <span style={{ display: "block" }}>
              <RotatingWord style={{ fontFamily: "var(--sans)" }} />
            </span>
            <span style={{ display: "block" }}>wine sales</span>
          </h1>
          <p
            style={{
              fontFamily: "var(--sans)", fontSize: 16.5, lineHeight: 1.55, color: "#52524e",
              margin: "24px auto 0", maxWidth: 340,
            }}
          >
            {LEAD}
          </p>
          <CTAGroup align="center" size="lg" primary="tryout" />
        </div>

        {/* Platform visualization (vineyard + product mock) hidden on mobile for now.
        <div style={{ marginTop: 44 }}>
          <div
            style={{
              position: "relative", height: 340, overflow: "hidden",
              borderRadius: "20px 20px 0 0", background: "#0b0a10",
            }}
          >
            <img
              src="/assets/vineyard.jpg"
              alt=""
              className="heroVine"
              style={{
                position: "absolute", inset: 0, width: "100%", height: "100%",
                objectFit: "cover", zIndex: 0,
              }}
            />
            <div
              style={{
                position: "absolute", inset: 0, zIndex: 1,
                background:
                  "radial-gradient(125% 100% at 50% 22%, rgba(0,0,0,0.04) 35%, rgba(0,0,0,0.45) 100%)",
              }}
            />
            <div
              style={{
                position: "relative", zIndex: 2, width: "84%", margin: "34px auto 0", padding: 10,
                borderRadius: "16px 16px 0 0", background: "rgba(255,255,255,0.10)",
                backdropFilter: "blur(16px) saturate(1.3)", WebkitBackdropFilter: "blur(16px) saturate(1.3)",
                border: "1px solid rgba(255,255,255,0.22)", borderBottom: "none",
                boxShadow:
                  "inset 0 1px 0 rgba(255,255,255,0.35), 0 24px 50px -24px rgba(0,0,0,0.6)",
              }}
            >
              <img
                src="/assets/product-screen.png"
                alt="sommify building an offer"
                style={{ width: "100%", display: "block", borderRadius: "9px 9px 0 0" }}
              />
            </div>
          </div>
        </div>
        */}
      </div>
    );
  }

  // ---- desktop ----
  return (
    <div style={{ background: "#fff" }}>
      <div style={{ padding: "128px 32px 0", textAlign: "center", maxWidth: 1200, margin: "0 auto" }}>
        <div
          style={{
            fontFamily: "var(--sans)", fontSize: 13, letterSpacing: "0.2em",
            textTransform: "uppercase", color: "var(--accent, #9a9a9a)", marginBottom: 28,
          }}
        >
          AI platform for wine sales
        </div>
        <h1
          style={{
            fontFamily: "var(--sans)", fontWeight: 550, margin: 0,
            fontSize: 92, lineHeight: 1.0, letterSpacing: "-0.01em",
          }}
        >
          <span style={{ display: "block" }}>The platform for</span>
          <span style={{ display: "block" }}>
            <RotatingWord style={{ fontFamily: "var(--sans)" }} />
          </span>
          <span style={{ display: "block" }}>wine sales</span>
        </h1>
        <p
          style={{
            fontFamily: "var(--sans)", fontSize: 19, lineHeight: 1.55, color: "#52524e",
            maxWidth: 560, margin: "30px auto 36px", fontWeight: 400,
          }}
        >
          {LEAD}
        </p>
        <CTAGroup align="center" size="lg" primary="tryout" />
      </div>

      <div style={{ position: "relative", maxWidth: 1380, margin: "0 auto", padding: "40px 40px 0" }}>
        <div
          className="heroStage"
          style={{
            position: "relative", height: "clamp(400px, 39vw, 540px)", overflow: "hidden",
            borderRadius: "28px 28px 0 0", background: "#0b0a10",
          }}
        >
          <img
            src="/assets/vineyard.jpg"
            alt=""
            className="heroVine"
            style={{
              position: "absolute", inset: 0, width: "100%", height: "100%",
              objectFit: "cover", objectPosition: "center", zIndex: 0,
            }}
          />
          <div
            style={{
              position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none",
              background:
                "radial-gradient(125% 100% at 50% 26%, rgba(0,0,0,0.03) 35%, rgba(0,0,0,0.40) 100%)",
            }}
          />

          <div
            className="heroFrame"
            style={{
              position: "relative", zIndex: 2, width: "min(1120px, 83%)", margin: "56px auto 0",
              padding: 16, borderRadius: "24px 24px 0 0", background: "rgba(255,255,255,0.10)",
              backdropFilter: "blur(18px) saturate(1.3)", WebkitBackdropFilter: "blur(18px) saturate(1.3)",
              border: "1px solid rgba(255,255,255,0.22)", borderBottom: "none",
              boxShadow:
                "inset 0 1px 0 rgba(255,255,255,0.35), 0 30px 70px -30px rgba(0,0,0,0.6)",
            }}
          >
            <img
              src="/assets/product-screen.png"
              alt="sommify — building a wine offer"
              style={{ width: "100%", display: "block", borderRadius: "12px 12px 0 0" }}
            />
          </div>

          <div
            className="heroOverlay"
            style={{
              position: "absolute", inset: 0, zIndex: 3,
              background: "rgba(8,7,12,0.42)", pointerEvents: "none",
            }}
          />

          <div
            className="heroHint"
            style={{
              position: "absolute", top: 24, left: 30, zIndex: 4, pointerEvents: "none",
              fontFamily: 'ui-monospace, "SF Mono", "JetBrains Mono", Menlo, monospace',
              fontSize: 12.5, lineHeight: 1.6, letterSpacing: "0.01em",
            }}
          >
            <div style={{ color: "rgba(255,255,255,0.95)" }}>// live preview</div>
            <div style={{ color: "rgba(255,255,255,0.62)" }}>sommify building an offer, in real time</div>
          </div>

          <div
            style={{
              position: "absolute", inset: 0, zIndex: 4, display: "flex",
              alignItems: "center", justifyContent: "center", pointerEvents: "none",
            }}
          >
            <button
              className="heroPlayBtn"
              onClick={openVideo}
              aria-label="Watch tutorial"
              style={{
                pointerEvents: "auto", width: 76, height: 76, borderRadius: 999,
                backdropFilter: "blur(10px) saturate(1.4)", WebkitBackdropFilter: "blur(10px) saturate(1.4)",
                display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
                boxShadow: "0 10px 44px -14px rgba(0,0,0,0.35)",
              }}
            >
              <Play size={28} fill="currentColor" style={{ marginLeft: 3 }} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
