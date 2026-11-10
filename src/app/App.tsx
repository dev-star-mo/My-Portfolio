import { ArchitectureSection } from "./components/sections/ArchitectureSection";
import { AboutSection } from "./components/sections/AboutSection";
import { CapabilityStrip } from "./components/sections/CapabilityStrip";
import { CertificationsSection } from "./components/sections/CertificationsSection";
import { ContactSection } from "./components/sections/ContactSection";
import { ExperienceSection } from "./components/sections/ExperienceSection";
import { FeaturedProjectsSection } from "./components/sections/FeaturedProjectsSection";
import { HeroSection } from "./components/sections/HeroSection";
import { SiteFooter } from "./components/layout/SiteFooter";
import { SiteHeader } from "./components/layout/SiteHeader";

export default function App() {
  return (
    <div className="min-h-screen overflow-x-clip bg-background text-foreground">
      <SiteHeader />

      <main id="main-content" tabIndex={-1} className="outline-none">
        <HeroSection />
        <CapabilityStrip />
        <FeaturedProjectsSection />
        <ArchitectureSection />
        <ExperienceSection />
        <CertificationsSection />
        <AboutSection />
        <ContactSection />
      </main>

      <SiteFooter />
    </div>
  );
}
