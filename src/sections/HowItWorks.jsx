import { Button } from "../components/Button.jsx";
import { useIsMobile } from "../hooks/useMediaQuery.js";

function Kicker({ children }) {
  return (
    <div
      style={{
        fontFamily: "var(--sans)", fontSize: 12.5, letterSpacing: "0.22em",
        textTransform: "uppercase", color: "var(--accent, var(--muted))", marginBottom: 20,
      }}
    >
      {children}
    </div>
  );
}

const DOMAIN_TAG = (
  <span
    style={{
      fontFamily: "var(--sans)", color: "#18181b", fontWeight: 550,
      background: "rgba(0,0,0,0.05)", borderRadius: 6, padding: "1px 7px", whiteSpace: "nowrap",
    }}
  >
    yourcompany.sommify.ai
  </span>
);

const STEPS = [
  {
    day: "Day 01",
    title: "Share your data",
    body: (
      <>
        Share your wine data however you've got it stored: spreadsheet, PDF, ERP export, JSON feed… we adapt to your format.
      </>
    ),
  },
  {
    day: "Day 02",
    title: "We build it out",
    body: <>We process your data and build out your experience, end to end.</>,
  },
  {
    day: "Day 03",
    title: "You go live",
    body: (
      <>
        You receive a domain — {DOMAIN_TAG} — or an iframe to plug straight into your digital
        environment.
      </>
    ),
  },
];

export function HowItWorks() {
  const isMobile = useIsMobile();

  return (
    <section style={{ background: "#fff", borderTop: "1px solid rgba(0,0,0,0.06)" }}>
      <div
        style={{
          maxWidth: 1180, margin: "0 auto",
          padding: isMobile ? "64px 22px 56px" : "110px 56px 100px",
        }}
      >
        <div style={{ maxWidth: 720 }}>
          <Kicker>How it works</Kicker>
          <h2
            style={{
              fontFamily: "var(--sans)", fontWeight: 550, margin: 0,
              fontSize: isMobile ? 31 : 50, lineHeight: 1.08, letterSpacing: "-0.02em", color: "#18181b",
            }}
          >
            Three steps &amp; three days to go live.
          </h2>
          <p
            style={{
              fontFamily: "var(--sans)", fontSize: isMobile ? 16 : 19, lineHeight: 1.6,
              color: "#52525b", margin: "16px 0 0", maxWidth: 560,
            }}
          >
            No long onboarding, no integration project. Give us your catalogue Monday, and by Thursday you'll wonder how you worked without it.
          </p>
        </div>

        {isMobile ? <MobileTimeline /> : <DesktopTimeline />}
      </div>
    </section>
  );
}

function DesktopTimeline() {
  return (
    <div style={{ position: "relative", marginTop: 72 }}>
      <div
        style={{
          position: "absolute", top: 6, left: "0", right: "20%", height: 1,
          background: "linear-gradient(90deg, var(--hair), var(--hair) 66%, rgba(0,0,0,0.18))",
        }}
      />
      <div
        style={{
          display: "grid", gridTemplateColumns: "repeat(3, 1fr) 0.92fr",
          gap: 40, alignItems: "start",
        }}
      >
        {STEPS.map((s, i) => (
          <div key={i} style={{ position: "relative" }}>
            <div
              style={{
                width: 13, height: 13, borderRadius: 999, background: "#fff",
                border: "1.5px solid #18181b", marginBottom: 26,
              }}
            />
            <div
              style={{
                fontFamily: "var(--sans)", fontSize: 12, letterSpacing: "0.18em",
                textTransform: "uppercase", color: "var(--muted)", marginBottom: 12,
              }}
            >
              {s.day}
            </div>
            <h3
              style={{
                fontFamily: "var(--sans)", fontWeight: 550, margin: 0,
                fontSize: 25, lineHeight: 1.15, letterSpacing: "-0.01em", color: "#18181b",
              }}
            >
              {s.title}
            </h3>
            <p
              style={{
                fontFamily: "var(--sans)", fontSize: 15.5, lineHeight: 1.6,
                color: "#52525b", margin: "14px 0 0",
              }}
            >
              {s.body}
            </p>
          </div>
        ))}

        <PayoffCard />
      </div>
    </div>
  );
}

