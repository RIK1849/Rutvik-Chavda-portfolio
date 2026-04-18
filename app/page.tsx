import AnimatedBackground    from "@/components/AnimatedBackground";
import Navbar                 from "@/components/Navbar";
import HeroSection            from "@/components/HeroSection";
import AboutSection           from "@/components/AboutSection";
import SkillsSection          from "@/components/SkillsSection";
import ExperienceSection      from "@/components/ExperienceSection";
import ProjectsSection        from "@/components/ProjectsSection";
import CertificationsSection  from "@/components/CertificationsSection";
import AwardsSection          from "@/components/AwardsSection";
import ContactSection         from "@/components/ContactSection";
import Footer                 from "@/components/Footer";

export default function Home() {
  return (
    <>
      <AnimatedBackground />
      <Navbar />
      <main style={{ position: "relative", zIndex: 5 }}>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ExperienceSection />
        <ProjectsSection />
        <CertificationsSection />
        <AwardsSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}