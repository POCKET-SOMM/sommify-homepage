import { useState } from "react";
import { Flag } from "../../components/Flag.jsx";
import {
  IconCheck, IconArrowRight, IconPresentation, IconUtensils, IconFileText,
} from "../../components/icons.jsx";
import { BOTTLE, PAIRING_EXAMPLES } from "./data.js";

// ---- shared shells --------------------------------------------------------
export function Card({ children, w = 500, pad = "26px 28px" }) {
  return (
    <div
      style={{
        width: w, background: "#fff", borderRadius: 12, border: "1px solid rgba(0,0,0,0.08)",
        boxShadow: "0 40px 80px -44px rgba(0,0,0,0.22), 0 8px 24px -14px rgba(0,0,0,0.10)",
        padding: pad, fontFamily: "var(--sans)",
      }}
    >
      {children}
    </div>
  );
}

function BottleThumb({ src, w = 38, h = 48 }) {
  return (
    <div
      style={{
        width: w, height: h, borderRadius: 6, background: "#fff", border: "1px solid #e4e4e7",
        display: "flex", alignItems: "center", justifyContent: "center", flex: "0 0 auto", overflow: "hidden",
      }}
    >
      <img src={src} alt="" style={{ maxWidth: "84%", maxHeight: "90%", objectFit: "contain", display: "block" }} />
    </div>
  );
}

// ---- 02 · Wine-list match -------------------------------------------------
function WineMiniCard({ src, sub, title, price, c, dim, badge }) {
  return (
    <div
      style={{
        position: "relative", width: 138, background: "#fff", borderRadius: 14,
        border: "1px solid #e7e7ea",
        boxShadow: dim
          ? "0 6px 16px -14px rgba(0,0,0,0.22)"
          : "0 26px 46px -24px rgba(0,0,0,0.32), 0 6px 16px -12px rgba(0,0,0,0.12)",
        padding: "12px 12px 13px",
        opacity: dim ? 0.5 : 1,
        filter: dim ? "saturate(0.7)" : "none",
      }}
    >
      {badge && (
        <span
          style={{
            position: "absolute", top: -8, right: -8, width: 23, height: 23, borderRadius: 999,
            background: "var(--accent, #1f8a5b)", color: "#fff", display: "flex", alignItems: "center",
            justifyContent: "center", boxShadow: "0 3px 8px -2px rgba(0,0,0,0.3)", border: "2px solid #fff",
          }}
        >
          <IconCheck size={12} color="#fff" stroke={2.6} />
        </span>
      )}
      <div style={{ height: 76, display: "flex", alignItems: "flex-end", justifyContent: "center" }}>
        <img src={src} alt="" style={{ maxHeight: "100%", maxWidth: "60%", objectFit: "contain", display: "block" }} />
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 11 }}>
        {c && <Flag c={c} s={12} />}
        <span
          style={{
            fontSize: 9.5, letterSpacing: "0.02em", textTransform: "uppercase", color: "#a1a1aa",
            whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
          }}
        >
          {sub}
        </span>
      </div>
      <div
        style={{
          fontFamily: "var(--serif-cor)", fontSize: 15.5, fontWeight: 500, color: "#18181b",
          lineHeight: 1.18, marginTop: 4, display: "-webkit-box", WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical", overflow: "hidden", minHeight: 36,
        }}
      >
        {title}
      </div>
      <div
        style={{
          fontFamily: "var(--serif-cor)", fontSize: 15, fontWeight: 500,
          color: dim ? "#a1a1aa" : "#18181b", marginTop: 6,
        }}
      >
        {price}
      </div>
    </div>
  );
}

