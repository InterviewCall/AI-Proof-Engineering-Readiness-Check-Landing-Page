import { z } from 'zod';

import {
  GetQualificationFormForCandidateResponse,
  Question,
  QuestionType,
} from '@/types/qualificationForm';

type QualificationFormSteps = GetQualificationFormForCandidateResponse['steps'];

export const createCandidateQualificationFormSchema = (
  steps: QualificationFormSteps,
) => {
  const schemaShape: Record<string, z.ZodString> = {};

  steps.forEach((step) => {
    step.questions.forEach((question) => {
      schemaShape[question.questionKey] =
        createQuestionValidationSchema(question);
    });
  });

  return z.object(schemaShape);
};

const createQuestionValidationSchema = (question: Question): z.ZodString => {
  return z
    .string()
    .trim()
    .superRefine((value, context) => {
      if (question.isRequired && !value) {
        context.addIssue({
          code: 'custom',
          message: `${question.questionText} is required`,
        });

        return;
      }

      if (!value) {
        return;
      }

      if (
        question.questionType === QuestionType.TEXT ||
        question.questionType === QuestionType.TEXTAREA
      ) {
        const minLength = question.validationRules?.minLength;
        const maxLength = question.validationRules?.maxLength;

        if (typeof minLength === 'number' && value.length < minLength) {
          context.addIssue({
            code: 'custom',
            message: `${question.questionText} must be at least ${minLength} characters`,
          });
        }

        if (typeof maxLength === 'number' && value.length > maxLength) {
          context.addIssue({
            code: 'custom',
            message: `${question.questionText} must be at most ${maxLength} characters`,
          });
        }

        return;
      }

      if (
        question.questionType === QuestionType.SELECT ||
        question.questionType === QuestionType.RADIO
      ) {
        const validOptionValues = question.options.map(
          (option) => option.optionValue,
        );

        if (!validOptionValues.includes(value)) {
          context.addIssue({
            code: 'custom',
            message: `Please select a valid option for ${question.questionText}`,
          });
        }
      }
    });
};