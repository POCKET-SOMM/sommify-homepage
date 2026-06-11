import { useEffect } from "react";
import { IconX } from "./icons.jsx";

// Base modal shell — blurred backdrop + soft rounded card, matching the site's
// cool-zinc aesthetic. Closes on ESC / backdrop click. `bare` drops the inner
// padding (used by the full-bleed calendar iframe).
export function Modal({ open, onClose, children, maxWidth = 540, label, bare = false }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={label}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      style={{
        position: "fixed", inset: 0, zIndex: 200,
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: 20,
        background: "rgba(12,11,16,0.42)",
        backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)",
        animation: "modalFade .2s ease both",
      }}
    >
      <div
        style={{
          position: "relative", width: "100%", maxWidth,
          maxHeight: "calc(100vh - 40px)", overflowY: bare ? "hidden" : "auto",
          background: "#fff", borderRadius: 22, border: "1px solid rgba(0,0,0,0.08)",
          boxShadow: "0 60px 120px -40px rgba(0,0,0,0.5), 0 16px 40px -24px rgba(0,0,0,0.25)",
          animation: "modalIn .3s cubic-bezier(.2,.7,.2,1) both",
          display: "flex", flexDirection: "column",
        }}
      >
        <button
          aria-label="Close"
          onClick={onClose}
          style={{
            position: "absolute", top: 16, right: 16, zIndex: 2,
            width: 38, height: 38, borderRadius: 999,
            border: "1px solid rgba(0,0,0,0.10)", background: "rgba(255,255,255,0.9)",
            display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
          }}
        >
          <IconX size={18} color="#18181b" stroke={2} />
        </button>
        {children}
      </div>
    </div>
  );
}
