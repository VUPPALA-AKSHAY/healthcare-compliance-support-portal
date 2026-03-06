'use client';

import { StoredSubmission } from './db';

const SUBMISSIONS_KEY = 'compliance_submissions';

export function saveLocalSubmission(submission: StoredSubmission): void {
  if (typeof window === 'undefined') return;
  
  try {
    const existing = getLocalSubmissions();
    const updated = [submission, ...existing].slice(0, 100);
    localStorage.setItem(SUBMISSIONS_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error('Failed to save submission to localStorage:', error);
  }
}

export function getLocalSubmissions(): StoredSubmission[] {
  if (typeof window === 'undefined') return [];
  
  try {
    const raw = localStorage.getItem(SUBMISSIONS_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as StoredSubmission[];
  } catch (error) {
    console.error('Failed to read submissions from localStorage:', error);
    return [];
  }
}

export function getLocalSubmissionById(referenceId: string): StoredSubmission | null {
  const submissions = getLocalSubmissions();
  return submissions.find(s => s.referenceId.toUpperCase() === referenceId.toUpperCase()) || null;
}
