import { useState } from "react";
import { motion } from "motion/react";
import { useForm } from "react-hook-form";
import { useScrollReveal } from "./useScrollReveal";
import { Check } from "lucide-react";

const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwMSMELRraMETQ3RyeKfI_r68fJbi7oZcI9SswUE4B54wT1VtcwF_UDkqI6iL6RNXvAsw/exec";

type FormData = {
  name: string;
  attending: "yes" | "no";
  guests: number;
  comment: string;
};

export function RsvpSection() {
  const { ref, isVisible } = useScrollReveal();
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const { register, handleSubmit, watch, formState: { errors } } = useForm<FormData>({
    defaultValues: { attending: "yes", guests: 1 },
  });
  const attending = watch("attending");

  const onSubmit = async (data: FormData) => {
    setSubmitting(true);
    setSubmitError("");

    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify({
          formType: "rsvp",
          ...data,
          guests: attending === "yes" ? data.guests : "",
        }),
      });
      setSubmitted(true);
    } catch (error) {
      console.error("RSVP submit failed:", error);
      setSubmitError("Не получилось отправить ответ. Попробуйте еще раз чуть позже.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="rsvp" className="relative py-28 overflow-hidden">
      <div className="absolute inset-0" style={{ background: "linear-gradient(160deg, #f8f0fc 0%, #fdf0f8 100%)" }} />

      <div ref={ref} className="relative z-10 max-w-xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <p style={{ fontFamily: "'Great Vibes', cursive", fontSize: "1.8rem", color: "#b07fd4", marginBottom: 8 }}>
            Вы будете с нами?
          </p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 5vw, 3.2rem)", fontWeight: 600, color: "#5c3d7a", lineHeight: 1.2 }}>
            Подтверждение
          </h2>
          <div className="flex items-center justify-center gap-3 mt-4">
            <div style={{ width: 40, height: 1, background: "linear-gradient(90deg, transparent, #c4a0e0)" }} />
            <svg width="10" height="10" viewBox="0 0 10 10"><circle cx="5" cy="5" r="4" fill="#c4a0e0" /></svg>
            <div style={{ width: 40, height: 1, background: "linear-gradient(90deg, #c4a0e0, transparent)" }} />
          </div>
          <p style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.95rem", color: "#8a6fa0", marginTop: 14 }}>
            Пожалуйста, ответьте до <strong>1 марта 2027</strong>
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
              transition={{ duration: 0.5 }}
              className="text-center py-8"
            >
              <motion.div
                className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
                style={{ background: "linear-gradient(135deg, #9b72cf, #b07fd4)" }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
              >
                <Check size={36} color="#fff" strokeWidth={2.5} />
              </motion.div>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.6rem", fontWeight: 600, color: "#5c3d7a", marginBottom: 12 }}>
                Спасибо большое!
              </h3>
              <p style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.95rem", color: "#8a6fa0", lineHeight: 1.7 }}>
                {attending === "yes"
                  ? "Мы очень рады, что вы будете с нами! С нетерпением ждем встречи на празднике."
                  : "Мы все понимаем и будем очень скучать. Спасибо, что сообщили нам."}
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.85rem", fontWeight: 700, color: "#5c3d7a", letterSpacing: "0.08em", display: "block", marginBottom: 8 }}
                >
                  ВАШЕ ИМЯ
                </label>
                <input
                  id="name"
                  {...register("name", { required: true })}
                  placeholder="Имя и фамилия"
                  className="w-full rounded-2xl px-5 py-3.5 outline-none transition-all"
                  style={{
                    background: "#f8f2fc",
                    border: errors.name ? "1.5px solid #d4183d" : "1.5px solid rgba(196,160,224,0.3)",
                    fontFamily: "'Lato', sans-serif",
                    fontSize: "0.95rem",
                    color: "#3d2c3e",
                  }}
                  onFocus={e => { e.target.style.borderColor = "#9b72cf"; e.target.style.boxShadow = "0 0 0 3px rgba(155,114,207,0.12)"; }}
                  onBlur={e => { e.target.style.borderColor = "rgba(196,160,224,0.3)"; e.target.style.boxShadow = "none"; }}
                />
                {errors.name && <p style={{ color: "#d4183d", fontFamily: "'Lato', sans-serif", fontSize: "0.8rem", marginTop: 4 }}>Пожалуйста, укажите имя</p>}
              </div>

              {/* Attending */}
              <div>
                <p style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.85rem", fontWeight: 700, color: "#5c3d7a", letterSpacing: "0.08em", marginBottom: 10 }}>
                  ВЫ СМОЖЕТЕ ПРИЙТИ?
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { value: "yes", label: "Да, буду с радостью" },
                    { value: "no", label: "К сожалению, не смогу" },
                  ].map((opt) => (
                    <label
                      key={opt.value}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 8,
                        padding: "0.9rem",
                        borderRadius: "1.5rem",
                        cursor: "pointer",
                        border: attending === opt.value ? "1.5px solid #9b72cf" : "1.5px solid rgba(196,160,224,0.3)",
                        background: attending === opt.value ? "linear-gradient(135deg, rgba(155,114,207,0.1), rgba(176,127,212,0.08))" : "#f8f2fc",
                        fontFamily: "'Lato', sans-serif",
                        fontSize: "0.85rem",
                        color: attending === opt.value ? "#5c3d7a" : "#8a6fa0",
                        transition: "all 0.3s ease",
                        fontWeight: attending === opt.value ? 700 : 400,
                      }}
                    >
                      <input type="radio" {...register("attending")} value={opt.value} className="sr-only" />
                      {opt.label}
                    </label>
                  ))}
                </div>
              </div>

              {/* Guest count */}
              {attending === "yes" && (
                <div>
                  <label
                    htmlFor="guests"
                    style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.85rem", fontWeight: 700, color: "#5c3d7a", letterSpacing: "0.08em", display: "block", marginBottom: 8 }}
                  >
                    КОЛИЧЕСТВО ГОСТЕЙ (ВКЛЮЧАЯ ВАС)
                  </label>
                  <select
                    id="guests"
                    {...register("guests")}
                    className="w-full rounded-2xl px-5 py-3.5 outline-none cursor-pointer"
                    style={{
                      background: "#f8f2fc",
                      border: "1.5px solid rgba(196,160,224,0.3)",
                      fontFamily: "'Lato', sans-serif",
                      fontSize: "0.95rem",
                      color: "#3d2c3e",
                      appearance: "none",
                    }}
                  >
                    {[1, 2, 3, 4].map((n) => (
                      <option key={n} value={n}>{n} {n === 1 ? "гость" : "гостя"}</option>
                    ))}
                  </select>
                </div>
              )}

              {/* Comment */}
              <div>
                <label
                  htmlFor="comment"
                  style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.85rem", fontWeight: 700, color: "#5c3d7a", letterSpacing: "0.08em", display: "block", marginBottom: 8 }}
                >
                  СООБЩЕНИЕ (НЕОБЯЗАТЕЛЬНО)
                </label>
                <textarea
                  id="comment"
                  {...register("comment")}
                  placeholder="Пожелание для пары, особые просьбы..."
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

              {/* Submit */}
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
                  textTransform: "uppercase",
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
                onMouseLeave={e => {
                  (e.target as HTMLElement).style.transform = "translateY(0)";
                  (e.target as HTMLElement).style.boxShadow = "0 8px 30px rgba(155,114,207,0.35)";
                }}
              >
                {submitting ? "Отправляем..." : "Отправить ответ"}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
