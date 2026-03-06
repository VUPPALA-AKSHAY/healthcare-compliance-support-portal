'use client';

import React, { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react';
import { FormData, INITIAL_FORM_DATA } from '@/types/form';
import { saveDraft, loadDraft, clearDraft, isFormEmpty } from '@/lib/draft';

interface FormContextType {
  formData: FormData;
  currentStep: number;
  errors: Record<string, string>;
  isSubmitting: boolean;
  draftRestored: boolean;
  updateField: (field: keyof FormData, value: string | boolean) => void;
  updateFields: (fields: Partial<FormData>) => void;
  setCurrentStep: (step: number) => void;
  setErrors: (errors: Record<string, string>) => void;
  setIsSubmitting: (val: boolean) => void;
  resetForm: () => void;
  clearFormDraft: () => void;
  dismissDraftBanner: () => void;
  showDraftBanner: boolean;
  restoreDraft: () => void;
  draftTimestamp: string | null;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

export function FormProvider({ children }: { children: React.ReactNode }) {
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA);
  const [currentStep, setCurrentStep] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [draftRestored, setDraftRestored] = useState(false);
  const [showDraftBanner, setShowDraftBanner] = useState(false);
  const [draftTimestamp, setDraftTimestamp] = useState<string | null>(null);
  const initialized = useRef(false);



  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const draft = loadDraft();
    if (draft && !isFormEmpty(draft.data)) {
      setShowDraftBanner(true);
      setDraftTimestamp(draft.timestamp);
    }
  }, []);


  useEffect(() => {
    const isActuallyEmpty = isFormEmpty(formData);

    if (isActuallyEmpty) return;


    const handler = setTimeout(() => {
      saveDraft(formData, currentStep);
    }, 1000);

    return () => clearTimeout(handler);
  }, [formData, currentStep]);

  const updateField = useCallback((field: keyof FormData, value: string | boolean) => {
    setFormData((prev) => {
      if (prev[field] === value) return prev;
      return { ...prev, [field]: value };
    });

    setErrors((prev) => {
      if (prev[field]) {
        const next = { ...prev };
        delete next[field];
        return next;
      }
      return prev;
    });
  }, []);

  const updateFields = useCallback((fields: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...fields }));
  }, []);

  const resetForm = useCallback(() => {
    setFormData(INITIAL_FORM_DATA);
    setCurrentStep(0);
    setErrors({});
    setIsSubmitting(false);
    clearDraft();
  }, []);

  const clearFormDraft = useCallback(() => {
    clearDraft();
    setShowDraftBanner(false);
  }, []);

  const restoreDraft = useCallback(() => {
    const draft = loadDraft();
    if (draft) {
      setFormData(draft.data);
      setCurrentStep(draft.step);
      setDraftRestored(true);
    }
    setShowDraftBanner(false);
  }, []);

  const dismissDraftBanner = useCallback(() => {
    setShowDraftBanner(false);
  }, []);

  const value = React.useMemo(() => ({
    formData,
    currentStep,
    errors,
    isSubmitting,
    draftRestored,
    updateField,
    updateFields,
    setCurrentStep,
    setErrors,
    setIsSubmitting,
    resetForm,
    clearFormDraft,
    dismissDraftBanner,
    showDraftBanner,
    restoreDraft,
    draftTimestamp,
  }), [
    formData,
    currentStep,
    errors,
    isSubmitting,
    draftRestored,
    updateField,
    updateFields,
    resetForm,
    clearFormDraft,
    dismissDraftBanner,
    showDraftBanner,
    restoreDraft,
    draftTimestamp
  ]);

  return (
    <FormContext.Provider value={value}>
      {children}
    </FormContext.Provider>
  );
}

export function useFormContext() {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useFormContext must be used within a FormProvider');
  }
  return context;
}
