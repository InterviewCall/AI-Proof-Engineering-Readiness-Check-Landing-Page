'use client';

import { FC, MouseEvent, useCallback, useState } from 'react';

import { HeroVideoConfig, LandingPageData } from '@/constants/landingPage';
import { useUtmTracker } from '@/hooks/utm-tracking/useUtmTracker';
import { useVideoGate } from '@/hooks/video-gate/useVideoGate';

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
import CandidateDetailsModal from './videoGate/CandidateDetailsModal';

export type LandingPageProps = {
    landingPageData: LandingPageData
    slug: string
}

const LandingPage: FC<LandingPageProps> = ({ landingPageData, slug }) => {
    const video: HeroVideoConfig = landingPageData.hero.video;
    const isVideoGated = Boolean(video.previewSrc);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const closeModal = useCallback(() => setIsModalOpen(false), []);

    useUtmTracker(landingPageData.formSlug);

    // Visitors who already gave their details (this device or ?candidate-id=) get the video + a "Check readiness" that starts at step 1.
    // Everyone else is sent to the normal details page.
    const { status: videoStatus, readinessHref: candidateInfoPath, unlock } = useVideoGate({
        formSlug: landingPageData.formSlug,
        routeSlug: slug,
        enabled: isVideoGated,
    });

    // Until the visitor has given their details, every "Check readiness" button opens the same popup
    // (instead of going to /candidate-info). Once unlocked they are normal links to step 1 of the form.
    const openDetailsPopup = isVideoGated && videoStatus !== 'unlocked'
      ? (event: MouseEvent<HTMLAnchorElement>) => {
          event.preventDefault();
          setIsModalOpen(true);
        }
      : undefined;

    const handleSubmitted = ({ candidateId, submissionId }: { candidateId: string, submissionId: string }) => {
      unlock(candidateId, submissionId);
      closeModal();
      // the button may have been far from the video: bring it into view so they see it start
      requestAnimationFrame(() => {
        document.getElementById('hero-video')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      });
    };

    return (
    <main className="w-full overflow-x-hidden bg-(--color-bg) text-(--color-text)">
      <Topbar text={landingPageData.topBar.text} />
      <Navbar href={candidateInfoPath} onClick={openDetailsPopup} />
      {/* Section starts */}

      {/* Hero */}
      <HeroSection
        badgeText={landingPageData.hero.badgeText}
        titlePrefix={landingPageData.hero.titlePrefix}
        titleHighlight={landingPageData.hero.titleHighlight}
        description={landingPageData.hero.description}
        bulletPoints={landingPageData.hero.bulletPoints}
        primaryCta={{
          ...landingPageData.hero.primaryCta,
          href: candidateInfoPath,
          onClick: openDetailsPopup,
        }}
        ctaHelperText={landingPageData.hero.ctaHelperText}
        video={video}
        videoGate={isVideoGated ? {
          status: videoStatus,
          onRequestUnlock: () => setIsModalOpen(true),
        } : undefined}
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
        cta={{
          ...landingPageData.finalCTA.cta,
          href: candidateInfoPath,
          onClick: openDetailsPopup,
        }}
      />

      {/* Footer */}
      <FooterSection />

      {/* Section ends */}

      <CheckReadinessForMobile 
        href={candidateInfoPath}
        onClick={openDetailsPopup}
      />

      {isModalOpen && videoStatus !== 'unlocked' && (
        <CandidateDetailsModal
          formSlug={landingPageData.formSlug}
          onClose={closeModal}
          onSubmitted={handleSubmitted}
        />
      )}
    </main>
    );
};

export default LandingPage;