import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "Главная", href: "#hero" },
  { label: "Место", href: "#details" },
  { label: "Усадьба", href: "#estate" },
  { label: "Дресс-код", href: "#dresscode" },
  { label: "Ответ", href: "#rsvp" },
  { label: "Анкета", href: "#questionnaire" },
  { label: "Таймер", href: "#countdown" },
  { label: "Фото", href: "#gallery" },
];

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? "rgba(253,248,245,0.92)" : "transparent",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(196,160,224,0.2)" : "none",
          boxShadow: scrolled ? "0 2px 20px rgba(155,114,207,0.08)" : "none",
        }}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between" style={{ height: 64 }}>
          {/* Logo */}
          <button
            onClick={() => scrollTo("#hero")}
            style={{
              fontFamily: "'Great Vibes', cursive",
              fontSize: "1.5rem",
              color: "#9b72cf",
              background: "none",
              border: "none",
              cursor: "pointer",
              lineHeight: 1,
            }}
          >
            А &amp; Д
          </button>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.slice(1, 6).map((item) => (
              <button
                key={item.href}
                onClick={() => scrollTo(item.href)}
                style={{
                  background: "none",
                  border: "none",
                  fontFamily: "'Lato', sans-serif",
                  fontSize: "0.78rem",
                  letterSpacing: "0.1em",
                  color: "#7a5c8a",
                  cursor: "pointer",
                  padding: "0.4rem 0.75rem",
                  borderRadius: "2rem",
                  transition: "all 0.2s ease",
                  textTransform: "uppercase",
                }}
                onMouseEnter={e => { (e.target as HTMLElement).style.background = "rgba(155,114,207,0.08)"; (e.target as HTMLElement).style.color = "#5c3d7a"; }}
                onMouseLeave={e => { (e.target as HTMLElement).style.background = "none"; (e.target as HTMLElement).style.color = "#7a5c8a"; }}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => scrollTo("#rsvp")}
              style={{
                background: "linear-gradient(135deg, #9b72cf, #b07fd4)",
                color: "#fff",
                border: "none",
                borderRadius: "2rem",
                padding: "0.45rem 1.2rem",
                fontFamily: "'Lato', sans-serif",
                fontSize: "0.78rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                cursor: "pointer",
                marginLeft: 8,
                boxShadow: "0 4px 14px rgba(155,114,207,0.3)",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={e => { (e.target as HTMLElement).style.boxShadow = "0 6px 20px rgba(155,114,207,0.5)"; }}
              onMouseLeave={e => { (e.target as HTMLElement).style.boxShadow = "0 4px 14px rgba(155,114,207,0.3)"; }}
            >
              Ответить
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{ background: "none", border: "none", cursor: "pointer", color: "#9b72cf", padding: 4 }}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed top-16 left-0 right-0 z-40"
            style={{
              background: "rgba(253,248,245,0.97)",
              backdropFilter: "blur(20px)",
              borderBottom: "1px solid rgba(196,160,224,0.2)",
              boxShadow: "0 8px 30px rgba(155,114,207,0.12)",
            }}
          >
            <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col gap-1">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => scrollTo(item.href)}
                  style={{
                    background: "none",
                    border: "none",
                    fontFamily: "'Lato', sans-serif",
                    fontSize: "0.9rem",
                    letterSpacing: "0.08em",
                    color: "#7a5c8a",
                    cursor: "pointer",
                    padding: "0.75rem 1rem",
                    borderRadius: "1rem",
                    textAlign: "left",
                    textTransform: "uppercase",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={e => { (e.target as HTMLElement).style.background = "rgba(155,114,207,0.08)"; (e.target as HTMLElement).style.color = "#5c3d7a"; }}
                  onMouseLeave={e => { (e.target as HTMLElement).style.background = "none"; (e.target as HTMLElement).style.color = "#7a5c8a"; }}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
