import { useIsMobile } from "../hooks/useMediaQuery.js";
import { useModals } from "./ModalProvider.jsx";
import { Button } from "./Button.jsx";

// Primary "Contact us" (opens the contact modal) + secondary "Talk to a founder →"
// (opens the booking modal). Centered + inline on desktop; full-width stacked on mobile.
export function CTAGroup({ align = "left", size = "md" }) {
  const isMobile = useIsMobile();
  const { openContact, openBooking } = useModals();

  if (isMobile) {
    return (
      <div
        style={{
          display: "flex", flexDirection: "column", gap: 11,
          width: "100%", maxWidth: 320, margin: "30px auto 0",
        }}
      >
        <Button variant="black" size="lg" block onClick={openContact}>
          Contact us
        </Button>
        <Button variant="white" size="lg" block arrow onClick={openBooking}>
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
      <Button variant="black" size={size} onClick={openContact}>
        Contact us
      </Button>
      <Button variant="white" size={size} arrow onClick={openBooking}>
        Talk to a founder
      </Button>
    </div>
  );
}
