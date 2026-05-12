import { notFound } from 'next/navigation';

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
import { LandingPageData, landingPages, LandingPageSlug } from '@/constants/landingPage';

type ReadinessLaningSlugPageProps = {
    params: Promise<{
        slug: string
    }>
};

function isLandingPageSlug(slug: string): slug is LandingPageSlug {
    return slug in landingPages;
}

export default async function ReadinessLaningSlugPage({ params }: ReadinessLaningSlugPageProps) {
    const { slug } = await params;

    if(!isLandingPageSlug(slug)) {
        notFound();
    }
    
    const landingPageData: LandingPageData = landingPages[slug];

  return (
    <main className="w-full overflow-x-hidden bg-(--color-bg) text-(--color-text)">
      <Topbar text={landingPageData.topBar.text} />
      <Navbar href={`/qualification-form/${landingPageData.formSlug}`}/>

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
        href={`/qualification-form/${landingPageData.formSlug}`}
      />
    </main>
  );
}