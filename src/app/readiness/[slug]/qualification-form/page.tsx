import { FC } from 'react';

import CandidateQualificationForm from '@/components/qualification-form/CandidateQualificationForm';

type QualificationFormSlugPageProps = {
    params: Promise<{
        slug: string
    }>
    searchParams: Promise<{
        'candidate-id'?: string
    }>
};
const QualificationSlugPage: FC<QualificationFormSlugPageProps> = async ({ params, searchParams }) => {
    const { slug } = await params;
    const { 'candidate-id': candidateId } = await searchParams;
    return (
        <CandidateQualificationForm
            slug={slug}
            candidateId={candidateId}
        />
    );
};

export default QualificationSlugPage;