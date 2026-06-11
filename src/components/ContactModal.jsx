import { useState, useEffect } from "react";
import { Modal } from "./Modal.jsx";
import { Button } from "./Button.jsx";
import { IconCheck, IconX } from "./icons.jsx";
import { CONTACT_ENDPOINT, FOUNDER_EMAIL } from "../config.js";

const fieldStyle = {
  width: "100%", fontFamily: "var(--sans)", fontSize: 15, color: "#18181b",
  background: "#fff", border: "1px solid rgba(0,0,0,0.14)", borderRadius: 12,
  padding: "13px 15px", outline: "none", boxSizing: "border-box",
};

const labelStyle = {
  fontFamily: "var(--sans)", fontSize: 12.5, letterSpacing: "0.04em",
  textTransform: "uppercase", color: "#71717a", marginBottom: 8, display: "block",
};

export function ContactModal({ open, onClose }) {
  const [subject, setSubject] = useState("");
  const [contact, setContact] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("IDLE"); // IDLE | PENDING | SUCCESS | FAILED

  useEffect(() => {
    if (open) {
      setSubject("");
      setContact("");
      setMessage("");
      setStatus("IDLE");
    }
  }, [open]);

  const disabled = !subject || !contact || !message || status === "PENDING";

  const submit = (e) => {
    e.preventDefault();
    if (disabled) return;
    setStatus("PENDING");
    fetch(CONTACT_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ subject, contact, message }),
    })
      .then((res) => setStatus(res.ok ? "SUCCESS" : "FAILED"))
      .catch(() => setStatus("FAILED"));
  };

  return (
    <Modal open={open} onClose={onClose} maxWidth={540} label="Contact us">
      <div style={{ padding: "36px 36px 34px" }}>
        {status === "SUCCESS" ? (
          <Result
            icon={<IconCheck size={26} color="#1f8a5b" stroke={2.4} />}
            tint="#1f8a5b"
            title="Message sent"
            body="Thanks for reaching out — we'll get back to you shortly."
            onClose={onClose}
          />
        ) : status === "FAILED" ? (
          <Result
            icon={<IconX size={26} color="#b42318" stroke={2.4} />}
            tint="#b42318"
            title="Something went wrong"
            body={
              <>
                Please try again, or email us directly at{" "}
                <a href={`mailto:${FOUNDER_EMAIL}`} style={{ color: "#18181b" }}>{FOUNDER_EMAIL}</a>.
              </>
            }
            onClose={() => setStatus("IDLE")}
            ctaLabel="Try again"
          />
        ) : (
          <>
            <div
              style={{
                fontFamily: "var(--sans)", fontSize: 12.5, letterSpacing: "0.22em",
                textTransform: "uppercase", color: "var(--muted)", marginBottom: 14,
              }}
            >
              Contact us
            </div>
            <h2
              style={{
                fontFamily: "var(--sans)", fontWeight: 600, margin: 0, fontSize: 40,
                lineHeight: 1.0, letterSpacing: "-0.01em", color: "#18181b",
              }}
            >
              Open a dialogue
            </h2>
            <p
              style={{
                fontFamily: "var(--sans)", fontSize: 15, lineHeight: 1.55, color: "#52525b",
                margin: "14px 0 26px", maxWidth: 440,
              }}
            >
              Tell us what's on your mind, or email a founder at{" "}
              <a href={`mailto:${FOUNDER_EMAIL}`} style={{ color: "#18181b", fontWeight: 500 }}>
                {FOUNDER_EMAIL}
              </a>
              .
            </p>

            <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              <div>
                <label style={labelStyle} htmlFor="cm-subject">Subject</label>
                <input
                  id="cm-subject" style={fieldStyle} value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="What is this message about?"
                />
              </div>
              <div>
                <label style={labelStyle} htmlFor="cm-contact">Contact</label>
                <input
                  id="cm-contact" style={fieldStyle} value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  placeholder="How can we reach you? (email or phone)"
                />
              </div>
              <div>
                <label style={labelStyle} htmlFor="cm-message">Message</label>
                <textarea
                  id="cm-message" rows={4}
                  style={{ ...fieldStyle, resize: "vertical", minHeight: 96 }}
                  value={message} onChange={(e) => setMessage(e.target.value)}
                  placeholder="Your message…"
                />
              </div>
              <Button
                type="submit"
                variant="black"
                size="lg"
                block
                disabled={disabled}
                style={{ marginTop: 4 }}
              >
                {status === "PENDING" ? "Sending…" : "Send message"}
              </Button>
            </form>
          </>
        )}
      </div>
    </Modal>
  );
}

function Result({ icon, tint, title, body, onClose, ctaLabel = "Done" }) {
  return (
    <div style={{ textAlign: "center", padding: "16px 6px 8px" }}>
      <div
        style={{
          width: 64, height: 64, borderRadius: 999, margin: "0 auto 20px",
          display: "flex", alignItems: "center", justifyContent: "center",
          background: `${tint}14`, border: `1px solid ${tint}33`,
        }}
      >
        {icon}
      </div>
      <h2
        style={{
          fontFamily: "var(--sans)", fontWeight: 600, margin: 0, fontSize: 34,
          lineHeight: 1.05, color: "#18181b",
        }}
      >
        {title}
      </h2>
      <p
        style={{
          fontFamily: "var(--sans)", fontSize: 15, lineHeight: 1.55, color: "#52525b",
          margin: "12px auto 26px", maxWidth: 360,
        }}
      >
        {body}
      </p>
      <Button variant="black" size="md" onClick={onClose}>
        {ctaLabel}
      </Button>
    </div>
  );
}
