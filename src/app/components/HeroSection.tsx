import { motion } from "motion/react";
import { useScrollReveal } from "./useScrollReveal";

export function HeroSection({ onRsvp }: { onRsvp: () => void }) {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Layered gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(160deg, #fdf0f8 0%, #f3e8f8 30%, #ede0f5 60%, #f8eef5 100%)",
        }}
      />
      {/* Soft orbs */}
      <motion.div
        className="absolute rounded-full"
        style={{ width: 600, height: 600, top: "-10%", left: "-10%", background: "radial-gradient(circle, rgba(200,160,240,0.15) 0%, transparent 70%)" }}
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute rounded-full"
        style={{ width: 500, height: 500, bottom: "-5%", right: "-5%", background: "radial-gradient(circle, rgba(232,196,216,0.2) 0%, transparent 70%)" }}
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      <div ref={ref} className="relative z-10 text-center px-6 max-w-3xl mx-auto">
        {/* Script pre-title */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-4"
          style={{ fontFamily: "'Great Vibes', cursive", fontSize: "2.2rem", color: "#b07fd4", lineHeight: 1 }}
        >
          Приглашаем вас разделить с нами радость
        </motion.p>

        {/* Names */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.15 }}
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(3rem, 8vw, 6rem)",
            fontWeight: 600,
            color: "#5c3d7a",
            lineHeight: 1.1,
            letterSpacing: "-0.01em",
          }}
        >
          Аня &amp; Дима
        </motion.h1>

        {/* Divider ornament */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={isVisible ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex items-center justify-center gap-3 my-5"
        >
          <div style={{ width: 60, height: 1, background: "linear-gradient(90deg, transparent, #c4a0e0)" }} />
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M9 0L10.5 7.5L18 9L10.5 10.5L9 18L7.5 10.5L0 9L7.5 7.5Z" fill="#c4a0e0" />
          </svg>
          <div style={{ width: 60, height: 1, background: "linear-gradient(90deg, #c4a0e0, transparent)" }} />
        </motion.div>

        {/* Date */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(1.2rem, 3vw, 1.8rem)",
            color: "#8a6fa0",
            letterSpacing: "0.15em",
            fontStyle: "italic",
          }}
        >
          Пятница, 5 марта 2027
        </motion.p>

        {/* Photo frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isVisible ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, delay: 0.5 }}
          className="relative mx-auto my-10"
          style={{ width: "min(380px, 90vw)", height: "min(420px, 100vw)" }}
        >
          {/* Decorative frame border */}
          <div
            className="absolute inset-0 rounded-[2rem]"
            style={{
              background: "linear-gradient(135deg, rgba(196,160,224,0.4), rgba(232,196,216,0.3), rgba(196,160,224,0.4))",
              padding: 3,
            }}
          >
            <div className="w-full h-full rounded-[1.8rem]" style={{ background: "#fdf8f5" }} />
          </div>
          {/* Frame inset glow */}
          <div
            className="absolute inset-2 rounded-[1.7rem] overflow-hidden"
            style={{ boxShadow: "inset 0 0 30px rgba(155,114,207,0.1)" }}
          >
            <img
              src="/images/anya-dima-hero.jpg"
              alt="Фото пары"
              className="w-full h-full object-cover"
              style={{ borderRadius: "1.6rem" }}
            />
            {/* Soft overlay */}
            <div
              className="absolute inset-0 rounded-[1.6rem]"
              style={{ background: "linear-gradient(to bottom, transparent 50%, rgba(92,61,122,0.2))" }}
            />
          </div>
          {/* Corner ornaments */}
          {["top-1 left-1", "top-1 right-1", "bottom-1 left-1", "bottom-1 right-1"].map((pos, i) => (
            <svg
              key={i}
              className={`absolute ${pos}`}
              width="24"
              height="24"
              viewBox="0 0 24 24"
              style={{ transform: `rotate(${i * 90}deg)` }}
            >
              <path d="M2 2 Q2 12 12 12" stroke="#c4a0e0" strokeWidth="1.5" fill="none" />
              <circle cx="2" cy="2" r="2" fill="#c4a0e0" />
            </svg>
          ))}
        </motion.div>

        {/* Invitation text */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.65 }}
          style={{
            fontFamily: "'Lato', sans-serif",
            fontSize: "1.05rem",
            color: "#7a5c8a",
            lineHeight: 1.8,
            maxWidth: 480,
            margin: "0 auto",
          }}
        >
          Мы будем счастливы видеть вас рядом в день, когда скажем друг другу самые важные слова и начнем новую главу нашей истории. Нам очень хочется разделить этот праздник с вами.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-wrap gap-4 justify-center mt-8"
        >
          <button
            onClick={onRsvp}
            className="rsvp-btn"
            style={{
              background: "linear-gradient(135deg, #9b72cf 0%, #b07fd4 50%, #c48ed8 100%)",
              color: "#fff",
              border: "none",
              borderRadius: "3rem",
              padding: "0.85rem 2.5rem",
              fontFamily: "'Lato', sans-serif",
              fontSize: "0.9rem",
              letterSpacing: "0.12em",
              cursor: "pointer",
              boxShadow: "0 8px 30px rgba(155,114,207,0.35)",
              transition: "all 0.3s ease",
              textTransform: "uppercase" as const,
            }}
            onMouseEnter={e => {
              (e.target as HTMLElement).style.transform = "translateY(-2px)";
              (e.target as HTMLElement).style.boxShadow = "0 12px 40px rgba(155,114,207,0.5)";
            }}
            onMouseLeave={e => {
              (e.target as HTMLElement).style.transform = "translateY(0)";
              (e.target as HTMLElement).style.boxShadow = "0 8px 30px rgba(155,114,207,0.35)";
            }}
          >
            Подтвердить присутствие
          </button>
          <a
            href="#details"
            style={{
              background: "transparent",
              color: "#9b72cf",
              border: "1.5px solid rgba(155,114,207,0.5)",
              borderRadius: "3rem",
              padding: "0.85rem 2.5rem",
              fontFamily: "'Lato', sans-serif",
              fontSize: "0.9rem",
              letterSpacing: "0.12em",
              cursor: "pointer",
              textDecoration: "none",
              transition: "all 0.3s ease",
              textTransform: "uppercase" as const,
              display: "inline-block",
            }}
            onMouseEnter={e => {
              (e.target as HTMLElement).style.background = "rgba(155,114,207,0.08)";
              (e.target as HTMLElement).style.borderColor = "#9b72cf";
            }}
            onMouseLeave={e => {
              (e.target as HTMLElement).style.background = "transparent";
              (e.target as HTMLElement).style.borderColor = "rgba(155,114,207,0.5)";
            }}
          >
            Детали праздника
          </a>
        </motion.div>

      </div>
    </section>
  );
}
