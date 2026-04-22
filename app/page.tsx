import HUDCursor from '@/components/HUDCursor'
import Navigation from '@/components/Navigation'
import HeroSection from '@/components/HeroSection'
import AboutSection from '@/components/AboutSection'
import SkillsSection from '@/components/SkillsSection'
import ExperienceSection from '@/components/ExperienceSection'
import ProjectsSection from '@/components/ProjectsSection'
import CertsSection from '@/components/CertsSection'
import AwardsSection from '@/components/AwardsSection'
import ContactSection from '@/components/ContactSection'

export default function Home() {
  return (
    <>
      <HUDCursor />
      <Navigation />
      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ExperienceSection />
        <ProjectsSection />
        <CertsSection />
        <AwardsSection />
        <ContactSection />
      </main>
    </>
  )
}
