import { motion } from "motion/react";
import { useScrollReveal } from "./useScrollReveal";

const amenities = [
  {
    emoji: "🏰",
    title: "Замок 650 м²",
    desc: "Просторный дом-замок полностью в нашем распоряжении для праздника и отдыха с близкими.",
  },
  {
    emoji: "✨",
    title: "Терраса с подсветкой",
    desc: "Вечером территория и терраса будут выглядеть особенно уютно и празднично.",
  },
  {
    emoji: "🧖",
    title: "Сауна",
    desc: "После насыщенного дня можно будет расслабиться и спокойно выдохнуть.",
  },
  {
    emoji: "🏊",
    title: "Бассейн и зона отдыха",
    desc: "В доме есть прохладный бассейн с зоной отдыха - чтобы освежиться после сауны.",
  },
  {
    emoji: "🌲",
    title: "Большая территория",
    desc: "Вокруг замка - просторная зеленая территория с кремлевскими елями.",
  },
  {
    emoji: "🎮",
    title: "Развлечения",
    desc: "Будут настольный теннис, последний X-Box, настольный футбол, покер и другие настольные игры.",
  },
];

const castlePhotos = [
  {
    src: "/images/castle-exterior-garden.jpg",
    alt: "Замок и территория с елями",
    className: "sm:col-span-2",
  },
  {
    src: "/images/castle-exterior-terrace.jpg",
    alt: "Замок с террасой",
    className: "",
  },
  {
    src: "/images/castle-garden-pines.jpg",
    alt: "Зеленая территория замка",
    className: "",
  },
  {
    src: "/images/castle-pool-sauna.jpg",
    alt: "Бассейн и сауна в замке",
    className: "sm:col-span-2",
  },
];

export function EstateSection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="estate" className="relative py-28 overflow-hidden">
      <div className="absolute inset-0" style={{ background: "linear-gradient(160deg, #f8f0fc 0%, #fdf5f0 100%)" }} />
      <motion.div
        className="absolute top-0 right-0 rounded-full"
        style={{ width: 500, height: 500, background: "radial-gradient(circle, rgba(232,196,216,0.15) 0%, transparent 70%)" }}
        animate={{ scale: [1, 1.06, 1] }}
        transition={{ duration: 9, repeat: Infinity }}
      />

      <div ref={ref} className="relative z-10 max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p style={{ fontFamily: "'Great Vibes', cursive", fontSize: "1.8rem", color: "#b07fd4", marginBottom: 8 }}>
            Место нашего праздника
          </p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 5vw, 3.2rem)", fontWeight: 600, color: "#5c3d7a", lineHeight: 1.2 }}>
            Замок в Ленинградской области
          </h2>
          <div className="flex items-center justify-center gap-3 mt-4">
            <div style={{ width: 40, height: 1, background: "linear-gradient(90deg, transparent, #c4a0e0)" }} />
            <svg width="10" height="10" viewBox="0 0 10 10"><circle cx="5" cy="5" r="4" fill="#c4a0e0" /></svg>
            <div style={{ width: 40, height: 1, background: "linear-gradient(90deg, #c4a0e0, transparent)" }} />
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{
              fontFamily: "'Lato', sans-serif",
              fontSize: "1.05rem",
              color: "#7a5c8a",
              maxWidth: 560,
              margin: "20px auto 0",
              lineHeight: 1.8,
            }}
          >
            В нашем распоряжении будет просторный замок площадью 650 м² с террасой, вечерней подсветкой, сауной, бассейном и большой территорией с кремлевскими елями.
          </motion.p>
        </motion.div>

        {/* Hero image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={isVisible ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative rounded-3xl overflow-hidden mb-12"
          style={{ height: "min(360px, 50vw)", boxShadow: "0 20px 60px rgba(155,114,207,0.15)" }}
        >
          <img
            src="/images/castle-exterior-terrace.jpg"
            alt="Замок в Ленинградской области"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(92,61,122,0.4) 0%, transparent 50%, rgba(92,61,122,0.2) 100%)" }} />
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <div className="flex gap-3 flex-wrap">
              {["Замок 650 м²", "Терраса с подсветкой", "Сауна и бассейн"].map((tag) => (
                <span
                  key={tag}
                  style={{
                    background: "rgba(255,255,255,0.2)",
                    backdropFilter: "blur(8px)",
                    color: "#fff",
                    padding: "0.4rem 1rem",
                    borderRadius: "2rem",
                    fontFamily: "'Lato', sans-serif",
                    fontSize: "0.8rem",
                    letterSpacing: "0.1em",
                    border: "1px solid rgba(255,255,255,0.3)",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Castle photos grid */}
        <div className="grid sm:grid-cols-4 gap-4 mb-12">
          {castlePhotos.map((photo, i) => (
            <motion.div
              key={photo.src}
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.12 * i }}
              className={`relative rounded-2xl overflow-hidden ${photo.className}`}
              style={{
                height: i === 0 || i === 3 ? "min(280px, 48vw)" : "min(280px, 60vw)",
                boxShadow: "0 8px 34px rgba(92,61,122,0.12)",
              }}
            >
              <img src={photo.src} alt={photo.alt} className="w-full h-full object-cover" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent 55%, rgba(92,61,122,0.22))" }} />
            </motion.div>
          ))}
        </div>

        {/* Amenity cards grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {amenities.map((a, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 * i }}
              className="group rounded-2xl p-6 cursor-default"
              style={{
                background: "#fff",
                border: "1px solid rgba(196,160,224,0.2)",
                boxShadow: "0 4px 20px rgba(155,114,207,0.06)",
                transition: "all 0.35s ease",
              }}
              whileHover={{ y: -4, boxShadow: "0 12px 40px rgba(155,114,207,0.15)" }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                style={{
                  background: "linear-gradient(135deg, #f3eaf8, #fde8f3)",
                  fontSize: "1.6rem",
                  transition: "transform 0.3s ease",
                }}
              >
                {a.emoji}
              </div>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.1rem", fontWeight: 600, color: "#5c3d7a", marginBottom: 8 }}>
                {a.title}
              </h3>
              <p style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.9rem", color: "#8a6fa0", lineHeight: 1.7 }}>
                {a.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
