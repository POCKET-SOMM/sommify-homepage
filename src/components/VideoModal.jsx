import ReactPlayer from "react-player";
import { Modal } from "./Modal.jsx";
import { TUTORIAL_VIDEO_URL } from "../config.js";

// Tutorial video in a bare modal — a 16:9 react-player that autoplays on open.
// Modal returns null when closed, so the player unmounts and the video stops
// automatically; no pause logic needed.
export function VideoModal({ open, onClose }) {
  return (
    <Modal open={open} onClose={onClose} maxWidth={1400} label="Tutorial" bare>
      <div style={{ padding: 14 }}>
        <div
          style={{
            position: "relative", width: "100%", aspectRatio: "16 / 9",
            borderRadius: 14, overflow: "hidden", background: "#000",
          }}
        >
          <ReactPlayer
            src={TUTORIAL_VIDEO_URL}
            playing
            controls
            width="100%"
            height="100%"
            style={{ position: "absolute", inset: 0 }}
          />
        </div>
      </div>
    </Modal>
  );
}
