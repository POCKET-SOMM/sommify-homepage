import { useState, useEffect } from "react";

// Returns the id of the section currently in view. A section counts as active
// once its top crosses an offset line near the top of the viewport, so the nav
// highlight matches what the reader is actually looking at.
export function useScrollSpy(ids, offset = 120) {
  const [active, setActive] = useState(null);

  useEffect(() => {
    const els = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    if (!els.length) return;

    const compute = () => {
      const line = offset;
      let current = null;
      for (const el of els) {
        if (el.getBoundingClientRect().top - line <= 0) current = el.id;
      }
      // If we've scrolled to the very bottom, the last section is active.
      if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 2) {
        current = els[els.length - 1].id;
      }
      setActive(current);
    };

    compute();
    window.addEventListener("scroll", compute, { passive: true });
    window.addEventListener("resize", compute);
    return () => {
      window.removeEventListener("scroll", compute);
      window.removeEventListener("resize", compute);
    };
  }, [ids, offset]);

  return active;
}

// Smoothly scroll a section into view, accounting for the fixed nav.
export function scrollToSection(id, offset = 90) {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top, behavior: "smooth" });
}
