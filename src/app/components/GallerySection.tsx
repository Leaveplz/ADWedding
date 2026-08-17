import { motion } from "motion/react";
import { useScrollReveal } from "./useScrollReveal";

const assetUrl = (filename: string) => `${import.meta.env.BASE_URL}images/${filename}`;

const photos = [
  {
    src: assetUrl("story-flowers.jpg"),
    alt: "Аня и Дима у цветущего куста",
    span: "row-span-2",
  },
  {
    src: assetUrl("story-sochi-night.jpg"),
    alt: "Аня и Дима вечером у морского вокзала",
    span: "",
  },
  {
    src: assetUrl("story-boat.jpg"),
    alt: "Аня и Дима на прогулке по Неве",
    span: "",
  },
  {
    src: assetUrl("story-polaroids.jpg"),
    alt: "Полароидные фотографии Ани и Димы",
    span: "row-span-2",
  },
  {
    src: assetUrl("story-lake.png"),
    alt: "Аня и Дима у озера",
    span: "",
  },
  {
    src: assetUrl("story-winter.jpg"),
    alt: "Аня и Дима у новогодней елки",
    span: "",
  },
];

export function GallerySection({ onRsvp }: { onRsvp: () => void }) {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="gallery" className="relative py-28 overflow-hidden">
      <div className="absolute inset-0" style={{ background: "linear-gradient(160deg, #fdf5f0 0%, #f8f0fc 100%)" }} />

      <div ref={ref} className="relative z-10 max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p style={{ fontFamily: "'Great Vibes', cursive", fontSize: "1.8rem", color: "#b07fd4", marginBottom: 8 }}>
            Немного о нас
          </p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 5vw, 3.2rem)", fontWeight: 600, color: "#5c3d7a", lineHeight: 1.2 }}>
            Наша история в фотографиях
          </h2>
          <div className="flex items-center justify-center gap-3 mt-4">
            <div style={{ width: 40, height: 1, background: "linear-gradient(90deg, transparent, #c4a0e0)" }} />
            <svg width="10" height="10" viewBox="0 0 10 10"><circle cx="5" cy="5" r="4" fill="#c4a0e0" /></svg>
            <div style={{ width: 40, height: 1, background: "linear-gradient(90deg, #c4a0e0, transparent)" }} />
          </div>
        </motion.div>

        {/* Masonry-style grid */}
        <div
          className="grid gap-4"
          style={{
            gridTemplateColumns: "repeat(auto-fill, minmax(min(200px, 100%), 1fr))",
            gridAutoRows: "200px",
          }}
        >
          {photos.map((photo, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isVisible ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className={`${photo.span} rounded-2xl overflow-hidden group cursor-pointer`}
              style={{ boxShadow: "0 4px 20px rgba(155,114,207,0.1)" }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="relative w-full h-full">
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="w-full h-full object-cover"
                  style={{ transition: "transform 0.5s ease" }}
                />
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: "linear-gradient(to bottom, transparent 40%, rgba(92,61,122,0.4))" }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Final message */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.6 }}
          className="text-center mt-20"
        >
          <div
            className="relative inline-block rounded-3xl px-12 py-14 max-w-xl mx-auto"
            style={{
              background: "linear-gradient(135deg, #fff 0%, #f8f0fc 100%)",
              boxShadow: "0 12px 60px rgba(155,114,207,0.15)",
              border: "1px solid rgba(196,160,224,0.25)",
            }}
          >
            {/* Decorative sparkles */}
            {["-top-3 -left-3", "-top-3 -right-3", "-bottom-3 -left-3", "-bottom-3 -right-3"].map((pos, i) => (
              <motion.div
                key={i}
                className={`absolute ${pos}`}
                animate={{ rotate: [0, 360], scale: [1, 1.2, 1] }}
                transition={{ duration: 4 + i, repeat: Infinity }}
              >
                <svg width="20" height="20" viewBox="0 0 20 20">
                  <path d="M10 0L11.8 8.2L20 10L11.8 11.8L10 20L8.2 11.8L0 10L8.2 8.2Z" fill="#c4a0e0" />
                </svg>
              </motion.div>
            ))}

            <p
              style={{
                fontFamily: "'Great Vibes', cursive",
                fontSize: "2.8rem",
                color: "#b07fd4",
                lineHeight: 1.3,
                marginBottom: 16,
              }}
            >
              Мы очень ждем встречи с вами
            </p>
            <p
              style={{
                fontFamily: "'Lato', sans-serif",
                fontSize: "1rem",
                color: "#7a5c8a",
                lineHeight: 1.8,
                marginBottom: 28,
              }}
            >
              Ваше присутствие для нас бесценно. Присоединяйтесь к выходным, наполненным любовью, смехом, танцами и теплыми воспоминаниями.
            </p>
            <button
              onClick={onRsvp}
              style={{
                background: "linear-gradient(135deg, #9b72cf 0%, #b07fd4 100%)",
                color: "#fff",
                border: "none",
                borderRadius: "3rem",
                padding: "0.9rem 2.8rem",
                fontFamily: "'Lato', sans-serif",
                fontSize: "0.9rem",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                cursor: "pointer",
                boxShadow: "0 8px 30px rgba(155,114,207,0.35)",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={e => { (e.target as HTMLElement).style.transform = "translateY(-2px)"; (e.target as HTMLElement).style.boxShadow = "0 12px 40px rgba(155,114,207,0.5)"; }}
              onMouseLeave={e => { (e.target as HTMLElement).style.transform = "translateY(0)"; (e.target as HTMLElement).style.boxShadow = "0 8px 30px rgba(155,114,207,0.35)"; }}
            >
              Ответить сейчас
            </button>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <div className="relative z-10 text-center mt-20 pb-4">
        <div className="flex items-center justify-center gap-3 mb-5">
          <div style={{ width: 60, height: 1, background: "linear-gradient(90deg, transparent, rgba(196,160,224,0.5))" }} />
          <svg width="14" height="14" viewBox="0 0 14 14">
            <path d="M7 0L8.3 5.7L14 7L8.3 8.3L7 14L5.7 8.3L0 7L5.7 5.7Z" fill="rgba(196,160,224,0.7)" />
          </svg>
          <div style={{ width: 60, height: 1, background: "linear-gradient(90deg, rgba(196,160,224,0.5), transparent)" }} />
        </div>
        <p style={{ fontFamily: "'Great Vibes', cursive", fontSize: "1.6rem", color: "#c4a0e0" }}>
          Аня &amp; Дима · 05.03.2027
        </p>
        <p style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.8rem", color: "#b0a0c0", marginTop: 8, letterSpacing: "0.08em" }}>
          Сделано с любовью
        </p>
      </div>
    </section>
  );
}
