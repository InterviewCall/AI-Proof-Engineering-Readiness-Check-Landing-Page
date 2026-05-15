import { apiClient } from '@/lib/apiClient';
import { CreateCandidateAnswerResponse, CreateSubmissionPayload } from '@/types/candidateInfoForm';

export async function createCandidateAnswerApi(submissionPayload: CreateSubmissionPayload): Promise<CreateCandidateAnswerResponse> {
    const response = await apiClient.post<CreateCandidateAnswerResponse>(
        `/submissions/${submissionPayload.submissionId}`,
        { answers: submissionPayload.answerPayload }
    );

    return response.data;
}