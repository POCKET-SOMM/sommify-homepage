import { Modal } from "./Modal.jsx";
import { BOOKING_URL } from "../config.js";

// "Talk to a founder" — embeds the real Google Calendar appointment scheduler.
export function BookingModal({ open, onClose }) {
  return (
    <Modal open={open} onClose={onClose} maxWidth={1100} label="Talk to a founder" bare>
      <div style={{ padding: "14px 14px 14px", display: "flex", flexDirection: "column", height: "82vh", minHeight: 480 }}>
        <div style={{ padding: "8px 8px 14px 12px" }}>
          <div
            style={{
              fontFamily: "var(--sans)", fontSize: 12.5, letterSpacing: "0.22em",
              textTransform: "uppercase", color: "var(--muted)", marginBottom: 6,
            }}
          >
            Let's talk wine
          </div>
          <h2
            style={{
              fontFamily: "var(--sans)", fontWeight: 600, margin: 0, fontSize: 30,
              lineHeight: 1.0, letterSpacing: "-0.01em", color: "#18181b",
            }}
          >
            Talk to a founder
          </h2>
        </div>
        <iframe
          title="Book a call with a sommify founder"
          src={BOOKING_URL}
          style={{
            flex: 1, width: "100%", border: "1px solid rgba(0,0,0,0.08)",
            borderRadius: 14, background: "#fff",
          }}
        />
      </div>
    </Modal>
  );
}
