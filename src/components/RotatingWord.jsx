import { useState, useEffect } from "react";

export const ADJ = ["effortless", "faster", "smarter", "personalised", "profitable"];

// Cycles the middle word of the hero headline. Fades + slides out (~360ms),
// swaps, then fades back in, every 2.3s.
export function RotatingWord({ style = {} }) {
  const [i, setI] = useState(0);
  const [show, setShow] = useState(true);
  useEffect(() => {
    const t = setInterval(() => {
      setShow(false);
      setTimeout(() => {
        setI((p) => (p + 1) % ADJ.length);
        setShow(true);
      }, 360);
    }, 2300);
    return () => clearInterval(t);
  }, []);
  return (
    <span
      style={{
        display: "inline-block",
        transition: "opacity .36s ease, transform .36s ease",
        opacity: show ? 1 : 0,
        transform: show ? "translateY(0)" : "translateY(0.18em)",
        fontStyle: "italic",
        color: "var(--accent, #0a0a0a)",
        ...style,
      }}
    >
      {ADJ[i]}
    </span>
  );
}
