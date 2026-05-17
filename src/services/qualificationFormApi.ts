import { candidateFormApiClient } from '@/lib/apiClient';
import { GetQualificationFormApiResponse } from '@/types/qualificationForm';

export async function getQualificationFormForCandidateApi(slug: string): Promise<GetQualificationFormApiResponse> {
    const response = await candidateFormApiClient.get<GetQualificationFormApiResponse>(`/forms/${slug}`);
    return response.data;
}