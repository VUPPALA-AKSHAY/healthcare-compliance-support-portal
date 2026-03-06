import { FormData, INITIAL_FORM_DATA } from '@/types/form';

const DRAFT_KEY = 'compliance_form_draft';
const DRAFT_STEP_KEY = 'compliance_form_step';
const DRAFT_TIMESTAMP_KEY = 'compliance_draft_timestamp';

export function saveDraft(data: FormData, currentStep: number): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(DRAFT_KEY, JSON.stringify(data));
    localStorage.setItem(DRAFT_STEP_KEY, String(currentStep));
    localStorage.setItem(DRAFT_TIMESTAMP_KEY, new Date().toISOString());
  } catch {
    console.warn('Failed to save draft to localStorage');
  }
}

export function loadDraft(): { data: FormData; step: number; timestamp: string } | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(DRAFT_KEY);
    const step = localStorage.getItem(DRAFT_STEP_KEY);
    const timestamp = localStorage.getItem(DRAFT_TIMESTAMP_KEY);
    if (!raw) return null;

    const data = JSON.parse(raw) as FormData;

    if (!data || typeof data !== 'object') return null;


    if (typeof data.fullName !== 'string' || typeof data.email !== 'string') {
      return null;
    }

    return {
      data,
      step: step ? parseInt(step, 10) : 0,
      timestamp: timestamp || new Date().toISOString(),
    };
  } catch {
    return null;
  }
}

export function clearDraft(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(DRAFT_KEY);
    localStorage.removeItem(DRAFT_STEP_KEY);
    localStorage.removeItem(DRAFT_TIMESTAMP_KEY);
  } catch {
    console.warn('Failed to clear draft from localStorage');
  }
}

export function hasDraft(): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem(DRAFT_KEY) !== null;
}

export function getDraftTimestamp(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(DRAFT_TIMESTAMP_KEY);
}

export function isFormEmpty(data: FormData): boolean {
  if (!data) return true;
  return (
    !data.fullName &&
    !data.email &&
    !data.phone &&
    !data.requestType &&
    !data.subcategory &&
    !data.priority &&
    !data.subject &&
    !data.description &&
    !data.additionalNotes &&
    !data.preferredResolution &&
    !data.isUrgent &&
    !data.agreeToTerms
  );
}
