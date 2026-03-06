'use client';

import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Divider,
  Chip,
  IconButton,
  Tooltip,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import EditIcon from '@mui/icons-material/Edit';
import PersonIcon from '@mui/icons-material/Person';
import DescriptionIcon from '@mui/icons-material/Description';
import InfoIcon from '@mui/icons-material/Info';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { useFormContext } from '@/context/FormContext';
import { PRIORITIES } from '@/types/form';

interface ReviewSectionProps {
  title: string;
  icon: React.ReactNode;
  onEdit: () => void;
  children: React.ReactNode;
}

function ReviewSection({ title, icon, onEdit, children }: ReviewSectionProps) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 3,
        transition: 'all 0.3s ease',
        '&:hover': {
          borderColor: 'primary.light',
          boxShadow: '0 4px 12px rgba(13, 115, 119, 0.08)',
        },
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          {icon}
          <Typography variant="h6" fontWeight={700}>
            {title}
          </Typography>
        </Box>
        <Tooltip title={`Edit ${title}`}>
          <IconButton
            size="small"
            color="primary"
            onClick={onEdit}
            sx={{
              border: '1px solid',
              borderColor: 'primary.light',
              '&:hover': {
                backgroundColor: 'primary.main',
                color: 'white',
              },
            }}
          >
            <EditIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>
      <Divider sx={{ mb: 2 }} />
      {children}
    </Paper>
  );
}

interface ReviewFieldProps {
  label: string;
  value: string | boolean;
}

function ReviewField({ label, value }: ReviewFieldProps) {
  const displayValue =
    typeof value === 'boolean'
      ? value ? 'Yes' : 'No'
      : value || '—';

  return (
    <Box sx={{ mb: 1.5 }}>
      <Typography variant="body2" color="text.secondary" fontWeight={500} sx={{ mb: 0.25 }}>
        {label}
      </Typography>
      <Typography variant="body1" fontWeight={500}>
        {displayValue}
      </Typography>
    </Box>
  );
}

export default function ReviewSubmit() {
  const { formData, setCurrentStep } = useFormContext();

  const priority = PRIORITIES.find((p) => p.value === formData.priority);

  return (
    <Box sx={{ animation: 'fadeIn 0.5s ease-out', '@keyframes fadeIn': { from: { opacity: 0 }, to: { opacity: 1 } } }}>
      <Box>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" fontWeight={700} gutterBottom>
            Review & Submit
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Please review all the information below before submitting your request.
            Click the edit button on any section to make changes.
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <ReviewSection
            title="Personal Information"
            icon={<PersonIcon sx={{ color: 'primary.main' }} />}
            onEdit={() => setCurrentStep(0)}
          >
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <ReviewField label="Full Name" value={formData.fullName} />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <ReviewField label="Email" value={formData.email} />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <ReviewField label="Phone" value={formData.phone} />
              </Grid>
            </Grid>
          </ReviewSection>

          <ReviewSection
            title="Request Details"
            icon={<DescriptionIcon sx={{ color: 'primary.main' }} />}
            onEdit={() => setCurrentStep(1)}
          >
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
                  <Box>
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
                      Request Type
                    </Typography>
                    <Typography sx={{ fontWeight: 500 }}>{formData.requestType || '—'}</Typography>
                  </Box>
                  {formData.subcategory && (
                    <Box>
                      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
                        Topic / Module
                      </Typography>
                      <Typography sx={{ fontWeight: 500 }}>{formData.subcategory}</Typography>
                    </Box>
                  )}
                  <Box>
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
                      Priority
                    </Typography>
                    {formData.priority ? (
                      <Chip
                        label={formData.priority.toUpperCase()}
                        size="small"
                        color={
                          formData.priority === 'critical' || formData.priority === 'high' ? 'error' :
                            formData.priority === 'medium' ? 'warning' : 'success'
                        }
                        sx={{ fontWeight: 600, height: 20 }}
                      />
                    ) : (
                      <Typography sx={{ fontWeight: 500 }}>—</Typography>
                    )}
                  </Box>
                </Box>
              </Grid>
              <Grid size={{ xs: 12 }}>
                <ReviewField label="Subject" value={formData.subject} />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <Box sx={{ mb: 1.5 }}>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    fontWeight={500}
                    sx={{ mb: 0.25 }}
                  >
                    Description
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      whiteSpace: 'pre-wrap',
                      backgroundColor: '#F8F9FA',
                      p: 2,
                      borderRadius: 2,
                      border: '1px solid',
                      borderColor: 'divider',
                    }}
                  >
                    {formData.description || '—'}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </ReviewSection>

          <ReviewSection
            title="Supporting Information"
            icon={<InfoIcon sx={{ color: 'primary.main' }} />}
            onEdit={() => setCurrentStep(2)}
          >
            <Grid container spacing={2}>
              <Grid size={{ xs: 12 }}>
                <ReviewField label="Additional Notes" value={formData.additionalNotes} />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <ReviewField label="Preferred Resolution" value={formData.preferredResolution} />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                  {formData.isUrgent ? (
                    <WarningAmberIcon sx={{ color: 'warning.main' }} />
                  ) : null}
                  <Box>
                    <Typography variant="body2" color="text.secondary" fontWeight={500}>
                      Urgent
                    </Typography>
                    <Typography fontWeight={600} color={formData.isUrgent ? 'warning.main' : 'text.primary'}>
                      {formData.isUrgent ? 'Yes — Marked as Urgent' : 'No'}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                  <CheckCircleOutlineIcon sx={{ color: formData.agreeToTerms ? 'success.main' : 'text.secondary' }} />
                  <Box>
                    <Typography variant="body2" color="text.secondary" fontWeight={500}>
                      Terms & Conditions
                    </Typography>
                    <Typography fontWeight={600} color={formData.agreeToTerms ? 'success.main' : 'error.main'}>
                      {formData.agreeToTerms ? 'Agreed' : 'Not Agreed'}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </ReviewSection>
        </Box>
      </Box>
    </Box>
  );
}
