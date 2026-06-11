export function Wordmark({ size = 27, color = "#0a0a0a" }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
      <span
        style={{
          fontFamily: "var(--sans)",
          fontWeight: 700,
          fontSize: size,
          letterSpacing: "-0.03em",
          color,
        }}
      >
        sommify
      </span>
    </div>
  );
}