function MobileTimeline() {
  return (
    <div style={{ position: "relative", marginTop: 40, paddingLeft: 30 }}>
      <div
        style={{
          position: "absolute", left: 6, top: 8, bottom: 70, width: 1.5,
          background: "linear-gradient(180deg, var(--hair), rgba(0,0,0,0.18))",
        }}
      />
      <div style={{ display: "flex", flexDirection: "column", gap: 34 }}>
        {STEPS.map((s, i) => (
          <div key={i} style={{ position: "relative" }}>
            <div
              style={{
                position: "absolute", left: -30, top: 4, width: 13, height: 13, borderRadius: 999,
                background: "#fff", border: "1.5px solid #18181b",
              }}
            />
            <div
              style={{
                fontFamily: "var(--sans)", fontSize: 11, letterSpacing: "0.16em",
                textTransform: "uppercase", color: "var(--muted)", marginBottom: 8,
              }}
            >
              {s.day}
            </div>
            <h3
              style={{
                fontFamily: "var(--sans)", fontWeight: 550, margin: 0,
                fontSize: 22, lineHeight: 1.15, color: "#18181b",
              }}
            >
              {s.title}
            </h3>
            <p
              style={{
                fontFamily: "var(--sans)", fontSize: 15, lineHeight: 1.6,
                color: "#52525b", margin: "10px 0 0",
              }}
            >
              {s.body}
            </p>
          </div>
        ))}

        <div style={{ position: "relative" }}>
          <div
            style={{
              position: "absolute", left: -31, top: 4, width: 15, height: 15, borderRadius: 999,
              background: "#18181b", border: "1.5px solid #18181b",
              boxShadow: "0 0 0 5px rgba(0,0,0,0.06)",
            }}
          />
          <div
            style={{
              background: "var(--ink-bg)", borderRadius: 16, padding: "20px 22px",
              boxShadow: "0 30px 60px -36px rgba(0,0,0,0.4)",
            }}
          >
            <div
              style={{
                fontFamily: "var(--sans)", fontSize: 11, letterSpacing: "0.16em",
                textTransform: "uppercase", color: "var(--ink-faint)", marginBottom: 10,
              }}
            >
              Day 04
            </div>
            <div
              style={{
                fontFamily: "var(--sans)", fontWeight: 550, fontSize: 22, lineHeight: 1.15,
                letterSpacing: "-0.01em", color: "var(--ink-fg)",
              }}
            >
              Easier wine sales.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PayoffCard() {
  return (
    <div style={{ position: "relative" }}>
      <div
        style={{
          width: 13, height: 13, borderRadius: 999, background: "#18181b",
          border: "1.5px solid #18181b", marginBottom: 26, boxShadow: "0 0 0 5px rgba(0,0,0,0.06)",
        }}
      />
      <div
        style={{
          background: "#0a0a0a", borderRadius: 18, padding: "24px 24px 26px",
          marginTop: -8,
          // boxShadow: "0 30px 60px -36px rgba(0,0,0,0.4)",
        }}
      >
        <div
          style={{
            fontFamily: "var(--sans)", fontSize: 12, letterSpacing: "0.18em",
            textTransform: "uppercase", color: "var(--ink-faint)", marginBottom: 12,
          }}
        >
          Day 04
        </div>
        <div
          style={{
            fontFamily: "var(--sans)", fontWeight: 550, fontSize: 25, lineHeight: 1.15,
            letterSpacing: "-0.01em", color: "#fff", marginBottom: 32,
          }}
        >
          Easier wine sales
        </div>
        <Button block variant="white">
          Talk to a founder
        </Button>
      </div>
    </div>
  );
}
