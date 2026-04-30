import z from 'zod';

import {
  aiConcernOptions,
  careerSituationOptions,
  currentCtcOptions,
  investmentReadinessOptions,
  mainGapOptions,
  targetCtcOptions,
  urgencyOptions,
  yoeOptions,
} from '@/utils/formContants';

const textWithLetters = (fieldName: string, min = 2) => {
  return z
    .string()
    .trim()
    .min(min, `${fieldName} is required`)
    .regex(
      /^[a-zA-Z0-9 .,&()'/-]+$/,
      `${fieldName} contains invalid characters`,
    )
    .refine((value) => /[a-zA-Z]/.test(value), {
      error: `${fieldName} must contain valid text`,
    })
    .refine((value) => !/^([a-zA-Z])\1{2,}$/i.test(value.replace(/\s/g, '')), {
      error: `${fieldName} does not look valid`,
    });
};

const fullNameSchema = z
  .string()
  .trim()
  .min(3, 'Full name is required')
  .regex(/^[a-zA-Z .'-]+$/, 'Full name should contain only letters')
  .refine((value) => /[a-zA-Z]{2,}/.test(value), {
    error: 'Please enter a valid full name',
  });

const phoneSchema = z
  .string()
  .trim()
  .min(10, 'WhatsApp number is required')
  .refine(
    (value) => {
      const compact = value.replace(/[\s-]/g, '');
      return /^(\+91)?[6-9]\d{9}$/.test(compact);
    },
    {
      error: 'Enter a valid Indian WhatsApp number',
    },
  );

export const qualificationFormSchema = z.object({
  fullName: fullNameSchema,
  phone: phoneSchema,
  email: z.email('Enter a valid email address'),
  company: textWithLetters('Current company', 2),
  role: textWithLetters('Current role', 2),
  yoe: z.enum(yoeOptions, {
    error: 'Select your years of experience',
  }),
  aiConcern: z.enum(aiConcernOptions, {
    error: 'Select your AI concern',
  }),
  currentCtc: z.enum(currentCtcOptions, {
    error: 'Select your target CTC',
  }),
  targetCtc: z.enum(targetCtcOptions, {
    error: 'Select your target CTC',
  }),
  mainGap: z.enum(mainGapOptions, {
    error: 'Select your biggest gap',
  }),
  careerSituation: z.enum(careerSituationOptions, {
    error: 'Select your current career situation',
  }),
  urgency: z.enum(urgencyOptions, {
    error: 'Select how soon you want to work on this',
  }),
  investmentReadiness: z.enum(investmentReadinessOptions, {
    error: 'Select your investment readiness',
  }),
  notes: z
    .string()
    .trim()
    .max(700, 'Notes should be within 700 characters')
    .optional(),
});
