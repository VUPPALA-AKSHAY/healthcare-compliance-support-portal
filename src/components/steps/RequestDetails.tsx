'use client';

import React from 'react';
import {
  Box,
  TextField,
  MenuItem,
  Typography,
  Fade,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormHelperText,
  Chip,
  InputAdornment,
} from '@mui/material';
import CategoryIcon from '@mui/icons-material/Category';
import SubjectIcon from '@mui/icons-material/Subject';
import { useFormContext } from '@/context/FormContext';
import { REQUEST_TYPES, REQUEST_SUBTYPES, PRIORITIES } from '@/types/form';
import ControlledTextField from '@/components/ControlledTextField';

export default function RequestDetails() {
  const { formData, updateField, errors } = useFormContext();

  return (
    <Box sx={{ animation: 'fadeIn 0.3s ease-out', '@keyframes fadeIn': { from: { opacity: 0 }, to: { opacity: 1 } } }}>
      <Box>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" fontWeight={700} gutterBottom>
            Request Details
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Describe the nature of your request or grievance with as much detail as possible.
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField
            id="requestType"
            label="Request Type"
            select
            value={formData.requestType}
            SelectProps={{ displayEmpty: true }}
            onChange={(e) => {
              updateField('requestType', e.target.value);
              updateField('subcategory', '');
            }}
            error={!!errors.requestType}
            helperText={errors.requestType}
            fullWidth
            required
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <CategoryIcon sx={{ color: 'primary.main' }} />
                  </InputAdornment>
                ),
              },
            }}
          >
            <MenuItem value="" disabled>
              Select the type of request
            </MenuItem>
            {REQUEST_TYPES.map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </TextField>

          {formData.requestType && (
            <Fade in={!!formData.requestType}>
              <TextField
                id="subcategory"
                label="Specific Topic / Module"
                select
                value={formData.subcategory}
                SelectProps={{ displayEmpty: true }}
                onChange={(e) => updateField('subcategory', e.target.value)}
                error={!!errors.subcategory}
                helperText={errors.subcategory}
                fullWidth
                required
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <CategoryIcon sx={{ color: 'primary.main', opacity: 0.7 }} />
                      </InputAdornment>
                    ),
                  },
                }}
              >
                <MenuItem value="" disabled>
                  Select a specific topic
                </MenuItem>
                {(REQUEST_SUBTYPES[formData.requestType] || []).map((sub) => (
                  <MenuItem key={sub} value={sub}>
                    {sub}
                  </MenuItem>
                ))}
              </TextField>
            </Fade>
          )}

          <FormControl error={!!errors.priority} required>
            <FormLabel
              sx={{
                fontWeight: 600,
                color: 'text.primary',
                mb: 1,
                '&.Mui-focused': { color: 'text.primary' },
              }}
            >
              Priority Level
            </FormLabel>
            <RadioGroup
              row
              value={formData.priority}
              onChange={(e) => updateField('priority', e.target.value)}
              sx={{
                gap: 1.5,
                flexWrap: 'wrap',
                '& .MuiFormControlLabel-root': {
                  borderRadius: 2,
                  border: '2px solid',
                  borderColor: 'divider',
                  px: 1.5,
                  py: 0.5,
                  mr: 0,
                  flexGrow: { xs: 1, sm: 0 },
                  minWidth: { xs: 'calc(50% - 12px)', sm: 'auto' },
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    borderColor: 'primary.light',
                    backgroundColor: 'rgba(13, 115, 119, 0.04)',
                  },
                },
              }}
            >
              {PRIORITIES.map((p) => (
                <FormControlLabel
                  key={p.value}
                  value={p.value}
                  control={<Radio sx={{ color: p.color, '&.Mui-checked': { color: p.color } }} />}
                  label={
                    <Chip
                      label={p.label}
                      size="small"
                      sx={{
                        backgroundColor: `${p.color}18`,
                        color: p.color,
                        fontWeight: 600,
                        border: 'none',
                      }}
                    />
                  }
                  sx={{
                    borderColor:
                      formData.priority === p.value ? `${p.color} !important` : undefined,
                    backgroundColor:
                      formData.priority === p.value ? `${p.color}08 !important` : undefined,
                  }}
                />
              ))}
            </RadioGroup>
            {errors.priority && <FormHelperText>{errors.priority}</FormHelperText>}
          </FormControl>

          <ControlledTextField
            id="subject"
            label="Subject"
            placeholder="e.g. OSHA Fit Testing Schedule or Medical Director Time Sheet Query"
            value={formData.subject}
            onChange={(val) => updateField('subject', val)}
            error={!!errors.subject}
            helperText={errors.subject}
            fullWidth
            required
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SubjectIcon sx={{ color: 'primary.main' }} />
                  </InputAdornment>
                ),
              },
            }}
          />

          <ControlledTextField
            id="description"
            label="Description"
            placeholder="Please provide a detailed description of the compliance matter, including relevant dates, facility specifics, and any regulatory context..."
            value={formData.description}
            onChange={(val) => updateField('description', val)}
            error={!!errors.description}
            helperText={
              errors.description || `${formData.description.length}/2000 characters`
            }
            fullWidth
            required
            multiline
            rows={5}
          />
        </Box>
      </Box>
    </Box>
  );
}
