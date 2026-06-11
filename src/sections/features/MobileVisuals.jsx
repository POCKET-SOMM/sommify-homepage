import {
  IconCheck, IconArrowRight, IconPresentation, IconFileText, IconClipboardList,
} from "../../components/icons.jsx";
import { BOTTLE } from "./data.js";

const SANS = "var(--sans)";
const SERIF = "var(--serif-cor)";

function Bottle({ src, w = 30, h = 40 }) {
  return (
    <div
      style={{
        width: w, height: h, borderRadius: 5, background: "#fff", border: "1px solid #e4e4e7",
        display: "flex", alignItems: "center", justifyContent: "center", flex: "0 0 auto", overflow: "hidden",
      }}
    >
      <img src={src} alt="" style={{ maxWidth: "82%", maxHeight: "88%", objectFit: "contain", display: "block" }} />
    </div>
  );
}

function VisualCard({ children, pad = 16 }) {
  return (
    <div
      style={{
        background: "var(--card)", border: "1px solid rgba(0,0,0,0.09)", borderRadius: 18,
        padding: pad, marginTop: 30,
        boxShadow: "0 30px 60px -42px rgba(0,0,0,0.30), 0 6px 18px -14px rgba(0,0,0,0.10)",
      }}
    >
      {children}
    </div>
  );
}

// ---- 01 · Menu offers -----------------------------------------------------
export function MenuToOffer() {
  const wines = [
    { src: BOTTLE.theophile, name: "Theophile Milan Rosé", note: "with the crudo", price: "€40" },
    { src: BOTTLE.georg, name: "Georg Mosbacher GG", note: "with the duck", price: "€110" },
    { src: BOTTLE.moric, name: "Moric Blaufränkisch", note: "with the lamb", price: "€88" },
  ];
  return (
    <VisualCard>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div
          style={{
            width: 46, height: 58, borderRadius: 7, background: "#fff", border: "1px solid #e4e4e7",
            padding: "8px 7px", flex: "0 0 auto", position: "relative", overflow: "hidden",
          }}
        >
          {[80, 60, 72, 50].map((w, i) => (
            <div key={i} style={{ height: 3, width: `${w}%`, background: "#e4e4e7", borderRadius: 2, marginBottom: 4 }} />
          ))}
          <span
            style={{
              position: "absolute", bottom: 5, left: 6, fontSize: 7, fontWeight: 700, letterSpacing: "0.06em",
              textTransform: "uppercase", color: "#71717a", border: "1px solid #e4e4e7", borderRadius: 3,
              padding: "1px 4px", background: "#fff",
            }}
          >
            Menu
          </span>
        </div>
        <div style={{ minWidth: 0, flex: 1 }}>
          <div style={{ fontFamily: SERIF, fontSize: 17, color: "#18181b", lineHeight: 1.1, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            Osteria Vino
          </div>
          <div style={{ fontFamily: SANS, fontSize: 11.5, color: "#a1a1aa", marginTop: 3 }}>24 dishes · paired</div>
        </div>
        <span
          style={{
            marginLeft: "auto", fontFamily: SANS, fontSize: 11, fontWeight: 600, color: "#fff",
            background: "#0a0a0a", borderRadius: 999, padding: "5px 11px", flex: "0 0 auto",
          }}
        >
          Offer
        </span>
      </div>
      <div style={{ height: 1, background: "rgba(0,0,0,0.07)", margin: "13px 0 4px" }} />
      {wines.map((w, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: 11, padding: "9px 0", borderTop: i ? "1px solid rgba(0,0,0,0.05)" : "none" }}>
          <Bottle src={w.src} w={26} h={36} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontFamily: SANS, fontSize: 13, fontWeight: 550, color: "#1a1a1a", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {w.name}
            </div>
            <div style={{ fontFamily: SANS, fontSize: 11, color: "#a1a1aa", marginTop: 1 }}>{w.note}</div>
          </div>
          <div style={{ fontFamily: SERIF, fontSize: 15, color: "#18181b", flex: "0 0 auto" }}>{w.price}</div>
        </div>
      ))}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 7, paddingTop: 11, borderTop: "1px solid rgba(0,0,0,0.05)" }}>
        <div style={{ display: "flex" }}>
          {[BOTTLE.georg, BOTTLE.chateau, BOTTLE.penfolds].map((s, i) => (
            <div
              key={i}
              style={{
                width: 16, height: 16, borderRadius: 999, background: "#fff", border: "1px solid #e4e4e7",
                marginLeft: i ? -6 : 0, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden",
              }}
            >
              <img src={s} alt="" style={{ maxWidth: "76%", maxHeight: "82%", objectFit: "contain" }} />
            </div>
          ))}
        </div>
        <span style={{ fontFamily: SANS, fontSize: 12, fontWeight: 500, color: "#71717a" }}>+13 more wines in this offer</span>
      </div>
    </VisualCard>
  );
}

