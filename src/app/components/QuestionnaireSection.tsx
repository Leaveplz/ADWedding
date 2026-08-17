import { useState } from "react";
import { motion } from "motion/react";
import { useScrollReveal } from "./useScrollReveal";
import { Check } from "lucide-react";

const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwMSMELRraMETQ3RyeKfI_r68fJbi7oZcI9SswUE4B54wT1VtcwF_UDkqI6iL6RNXvAsw/exec";
const foodOptions = ["Мясные блюда", "Рыба и морепродукты", "Вегетарианское", "Веганское", "Ем все"];
const drinkOptions = ["Красное вино", "Белое вино", "Шампанское / просекко", "Пиво", "Коктейли", "Только безалкогольное"];

export function QuestionnaireSection() {
  const { ref, isVisible } = useScrollReveal();
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [name, setName] = useState("");
  const [food, setFood] = useState<string[]>([]);
  const [drinks, setDrinks] = useState<string[]>([]);
  const [allergies, setAllergies] = useState("");
  const [transfer, setTransfer] = useState<"yes" | "no" | "">("");
  const [notes, setNotes] = useState("");

  const toggle = (arr: string[], setArr: (v: string[]) => void, val: string) => {
    setArr(arr.includes(val) ? arr.filter(x => x !== val) : [...arr, val]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError("");

    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify({
          formType: "questionnaire",
          name,
          food,
          drinks,
          allergies,
          transfer,
          notes,
        }),
      });
      setSubmitted(true);
    } catch (error) {
      console.error("Questionnaire submit failed:", error);
      setSubmitError("Не получилось отправить анкету. Попробуйте еще раз чуть позже.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="questionnaire" className="relative py-28 overflow-hidden">
      <div className="absolute inset-0" style={{ background: "linear-gradient(160deg, #fdf0f8 0%, #f3e8f8 100%)" }} />

      <div ref={ref} className="relative z-10 max-w-2xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <p style={{ fontFamily: "'Great Vibes', cursive", fontSize: "1.8rem", color: "#b07fd4", marginBottom: 8 }}>
            Помогите нам подготовиться
          </p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 600, color: "#5c3d7a", lineHeight: 1.2 }}>
            Все важные детали
          </h2>
          <div className="flex items-center justify-center gap-3 mt-4">
            <div style={{ width: 40, height: 1, background: "linear-gradient(90deg, transparent, #c4a0e0)" }} />
            <svg width="10" height="10" viewBox="0 0 10 10"><circle cx="5" cy="5" r="4" fill="#c4a0e0" /></svg>
            <div style={{ width: 40, height: 1, background: "linear-gradient(90deg, #c4a0e0, transparent)" }} />
          </div>
          <p style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.95rem", color: "#8a6fa0", marginTop: 12, lineHeight: 1.7 }}>
            Нам хочется, чтобы на этих выходных вам было хорошо и удобно. Несколько быстрых вопросов очень помогут нам все подготовить.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="rounded-3xl p-8"
          style={{ background: "#fff", boxShadow: "0 8px 60px rgba(155,114,207,0.12)", border: "1px solid rgba(196,160,224,0.2)" }}
        >
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-10"
            >
              <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: "linear-gradient(135deg, #9b72cf, #b07fd4)" }}>
                <Check size={36} color="#fff" />
              </div>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.5rem", fontWeight: 600, color: "#5c3d7a", marginBottom: 10 }}>
                Отлично, спасибо!
              </h3>
              <p style={{ fontFamily: "'Lato', sans-serif", color: "#8a6fa0", lineHeight: 1.7 }}>
                Ваши пожелания сохранены. Мы постараемся учесть все важные детали.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-7">
              {/* Name */}
              <div>
                <label
                  htmlFor="questionnaire-name"
                  style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.85rem", fontWeight: 700, color: "#5c3d7a", letterSpacing: "0.08em", display: "block", marginBottom: 8 }}
                >
                  ВАШЕ ИМЯ
                </label>
                <input
                  id="questionnaire-name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  required
                  placeholder="Имя и фамилия"
                  className="w-full rounded-2xl px-5 py-3.5 outline-none transition-all"
                  style={{
                    background: "#f8f2fc",
                    border: "1.5px solid rgba(196,160,224,0.3)",
                    fontFamily: "'Lato', sans-serif",
                    fontSize: "0.95rem",
                    color: "#3d2c3e",
                  }}
                  onFocus={e => { e.target.style.borderColor = "#9b72cf"; e.target.style.boxShadow = "0 0 0 3px rgba(155,114,207,0.12)"; }}
                  onBlur={e => { e.target.style.borderColor = "rgba(196,160,224,0.3)"; e.target.style.boxShadow = "none"; }}
                />
              </div>

              {/* Food */}
              <div>
                <p style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.85rem", fontWeight: 700, color: "#5c3d7a", letterSpacing: "0.08em", marginBottom: 12 }}>
                  ПРЕДПОЧТЕНИЯ В ЕДЕ
                </p>
                <div className="flex flex-wrap gap-2.5">
                  {foodOptions.map(opt => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => toggle(food, setFood, opt)}
                      style={{
                        padding: "0.5rem 1.1rem",
                        borderRadius: "2rem",
                        border: food.includes(opt) ? "1.5px solid #9b72cf" : "1.5px solid rgba(196,160,224,0.3)",
                        background: food.includes(opt) ? "linear-gradient(135deg, rgba(155,114,207,0.15), rgba(176,127,212,0.1))" : "#f8f2fc",
                        fontFamily: "'Lato', sans-serif",
                        fontSize: "0.85rem",
                        color: food.includes(opt) ? "#5c3d7a" : "#8a6fa0",
                        cursor: "pointer",
                        transition: "all 0.25s ease",
                        fontWeight: food.includes(opt) ? 700 : 400,
                      }}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Drinks */}
              <div>
                <p style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.85rem", fontWeight: 700, color: "#5c3d7a", letterSpacing: "0.08em", marginBottom: 12 }}>
                  ПРЕДПОЧТЕНИЯ ПО НАПИТКАМ
                </p>
                <div className="flex flex-wrap gap-2.5">
                  {drinkOptions.map(opt => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => toggle(drinks, setDrinks, opt)}
                      style={{
                        padding: "0.5rem 1.1rem",
                        borderRadius: "2rem",
                        border: drinks.includes(opt) ? "1.5px solid #9b72cf" : "1.5px solid rgba(196,160,224,0.3)",
                        background: drinks.includes(opt) ? "linear-gradient(135deg, rgba(155,114,207,0.15), rgba(176,127,212,0.1))" : "#f8f2fc",
                        fontFamily: "'Lato', sans-serif",
                        fontSize: "0.85rem",
                        color: drinks.includes(opt) ? "#5c3d7a" : "#8a6fa0",
                        cursor: "pointer",
                        transition: "all 0.25s ease",
                        fontWeight: drinks.includes(opt) ? 700 : 400,
                      }}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Allergies */}
              <div>
                <label
                  htmlFor="allergies"
                  style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.85rem", fontWeight: 700, color: "#5c3d7a", letterSpacing: "0.08em", display: "block", marginBottom: 8 }}
                >
                  АЛЛЕРГИИ ИЛИ ОГРАНИЧЕНИЯ В ПИТАНИИ
                </label>
                <input
                  id="allergies"
                  value={allergies}
                  onChange={e => setAllergies(e.target.value)}
                  placeholder="Например: аллергия на орехи, без глютена, халяль..."
                  className="w-full rounded-2xl px-5 py-3.5 outline-none transition-all"
                  style={{
                    background: "#f8f2fc",
                    border: "1.5px solid rgba(196,160,224,0.3)",
                    fontFamily: "'Lato', sans-serif",
                    fontSize: "0.95rem",
                    color: "#3d2c3e",
                  }}
                  onFocus={e => { e.target.style.borderColor = "#9b72cf"; e.target.style.boxShadow = "0 0 0 3px rgba(155,114,207,0.12)"; }}
                  onBlur={e => { e.target.style.borderColor = "rgba(196,160,224,0.3)"; e.target.style.boxShadow = "none"; }}
                />
              </div>

              {/* Transfer */}
              <div>
                <p style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.85rem", fontWeight: 700, color: "#5c3d7a", letterSpacing: "0.08em", marginBottom: 10 }}>
                  НУЖЕН ЛИ ВАМ ТРАНСФЕР ОТ ЗАГСА?
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { value: "yes" as const, label: "Да, пожалуйста" },
                    { value: "no" as const, label: "Доберусь самостоятельно" },
                  ].map(opt => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setTransfer(opt.value)}
                      style={{
                        padding: "0.9rem",
                        borderRadius: "1.5rem",
                        border: transfer === opt.value ? "1.5px solid #9b72cf" : "1.5px solid rgba(196,160,224,0.3)",
                        background: transfer === opt.value ? "linear-gradient(135deg, rgba(155,114,207,0.12), rgba(176,127,212,0.08))" : "#f8f2fc",
                        fontFamily: "'Lato', sans-serif",
                        fontSize: "0.85rem",
                        color: transfer === opt.value ? "#5c3d7a" : "#8a6fa0",
                        cursor: "pointer",
                        transition: "all 0.3s ease",
                        fontWeight: transfer === opt.value ? 700 : 400,
                      }}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Notes */}
              <div>
                <label
                  htmlFor="notes"
                  style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.85rem", fontWeight: 700, color: "#5c3d7a", letterSpacing: "0.08em", display: "block", marginBottom: 8 }}
                >
                  ОСОБЫЕ ПОЖЕЛАНИЯ
                </label>
                <textarea
                  id="notes"
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  placeholder="Что еще нам стоит знать, чтобы вам было комфортно?"
                  rows={3}
                  className="w-full rounded-2xl px-5 py-3.5 outline-none resize-none transition-all"
                  style={{
                    background: "#f8f2fc",
                    border: "1.5px solid rgba(196,160,224,0.3)",
                    fontFamily: "'Lato', sans-serif",
                    fontSize: "0.95rem",
                    color: "#3d2c3e",
                  }}
                  onFocus={e => { e.target.style.borderColor = "#9b72cf"; e.target.style.boxShadow = "0 0 0 3px rgba(155,114,207,0.12)"; }}
                  onBlur={e => { e.target.style.borderColor = "rgba(196,160,224,0.3)"; e.target.style.boxShadow = "none"; }}
                />
              </div>

              {submitError && (
                <p style={{ color: "#d4183d", fontFamily: "'Lato', sans-serif", fontSize: "0.85rem", textAlign: "center", marginTop: -4 }}>
                  {submitError}
                </p>
              )}

              <button
                type="submit"
                disabled={submitting}
                style={{
                  background: "linear-gradient(135deg, #9b72cf 0%, #b07fd4 100%)",
                  color: "#fff",
                  border: "none",
                  borderRadius: "3rem",
                  padding: "1rem 2rem",
                  fontFamily: "'Lato', sans-serif",
                  fontSize: "0.9rem",
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase" as const,
                  cursor: submitting ? "wait" : "pointer",
                  opacity: submitting ? 0.75 : 1,
                  boxShadow: "0 8px 30px rgba(155,114,207,0.35)",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={e => {
                  if (submitting) return;
                  (e.target as HTMLElement).style.transform = "translateY(-2px)";
                  (e.target as HTMLElement).style.boxShadow = "0 12px 40px rgba(155,114,207,0.5)";
                }}
                onMouseLeave={e => { (e.target as HTMLElement).style.transform = "translateY(0)"; (e.target as HTMLElement).style.boxShadow = "0 8px 30px rgba(155,114,207,0.35)"; }}
              >
                {submitting ? "Отправляем..." : "Отправить пожелания"}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