export function ReplacementPairs() {
  const arrow = {
    width: 30, height: 30, borderRadius: 999, background: "#18181b", color: "#fff",
    display: "inline-flex", alignItems: "center", justifyContent: "center", flex: "0 0 auto",
    margin: "0 -7px", position: "relative", zIndex: 5,
    boxShadow: "0 6px 14px -6px rgba(0,0,0,0.45)", border: "2px solid #fff",
  };
  const pairs = [
    {
      top: 2, left: 6, rot: -4, delay: "0s",
      cur: { src: BOTTLE.nehrer, sub: "Current", title: "House Riesling", price: "€92" },
      sug: { src: BOTTLE.georg, c: "DE", sub: "Riesling", title: "Georg Mosbacher Jesuitengarten GG", price: "€110" },
    },
    {
      top: 176, left: 150, rot: 3, delay: "1.3s",
      cur: { src: BOTTLE.kasnyik, sub: "Current", title: "House Pinot Noir", price: "€28" },
      sug: { src: BOTTLE.leyda, c: "CL", sub: "Pinot Noir", title: "Leyda Las Brisas Pinot Noir", price: "€25" },
    },
    {
      top: 350, left: 20, rot: -2.5, delay: "2.5s",
      cur: { src: BOTTLE.moric, sub: "Current", title: "Table Cabernet", price: "€130" },
      sug: { src: BOTTLE.chateau, c: "FR", sub: "Cabernet Sauvignon", title: "Château La Mission Haut-Brion", price: "€345" },
    },
  ];
  return (
    <div style={{ position: "relative", width: 500, height: 524 }}>
      {pairs.map((p, i) => (
        <div key={i} style={{ position: "absolute", top: p.top, left: p.left }}>
          <div className="floatpair" style={{ animationDelay: p.delay }}>
            <div style={{ transform: `rotate(${p.rot}deg)`, display: "flex", alignItems: "center" }}>
              <WineMiniCard {...p.cur} dim />
              <span style={arrow}><IconArrowRight size={15} color="#fff" stroke={2.4} /></span>
              <WineMiniCard {...p.sug} badge />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ---- 03 · Beau ------------------------------------------------------------
function BeauAvatar({ s = 64 }) {
  return (
    <img
      src="/assets/beau.png"
      alt="Beau"
      style={{ width: s, height: "auto", display: "block", flex: "0 0 auto", alignSelf: "flex-start", marginTop: -6 }}
    />
  );
}

// ---- reusable chat pieces -------------------------------------------------
// A floating uploaded document (menu, wine card, …) — folded-corner paper with
// a title, optional sub, and a type badge.
export function FloatingDoc({ title, sub, badge = "Doc" }) {
  const line = "#d4d4d8";
  return (
    <div style={{ position: "relative", width: 122 }}>
      <div style={{ display: "flex", height: 16 }}>
        <div
          style={{
            flex: 1, background: "#fff", borderTop: `1px solid ${line}`,
            borderLeft: `1px solid ${line}`, borderTopLeftRadius: 8,
          }}
        />
        <svg
          width="16" height="16" viewBox="0 0 16 16"
          style={{ display: "block", flexShrink: 0, filter: "drop-shadow(0 1px 1px rgba(0,0,0,0.06))" }}
        >
          <path d="M0 0L16 16H0V0Z" fill="#fff" stroke={line} strokeWidth="1" />
        </svg>
      </div>
      <div
        style={{
          position: "relative", overflow: "hidden", width: 122, height: 96, background: "#fff",
          border: `1px solid ${line}`, borderTop: "none",
          borderBottomLeftRadius: 8, borderBottomRightRadius: 8, borderTopRightRadius: 2,
          padding: "8px 10px 10px", lineHeight: 1.25,
        }}
      >
        <div
          style={{
            fontSize: 10.5, color: "#52525b", display: "-webkit-box",
            WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden",
          }}
        >
          {title}
        </div>
        {sub && <span style={{ fontSize: 9.5, color: "#a1a1aa", marginTop: 7, display: "block" }}>{sub}</span>}
        <div
          style={{
            position: "absolute", bottom: 0, left: 0, width: "100%", height: 38,
            background: "linear-gradient(180deg, rgba(255,255,255,0) 0%, #fff 60%)",
          }}
        />
        <div
          style={{
            position: "absolute", bottom: 6, left: 6, fontSize: 9, fontWeight: 600,
            letterSpacing: "0.04em", textTransform: "uppercase", color: "#52525b",
            border: "1px solid #e4e4e7", background: "#fff", borderRadius: 5, padding: "2px 6px",
            whiteSpace: "nowrap",
          }}
        >
          {badge}
        </div>
      </div>
    </div>
  );
}

// The user's chat bubble.
export function UserBubble({ children }) {
  return (
    <div
      style={{
        maxWidth: 320, background: "#f4f4f5", color: "#18181b", fontSize: 14.5, lineHeight: 1.5,
        borderRadius: "18px 18px 6px 18px", padding: "12px 16px",
      }}
    >
      {children}
    </div>
  );
}

// A user turn: any attached floating documents, then the bubble.
export function UserMessage({ text, docs = [] }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 12, paddingRight: 12 }}>
      {docs.length > 0 && (
        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
          {docs.map((d, i) => (
            <div key={i} className="floatpair" style={{ animationDelay: `${i * 0.4}s` }}>
              <div style={{ transform: `rotate(${i % 2 ? -3 : 3.5}deg)` }}>
                <FloatingDoc {...d} />
              </div>
            </div>
          ))}
        </div>
      )}
      <UserBubble>{text}</UserBubble>
    </div>
  );
}

// Beau's reply: avatar + name + text, with optional attached content below.
export function BeauReply({ text, children }) {
  return (
    <div style={{ display: "flex", gap: 12, alignItems: "flex-start", paddingLeft: 4 }}>
      <BeauAvatar s={56} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: "#27272a", marginBottom: 8 }}>Beau</div>
        <div style={{ fontSize: 14.5, lineHeight: 1.55, color: "#27272a", maxWidth: 360 }}>{text}</div>
        {children}
      </div>
    </div>
  );
}

