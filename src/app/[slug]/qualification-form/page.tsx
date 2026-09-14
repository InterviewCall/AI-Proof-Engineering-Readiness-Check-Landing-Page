import { notFound } from 'next/navigation';

import CandidateQualificationForm from '@/components/qualification-form/CandidateQualificationForm';
import { landingPages, LandingPageSlug } from '@/constants/landingPage';

type QualificationFormSlugPageProps = {
    params: Promise<{
        slug: string
    }>
    searchParams: Promise<{
        'candidate-id'?: string
    }>
};

const QualificationSlugPage = async ({ params, searchParams }: QualificationFormSlugPageProps) => {
    const { slug } = await params;
    const { 'candidate-id': candidateId } = await searchParams;

    if(!(slug in landingPages)) {
        notFound();
    }

    const landingPageData = landingPages[slug as LandingPageSlug];

    return (
        <CandidateQualificationForm
            slug={landingPageData.formSlug}
            candidateId={candidateId}
            routeSlug={slug}
        />
    );
};

export default QualificationSlugPage;