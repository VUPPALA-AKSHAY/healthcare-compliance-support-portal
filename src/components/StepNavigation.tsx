'use client';

import React from 'react';
import { Box, Button, CircularProgress } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import SendIcon from '@mui/icons-material/Send';

interface StepNavigationProps {
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onBack: () => void;
  onSubmit?: () => void;
  isSubmitting?: boolean;
  isLastStep: boolean;
}

export default function StepNavigation({
  currentStep,
  onNext,
  onBack,
  onSubmit,
  isSubmitting = false,
  isLastStep,
}: StepNavigationProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        mt: 4,
        pt: 3,
        borderTop: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Button
        variant="outlined"
        color="primary"
        startIcon={<ArrowBackIcon />}
        onClick={onBack}
        disabled={currentStep === 0 || isSubmitting}
        sx={{
          visibility: currentStep === 0 ? 'hidden' : 'visible',
          minWidth: 120,
        }}
      >
        Back
      </Button>

      {isLastStep ? (
        <Button
          variant="contained"
          color="secondary"
          endIcon={
            isSubmitting ? (
              <CircularProgress size={20} color="inherit" />
            ) : (
              <SendIcon />
            )
          }
          onClick={onSubmit}
          disabled={isSubmitting}
          sx={{
            minWidth: 180,
            py: 1.5,
            fontSize: '1rem',
            fontWeight: 700,
          }}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Request'}
        </Button>
      ) : (
        <Button
          variant="contained"
          color="primary"
          endIcon={<ArrowForwardIcon />}
          onClick={onNext}
          sx={{ minWidth: 120 }}
        >
          Next
        </Button>
      )}
    </Box>
  );
}
