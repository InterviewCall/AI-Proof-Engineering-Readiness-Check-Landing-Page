import CheckReadinessForMobile from '@/components/CheckRedinessForMobile';
import Navbar from '@/components/Navbar';
import CurriculamSection from '@/components/sections/Curriculam/CurriculamSection';
import FinalCTASection from '@/components/sections/FinalCTA/FinalCTASection';
import FooterSection from '@/components/sections/Footer/FooterSection';
import HeroSection from '@/components/sections/Hero/HeroSection';
import MarketShiftSection from '@/components/sections/MarketShift/MarketShiftSection';
import PositioningSection from '@/components/sections/Positioning/PositioningSection';
import ProblemSection from '@/components/sections/Problem/ProblemSection';
import ProofSection from '@/components/sections/Proof/ProofSection';
import TargetAudienceSection from '@/components/sections/TargetAudience/TargetAudienceSection';
import Topbar from '@/components/Topbar';

export default function AIProofEngineerPage() {
  return (
    <main className="w-full overflow-x-hidden bg-(--color-bg) text-(--color-text)">
      <Topbar text="For working software engineers worried about AI, layoffs, and the next hiring wave" />
      <Navbar />

      {/* Section starts */}

      {/* Hero */}
      <HeroSection />

      {/* Problem */}
      <ProblemSection />

      {/* Market Shift */}
      <MarketShiftSection />

      {/* Positioning */}
      <PositioningSection />

      {/* Curriculum */}
      <CurriculamSection />

      {/* Who This Is For */}
      <TargetAudienceSection />

      {/* Proof */}
      <ProofSection />

      {/* Final CTA */}
      <FinalCTASection />

      {/* Footer */}
      <FooterSection />

      {/* Section ends */}

      <CheckReadinessForMobile />
    </main>
  );
}