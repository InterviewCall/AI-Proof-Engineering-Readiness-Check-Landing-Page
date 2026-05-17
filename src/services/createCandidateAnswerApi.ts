import { candidateFormApiClient } from '@/lib/apiClient';
import { CreateCandidateAnswerResponse, CreateSubmissionPayload } from '@/types/candidateInfoForm';

export async function createCandidateAnswerApi(submissionPayload: CreateSubmissionPayload): Promise<CreateCandidateAnswerResponse> {
    const response = await candidateFormApiClient.post<CreateCandidateAnswerResponse>(
        `/submissions/${submissionPayload.submissionId}`,
        { answers: submissionPayload.answerPayload }
    );

    return response.data;
}