// A row of floating, overlapping, gently-rotated wine cards.
export function FloatingWineCards({ wines }) {
  const rots = [-5, 2, -3, 4];
  const overlap = wines.length > 3 ? -24 : -16;
  return (
    <div style={{ display: "flex", marginTop: 20 }}>
      {wines.map((w, i) => (
        <div
          key={i}
          className="floatpair"
          style={{ animationDelay: `${0.5 + i * 0.5}s`, marginLeft: i ? overlap : 0, zIndex: i + 1 }}
        >
          <div style={{ transform: `rotate(${rots[i % rots.length]}deg)` }}>
            <WineMiniCard {...w} />
          </div>
        </div>
      ))}
    </div>
  );
}

// Beau's pitch angles — a plain bullet list, as a normal chat response.
function PitchBullets({ bullets }) {
  return (
    <ul style={{ margin: "12px 0 0", paddingLeft: 18, listStyle: "disc", maxWidth: 360 }}>
      {bullets.map((b, i) => (
        <li key={i} style={{ fontSize: 14, lineHeight: 1.5, color: "#27272a", marginTop: i ? 8 : 0 }}>
          <span style={{ fontWeight: 600 }}>{b.lead}</span> — {b.body}
        </li>
      ))}
    </ul>
  );
}

// ---- 03 · Beau use-case examples ------------------------------------------
export const BEAU_USE_CASES = [
  { key: "offer", label: "Build offer" },
  { key: "qa", label: "Portfolio Q&A" },
  { key: "pairing", label: "Pairing" },
  { key: "pitch", label: "Pitch" },
];

