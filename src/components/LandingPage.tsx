'use client';

import { FC } from 'react';

import { LandingPageData } from '@/constants/landingPage';
import { useUtmTracker } from '@/hooks/utm-tracking/useUtmTracker';

import CheckReadinessForMobile from './CheckRedinessForMobile';
import Navbar from './Navbar';
import CurriculamSection from './sections/Curriculam/CurriculamSection';
import FinalCTASection from './sections/FinalCTA/FinalCTASection';
import FooterSection from './sections/Footer/FooterSection';
import HeroSection from './sections/Hero/HeroSection';
import MarketShiftSection from './sections/MarketShift/MarketShiftSection';
import PositioningSection from './sections/Positioning/PositioningSection';
import ProblemSection from './sections/Problem/ProblemSection';
import ProofSection from './sections/Proof/ProofSection';
import TargetAudienceSection from './sections/TargetAudience/TargetAudienceSection';
import Topbar from './Topbar';

export type LandingPageProps = {
    landingPageData: LandingPageData
}

const LandingPage: FC<LandingPageProps> = ({ landingPageData }) => {
    useUtmTracker(landingPageData.formSlug);

    return (
    <main className="w-full overflow-x-hidden bg-(--color-bg) text-(--color-text)">
      <Topbar text={landingPageData.topBar.text} />
      <Navbar href={`/readiness/${landingPageData.formSlug}/candidate-info`}/>

      {/* Section starts */}

      {/* Hero */}
      <HeroSection
        badgeText={landingPageData.hero.badgeText}
        titlePrefix={landingPageData.hero.titlePrefix}
        titleHighlight={landingPageData.hero.titleHighlight}
        description={landingPageData.hero.description}
        bulletPoints={landingPageData.hero.bulletPoints}
        primaryCta={landingPageData.hero.primaryCta}
        ctaHelperText={landingPageData.hero.ctaHelperText}
        video={landingPageData.hero.video}  
      />

      {/* Problem */}
      <ProblemSection 
        title={landingPageData.problem.title}
        subtitle={landingPageData.problem.subtitle}
        statements={landingPageData.problem.statements}
        highlight={landingPageData.problem.highlight}
      />

      {/* Market Shift */}
      <MarketShiftSection 
        title={landingPageData.marketShift.title}
        subtitle={landingPageData.marketShift.subtitle}
        features={landingPageData.marketShift.features}
      />

      {/* Positioning */}
      <PositioningSection 
        title={landingPageData.positioning.title}
        isNotItems={landingPageData.positioning.isNotItems}
        positioningItems={landingPageData.positioning.positioningItems}
        learnItems={landingPageData.positioning.learnItems}
      />

      {/* Curriculum */}
      <CurriculamSection 
        title={landingPageData.curriculum.title}
        subtitle={landingPageData.curriculum.subtitle}
        items={landingPageData.curriculum.items}
      />

      {/* Who This Is For */}
      <TargetAudienceSection 
        title={landingPageData.targetAudience.title}
        subtitle={landingPageData.targetAudience.subtitle}
        fitCards={landingPageData.targetAudience.fitCards}
      />

      {/* Proof */}
      <ProofSection 
        title={landingPageData.proof.title}
        subtitle={landingPageData.proof.subtitle}
        items={landingPageData.proof.items}
      />

      {/* Final CTA */}
      <FinalCTASection 
        title={landingPageData.finalCTA.title}
        description={landingPageData.finalCTA.description}
        cta={landingPageData.finalCTA.cta}
      />

      {/* Footer */}
      <FooterSection />

      {/* Section ends */}

      <CheckReadinessForMobile 
        href={`/readiness/${landingPageData.formSlug}/candidate-info`}
      />
    </main>
    );
};

export default LandingPage;