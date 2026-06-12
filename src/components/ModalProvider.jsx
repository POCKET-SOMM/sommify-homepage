import { createContext, useContext, useState, useCallback, useMemo } from "react";
import { ContactModal } from "./ContactModal.jsx";
import { BookingModal } from "./BookingModal.jsx";
import { VideoModal } from "./VideoModal.jsx";

const ModalContext = createContext(null);

// Exposes openContact() / openBooking() to any CTA in the tree, and renders
// the two modals once at the root.
export function ModalProvider({ children }) {
  const [active, setActive] = useState(null); // "contact" | "booking" | "video" | null

  const openContact = useCallback(() => setActive("contact"), []);
  const openBooking = useCallback(() => setActive("booking"), []);
  const openVideo = useCallback(() => setActive("video"), []);
  const close = useCallback(() => setActive(null), []);

  const value = useMemo(
    () => ({ openContact, openBooking, openVideo, close }),
    [openContact, openBooking, openVideo, close]
  );

  return (
    <ModalContext.Provider value={value}>
      {children}
      <ContactModal open={active === "contact"} onClose={close} />
      <BookingModal open={active === "booking"} onClose={close} />
      <VideoModal open={active === "video"} onClose={close} />
    </ModalContext.Provider>
  );
}

export function useModals() {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error("useModals must be used within a ModalProvider");
  return ctx;
}
