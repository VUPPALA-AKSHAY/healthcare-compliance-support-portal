'use server';

import { fullFormSchema } from '@/lib/schemas';
import { FormData, SubmissionResult } from '@/types/form';
import { saveSubmission, getSubmissionById } from '@/lib/db';

export async function submitForm(formData: FormData): Promise<SubmissionResult> {
  const result = fullFormSchema.safeParse(formData);

  if (!result.success) {
    const errorMessages = result.error.errors
      .map((e) => `${e.path.join('.')}: ${e.message}`)
      .join('; ');
    return {
      success: false,
      error: `Validation failed: ${errorMessages}`,
    };
  }



  await new Promise((resolve) => setTimeout(resolve, 800));

  let randomPart = '';
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    randomPart = crypto.randomUUID().split('-')[0].toUpperCase();
  } else {
    randomPart = Math.random().toString(36).substring(2, 8).toUpperCase();
  }

  const referenceId = `CA-${Date.now().toString(36).toUpperCase()}-${randomPart}`;

  const timestamp = new Date().toISOString();

  await saveSubmission({
    referenceId,
    status: 'SUBMITTED',
    timestamp,
    fullName: result.data.fullName,
    subject: result.data.subcategory || result.data.requestType || 'Compliance Request',
    latestNote: 'Your request has been received and is awaiting initial review.',
    data: result.data,
  });

  return {
    success: true,
    referenceId,
    timestamp,
  };
}

export async function checkStatus(referenceId: string) {

  await new Promise((resolve) => setTimeout(resolve, 400));

  if (!referenceId.toUpperCase().startsWith('CA-')) {
     return {
        success: false,
        error: 'Invalid reference number format. Please check and try again.'
     }
  }

  const submission = await getSubmissionById(referenceId);

  if (!submission) {
     return {
        success: false,
        error: 'Reference number not found. Please verify and try again.'
     };
  }

  return {
    success: true,
    data: {
      referenceId: submission.referenceId.toUpperCase(),
      status: submission.status,
      subject: submission.subject,
      fullName: submission.fullName,
      timestamp: submission.timestamp,
      latestNote: submission.latestNote,
    }
  };
}
