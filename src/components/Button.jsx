import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

// Shared pill button.
// Props:
//   variant: "black" (solid) | "white" (outline)   — default "black"
//   size:    "sm" | "md" | "lg"                     — default "md"
//   block:   stretch to full width (vs inline)
//   arrow:   show a trailing → that nudges right on hover
//   disabled, type, onClick, …rest
const SIZES = {
  sm: { fontSize: 14.5, padding: "10px 20px", arrow: 15 },
  md: { fontSize: 15, padding: "13px 24px", arrow: 16 },
  lg: { fontSize: 16, padding: "15px 28px", arrow: 17 },
};

const shellVariants = {
  rest: { scale: 1 },
  hover: { scale: 1 },
  tap: { scale: 1 },
};

const arrowVariants = {
  rest: { x: 0 },
  hover: { x: 3 },
  tap: { x: 1 },
};

export function Button({
  children,
  variant = "black",
  size = "md",
  block = false,
  arrow = false,
  disabled = false,
  type = "button",
  onClick,
  style,
  ...rest
}) {
  const s = SIZES[size] || SIZES.md;
  const isWhite = variant === "white";

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      initial="rest"
      animate="rest"
      whileHover={disabled ? undefined : "hover"}
      whileTap={disabled ? undefined : "tap"}
      variants={shellVariants}
      transition={{ duration: 0.12, ease: "easeInOut" }}
      style={{
        fontFamily: "var(--sans)",
        fontSize: s.fontSize,
        fontWeight: isWhite ? 500 : 550,
        letterSpacing: "-0.01em",
        borderRadius: 999,
        padding: s.padding,
        cursor: disabled ? "not-allowed" : "pointer",
        whiteSpace: "nowrap",
        display: block ? "flex" : "inline-flex",
        width: block ? "100%" : "auto",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        border: isWhite ? "1px solid rgba(0,0,0,0.18)" : "1px solid transparent",
        background: isWhite ? "transparent" : "#0a0a0a",
        color: isWhite ? "#0a0a0a" : "#fff",
        opacity: disabled ? 0.45 : 1,
        ...style,
      }}
      {...rest}
    >
      {children}
      {arrow && (
        <motion.div
          variants={arrowVariants}
          transition={{ duration: 0.12, ease: "easeInOut" }}
          aria-hidden="true"
          style={{ display: "flex", alignItems: "center" }}
        >
          <ArrowRight size={s.arrow} strokeWidth={2} />
        </motion.div>
      )}
    </motion.button>
  );
}
