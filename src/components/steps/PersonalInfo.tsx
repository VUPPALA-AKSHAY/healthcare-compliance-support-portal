'use client';

import React from 'react';
import {
  Box,
  TextField,
  MenuItem,
  Typography,
  InputAdornment,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import { useFormContext } from '@/context/FormContext';
import ControlledTextField from '@/components/ControlledTextField';

export default function PersonalInfo() {
  const { formData, updateField, errors } = useFormContext();

  return (
    <Box sx={{ animation: 'fadeIn 0.5s ease-out', '@keyframes fadeIn': { from: { opacity: 0 }, to: { opacity: 1 } } }}>
      <Box>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" fontWeight={700} gutterBottom>
            Personal Information
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Please provide your contact details so we can follow up on your request.
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <ControlledTextField
            id="fullName"
            label="Full Name"
            placeholder="e.g. John Doe"
            value={formData.fullName}
            onChange={(val) => updateField('fullName', val)}
            error={!!errors.fullName}
            helperText={errors.fullName}
            fullWidth
            required
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon sx={{ color: 'primary.main' }} />
                  </InputAdornment>
                ),
              },
            }}
          />

          <ControlledTextField
            id="email"
            label="Email Address"
            placeholder="e.g. john.doe@company.com"
            type="email"
            value={formData.email}
            onChange={(val) => updateField('email', val)}
            error={!!errors.email}
            helperText={errors.email}
            fullWidth
            required
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon sx={{ color: 'primary.main' }} />
                  </InputAdornment>
                ),
              },
            }}
          />

          <ControlledTextField
            id="phone"
            label="Phone Number"
            placeholder="e.g. +1 (555) 123-4567"
            value={formData.phone}
            onChange={(val) => updateField('phone', val)}
            error={!!errors.phone}
            helperText={errors.phone}
            fullWidth
            required
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <PhoneIcon sx={{ color: 'primary.main' }} />
                  </InputAdornment>
                ),
              },
            }}
          />
        </Box>
      </Box>
    </Box>
  );
}
