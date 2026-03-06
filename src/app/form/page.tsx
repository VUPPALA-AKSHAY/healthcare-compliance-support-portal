'use client';

import React, { useCallback } from 'react';
import { Box, Paper, Chip, Typography, Alert, Backdrop, CircularProgress } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import { useRouter } from 'next/navigation';
import { useFormContext } from '@/context/FormContext';
import { validateStep } from '@/lib/schemas';
import { submitForm } from '@/lib/actions';
import { clearDraft } from '@/lib/draft';
import { saveLocalSubmission } from '@/lib/storage';
import FormStepper from '@/components/FormStepper';
import StepNavigation from '@/components/StepNavigation';
import DraftBanner from '@/components/DraftBanner';
import PersonalInfo from '@/components/steps/PersonalInfo';
import RequestDetails from '@/components/steps/RequestDetails';
import SupportingDocs from '@/components/steps/SupportingDocs';
import ReviewSubmit from '@/components/steps/ReviewSubmit';
import { STEP_LABELS } from '@/types/form';

const TOTAL_STEPS = STEP_LABELS.length;

function getStepData(step: number, formData: Record<string, unknown>) {
  switch (step) {
    case 0:
      return {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
      };
    case 1:
      return {
        requestType: formData.requestType,
        subcategory: formData.subcategory,
        priority: formData.priority,
        subject: formData.subject,
        description: formData.description,
      };
    case 2:
      return {
        additionalNotes: formData.additionalNotes,
        preferredResolution: formData.preferredResolution,
        isUrgent: formData.isUrgent,
        agreeToTerms: formData.agreeToTerms,
      };
    default:
      return {};
  }
}

export default function FormPage() {
  const router = useRouter();
  const {
    formData,
    currentStep,
    errors,
    setCurrentStep,
    setErrors,
    isSubmitting,
    setIsSubmitting,
    showDraftBanner,
    restoreDraft,
    dismissDraftBanner,
    draftTimestamp,
  } = useFormContext();

  const handleNext = useCallback(() => {
    const stepData = getStepData(currentStep, formData as unknown as Record<string, unknown>);
    const result = validateStep(currentStep, stepData);

    if (!result.success) {
      setErrors(result.errors);
      return;
    }

    setErrors({});
    if (currentStep < TOTAL_STEPS - 1) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentStep, formData, setCurrentStep, setErrors]);

  const handleBack = useCallback(() => {
    if (currentStep > 0) {
      setErrors({});
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentStep, setCurrentStep, setErrors]);

  const handleSubmit = useCallback(async () => {
    setIsSubmitting(true);
    try {
      const result = await submitForm(formData);
      if (result.success) {
        saveLocalSubmission({
          referenceId: result.referenceId!,
          status: 'SUBMITTED',
          timestamp: result.timestamp!,
          fullName: formData.fullName,
          subject: formData.subcategory || formData.requestType || 'Compliance Request',
          latestNote: 'Your request has been received and is awaiting initial review.',
          data: formData,
        });

        clearDraft();
        const params = new URLSearchParams({
          ref: result.referenceId || '',
          ts: result.timestamp || '',
        });
        router.push(`/form/success?${params.toString()}`);
      } else {
        setErrors({ submit: result.error || 'Submission failed. Please try again.' });
      }
    } catch {
      setErrors({ submit: 'An unexpected error occurred. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, router, setErrors, setIsSubmitting]);

  const handleStepClick = useCallback(
    (step: number) => {
      if (step < currentStep) {
        setErrors({});
        setCurrentStep(step);
      }
    },
    [currentStep, setCurrentStep, setErrors]
  );


  const isLastStep = currentStep === TOTAL_STEPS - 1;

  return (
    <Box>
      {showDraftBanner && (
        <DraftBanner
          timestamp={draftTimestamp}
          onRestore={restoreDraft}
          onDismiss={dismissDraftBanner}
        />
      )}

      <Paper
        elevation={0}
        sx={{
          mb: 3,
          borderRadius: 4,
          border: '1px solid',
          borderColor: 'divider',
          overflow: 'hidden',
        }}
      >
        <FormStepper activeStep={currentStep} onStepClick={handleStepClick} />
      </Paper>

      <Paper
        elevation={0}
        sx={{
          p: { xs: 2.5, md: 4 },
          borderRadius: 4,
          border: '1px solid',
          borderColor: 'divider',
          position: 'relative',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 16,
            right: 16,
          }}
        >
          <Chip
            icon={<SaveIcon sx={{ fontSize: 16 }} />}
            label="Auto-saved"
            size="small"
            variant="outlined"
            sx={{
              borderColor: 'success.light',
              color: 'success.main',
              fontSize: '0.75rem',
              height: 28,
            }}
          />
        </Box>

        <Typography
          variant="overline"
          color="primary.main"
          fontWeight={700}
          sx={{ mb: 1, display: 'block', letterSpacing: '0.1em' }}
        >
          Step {currentStep + 1} of {TOTAL_STEPS}
        </Typography>

        {currentStep === 0 && <PersonalInfo />}
        {currentStep === 1 && <RequestDetails />}
        {currentStep === 2 && <SupportingDocs />}
        {currentStep === 3 && <ReviewSubmit />}

        {errors.submit && (
          <Alert severity="error" sx={{ mt: 2, borderRadius: 2 }}>
            {errors.submit}
          </Alert>
        )}

        <StepNavigation
          currentStep={currentStep}
          totalSteps={TOTAL_STEPS}
          onNext={handleNext}
          onBack={handleBack}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          isLastStep={isLastStep}
        />
      </Paper>

      <Backdrop
        sx={{
          color: '#fff',
          zIndex: (theme) => theme.zIndex.drawer + 1,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          backgroundColor: 'rgba(13, 115, 119, 0.7)',
          backdropFilter: 'blur(4px)',
        }}
        open={isSubmitting}
      >
        <CircularProgress color="inherit" />
        <Typography variant="h6" color="inherit" fontWeight={600}>
          Submitting Your Request...
        </Typography>
      </Backdrop>
    </Box>
  );
}
