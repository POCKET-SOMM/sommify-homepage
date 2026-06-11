import Marquee from "react-fast-marquee";
import { motion } from "framer-motion";

// Reused from the previous homepage: a react-fast-marquee strip where each logo
// sits greyed-out and brightens to full colour on hover, with gradient edges.
// `elements` are { src, alt, height, href? }.
export function LogoMarquee({
  elements = [],
  cellWidth = 200,
  cellHeight = 100,
  speed = 30,
  gradientColor = "white",
  gradientWidth = 64,
}) {
  return (
    <Marquee
      pauseOnHover={false}
      speed={speed}
      gradient
      gradientColor={gradientColor}
      gradientWidth={gradientWidth}
      autoFill
      style={{ height: cellHeight, overflowY: "hidden" }}
    >
      {elements.map((el, i) => {
        const img = (
          <img
            src={el.src}
            alt={el.alt}
            style={{
              height: el.height,
              width: "auto",
              marginBottom: el.marginBottom || 0,
              display: "block",
            }}
          />
        );
        return (
          <motion.div
            key={i}
            initial={false}
            animate={{ filter: "grayscale(1)", opacity: 0.4 }}
            whileHover={{ filter: "grayscale(0)", opacity: 1 }}
            transition={{ duration: 0.4 }}
            style={{
              width: cellWidth,
              height: cellHeight,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: el.href ? "pointer" : "default",
            }}
          >
            {el.href ? (
              <a
                href={el.href}
                target="_blank"
                rel="noopener noreferrer"
                title={el.alt}
                style={{ display: "flex" }}
              >
                {img}
              </a>
            ) : (
              img
            )}
          </motion.div>
        );
      })}
    </Marquee>
  );
}
