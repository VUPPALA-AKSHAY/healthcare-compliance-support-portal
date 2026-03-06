
export interface StoredSubmission {
  referenceId: string;
  status: 'SUBMITTED' | 'IN_REVIEW' | 'PROCESSING' | 'RESOLVED';
  timestamp: string;
  fullName: string;
  subject: string;
  latestNote: string;
  data: any;
}

let mockSubmissions: StoredSubmission[] = [];

export async function getSubmissions(): Promise<StoredSubmission[]> {
  return mockSubmissions;
}

export async function saveSubmission(submission: StoredSubmission): Promise<void> {
  mockSubmissions.unshift(submission);
  if (mockSubmissions.length > 100) {
    mockSubmissions.length = 100;
  }
}

export async function getSubmissionById(referenceId: string): Promise<StoredSubmission | null> {
  const found = mockSubmissions.find((sub) => sub.referenceId.toUpperCase() === referenceId.toUpperCase());
  return found || null;
}
