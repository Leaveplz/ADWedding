import { motion } from "motion/react";
import { useScrollReveal } from "./useScrollReveal";

const notes = [
  {
    icon: "💜",
    title: "Строгого дресс-кода нет",
    body: "Нам хочется, чтобы вам было красиво и комфортно. Жестких правил нет - выбирайте то, в чем чувствуете себя празднично и уверенно.",
  },
  {
    icon: "✨",
    title: "Нарядно для церемонии",
    body: "На официальную церемонию в ЗАГСе будем рады видеть гостей в нарядных, элегантных образах. Нежный сиреневый, пудровый, кремовый и цветочные мотивы хорошо подходят к настроению свадьбы, но любой любимый цвет будет прекрасен.",
  },
  {
    icon: "🌿",
    title: "Праздник на выходные",
    body: "Мы будем вместе с вечера пятницы до воскресенья. Возьмите удобную одежду на пару дней, купальник для прохладного бассейна и сауны и что-то уютное для неспешного утра. А также рекомендуем взять личные полотенца.",
  },
  {
    icon: "🧴",
    title: "Возьмите необходимое",
    body: "Не забудьте косметичку, одежду для сна и нужные лекарства.",
  },
];

export function DressCodeSection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="dresscode" className="relative py-28 overflow-hidden">
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, #fdf5f0 0%, #f8f0fc 100%)" }} />

      <div ref={ref} className="relative z-10 max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p style={{ fontFamily: "'Great Vibes', cursive", fontSize: "1.8rem", color: "#b07fd4", marginBottom: 8 }}>
            Что надеть
          </p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 5vw, 3.2rem)", fontWeight: 600, color: "#5c3d7a", lineHeight: 1.2 }}>
            Дресс-код и вещи с собой
          </h2>
          <div className="flex items-center justify-center gap-3 mt-4">
            <div style={{ width: 40, height: 1, background: "linear-gradient(90deg, transparent, #c4a0e0)" }} />
            <svg width="10" height="10" viewBox="0 0 10 10"><circle cx="5" cy="5" r="4" fill="#c4a0e0" /></svg>
            <div style={{ width: 40, height: 1, background: "linear-gradient(90deg, #c4a0e0, transparent)" }} />
          </div>
        </motion.div>

        {/* Note cards */}
        <div className="grid sm:grid-cols-2 gap-6">
          {notes.map((n, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.12 }}
              className="rounded-3xl p-7"
              style={{
                background: "#fff",
                border: "1px solid rgba(196,160,224,0.25)",
                boxShadow: "0 4px 30px rgba(155,114,207,0.07)",
                position: "relative",
                overflow: "hidden",
              }}
              whileHover={{ y: -3, boxShadow: "0 12px 40px rgba(155,114,207,0.13)" }}
            >
              {/* Decorative corner */}
              <div
                className="absolute top-0 right-0 w-20 h-20"
                style={{ background: "radial-gradient(circle at top right, rgba(196,160,224,0.12), transparent 70%)" }}
              />
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                style={{ background: "linear-gradient(135deg, #f3eaf8, #fde8f3)", fontSize: "1.4rem" }}
              >
                {n.icon}
              </div>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.15rem", fontWeight: 600, color: "#5c3d7a", marginBottom: 10 }}>
                {n.title}
              </h3>
              <p style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.92rem", color: "#7a5c8a", lineHeight: 1.75 }}>
                {n.body}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Colour palette hint */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-10 rounded-3xl p-8 text-center"
          style={{ background: "linear-gradient(135deg, #f8f0fc, #fde8f3)", border: "1px solid rgba(196,160,224,0.2)" }}
        >
          <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: "1.1rem", color: "#5c3d7a", marginBottom: 16 }}>
            Палитра свадьбы для вдохновения:
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            {[
              { color: "#c8a2c8", name: "Сирень" },
              { color: "#ddb7e0", name: "Лаванда" },
              { color: "#f2c4d0", name: "Румянец" },
              { color: "#e8d5b7", name: "Шампань" },
              { color: "#f5f0eb", name: "Айвори" },
              { color: "#8a6fa0", name: "Лиловый" },
            ].map((sw) => (
              <div key={sw.name} className="flex flex-col items-center gap-1.5">
                <div
                  className="rounded-full"
                  style={{ width: 40, height: 40, background: sw.color, boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}
                />
                <span style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.72rem", color: "#8a6fa0", letterSpacing: "0.05em" }}>
                  {sw.name}
                </span>
              </div>
            ))}
          </div>
          <p style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.85rem", color: "#8a6fa0", marginTop: 16, fontStyle: "italic" }}>
            Смело выбирайте любой цвет, который вам нравится: это только подсказки, а не правила.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
