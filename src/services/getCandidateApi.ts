import { candidateFormApiClient } from '@/lib/apiClient';
import { GetCandidateResponse } from '@/types/candidateInfoForm';

export async function getCandidateApi(candidateId: string): Promise<GetCandidateResponse> {
    const response = await candidateFormApiClient.get<GetCandidateResponse>(
        `/candidates/${candidateId}`,
    );

    return response.data;
}