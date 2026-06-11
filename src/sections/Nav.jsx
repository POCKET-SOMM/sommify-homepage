import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Wordmark } from "../components/Wordmark.jsx";
import { IconX } from "../components/icons.jsx";
import { useIsMobile } from "../hooks/useMediaQuery.js";
import { useScrollSpy, scrollToSection } from "../hooks/useScrollSpy.js";
import { useModals } from "../components/ModalProvider.jsx";
import { Button } from "../components/Button.jsx";
import { SECTIONS } from "../config.js";

const SECTION_IDS = SECTIONS.map((s) => s.id);

// Snappy spring that drives the shape morph (width, radius, padding, …).
const SHAPE = { type: "spring", stiffness: 620, damping: 40, mass: 0.7 };

// The animated bar: full-width white slab (state 1) ⇄ centered blurred pill
// (state 2). Shadow is hidden for now.
const BAR_VARIANTS = {
  bar: {
    width: "100%",
    maxWidth: 6000,
    marginTop: 0,
    borderRadius: 0,
    paddingTop: 24,
    paddingBottom: 24,
    backgroundColor: "rgba(255,255,255,1)",
    borderColor: "rgba(0,0,0,0)",
    transition: { default: SHAPE },
  },
  pill: {
    width: "58%",
    maxWidth: 800,
    marginTop: 14,
    borderRadius: 999,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: "rgba(240,240,240,0.5)",
    borderColor: "rgba(0,0,0,0.06)",
    transition: { default: SHAPE },
  },
};

// The inner content: capped to the section content width in the bar state,
// released to fill the pill in the pill state.
const INNER_VARIANTS = {
  bar: { maxWidth: 1400, paddingLeft: 56, paddingRight: 56 },
  pill: { maxWidth: 800, paddingLeft: 24, paddingRight: 12 },
};

// ---- desktop: full-width bar that morphs into a centered blurred pill on scroll
function DesktopNav() {
  const [scrolled, setScrolled] = useState(false);
  const active = useScrollSpy(SECTION_IDS);
  const { openBooking } = useModals();

  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 20);
    f();
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);

  const links = SECTIONS.filter((s) => s.desktop);
  const state = scrolled ? "pill" : "bar";

  return (
    // Fixed, transparent, border-less positioning container.
    <div
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 60,
        display: "flex", justifyContent: "center", pointerEvents: "none",
      }}
    >
      <motion.nav
        initial={false}
        animate={state}
        variants={BAR_VARIANTS}
        style={{
          boxSizing: "border-box", pointerEvents: "auto",
          borderStyle: "solid", borderWidth: 1,
          backdropFilter: "blur(20px) saturate(1.5)",
          WebkitBackdropFilter: "blur(20px) saturate(1.5)",
        }}
      >
        <motion.div
          initial={false}
          animate={state}
          variants={INNER_VARIANTS}
          transition={SHAPE}
          style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            width: "100%", margin: "0 auto",
          }}
        >
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="sommify — back to top"
            style={{ background: "transparent", border: "none", padding: 0, cursor: "pointer" }}
          >
            <Wordmark />
          </button>
          <div style={{ display: "flex", alignItems: "center", gap: 30 }}>
            {links.map((l) => {
              const isActive = active === l.id;
              return (
                <button
                  key={l.id}
                  onClick={() => scrollToSection(l.id)}
                  style={{
                    fontFamily: "var(--sans)", fontSize: 15,
                    color: isActive ? "#0a0a0a" : "#3a3a3a",
                    fontWeight: isActive ? 600 : 450, letterSpacing: "-0.01em",
                    cursor: "pointer", whiteSpace: "nowrap", background: "transparent",
                    border: "none", padding: 0, transition: "color .2s ease, font-weight .2s ease",
                  }}
                >
                  {l.label}
                </button>
              );
            })}
            <Button variant="black" size="sm" arrow onClick={openBooking}>
              Talk to a founder
            </Button>
          </div>
        </motion.div>
      </motion.nav>
    </div>
  );
}

// ---- mobile: sticky blurred bar + full-screen overlay menu
function MobileNav() {
  const [open, setOpen] = useState(false);
  const { openBooking } = useModals();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const go = (id) => {
    setOpen(false);
    // wait for the overlay to begin closing / scroll lock to lift
    setTimeout(() => scrollToSection(id), 60);
  };

  return (
    <>
      <div
        style={{
          position: "sticky", top: 0, zIndex: 30,
          padding: "16px 16px 14px 22px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          background: "rgba(255,255,255,0.82)",
          backdropFilter: "blur(18px) saturate(1.4)", WebkitBackdropFilter: "blur(18px) saturate(1.4)",
          borderBottom: "1px solid rgba(0,0,0,0.06)",
        }}
      >
        <Wordmark size={21} />
        {/* <button
          aria-label="Menu"
          onClick={() => setOpen(true)}
          style={{
            width: 42, height: 42, borderRadius: 999, border: "1px solid rgba(0,0,0,0.10)",
            background: "#fff", display: "flex", flexDirection: "column", alignItems: "center",
            justifyContent: "center", gap: 4.5, cursor: "pointer",
          }}
        >
          <span style={{ width: 16, height: 1.6, background: "#18181b", borderRadius: 2 }} />
          <span style={{ width: 16, height: 1.6, background: "#18181b", borderRadius: 2 }} />
        </button> */}
      </div>

      <div
        className="menu-overlay"
        style={{
          position: "fixed", inset: 0, zIndex: 85, background: "#fff",
          transform: open ? "translateY(0)" : "translateY(-100%)",
          display: "flex", flexDirection: "column",
          pointerEvents: open ? "auto" : "none",
        }}
      >
        <div
          style={{
            padding: "16px 16px 14px 22px", display: "flex", alignItems: "center",
            justifyContent: "space-between", borderBottom: "1px solid rgba(0,0,0,0.06)",
          }}
        >
          <Wordmark size={21} />
          <button
            aria-label="Close"
            onClick={() => setOpen(false)}
            style={{
              width: 42, height: 42, borderRadius: 999, border: "1px solid rgba(0,0,0,0.10)",
              background: "#fff", display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <IconX size={19} color="#18181b" stroke={2} />
          </button>
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "14px 22px" }}>
          {SECTIONS.map((l, i) => (
            <button
              key={l.id}
              onClick={() => go(l.id)}
              style={{
                fontFamily: "var(--sans)", fontWeight: 500, fontSize: 34, color: "#18181b",
                textAlign: "left", background: "transparent", border: "none", cursor: "pointer",
                padding: "18px 0", letterSpacing: "-0.01em",
                borderBottom: i < SECTIONS.length - 1 ? "1px solid rgba(0,0,0,0.07)" : "none",
              }}
            >
              {l.label}
            </button>
          ))}
          <Button
            variant="black"
            size="lg"
            block
            arrow
            onClick={() => { setOpen(false); openBooking(); }}
            style={{ marginTop: "auto", marginBottom: 40 }}
          >
            Talk to a founder
          </Button>
        </div>
      </div>
    </>
  );
}

export function Nav() {
  const isMobile = useIsMobile();
  return isMobile ? <MobileNav /> : <DesktopNav />;
}
