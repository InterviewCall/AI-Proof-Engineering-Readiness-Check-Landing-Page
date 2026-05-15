import { CandidateAnswer } from '@/types/candidateAnswer';
import {
  CandidateQualificationFormValues,
  GetQualificationFormForCandidateResponse,
  QuestionType,
} from '@/types/qualificationForm';

export function buildCandidateAnswersFromSteps(
  steps: GetQualificationFormForCandidateResponse['steps'],
  values: CandidateQualificationFormValues,
): CandidateAnswer[] {
  return steps.flatMap((step) => {
    return step.questions.flatMap((question) => {
      const answerValue = values[question.questionKey];

      if (!answerValue && !question.isRequired) {
        return [];
      }

      const selectedOption =
        question.questionType === QuestionType.SELECT ||
        question.questionType === QuestionType.RADIO
          ? question.options.find(
              (option) => option.optionValue === answerValue,
            )
          : null;

      return [
        {
          questionId: question.id,
          questionKey: question.questionKey,
          answerText: answerValue || null,
          answerJson: null,
          selectedOptionId: selectedOption?.id ?? null,
        },
      ];
    });
  });
};