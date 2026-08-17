import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MapPin, Clock, Car, Building2 } from "lucide-react";
import { useScrollReveal } from "./useScrollReveal";

const schedule = [
  { time: "15:00", label: "Церемония во дворце бракосочетания" },
  { time: "16:30", label: "Общий выезд в замок" },
  { time: "18:00", label: "Приветственные напитки в замке" },
  { time: "18:00", label: "Свадебный ужин и праздник" },
  { time: "23:00", label: "Танцы и вечерняя программа" },
];

const yandexMapUrl = "https://yandex.ru/maps/-/CTg6MRYm";
const registryMapUrl = "https://yandex.ru/maps/-/CTg6uAz5";
const yandexMapEmbedUrl = `https://yandex.ru/map-widget/v1/?text=${encodeURIComponent("Ленинградская область, Ломоносовский район, Пениковское сельское поселение, садовое товарищество Лада, 427")}&z=14`;
const assetUrl = (filename: string) => `${import.meta.env.BASE_URL}images/${filename}`;

export function VenueSection() {
  const [activeTab, setActiveTab] = useState<"registry" | "direct">("registry");
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="details" className="relative py-28 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(180deg, #fdf8f5 0%, #f8f0fc 50%, #fdf5f0 100%)" }}
      />

      <div ref={ref} className="relative z-10 max-w-5xl mx-auto px-6">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p style={{ fontFamily: "'Great Vibes', cursive", fontSize: "1.8rem", color: "#b07fd4", marginBottom: 8 }}>
            Где и когда
          </p>
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2rem, 5vw, 3.2rem)",
              fontWeight: 600,
              color: "#5c3d7a",
              lineHeight: 1.2,
            }}
          >
            Праздник
          </h2>
          <div className="flex items-center justify-center gap-3 mt-4">
            <div style={{ width: 40, height: 1, background: "linear-gradient(90deg, transparent, #c4a0e0)" }} />
            <svg width="10" height="10" viewBox="0 0 10 10"><circle cx="5" cy="5" r="4" fill="#c4a0e0" /></svg>
            <div style={{ width: 40, height: 1, background: "linear-gradient(90deg, #c4a0e0, transparent)" }} />
          </div>
        </motion.div>

        {/* Two venue cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {[
            {
              icon: <Building2 size={22} />,
              title: "Дворец бракосочетания №2",
              subtitle: "Официальная церемония",
              address: "Санкт-Петербург",
              street: "Фурштатская улица, 52",
              city: "Дворец бракосочетания №2",
              time: "15:00",
              img: assetUrl("wedding-palace-2.png"),
              mapUrl: registryMapUrl,
            },
            {
              icon: <MapPin size={22} />,
              title: "Замок",
              subtitle: "Ужин и праздник",
              address: "Ленинградская область",
              street: "Ломоносовский район, Пениковское с/пос",
              city: "садовое товарищество Лада, 427",
              time: "18:00",
              img: assetUrl("castle-exterior-garden.jpg"),
              mapUrl: yandexMapUrl,
            },
          ].map((venue, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: i * 0.15 }}
              className="rounded-3xl overflow-hidden"
              style={{
                background: "#fff",
                boxShadow: "0 4px 40px rgba(155,114,207,0.1)",
                border: "1px solid rgba(196,160,224,0.2)",
              }}
            >
              <div className="relative h-44 overflow-hidden">
                <img src={venue.img} alt={venue.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent 40%, rgba(92,61,122,0.5))" }} />
                <div className="absolute bottom-4 left-4 text-white">
                  <p style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.75rem", letterSpacing: "0.15em", opacity: 0.85 }}>
                    {venue.subtitle.toUpperCase()}
                  </p>
                  <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.4rem", fontWeight: 600 }}>
                    {venue.title}
                  </h3>
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-start gap-3 mb-3">
                  <div style={{ color: "#9b72cf", marginTop: 2 }}>{venue.icon}</div>
                  <div>
                    <p style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.95rem", color: "#3d2c3e", fontWeight: 700 }}>
                      {venue.address}
                    </p>
                    <p style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.85rem", color: "#8a6fa0" }}>{venue.street}</p>
                    <p style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.85rem", color: "#8a6fa0" }}>{venue.city}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <Clock size={15} style={{ color: "#9b72cf" }} />
                  <span style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.85rem", color: "#8a6fa0" }}>
                    Сбор гостей в {venue.time}
                  </span>
                </div>
                <div className="flex gap-2 flex-wrap">
                  <a
                    href={venue.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      background: "linear-gradient(135deg, #9b72cf, #b07fd4)",
                      color: "#fff",
                      border: "none",
                      borderRadius: "2rem",
                      padding: "0.5rem 1.2rem",
                      fontFamily: "'Lato', sans-serif",
                      fontSize: "0.8rem",
                      letterSpacing: "0.08em",
                      textDecoration: "none",
                      transition: "all 0.3s ease",
                      display: "inline-block",
                      boxShadow: "0 4px 14px rgba(155,114,207,0.3)",
                    }}
                  >
                    Открыть карту
                  </a>
                  <a
                    href={venue.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      background: "transparent",
                      color: "#9b72cf",
                      border: "1px solid rgba(155,114,207,0.4)",
                      borderRadius: "2rem",
                      padding: "0.5rem 1.2rem",
                      fontFamily: "'Lato', sans-serif",
                      fontSize: "0.8rem",
                      letterSpacing: "0.08em",
                      textDecoration: "none",
                      transition: "all 0.3s ease",
                      display: "inline-block",
                    }}
                  >
                    Построить маршрут
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Arrival options tabs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="rounded-3xl overflow-hidden mb-12"
          style={{ background: "#fff", boxShadow: "0 4px 40px rgba(155,114,207,0.1)", border: "1px solid rgba(196,160,224,0.2)" }}
        >
          <div className="p-6 pb-0">
            <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.3rem", fontWeight: 600, color: "#5c3d7a", marginBottom: 16 }}>
              Как вы присоединитесь к нам?
            </p>
            <div className="flex gap-1 p-1 rounded-2xl" style={{ background: "#f3eaf8", width: "fit-content" }}>
              {[
                { id: "registry" as const, label: "От ЗАГСа" },
                { id: "direct" as const, label: "Сразу в замок" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    padding: "0.6rem 1.2rem",
                    borderRadius: "1.5rem",
                    border: "none",
                    fontFamily: "'Lato', sans-serif",
                    fontSize: "0.85rem",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    background: activeTab === tab.id ? "linear-gradient(135deg, #9b72cf, #b07fd4)" : "transparent",
                    color: activeTab === tab.id ? "#fff" : "#8a6fa0",
                    boxShadow: activeTab === tab.id ? "0 4px 14px rgba(155,114,207,0.3)" : "none",
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.3 }}
              className="p-6"
            >
              {activeTab === "registry" ? (
                <div className="flex items-start gap-3">
                  <Building2 size={20} style={{ color: "#9b72cf", marginTop: 2, flexShrink: 0 }} />
                  <div>
                    <p style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.95rem", color: "#3d2c3e", lineHeight: 1.7 }}>
                      Присоединяйтесь к нам во <strong>Дворце бракосочетания №2 в 15:00</strong> на официальной церемонии, а затем вместе с молодоженами отправимся украшенной колонной в замок. Эта дорога тоже часть праздника: музыка, радость и настроение с первых минут.
                    </p>
                    <p style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.85rem", color: "#8a6fa0", marginTop: 8 }}>
                      Трансфер от дворца бракосочетания будет организован
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex items-start gap-3">
                  <Car size={20} style={{ color: "#9b72cf", marginTop: 2, flexShrink: 0 }} />
                  <div>
                    <p style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.95rem", color: "#3d2c3e", lineHeight: 1.7 }}>
                      Если вам удобнее приехать позже, будем рады видеть вас сразу в <strong>замке с 18:00</strong>. Вас будут ждать приветственные напитки, а праздник уже будет набирать обороты.
                    </p>
                    <p style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.85rem", color: "#8a6fa0", marginTop: 8 }}>
                      Ленинградская область, Ломоносовский район, садовое товарищество Лада, 427
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Map */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="rounded-3xl overflow-hidden mb-12"
          style={{ background: "#fff", boxShadow: "0 4px 40px rgba(155,114,207,0.1)", border: "1px solid rgba(196,160,224,0.2)" }}
        >
          <div className="grid md:grid-cols-[0.9fr_1.4fr]">
            <div className="p-6 flex flex-col justify-center">
              <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.3rem", fontWeight: 600, color: "#5c3d7a", marginBottom: 10 }}>
                Как найти замок
              </p>
              <p style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.92rem", color: "#7a5c8a", lineHeight: 1.75, marginBottom: 18 }}>
                Ленинградская область, Ломоносовский район, Пениковское сельское поселение, садовое товарищество Лада, 427.
              </p>
              <a
                href={yandexMapUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: "linear-gradient(135deg, #9b72cf, #b07fd4)",
                  color: "#fff",
                  borderRadius: "2rem",
                  padding: "0.7rem 1.4rem",
                  fontFamily: "'Lato', sans-serif",
                  fontSize: "0.82rem",
                  letterSpacing: "0.08em",
                  textDecoration: "none",
                  textTransform: "uppercase",
                  width: "fit-content",
                  boxShadow: "0 4px 14px rgba(155,114,207,0.3)",
                }}
              >
                Открыть в Яндекс.Картах
              </a>
            </div>
            <iframe
              src={yandexMapEmbedUrl}
              title="Карта проезда к замку"
              className="w-full"
              style={{ height: 320, border: 0 }}
              loading="lazy"
              allowFullScreen
            />
          </div>
        </motion.div>

        {/* Schedule timeline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="rounded-3xl p-8"
          style={{ background: "linear-gradient(135deg, #f8f0fc, #fdf0f8)", border: "1px solid rgba(196,160,224,0.2)" }}
        >
          <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.4rem", fontWeight: 600, color: "#5c3d7a", marginBottom: 24, textAlign: "center" }}>
            Расписание дня
          </h3>
          <div className="relative">
            <div className="absolute left-[4.5rem] top-0 bottom-0 w-px" style={{ background: "linear-gradient(to bottom, transparent, rgba(196,160,224,0.5), transparent)" }} />
            {schedule.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={isVisible ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.5 + i * 0.08 }}
                className="flex items-center gap-5 mb-5 last:mb-0"
              >
                <span
                  style={{
                    fontFamily: "'Lato', sans-serif",
                    fontSize: "0.85rem",
                    fontWeight: 700,
                    color: "#9b72cf",
                    width: "3.5rem",
                    textAlign: "right",
                    flexShrink: 0,
                  }}
                >
                  {item.time}
                </span>
                <div className="w-2.5 h-2.5 rounded-full flex-shrink-0 z-10" style={{ background: "#c4a0e0", boxShadow: "0 0 0 3px rgba(196,160,224,0.3)" }} />
                <p style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.95rem", color: "#5c3d7a" }}>{item.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
