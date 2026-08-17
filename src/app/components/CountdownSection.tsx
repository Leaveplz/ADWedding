import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { useScrollReveal } from "./useScrollReveal";

const WEDDING_DATE = new Date("2027-03-05T15:00:00");

function getTimeLeft() {
  const now = new Date();
  const diff = WEDDING_DATE.getTime() - now.getTime();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function Digit({ value, label }: { value: number; label: string }) {
  const [prev, setPrev] = useState(value);
  const [flip, setFlip] = useState(false);

  useEffect(() => {
    if (value !== prev) {
      setFlip(true);
      setTimeout(() => { setPrev(value); setFlip(false); }, 300);
    }
  }, [value, prev]);

  return (
    <div className="flex flex-col items-center">
      <div
        className="relative"
        style={{
          width: "clamp(72px, 16vw, 110px)",
          height: "clamp(80px, 18vw, 120px)",
          borderRadius: "1.2rem",
          background: "linear-gradient(160deg, #fff 0%, #f8f2fc 100%)",
          boxShadow: "0 8px 40px rgba(155,114,207,0.15), inset 0 1px 0 rgba(255,255,255,0.8)",
          border: "1px solid rgba(196,160,224,0.25)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        {/* Center fold line */}
        <div className="absolute inset-x-0" style={{ top: "50%", height: 1, background: "rgba(196,160,224,0.3)", transform: "translateY(-50%)" }} />
        <motion.span
          key={`${prev}-${flip}`}
          initial={flip ? { rotateX: -90, opacity: 0 } : { rotateX: 0, opacity: 1 }}
          animate={{ rotateX: 0, opacity: 1 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(2rem, 6vw, 3.5rem)",
            fontWeight: 600,
            color: "#5c3d7a",
            lineHeight: 1,
          }}
        >
          {String(flip ? prev : value).padStart(2, "0")}
        </motion.span>
      </div>
      <p
        style={{
          fontFamily: "'Lato', sans-serif",
          fontSize: "0.72rem",
          letterSpacing: "0.18em",
          color: "#9b72cf",
          marginTop: 10,
          textTransform: "uppercase",
          fontWeight: 700,
        }}
      >
        {label}
      </p>
    </div>
  );
}

export function CountdownSection() {
  const [time, setTime] = useState(getTimeLeft());
  const { ref, isVisible } = useScrollReveal();

  useEffect(() => {
    const interval = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="countdown" className="relative py-28 overflow-hidden">
      <div className="absolute inset-0" style={{ background: "linear-gradient(160deg, #f3e8f8 0%, #fde8f3 100%)" }} />
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 100%, rgba(155,114,207,0.12) 0%, transparent 60%)" }}
      />

      <div ref={ref} className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-14"
        >
          <p style={{ fontFamily: "'Great Vibes', cursive", fontSize: "1.8rem", color: "#b07fd4", marginBottom: 8 }}>
            Большой день уже близко
          </p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 5vw, 3.2rem)", fontWeight: 600, color: "#5c3d7a", lineHeight: 1.2 }}>
            Считаем дни
          </h2>
          <div className="flex items-center justify-center gap-3 mt-4">
            <div style={{ width: 40, height: 1, background: "linear-gradient(90deg, transparent, #c4a0e0)" }} />
            <svg width="10" height="10" viewBox="0 0 10 10"><circle cx="5" cy="5" r="4" fill="#c4a0e0" /></svg>
            <div style={{ width: 40, height: 1, background: "linear-gradient(90deg, #c4a0e0, transparent)" }} />
          </div>
          <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: "1.1rem", color: "#8a6fa0", marginTop: 14 }}>
            Пятница, 5 марта 2027 · Санкт-Петербург
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isVisible ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="flex items-end justify-center gap-4 flex-wrap"
        >
          <Digit value={time.days} label="Дней" />
          <span style={{ color: "#c4a0e0", fontSize: "clamp(2rem, 5vw, 3rem)", fontFamily: "'Playfair Display', serif", paddingBottom: "2rem" }}>:</span>
          <Digit value={time.hours} label="Часов" />
          <span style={{ color: "#c4a0e0", fontSize: "clamp(2rem, 5vw, 3rem)", fontFamily: "'Playfair Display', serif", paddingBottom: "2rem" }}>:</span>
          <Digit value={time.minutes} label="Минут" />
          <span style={{ color: "#c4a0e0", fontSize: "clamp(2rem, 5vw, 3rem)", fontFamily: "'Playfair Display', serif", paddingBottom: "2rem" }}>:</span>
          <Digit value={time.seconds} label="Секунд" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          style={{
            fontFamily: "'Lato', sans-serif",
            fontSize: "0.95rem",
            color: "#8a6fa0",
            marginTop: 24,
            letterSpacing: "0.05em",
          }}
        >
          до момента, когда Аня и Дима скажут <em style={{ color: "#9b72cf" }}>"да"</em>
        </motion.p>
      </div>
    </section>
  );
}