// ---- 02 · Wine-list match -------------------------------------------------
function ReplaceCard({ src, sub, title, price, dim, badge }) {
  return (
    <div
      style={{
        position: "relative", flex: "1 1 0", minWidth: 0, background: "#fff",
        border: "1px solid #e7e7ea", borderRadius: 12, padding: "11px 11px 12px", opacity: dim ? 0.55 : 1,
      }}
    >
      {badge && (
        <span
          style={{
            position: "absolute", top: -7, right: -7, width: 21, height: 21, borderRadius: 999,
            background: "var(--accent, #1f8a5b)", color: "#fff", display: "flex", alignItems: "center",
            justifyContent: "center", border: "2px solid #fff", boxShadow: "0 3px 8px -2px rgba(0,0,0,0.3)",
          }}
        >
          <IconCheck size={11} color="#fff" stroke={2.6} />
        </span>
      )}
      <div style={{ height: 52, display: "flex", alignItems: "flex-end", justifyContent: "center" }}>
        <img src={src} alt="" style={{ maxHeight: "100%", maxWidth: "52%", objectFit: "contain", display: "block" }} />
      </div>
      <div style={{ fontSize: 9, letterSpacing: "0.04em", textTransform: "uppercase", color: "#a1a1aa", marginTop: 9 }}>{sub}</div>
      <div
        style={{
          fontFamily: SERIF, fontSize: 13.5, fontWeight: 500, color: "#18181b", lineHeight: 1.15, marginTop: 3,
          display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden", minHeight: 31,
        }}
      >
        {title}
      </div>
      <div style={{ fontFamily: SERIF, fontSize: 13.5, color: dim ? "#a1a1aa" : "#18181b", marginTop: 4 }}>{price}</div>
    </div>
  );
}

export function ReplacePairs() {
  const pairs = [
    { cur: { src: BOTTLE.nehrer, sub: "Current", title: "House Riesling", price: "€92" }, sug: { src: BOTTLE.georg, sub: "Riesling", title: "Georg Mosbacher GG", price: "€110" } },
    { cur: { src: BOTTLE.kasnyik, sub: "Current", title: "House Pinot Noir", price: "€28" }, sug: { src: BOTTLE.leyda, sub: "Pinot Noir", title: "Leyda Las Brisas", price: "€25" } },
  ];
  return (
    <VisualCard pad={14}>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {pairs.map((p, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 0 }}>
            <ReplaceCard {...p.cur} dim />
            <span
              style={{
                width: 26, height: 26, borderRadius: 999, background: "#18181b", color: "#fff", flex: "0 0 auto",
                display: "inline-flex", alignItems: "center", justifyContent: "center", margin: "0 -5px", zIndex: 3,
                border: "2px solid #fff", boxShadow: "0 5px 12px -5px rgba(0,0,0,0.45)",
              }}
            >
              <IconArrowRight size={13} color="#fff" stroke={2.4} />
            </span>
            <ReplaceCard {...p.sug} badge />
          </div>
        ))}
      </div>
    </VisualCard>
  );
}

// ---- 03 · Beau ------------------------------------------------------------
export function BeauChat() {
  const wines = [
    { src: BOTTLE.georg, sub: "Riesling · DE", title: "Georg Mosbacher GG", price: "€110" },
    { src: BOTTLE.theophile, sub: "Rosé · FR", title: "Theophile Milan Haru", price: "€40" },
  ];
  return (
    <VisualCard pad={16}>
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 14 }}>
        <div
          style={{
            fontFamily: SANS, fontSize: 13, color: "#fff", background: "#0a0a0a",
            borderRadius: "16px 16px 4px 16px", padding: "9px 14px", maxWidth: "78%",
          }}
        >
          What German whites do we have under €120?
        </div>
      </div>
      <div style={{ display: "flex", gap: 9, alignItems: "flex-start" }}>
        <img src="/assets/beau.png" alt="Beau" style={{ width: 34, height: "auto", flex: "0 0 auto", marginTop: -2 }} />
        <div style={{ minWidth: 0, flex: 1 }}>
          <div
            style={{
              fontFamily: SANS, fontSize: 13, color: "#27272a", lineHeight: 1.5, background: "rgba(0,0,0,0.04)",
              borderRadius: "16px 16px 16px 4px", padding: "9px 13px",
            }}
          >
            Two in stock that fit — both Rieslings with the acidity your buyer likes:
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 7, marginTop: 9 }}>
            {wines.map((w, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, background: "#fff", border: "1px solid #e7e7ea", borderRadius: 10, padding: "7px 9px" }}>
                <Bottle src={w.src} w={22} h={30} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: SANS, fontSize: 12, fontWeight: 550, color: "#1a1a1a", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {w.title}
                  </div>
                  <div style={{ fontFamily: SANS, fontSize: 10.5, color: "#a1a1aa", marginTop: 1 }}>{w.sub}</div>
                </div>
                <div style={{ fontFamily: SERIF, fontSize: 14, color: "#18181b" }}>{w.price}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </VisualCard>
  );
}

