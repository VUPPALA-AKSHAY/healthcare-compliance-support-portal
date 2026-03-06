'use client';

import React from 'react';
import {
  Stepper,
  Step,
  StepLabel,
  Box,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { STEP_LABELS } from '@/types/form';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import AdjustIcon from '@mui/icons-material/Adjust';

interface FormStepperProps {
  activeStep: number;
  onStepClick?: (step: number) => void;
}

function StepIconComponent(props: { active: boolean; completed: boolean; icon: React.ReactNode }) {
  const { active, completed } = props;

  if (completed) {
    return (
      <CheckCircleIcon
        sx={{
          color: 'success.main',
          fontSize: 32,
          filter: 'drop-shadow(0 2px 4px rgba(46,204,113,0.3))',
          animation: 'none',
        }}
      />
    );
  }

  if (active) {
    return (
      <AdjustIcon
        sx={{
          color: 'primary.main',
          fontSize: 32,
          animation: 'pulse 2s ease-in-out infinite',
          '@keyframes pulse': {
            '0%, 100%': { transform: 'scale(1)', opacity: 1 },
            '50%': { transform: 'scale(1.1)', opacity: 0.8 },
          },
        }}
      />
    );
  }

  return (
    <RadioButtonUncheckedIcon
      sx={{
        color: 'divider',
        fontSize: 32,
      }}
    />
  );
}

export default function FormStepper({ activeStep, onStepClick }: FormStepperProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box
      sx={{
        width: '100%',
        py: 3,
        px: { xs: 1, md: 4 },
      }}
    >
      <Stepper
        activeStep={activeStep}
        alternativeLabel={!isMobile}
        orientation={isMobile ? 'vertical' : 'horizontal'}
        sx={{
          '& .MuiStepConnector-root': {
            marginLeft: isMobile ? '16px' : 'auto',
            top: isMobile ? '0' : '16px',
            bottom: isMobile ? '0' : 'auto',
            left: isMobile ? '0' : 'calc(-50% + 24px)',
            right: isMobile ? 'auto' : 'calc(50% + 24px)',
            position: 'absolute',
            zIndex: 0,
            display: isMobile ? 'flex' : 'block',
            justifyContent: isMobile ? 'center' : 'flex-start',
          },
          '& .MuiStepConnector-line': {
            border: 'none',
            backgroundColor: 'divider',
            borderRadius: 2,
            position: 'relative',
            height: isMobile ? '100%' : 4,
            width: isMobile ? 3 : 'auto',
            minHeight: isMobile ? 24 : 'auto',
            transition: 'none',

            transform: isMobile ? 'translateX(-1.5px)' : 'none',
          },
          '& .MuiStepConnector-line::after': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: isMobile ? 'auto' : 0,
            right: isMobile ? 0 : 'auto',
            width: isMobile ? '100%' : '0%',
            height: isMobile ? '0%' : '100%',
            backgroundColor: 'success.main',
            transition: 'width 0.8s ease-in-out, height 0.8s ease-in-out',
            borderRadius: 2,
          },
          '& .MuiStepConnector-root.Mui-completed .MuiStepConnector-line::after': {
            width: '100%',
            height: '100%',
          },
          '& .MuiStepLabel-iconContainer': {
            paddingRight: isMobile ? 0 : 1,
            display: 'flex',
            justifyContent: 'center',
            width: isMobile ? 32 : 'auto',
          },
        }}
      >
        {STEP_LABELS.map((label, index) => (
          <Step
            key={label}
            completed={index < activeStep}
            sx={{
              cursor: onStepClick && index < activeStep ? 'pointer' : 'default',
              '&:hover': onStepClick && index < activeStep
                ? { opacity: 0.8 }
                : {},
            }}
            onClick={() => {
              if (onStepClick && index < activeStep) {
                onStepClick(index);
              }
            }}
          >
            <StepLabel
              StepIconComponent={(iconProps) => (
                <StepIconComponent
                  active={iconProps.active || false}
                  completed={iconProps.completed || false}
                  icon={iconProps.icon}
                />
              )}
              sx={{
                '& .MuiStepLabel-label': {
                  mt: 1,
                  fontSize: { xs: '0.8rem', md: '0.9rem' },
                  color: index === activeStep
                    ? 'primary.main'
                    : index < activeStep
                      ? 'success.main'
                      : 'text.secondary',
                },
              }}
            >
              {label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}
