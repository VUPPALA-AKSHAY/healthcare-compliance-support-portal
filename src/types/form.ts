export interface FormData {

  fullName: string;
  email: string;
  phone: string;


  requestType: string;
  subcategory: string;
  priority: string;
  subject: string;
  description: string;


  additionalNotes: string;
  preferredResolution: string;
  isUrgent: boolean;
  agreeToTerms: boolean;
}

export interface StepValidationResult {
  success: boolean;
  errors: Record<string, string>;
}

export interface SubmissionResult {
  success: boolean;
  referenceId?: string;
  timestamp?: string;
  error?: string;
}

export const STEP_LABELS = [
  'Personal Information',
  'Request Details',
  'Supporting Information',
  'Review & Submit',
] as const;

export const INITIAL_FORM_DATA: FormData = {
  fullName: '',
  email: '',
  phone: '',
  requestType: '',
  subcategory: '',
  priority: '',
  subject: '',
  description: '',
  additionalNotes: '',
  preferredResolution: '',
  isUrgent: false,
  agreeToTerms: false,
};

export const REQUEST_TYPES = [
  'Service Request',
  'Technical Support',
  'General Inquiry',
] as const;

export const REQUEST_SUBTYPES: Record<string, string[]> = {
  'Service Request': [
    'Medical Director Activity & Contract',
    'OSHA Respiratory Protection & Fit Testing',
    'Employee Vaccination Tracking (Flu/COVID/TB)',
    'Survey Readiness & Alert Management',
    'Self-Assessment & Adherence',
    'Performance Improvement Plans',
    'Emergency Preparedness & Training',
    'Facility Evaluation & Quality Metrics',
    'Team Engagement & Performance Feedback',
    'PBJ (Payroll-Based Journal) Reporting',
    'Knowledge Dissemination & Orientation',
  ],
  'Technical Support': [
    'Password Reset / Account Lockout',
    'Login / SSO Issues',
    'System Bug / Error Message',
    'Missing Menu Items',
    'Other Technical Issue',
  ],
  'General Inquiry': [
    'General Question / FAQ',
    'Feedback & Suggestions',
    'Grievance / Issue Resolution',
    'Other',
  ],
};

export const PRIORITIES = [
  { value: 'low', label: 'Low', color: '#4caf50' },
  { value: 'medium', label: 'Medium', color: '#ff9800' },
  { value: 'high', label: 'High', color: '#f44336' },
  { value: 'critical', label: 'Critical', color: '#9c27b0' },
] as const;