// ---- 04 · Pricing ---------------------------------------------------------
export function PricingMockM() {
  return (
    <VisualCard>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <Bottle src={BOTTLE.chateau} w={30} h={42} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontFamily: SANS, fontSize: 13, fontWeight: 550, color: "#1a1a1a", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            Château La Mission
          </div>
          <div style={{ fontFamily: SANS, fontSize: 11, color: "#a1a1aa", marginTop: 1 }}>Cabernet · FR</div>
        </div>
      </div>
      <div style={{ display: "flex", gap: 9, marginTop: 14 }}>
        {[["Bottle", "€345"], ["By glass", "€24"]].map(([k, v]) => (
          <div key={k} style={{ flex: 1, background: "rgba(0,0,0,0.03)", border: "1px solid rgba(0,0,0,0.06)", borderRadius: 10, padding: "10px 12px" }}>
            <div style={{ fontFamily: SANS, fontSize: 10.5, letterSpacing: "0.04em", textTransform: "uppercase", color: "#a1a1aa" }}>{k}</div>
            <div style={{ fontFamily: SERIF, fontSize: 22, color: "#18181b", marginTop: 2 }}>{v}</div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontFamily: SANS, fontSize: 12, marginBottom: 7 }}>
          <span style={{ color: "#52525b" }}>Margin</span>
          <span style={{ color: "#18181b", fontWeight: 600 }}>62%</span>
        </div>
        <div style={{ height: 7, borderRadius: 99, background: "rgba(0,0,0,0.07)", overflow: "hidden" }}>
          <div style={{ width: "62%", height: "100%", borderRadius: 99, background: "var(--accent, #1f8a5b)" }} />
        </div>
        <div style={{ display: "flex", gap: 7, marginTop: 13 }}>
          {["6+ bottles −5%", "12+ −10%"].map((t) => (
            <span key={t} style={{ fontFamily: SANS, fontSize: 11, color: "#52525b", background: "rgba(0,0,0,0.04)", border: "1px solid rgba(0,0,0,0.06)", borderRadius: 999, padding: "5px 10px" }}>
              {t}
            </span>
          ))}
        </div>
      </div>
    </VisualCard>
  );
}

// ---- 05 · Sales materials -------------------------------------------------
export function ExportsMockM() {
  const fmts = [
    { I: IconPresentation, label: "Deck", ext: "PPTX" },
    { I: IconFileText, label: "Pairing guide", ext: "PDF" },
    { I: IconClipboardList, label: "Wine list", ext: "XLSX" },
  ];
  return (
    <VisualCard pad={14}>
      <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
        {fmts.map((f, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, background: "#fff", border: "1px solid #e7e7ea", borderRadius: 12, padding: "11px 13px" }}>
            <div style={{ width: 34, height: 34, borderRadius: 9, background: "rgba(0,0,0,0.04)", display: "flex", alignItems: "center", justifyContent: "center", flex: "0 0 auto" }}>
              <f.I size={17} color="#18181b" stroke={1.8} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: SANS, fontSize: 13.5, fontWeight: 550, color: "#1a1a1a" }}>{f.label}</div>
              <div style={{ fontFamily: SANS, fontSize: 11, color: "#a1a1aa", marginTop: 1 }}>White-labelled · 16 languages</div>
            </div>
            <span style={{ fontFamily: SANS, fontSize: 10, fontWeight: 700, letterSpacing: "0.05em", color: "#52525b", border: "1px solid #e4e4e7", borderRadius: 5, padding: "3px 7px" }}>
              {f.ext}
            </span>
          </div>
        ))}
      </div>
    </VisualCard>
  );
}
