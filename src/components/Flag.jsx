import { CircleFlag } from "react-circle-flags";

// Circular country flags via the react-circle-flags library.
// `c` is an ISO 3166-1 alpha-2 code (e.g. "IT"); `s` is the diameter in px.
export function Flag({ c, s = 19 }) {
  return (
    <div
      style={{
        flex: "0 0 auto",
        alignSelf: "center",
        width: s,
        height: s,
        borderRadius: 999,
        overflow: "hidden",
        boxShadow:
          "inset 0 0 0 1px rgba(0,0,0,0.10), inset 0 1px 2px rgba(255,255,255,0.25), 0 1px 2px rgba(0,0,0,0.14)",
      }}
    >
      <CircleFlag
        countryCode={(c || "").toLowerCase()}
        height={s}
        width={s}
        style={{ display: "block", width: s, height: s }}
      />
    </div>
  );
}
