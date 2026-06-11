// PricingCalculator.jsx
// Interactive "pricing help" visual (feature 04). The wine is chosen externally
// (via the feature's bottle chips, see Features.jsx) and passed in as wineIndex;
// the volume tier is toggled here, and margin / per-bottle profit / yearly
// profit update live.
//
// Bottle images are the locally self-hosted placeholders under public/bottles/
// (swap for real catalogue imagery before launch).

import React, { useState, useRef, useEffect } from 'react';

const SERIF = "'Newsreader', Georgia, serif";
const MUTED = '#a1a1aa';
const INK = '#18181b';

const DEFAULT_TIERS = [
  { off: 0.0, disc: 'List', qty: '1–5 btl' },
  { off: 0.08, disc: '−8%', qty: '6 btl' },
  { off: 0.15, disc: '−15%', qty: '12 btl' },
  { off: 0.22, disc: '−22%', qty: 'Pallet' },
];

export const PRICING_WINES = [
  { src: '/bottles/theophile.jpg', name: 'Théophile Haru Rosé', menu: 42, cost: 16 },
  { src: '/bottles/georg.jpg', name: 'Georg Mosbacher GG', menu: 68, cost: 27 },
  { src: '/bottles/chateau.jpg', name: 'Château La Mission', menu: 145, cost: 64 },
  { src: '/bottles/moric.jpg', name: 'Moric Blaufränkisch', menu: 58, cost: 24 },
];

function Line({ label, value }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '8px 0', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
      <span style={{ fontSize: 14, color: '#52525b' }}>{label}</span>
      <span style={{ fontSize: 14.5, color: INK, fontWeight: 550, fontVariantNumeric: 'tabular-nums' }}>{value}</span>
    </div>
  );
}

export default function PricingCalculator({
  wines = PRICING_WINES,
  tiers = DEFAULT_TIERS,
  bottlesPerDay = 8,
  accent = '#1f8a5b',
  defaultTier = 2,
  wineIndex = 0,
}) {
  const [sel, setSel] = useState(defaultTier);
  const wine = wines[wineIndex] || wines[0];

  const imgRef = useRef(null);
  const prevRef = useRef(wineIndex);

  // Slide the bottle in from the direction of travel when the wine changes.
  useEffect(() => {
    const el = imgRef.current;
    const prev = prevRef.current;
    prevRef.current = wineIndex;
    if (!el || prev === wineIndex) return;
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const from = wineIndex >= prev ? 28 : -28;
    el.animate(
      [
        { transform: `translateY(-50%) translateX(${from}px)`, opacity: 0 },
        { transform: 'translateY(-50%) translateX(0)', opacity: 1 },
      ],
      { duration: 380, easing: 'cubic-bezier(.2,.7,.2,1)' }
    );
  }, [wineIndex]);

  const cost = wine.cost * (1 - tiers[sel].off);
  const profit = wine.menu - cost;
  const margin = profit / wine.menu; // 0..1
  const perYear = Math.round(profit * bottlesPerDay * 365);

  return (
    <div style={{ position: 'relative', display: 'inline-block', padding: '0 0 0 52px' }}>
      {/* bottle behind, to the left (white bg drops out via multiply) */}
      <img
        ref={imgRef}
        src={wine.src}
        alt=""
        style={{
          position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)',
          height: '82%', width: 'auto', zIndex: 0, mixBlendMode: 'multiply', pointerEvents: 'none',
        }}
      />

      {/* card */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <div
          style={{
            width: 380, background: '#fff', borderRadius: 20,
            border: '1px solid rgba(0,0,0,0.08)',
            boxShadow: '0 40px 90px -54px rgba(0,0,0,0.28), 0 8px 24px -18px rgba(0,0,0,0.10)',
            padding: '22px 24px',
          }}
        >
          <div style={{ fontFamily: SERIF, fontSize: 20, color: INK, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {wine.name}
          </div>

          <div style={{ marginTop: 12 }}>
            <Line label="Menu price / bottle" value={`€${wine.menu.toFixed(2)}`} />
            <Line label="Your price / bottle" value={`€${cost.toFixed(2)}`} />
          </div>

          {/* margin slider */}
          <div style={{ marginTop: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 9 }}>
              <span style={{ fontSize: 14, color: '#52525b' }}>Their margin</span>
              <span style={{ fontSize: 16, fontWeight: 650, color: INK, fontVariantNumeric: 'tabular-nums' }}>
                {Math.round(margin * 100)}%
              </span>
            </div>
            <div style={{ position: 'relative', height: 8, borderRadius: 99, background: 'rgba(0,0,0,0.08)' }}>
              <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: `${margin * 100}%`, borderRadius: 99, background: accent, transition: 'width .45s cubic-bezier(.2,.7,.2,1)' }} />
              <div
                style={{
                  position: 'absolute', top: '50%', left: `${margin * 100}%`,
                  width: 16, height: 16, borderRadius: 999, background: '#fff', border: `2px solid ${accent}`,
                  transform: 'translate(-50%, -50%)', boxShadow: '0 2px 6px -1px rgba(0,0,0,0.25)',
                  transition: 'left .45s cubic-bezier(.2,.7,.2,1)',
                }}
              />
            </div>
          </div>

          {/* profit payoff */}
          <div
            style={{
              marginTop: 18, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
              background: 'rgba(0,0,0,0.025)', border: '1px solid rgba(0,0,0,0.07)', borderRadius: 12, padding: '14px 16px',
            }}
          >
            <div>
              <div style={{ fontSize: 11.5, letterSpacing: '0.04em', textTransform: 'uppercase', color: MUTED }}>Profit / bottle</div>
              <div style={{ fontFamily: SERIF, fontSize: 26, color: INK, marginTop: 2, fontVariantNumeric: 'tabular-nums' }}>€{profit.toFixed(2)}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 11.5, letterSpacing: '0.04em', textTransform: 'uppercase', color: MUTED }}>Per year*</div>
              <div style={{ fontFamily: SERIF, fontSize: 26, color: INK, marginTop: 2, fontVariantNumeric: 'tabular-nums' }}>€{perYear.toLocaleString('en-US')}</div>
            </div>
          </div>
          <div style={{ fontSize: 11, color: MUTED, marginTop: 7 }}>* assuming {bottlesPerDay} bottles sold per day</div>

          {/* clickable volume tiers */}
          <div style={{ fontSize: 11.5, letterSpacing: '0.14em', textTransform: 'uppercase', color: MUTED, margin: '16px 0 9px' }}>
            Volume discount
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            {tiers.map((t, i) => {
              const on = i === sel;
              return (
                <button
                  key={i}
                  onClick={() => setSel(i)}
                  style={{
                    flex: 1, cursor: 'pointer', appearance: 'none', textAlign: 'center',
                    border: on ? '1.5px solid #18181b' : '1px solid rgba(0,0,0,0.10)',
                    background: on ? 'rgba(0,0,0,0.04)' : '#fff',
                    borderRadius: 9, padding: on ? '9.5px 6px' : '10px 6px', transition: 'all .15s ease',
                  }}
                >
                  <div style={{ fontSize: 15, fontWeight: 600, color: on ? INK : '#52525b', fontVariantNumeric: 'tabular-nums' }}>{t.disc}</div>
                  <div style={{ fontSize: 11, color: MUTED, marginTop: 3 }}>{t.qty}</div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
