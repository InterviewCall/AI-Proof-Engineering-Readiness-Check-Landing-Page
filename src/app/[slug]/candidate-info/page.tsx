import { notFound } from 'next/navigation';

import CandidateInfoForm from '@/components/candidateInfo/CandidateInfoForm';
import { landingPages, LandingPageSlug } from '@/constants/landingPage';

type CandidateInfoPageProps = {
    params: Promise<{
        slug: string
    }>
};

const CandidateInfoPage = async ({ params }: CandidateInfoPageProps) => {
    const { slug } = await params;

    if(!(slug in landingPages)) {
        notFound();
    }

    const landingPageData = landingPages[slug as LandingPageSlug];

    return (
        <CandidateInfoForm 
            slug={landingPageData.formSlug} 
            routeSlug={slug}    
        />
    );
};

export default CandidateInfoPage;