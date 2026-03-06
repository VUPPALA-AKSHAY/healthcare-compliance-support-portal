'use client';

import React from 'react';
import {
  Box,
  TextField,
  Typography,
  FormControlLabel,
  Checkbox,
  Alert,
  Paper,
} from '@mui/material';
import { useFormContext } from '@/context/FormContext';
import ControlledTextField from '@/components/ControlledTextField';

export default function SupportingDocs() {
  const { formData, updateField, errors } = useFormContext();

  return (
    <Box sx={{ animation: 'fadeIn 0.5s ease-out', '@keyframes fadeIn': { from: { opacity: 0 }, to: { opacity: 1 } } }}>
      <Box>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" fontWeight={700} gutterBottom>
            Supporting Information
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Provide any additional details or context that may help us process your request faster.
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <ControlledTextField
            id="additionalNotes"
            label="Additional Notes"
            placeholder="e.g. Reference to previous survey, details about specific medical directorship tasks, or relevant regulatory guidelines..."
            value={formData.additionalNotes}
            onChange={(val) => updateField('additionalNotes', val)}
            error={!!errors.additionalNotes}
            helperText={
              errors.additionalNotes ||
              `${formData.additionalNotes.length}/1000 characters`
            }
            fullWidth
            multiline
            rows={4}
          />

          <ControlledTextField
            id="preferredResolution"
            label="Preferred Resolution"
            placeholder="Describe your ideal outcome (e.g. Update to facility evaluation protocol, schedule for fit test training, or clarification on compliance report)."
            value={formData.preferredResolution}
            onChange={(val) => updateField('preferredResolution', val)}
            error={!!errors.preferredResolution}
            helperText={errors.preferredResolution}
            fullWidth
            multiline
            rows={3}
          />

          <Paper
            elevation={0}
            sx={{
              p: 3,
              border: '2px solid',
              borderColor: formData.isUrgent ? 'warning.main' : 'divider',
              backgroundColor: formData.isUrgent ? 'rgba(243, 156, 18, 0.04)' : 'background.paper',
              borderRadius: 3,
              transition: 'all 0.3s ease',
            }}
          >
            <FormControlLabel
              control={
                <Checkbox
                  id="isUrgent"
                  checked={formData.isUrgent}
                  onChange={(e) => updateField('isUrgent', e.target.checked)}
                  color="warning"
                />
              }
              label={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography fontWeight={600}>
                    Mark this request as urgent
                  </Typography>
                </Box>
              }
            />
            {formData.isUrgent && (
              <Alert severity="warning" sx={{ mt: 2 }}>
                Urgent requests are prioritized and may require immediate attention from management.
              </Alert>
            )}
          </Paper>

          <Paper
            elevation={0}
            sx={{
              p: 3,
              border: '2px solid',
              borderColor: errors.agreeToTerms
                ? 'error.main'
                : formData.agreeToTerms
                  ? 'success.main'
                  : 'divider',
              backgroundColor: formData.agreeToTerms
                ? 'rgba(46, 204, 113, 0.04)'
                : 'background.paper',
              borderRadius: 3,
              transition: 'all 0.3s ease',
            }}
          >
            <FormControlLabel
              control={
                <Checkbox
                  id="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={(e) => updateField('agreeToTerms', e.target.checked)}
                  color="primary"
                />
              }
              label={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography fontWeight={600}>
                    I agree to the terms and conditions *
                  </Typography>
                </Box>
              }
            />
            <Typography variant="body2" color="text.secondary" sx={{ ml: 4, mt: 0.5 }}>
              By checking this box, you confirm that all information provided is accurate and truthful
              to the best of your knowledge.
            </Typography>
            {errors.agreeToTerms && (
              <Typography variant="body2" color="error" sx={{ ml: 4, mt: 1 }}>
                {errors.agreeToTerms}
              </Typography>
            )}
          </Paper>
        </Box>
      </Box>
    </Box>
  );
}
