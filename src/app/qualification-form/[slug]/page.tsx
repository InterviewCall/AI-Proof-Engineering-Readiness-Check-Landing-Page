import { FC } from 'react';

import CandidateQualificationForm from '@/components/qualification-form/CandidateQualificationForm';

type QualificationFormSlugPageProps = {
    params: Promise<{
        slug: string
    }>
};

const QualificationSlugPage: FC<QualificationFormSlugPageProps> = async ({ params }) => {
    const { slug } = await params;
    return (
        <CandidateQualificationForm slug={slug} />
    );
};

export default QualificationSlugPage;