import { apiClient } from '@/lib/apiClient';
import { CreateCandidateResponse, CreateCandidateValue } from '@/types/candidateInfoForm';

export async function createCandidateApi(payload: CreateCandidateValue): Promise<CreateCandidateResponse> {
    const response = await apiClient.post<CreateCandidateResponse>(
        '/candidates',
        payload
    );

    return response.data;
}