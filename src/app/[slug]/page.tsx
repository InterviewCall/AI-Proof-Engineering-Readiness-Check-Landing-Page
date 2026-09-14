import { notFound } from 'next/navigation';

import LandingPage from '@/components/LandingPage';
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
    <LandingPage landingPageData={landingPageData} />
  );
}