import { notFound } from 'next/navigation';
import { FC } from 'react';

import CandidateQualificationForm from '@/components/qualification-form/CandidateQualificationForm';
import { landingPages } from '@/constants/landingPage';

type QualificationFormSlugPageProps = {
    params: Promise<{
        slug: string
    }>,
    searchParams: Promise<{
        'candidate-id'?: string
    }>
};

const QualificationSlugPage: FC<QualificationFormSlugPageProps> = async ({ params, searchParams }) => {
    const { slug } = await params;
    const { 'candidate-id': candidateId } = await searchParams;
    const landingPage = landingPages[slug as keyof typeof landingPages];

    if (!landingPage) {
        notFound();
    }

    return (
        <CandidateQualificationForm
            slug={landingPage.formSlug}
            candidateId={candidateId}
        />
    );
};

export default QualificationSlugPage;