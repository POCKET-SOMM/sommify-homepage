import { useIsMobile } from "../hooks/useMediaQuery.js";
import { useModals } from "./ModalProvider.jsx";
import { Button } from "./Button.jsx";
import { ROADSHOW_URL } from "../config.js";

// Primary button + secondary "Talk to a founder →" (opens the booking modal).
// `primary` picks the primary action:
//   "contact" (default) → "Contact us", opens the contact modal
//   "tryout"            → "Try it out", links out to the roadshow (new tab)
// Centered + inline on desktop; full-width stacked on mobile.
export function CTAGroup({ align = "left", size = "md", primary = "contact" }) {
  const isMobile = useIsMobile();
  const { openContact, openBooking } = useModals();

  const primaryBtn = (block) =>
    primary === "tryout" ? (
      <Button
        variant="black"
        size={isMobile ? "lg" : size}
        block={block}
        arrow
        href={ROADSHOW_URL}
        rel="noopener noreferrer"
      >
        Try it out
      </Button>
    ) : (
      <Button variant="black" size={isMobile ? "lg" : size} block={block} onClick={openContact}>
        Contact us
      </Button>
    );

  if (isMobile) {
    return (
      <div
        style={{
          display: "flex", flexDirection: "column", gap: 11,
          width: "100%", maxWidth: 320, margin: "30px auto 0",
        }}
      >
        {primaryBtn(true)}
        <Button variant="white" size="lg" block onClick={openBooking}>
          Talk to a founder
        </Button>
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex", gap: 14, alignItems: "center",
        justifyContent: align === "center" ? "center" : "flex-start",
      }}
    >
      {primaryBtn(false)}
      <Button variant="white" size={size} onClick={openBooking}>
        Talk to a founder
      </Button>
    </div>
  );
}
