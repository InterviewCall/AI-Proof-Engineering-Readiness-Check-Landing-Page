import { FC } from 'react';

import CandidateInfoForm from '@/components/candidateInfo/CandidateInfoForm';

type CandidateInfoPageProps = {
    params: Promise<{
        slug: string
    }>
};

const CandidateInfoPage: FC<CandidateInfoPageProps> = async ({ params }) => {
    const { slug } = await params;
    return (
        <CandidateInfoForm slug={slug} />
    );
};

export default CandidateInfoPage;