import { useState, useEffect } from "react";

// Returns true while the given media query matches. Used to swap between the
// desktop and mobile layout treatments (the prototype shipped these as two
// separate files; here they're one responsive page).
export function useMediaQuery(query) {
  const [matches, setMatches] = useState(() =>
    typeof window !== "undefined" ? window.matchMedia(query).matches : false
  );
  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = () => setMatches(mql.matches);
    onChange();
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [query]);
  return matches;
}

// Breakpoint used throughout: below 768px we render the mobile treatments.
export const useIsMobile = () => useMediaQuery("(max-width: 768px)");