const BEAU_EXAMPLES = {
  offer: {
    user: {
      text: "Create an offer for this!",
      docs: [{ title: "Menu — Bofinger, Paris", sub: "95 dishes", badge: "Menu" }],
    },
    reply: {
      text: "Here's a balanced offer for Bofinger — three standouts to anchor the list, priced and ready to pour.",
      wines: [
        { src: BOTTLE.georg, c: "DE", sub: "Riesling", title: "Georg Mosbacher Jesuitengarten GG", price: "€110" },
        { src: BOTTLE.theophile, c: "FR", sub: "Rosé", title: "Theophile Milan Haru Rosé", price: "€40" },
        { src: BOTTLE.chateau, c: "FR", sub: "Cabernet", title: "Château La Mission Haut-Brion", price: "€345" },
      ],
    },
  },
  qa: {
    user: { text: "What organic reds under €25 do we have in stock?" },
    reply: {
      text: "Three in your range right now — all certified organic:",
      wines: [
        { src: BOTTLE.kasnyik, c: "HU", sub: "Organic · Red", title: "Kasnyik Infinity Organic", price: "€21" },
        { src: BOTTLE.leyda, c: "CL", sub: "Organic · Pinot Noir", title: "Leyda Las Brisas Pinot Noir", price: "€24" },
        { src: BOTTLE.moric, c: "AT", sub: "Organic · Blaufränkisch", title: "Moric Lutzmannsburg Alte Reben", price: "€23" },
      ],
    },
  },
  pairing: {
    user: { text: "What of ours pairs with seared duck breast & cherry jus?" },
    reply: {
      text: "Some wines from your range that lean into the cherry:",
      wines: [
        { src: BOTTLE.leyda, c: "CL", sub: "Pinot Noir", title: "Leyda Las Brisas Pinot Noir", price: "€25" },
        { src: BOTTLE.moric, c: "AT", sub: "Blaufränkisch", title: "Moric Lutzmannsburg Alte Reben", price: "€88" },
        { src: BOTTLE.kasnyik, c: "HU", sub: "Red", title: "Kasnyik Infinity Organic", price: "€21" },
        { src: BOTTLE.chateau, c: "FR", sub: "Cabernet", title: "Château La Mission Haut-Brion", price: "€345" },
      ],
    },
  },
  pitch: {
    user: {
      text: "How do I pitch the Georg Mosbacher GG to a steakhouse buyer?",
      docs: [
        { title: "Wine list — The Chophouse", sub: "Their current list", badge: "Wine card" },
        { title: "Menu — The Chophouse", sub: "Steakhouse", badge: "Menu" },
      ],
    },
    reply: {
      text: "Three angles to lead with — straight from their list and menu:",
      bullets: [
        { lead: "Fills a gap on their list", body: "their whites jump from a €48 Chablis to a €130 Meursault; the GG at €110 slots in as the premium by-the-glass pour they're missing." },
        { lead: "Covers a dish nothing else can", body: "no white on their card stands up to the dry-aged ribeye or the bone-marrow starter — the GG's acidity cuts the fat where their oaky Chardonnays fold." },
        { lead: "A pour with a story", body: "a Grosses Gewächs guests recognise and trade up for — better margin than the house white, and the somm loves selling it." },
      ],
    },
  },
};

// Renders the Beau chat for the given use-case key.
export function BeauChat({ exKey = "offer" }) {
  const ex = BEAU_EXAMPLES[exKey] || BEAU_EXAMPLES.offer;
  const { reply } = ex;
  return (
    <div
      key={exKey}
      className="deck-layer"
      style={{
        width: 500, display: "flex", flexDirection: "column", gap: 30,
        animation: "featSwap .42s cubic-bezier(.2,.7,.2,1) both",
      }}
    >
      <UserMessage text={ex.user.text} docs={ex.user.docs} />
      <BeauReply text={reply.text}>
        {reply.wines ? <FloatingWineCards wines={reply.wines} /> : <PitchBullets bullets={reply.bullets} />}
      </BeauReply>
    </div>
  );
}


// ---- 05 · Sales materials -------------------------------------------------
function PaperCard({ w, stacked, children }) {
  return (
    <div style={{ position: "relative", width: w }}>
      {stacked && (
        <>
          <div
            style={{
              position: "absolute", inset: 0, transform: "translate(11px,11px) rotate(2.5deg)",
              background: "#fff", borderRadius: 8, border: "1px solid #ededf0",
              boxShadow: "0 18px 34px -24px rgba(0,0,0,0.3)",
            }}
          />
          <div
            style={{
              position: "absolute", inset: 0, transform: "translate(5px,5px) rotate(1.2deg)",
              background: "#fff", borderRadius: 8, border: "1px solid #ededf0",
            }}
          />
        </>
      )}
      <div
        style={{
          position: "relative", background: "#fff", borderRadius: 8, border: "1px solid #e7e7ea",
          overflow: "hidden",
          boxShadow: "0 30px 56px -28px rgba(0,0,0,0.34), 0 8px 20px -14px rgba(0,0,0,0.12)",
        }}
      >
        {children}
      </div>
    </div>
  );
}

