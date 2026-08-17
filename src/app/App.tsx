import { useRef } from "react";
import { Navigation } from "./components/Navigation";
import { FloatingElements } from "./components/FloatingElements";
import { HeroSection } from "./components/HeroSection";
import { VenueSection } from "./components/VenueSection";
import { EstateSection } from "./components/EstateSection";
import { DressCodeSection } from "./components/DressCodeSection";
import { RsvpSection } from "./components/RsvpSection";
import { QuestionnaireSection } from "./components/QuestionnaireSection";
import { CountdownSection } from "./components/CountdownSection";
import { GallerySection } from "./components/GallerySection";

export default function App() {
  const rsvpRef = useRef<HTMLElement | null>(null);

  const scrollToRsvp = () => {
    document.getElementById("rsvp")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      style={{
        fontFamily: "'Lato', sans-serif",
        overflowX: "hidden",
        scrollBehavior: "smooth",
      }}
    >
      <FloatingElements />
      <Navigation />
      <HeroSection onRsvp={scrollToRsvp} />
      <VenueSection />
      <EstateSection />
      <DressCodeSection />
      <RsvpSection />
      <QuestionnaireSection />
      <CountdownSection />
      <GallerySection onRsvp={scrollToRsvp} />
    </div>
  );
}
