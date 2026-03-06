import { z } from 'zod';

export const personalInfoSchema = z.object({
  fullName: z
    .string()
    .min(2, 'Full name must be at least 2 characters')
    .max(100, 'Full name must be less than 100 characters'),
  email: z
    .string()
    .email('Please enter a valid email address'),
  phone: z
    .string()
    .min(10, 'Phone number must be at least 10 digits')
    .regex(/^[+]?[\d\s\-()]+$/, 'Please enter a valid phone number'),
});

export const requestDetailsSchema = z.object({
  requestType: z
    .string()
    .min(1, 'Please select a request type'),
  subcategory: z
    .string()
    .min(1, 'Please select a specific topic or module'),
  priority: z
    .string()
    .min(1, 'Please select a priority level'),
  subject: z
    .string()
    .min(5, 'Subject must be at least 5 characters')
    .max(200, 'Subject must be less than 200 characters'),
  description: z
    .string()
    .min(20, 'Description must be at least 20 characters')
    .max(2000, 'Description must be less than 2000 characters'),
});

export const supportingInfoSchema = z.object({
  additionalNotes: z
    .string()
    .max(1000, 'Additional notes must be less than 1000 characters')
    .optional()
    .or(z.literal('')),
  preferredResolution: z
    .string()
    .max(500, 'Preferred resolution must be less than 500 characters')
    .optional()
    .or(z.literal('')),
  isUrgent: z.boolean(),
  agreeToTerms: z
    .boolean()
    .refine((val) => val === true, 'You must agree to the terms and conditions'),
});

export const fullFormSchema = z.object({
  ...personalInfoSchema.shape,
  ...requestDetailsSchema.shape,
  ...supportingInfoSchema.shape,
});

export const stepSchemas = [
  personalInfoSchema,
  requestDetailsSchema,
  supportingInfoSchema,
  null,
] as const;

export function validateStep(step: number, data: Record<string, unknown>) {
  const schema = stepSchemas[step];
  if (!schema) return { success: true as const, errors: {} };

  const result = schema.safeParse(data);
  if (result.success) {
    return { success: true as const, errors: {} };
  }

  const errors: Record<string, string> = {};
  result.error.errors.forEach((err) => {
    const path = err.path.join('.');
    if (path) errors[path] = err.message;
  });

  return { success: false as const, errors };
}
