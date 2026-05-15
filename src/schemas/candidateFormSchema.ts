import { z } from 'zod';

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

export const candidateFormSchema = z.object({
    fullName: fullNameSchema,
    phone: phoneSchema,
    email: z.email('Enter a valid email address')
});