import { motion } from "motion/react";

const sparkles = [
  { id: 1, x: "8%", y: "15%", size: 6, delay: 0 },
  { id: 2, x: "92%", y: "20%", size: 4, delay: 0.5 },
  { id: 3, x: "15%", y: "70%", size: 8, delay: 1 },
  { id: 4, x: "85%", y: "65%", size: 5, delay: 1.5 },
  { id: 5, x: "50%", y: "10%", size: 3, delay: 0.8 },
  { id: 6, x: "25%", y: "40%", size: 7, delay: 0.3 },
  { id: 7, x: "75%", y: "45%", size: 4, delay: 1.2 },
  { id: 8, x: "60%", y: "80%", size: 6, delay: 0.6 },
];

const circles = [
  { id: 1, x: "-5%", y: "-5%", size: 300, opacity: 0.06 },
  { id: 2, x: "80%", y: "60%", size: 400, opacity: 0.05 },
  { id: 3, x: "40%", y: "30%", size: 200, opacity: 0.04 },
];

export function FloatingElements() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
      {circles.map((c) => (
        <motion.div
          key={c.id}
          className="absolute rounded-full"
          style={{
            left: c.x,
            top: c.y,
            width: c.size,
            height: c.size,
            background: `radial-gradient(circle, rgba(155,114,207,${c.opacity * 2}) 0%, rgba(232,196,216,${c.opacity}) 60%, transparent 100%)`,
          }}
          animate={{ scale: [1, 1.1, 1], opacity: [c.opacity * 10, c.opacity * 14, c.opacity * 10] }}
          transition={{ duration: 8 + c.id * 2, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
      {sparkles.map((s) => (
        <motion.div
          key={s.id}
          className="absolute"
          style={{ left: s.x, top: s.y }}
          animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.3, 0.8], rotate: [0, 180, 360] }}
          transition={{ duration: 3 + s.delay, repeat: Infinity, ease: "easeInOut", delay: s.delay }}
        >
          <svg width={s.size} height={s.size} viewBox="0 0 12 12" fill="none">
            <path d="M6 0L7 5L12 6L7 7L6 12L5 7L0 6L5 5Z" fill="#c4a0e0" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}

export function SectionDecor({ side = "left" }: { side?: "left" | "right" }) {
  return (
    <div className={`absolute top-0 ${side === "left" ? "left-0" : "right-0"} h-full w-24 pointer-events-none overflow-hidden`}>
      <motion.div
        className="absolute"
        style={{
          [side === "left" ? "left" : "right"]: "-20px",
          top: "20%",
          width: 80,
          height: 200,
          background: `radial-gradient(ellipse, rgba(155,114,207,0.12) 0%, transparent 70%)`,
        }}
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