function DocChip({ icon: Icon, children, style }) {
  return (
    <span
      style={{
        position: "absolute", display: "inline-flex", alignItems: "center", gap: 6,
        background: "#18181b", color: "#fff", borderRadius: 999, padding: "5px 11px",
        fontSize: 11, fontWeight: 500, whiteSpace: "nowrap",
        boxShadow: "0 10px 20px -10px rgba(0,0,0,0.55)", border: "2px solid #fff", ...style,
      }}
    >
      <Icon size={12} color="#fff" /> {children}
    </span>
  );
}

function DeckSlide() {
  return (
    <div style={{ width: 214 }}>
      <div style={{ display: "flex", gap: 12, padding: "16px 16px 12px", height: 128 }}>
        <div style={{ width: 50, display: "flex", alignItems: "flex-end", justifyContent: "center", flex: "0 0 auto" }}>
          <img src={BOTTLE.chateau} alt="" style={{ maxHeight: "100%", maxWidth: "100%", objectFit: "contain" }} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 8.5, letterSpacing: "0.16em", textTransform: "uppercase", color: "#a1a1aa" }}>
            Bordeaux · 2014
          </div>
          <div style={{ fontFamily: "var(--serif-cor)", fontSize: 16, color: "#18181b", lineHeight: 1.12, marginTop: 4 }}>
            Château La Mission Haut-Brion
          </div>
          <div style={{ marginTop: 11, display: "flex", flexDirection: "column", gap: 5 }}>
            {[92, 74, 84, 60].map((wd, i) => (
              <div key={i} style={{ height: 4, width: wd + "%", borderRadius: 99, background: "#ededf0" }} />
            ))}
          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          padding: "8px 16px", borderTop: "1px solid #f0f0f2", fontSize: 9, color: "#a1a1aa",
        }}
      >
        <span style={{ letterSpacing: "0.08em", textTransform: "uppercase" }}>Tasting note</span>
        <span>03 / 24</span>
      </div>
    </div>
  );
}

