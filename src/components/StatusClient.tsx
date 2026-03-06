'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  CircularProgress,
  Chip,
  Stepper,
  Step,
  StepLabel,
  Divider,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { checkStatus } from '@/lib/actions';
import { getLocalSubmissionById } from '@/lib/storage';

const STATUS_STEPS = ['Submitted', 'In Review', 'Processing', 'Resolved'];

export default function StatusClient() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [referenceId, setReferenceId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<any>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!referenceId.trim()) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const localResult = getLocalSubmissionById(referenceId.trim());
      if (localResult) {
        setResult(localResult);
        setLoading(false);
        return;
      }

      const response = await checkStatus(referenceId.trim());
      if (response.success) {
        setResult(response.data);
      } else {
        setError(response.error || 'Reference number not found.');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getActiveStep = (status: string) => {
    switch (status) {
      case 'SUBMITTED':
        return 0;
      case 'IN_REVIEW':
        return 1;
      case 'PROCESSING':
        return 2;
      case 'RESOLVED':
        return 4;
      default:
        return 0;
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto' }}>
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Typography variant="h4" fontWeight={800} gutterBottom>
          Track Your Request
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Enter your unique reference number below to check the real-time status of your submission.
        </Typography>
      </Box>

      <Paper
        elevation={0}
        component="form"
        onSubmit={handleSearch}
        sx={{
          p: 3,
          mb: 4,
          borderRadius: 4,
          border: '1px solid',
          borderColor: 'divider',
          display: 'flex',
          gap: 2,
          alignItems: 'flex-start',
        }}
      >
        <TextField
          fullWidth
          label="Reference Number"
          placeholder="e.g. CA-XXXX-XXXX"
          value={referenceId}
          onChange={(e) => setReferenceId(e.target.value)}
          disabled={loading}
          sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
        />
        <Button
          type="submit"
          variant="contained"
          size="large"
          disabled={loading || !referenceId.trim()}
          startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <SearchIcon />}
          sx={{ height: 56, px: 4, borderRadius: 2, flexShrink: 0 }}
        >
          {loading ? 'Searching' : 'Search'}
        </Button>
      </Paper>

      {error && (
        <Paper
          elevation={0}
          sx={{
            p: 3,
            borderRadius: 3,
            backgroundColor: 'error.lighter',
            color: 'error.main',
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            border: '1px solid',
            borderColor: 'error.light',
          }}
        >
          <ErrorOutlineIcon />
          <Typography fontWeight={500}>{error}</Typography>
        </Paper>
      )}

      {result && (
        <Paper
          elevation={0}
          sx={{
            p: 4,
            borderRadius: 4,
            border: '1px solid',
            borderColor: 'divider',
            animation: 'slideUp 0.4s ease-out',
            '@keyframes slideUp': {
              from: { opacity: 0, transform: 'translateY(20px)' },
              to: { opacity: 1, transform: 'translateY(0)' },
            },
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
            <Box>
              <Typography variant="overline" color="text.secondary" fontWeight={700}>
                Request Details
              </Typography>
              <Typography variant="h5" fontWeight={700} color="primary.dark">
                {result.subject}
              </Typography>
            </Box>
            <Chip
              label={result.status.replace('_', ' ')}
              color={result.status === 'RESOLVED' ? 'success' : 'primary'}
              icon={result.status === 'RESOLVED' ? <CheckCircleIcon /> : <PendingActionsIcon />}
              sx={{ fontWeight: 600, textTransform: 'uppercase', py: 2 }}
            />
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mb: 4 }}>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Typography color="text.secondary" sx={{ width: 120 }}>Reference ID:</Typography>
              <Typography fontWeight={600} fontFamily="monospace">{result.referenceId}</Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Typography color="text.secondary" sx={{ width: 120 }}>Submitted By:</Typography>
              <Typography fontWeight={500}>{result.fullName}</Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Typography color="text.secondary" sx={{ width: 120 }}>Date:</Typography>
              <Typography fontWeight={500}>{new Date(result.timestamp).toLocaleDateString()}</Typography>
            </Box>
          </Box>

          <Divider sx={{ my: 4 }} />

          <Typography variant="h6" fontWeight={700} gutterBottom>
            Status Timeline
          </Typography>
          <Box sx={{ mt: 4, mb: 2 }}>
            <Stepper activeStep={getActiveStep(result.status)} alternativeLabel>
              {STATUS_STEPS.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Box>

          <Box sx={{ mt: 4,p: 3, backgroundColor: 'rgba(0,0,0,0.02)', borderRadius: 2 }}>
             <Typography variant="body2" color="text.secondary">
                <Typography component="span" fontWeight={700} display="block" gutterBottom>
                   Latest Update:
                </Typography>
                {result.latestNote}
             </Typography>
          </Box>
        </Paper>
      )}
    </Box>
  );
}