function PairingDoc() {
  const pairs = [
    ["Oysters", "Chablis 1er Cru"],
    ["Foie gras", "Sauternes"],
    ["Rib steak", "Côte-Rôtie"],
    ["Crème brûlée", "Brachetto d'Acqui"],
  ];
  return (
    <div style={{ width: 168, padding: "16px 16px 18px" }}>
      <div style={{ fontSize: 8.5, letterSpacing: "0.2em", textTransform: "uppercase", color: "#a1a1aa", textAlign: "center" }}>
        Pairing guide
      </div>
      <div style={{ fontFamily: "var(--serif-cor)", fontSize: 17, color: "#18181b", textAlign: "center", marginTop: 2 }}>
        Bofinger, Paris
      </div>
      <div style={{ width: 24, height: 1, background: "#e4e4e7", margin: "11px auto 6px" }} />
      {pairs.map((p, i) => (
        <div key={i} style={{ padding: "8px 0", borderBottom: i < pairs.length - 1 ? "1px solid rgba(0,0,0,0.06)" : "none" }}>
          <div style={{ fontSize: 8.5, letterSpacing: "0.08em", textTransform: "uppercase", color: "#a1a1aa" }}>{p[0]}</div>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 3 }}>
            <IconArrowRight size={11} color="#c4c4cc" />
            <span style={{ fontFamily: "var(--serif-cor)", fontSize: 13, color: "#18181b" }}>{p[1]}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function WineListDoc() {
  const items = [["Champagne Brut", "€52"], ["Sancerre", "€44"], ["Château La Mission", "€345"], ["Sauternes", "€60"]];
  return (
    <div style={{ width: 152, padding: "18px 16px" }}>
      <div style={{ fontSize: 8.5, letterSpacing: "0.2em", textTransform: "uppercase", color: "#a1a1aa", textAlign: "center" }}>
        Wine list
      </div>
      <div style={{ fontFamily: "var(--serif-cor)", fontSize: 18, color: "#18181b", textAlign: "center", marginTop: 2 }}>
        Carte des vins
      </div>
      <div style={{ width: 24, height: 1, background: "#e4e4e7", margin: "11px auto 8px" }} />
      {items.map((it, i) => (
        <div
          key={i}
          style={{
            display: "flex", justifyContent: "space-between", gap: 8, padding: "6px 0",
            borderBottom: i < items.length - 1 ? "1px solid rgba(0,0,0,0.07)" : "none",
          }}
        >
          <span style={{ fontFamily: "var(--serif-cor)", fontSize: 12, color: "#18181b", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            {it[0]}
          </span>
          <span style={{ fontFamily: "var(--serif-cor)", fontSize: 12, color: "#18181b", flex: "0 0 auto" }}>
            {it[1]}
          </span>
        </div>
      ))}
    </div>
  );
}

export function ExportsMock() {
  return (
    <div style={{ position: "relative", width: 500, height: 504 }}>
      <div style={{ position: "absolute", top: 6, left: 4 }}>
        <div className="floatpair" style={{ animationDelay: "0s" }}>
          <div style={{ transform: "rotate(-4deg)", position: "relative", display: "inline-block" }}>
            <PaperCard w={214} stacked><DeckSlide /></PaperCard>
            <DocChip icon={IconPresentation} style={{ left: 14, bottom: -12 }}>Sales deck · PPTX</DocChip>
          </div>
        </div>
      </div>
      <div style={{ position: "absolute", top: 46, left: 296 }}>
        <div className="floatpair" style={{ animationDelay: "1.1s" }}>
          <div style={{ transform: "rotate(4deg)", position: "relative", display: "inline-block" }}>
            <PaperCard w={168}><PairingDoc /></PaperCard>
            <DocChip icon={IconUtensils} style={{ left: 12, bottom: -12 }}>Pairing guide · PDF</DocChip>
          </div>
        </div>
      </div>
      <div style={{ position: "absolute", top: 268, left: 66 }}>
        <div className="floatpair" style={{ animationDelay: "2.1s" }}>
          <div style={{ transform: "rotate(-2.5deg)", position: "relative", display: "inline-block" }}>
            <PaperCard w={152}><WineListDoc /></PaperCard>
            <DocChip icon={IconFileText} style={{ left: 12, bottom: -12 }}>Wine list · PDF</DocChip>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---- 01 · Menu offers (cycling curated offers) ----------------------------
function PairingCard({ data }) {
  const { venue, sub, wines } = data;
  return (
    <Card w={384} pad="30px 32px 24px">
      <div style={{ textAlign: "center" }}>
        <div style={{ fontFamily: "var(--sans)", fontSize: 10.5, letterSpacing: "0.26em", textTransform: "uppercase", color: "var(--muted)" }}>
          Wine offer · curated for
        </div>
        <div style={{ fontFamily: "var(--serif-cor)", fontSize: 31, color: "#18181b", marginTop: 5, lineHeight: 1.04 }}>
          {venue}
        </div>
        <div style={{ width: 34, height: 1, background: "var(--hair)", margin: "12px auto 10px" }} />
        <div style={{ fontFamily: "var(--sans)", fontSize: 12, color: "#a1a1aa", lineHeight: 1.5 }}>{sub}</div>
      </div>
      <div style={{ marginTop: 14 }}>
        {wines.map((w, i) => (
          <div
            key={i}
            style={{
              display: "flex", alignItems: "baseline", gap: 12, padding: "10px 0",
              borderBottom: i < wines.length - 1 ? "1px solid rgba(0,0,0,0.07)" : "none",
            }}
          >
            <Flag c={w[4]} s={17} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontFamily: "var(--serif-cor)", fontSize: 18, color: "#18181b", lineHeight: 1.15 }}>{w[0]}</div>
              <div style={{ fontFamily: "var(--sans)", fontSize: 11, color: "#a1a1aa", marginTop: 2 }}>Pairs with {w[3]}</div>
            </div>
            <div style={{ textAlign: "right", flex: "0 0 auto" }}>
              <div style={{ fontFamily: "var(--sans)", fontSize: 10.5, color: "#a1a1aa", letterSpacing: "0.04em", whiteSpace: "nowrap" }}>
                {w[1]}
              </div>
              <div style={{ fontFamily: "var(--serif-cor)", fontSize: 17, color: "#18181b", marginTop: 2 }}>{w[2]}</div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 18, textAlign: "center", fontFamily: "var(--sans)", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "#a1a1aa" }}>
        Selected & priced with sommify
      </div>
    </Card>
  );
}

function MenuDoc({ ex, active, onClick }) {
  const cmap = { Italian: "IT", French: "FR", Spanish: "ES", Japanese: "JP" };
  const cuisine = ex.sub.split(" ")[0];
  const flag = cmap[cuisine];
  const dishes = (ex.sub.match(/(\d+) dishes/) || [])[1];
  const line = active ? "var(--accent, #0a0a0a)" : "#dcdce0";
  return (
    <button
      onClick={onClick}
      style={{
        appearance: "none", background: "transparent", border: "none", padding: 0, margin: 0,
        cursor: "pointer", width: 86, display: "block", textAlign: "left",
        transition: "transform .2s ease, opacity .2s ease",
        transform: active ? "translateX(3px)" : "none", opacity: active ? 1 : 0.6,
      }}
    >
      <div style={{ display: "flex", height: 13 }}>
        <div style={{ flex: 1, background: "#fff", borderTop: `1.5px solid ${line}`, borderLeft: `1.5px solid ${line}`, borderTopLeftRadius: 6 }} />
        <svg width="13" height="13" viewBox="0 0 16 16" style={{ display: "block", flexShrink: 0 }}>
          <path d="M0 0L16 16H0V0Z" fill="#fff" stroke={line} strokeWidth="1.5" />
        </svg>
      </div>
      <div
        style={{
          width: 86, height: 98, background: "#fff", border: `1.5px solid ${line}`, borderTop: "none",
          borderBottomLeftRadius: 6, borderBottomRightRadius: 6, borderTopRightRadius: 2,
          padding: "8px 9px 9px", position: "relative", overflow: "hidden",
          boxShadow: active ? "0 12px 24px -12px rgba(0,0,0,0.28)" : "0 6px 16px -14px rgba(0,0,0,0.18)",
          transition: "box-shadow .2s ease, border-color .2s ease",
        }}
      >
        <Flag c={flag} s={14} />
        <div
          style={{
            fontFamily: "var(--serif-cor)", fontSize: 13, color: "#18181b", lineHeight: 1.1, marginTop: 6,
            display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden",
          }}
        >
          {ex.venue}
        </div>
        <div style={{ fontSize: 8.5, color: "#a1a1aa", marginTop: 3 }}>{dishes} dishes</div>
        <div style={{ position: "absolute", bottom: 0, left: 0, width: "100%", height: 20, background: "linear-gradient(180deg, rgba(255,255,255,0) 0%, #fff 75%)" }} />
        <div
          style={{
            position: "absolute", bottom: 5, left: 6, fontSize: 7.5, fontWeight: 600, letterSpacing: "0.06em",
            textTransform: "uppercase", color: "#52525b", border: "1px solid #e4e4e7", background: "#fff",
            borderRadius: 4, padding: "2px 5px",
          }}
        >
          Menu
        </div>
      </div>
    </button>
  );
}

export function MenuOfferPicker() {
  const [sel, setSel] = useState(0);
  const ex = PAIRING_EXAMPLES;
  return (
    <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 14, flex: "0 0 auto", paddingTop: 4 }}>
        {ex.map((m, i) => <MenuDoc key={i} ex={m} active={i === sel} onClick={() => setSel(i)} />)}
      </div>
      <div key={sel} className="deck-layer" style={{ flex: "0 0 auto", animation: "deckPop 0.42s cubic-bezier(.2,.7,.2,1) both" }}>
        <PairingCard data={ex[sel]} />
      </div>
    </div>
  );
}
