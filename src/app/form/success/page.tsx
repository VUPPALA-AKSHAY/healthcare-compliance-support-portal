'use client';

import React, { Suspense } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  Divider,
  Chip,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HomeIcon from '@mui/icons-material/Home';
import AddIcon from '@mui/icons-material/Add';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useFormContext } from '@/context/FormContext';

function SuccessContent() {
  const searchParams = useSearchParams();
  const { resetForm } = useFormContext();
  const referenceId = searchParams.get('ref') || 'N/A';
  const timestamp = searchParams.get('ts');
  const [copied, setCopied] = React.useState(false);

  const formattedTime = timestamp
    ? new Date(timestamp).toLocaleString('en-US', {
        dateStyle: 'long',
        timeStyle: 'short',
      })
    : new Date().toLocaleString('en-US', {
        dateStyle: 'long',
        timeStyle: 'short',
      });

  const handleCopy = () => {

    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(referenceId).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }).catch(fallbackCopy);
    } else {
      fallbackCopy();
    }
  };

  const fallbackCopy = () => {
    try {
      const textarea = document.createElement('textarea');
      textarea.value = referenceId;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text', err);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '60vh',
      }}
    >
      <Paper
        elevation={0}
        sx={{
          p: { xs: 4, md: 6 },
          borderRadius: 4,
          border: '1px solid',
          borderColor: 'divider',
          textAlign: 'center',
          maxWidth: 560,
          width: '100%',
          animation: 'scaleIn 0.5s ease-out',
          '@keyframes scaleIn': {
            from: { opacity: 0, transform: 'scale(0.92)' },
            to: { opacity: 1, transform: 'scale(1)' },
          },
        }}
      >
        <Box
          sx={{
            width: 88,
            height: 88,
            borderRadius: '50%',
            backgroundColor: 'rgba(46, 204, 113, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mx: 'auto',
            mb: 3,
            animation: 'successPulse 2s ease-in-out infinite',
            '@keyframes successPulse': {
              '0%, 100%': { boxShadow: '0 0 0 0 rgba(46, 204, 113, 0.2)' },
              '50%': { boxShadow: '0 0 0 16px rgba(46, 204, 113, 0)' },
            },
          }}
        >
          <CheckCircleIcon
            sx={{
              fontSize: 52,
              color: 'success.main',
              animation: 'checkIn 0.5s ease-out 0.3s both',
              '@keyframes checkIn': {
                from: { opacity: 0, transform: 'scale(0) rotate(-45deg)' },
                to: { opacity: 1, transform: 'scale(1) rotate(0deg)' },
              },
            }}
          />
        </Box>

        <Typography
          variant="h3"
          fontWeight={800}
          gutterBottom
          sx={{
            background: 'linear-gradient(135deg, #2ECC71 0%, #0D7377 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Request Submitted!
        </Typography>

        <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 400, mx: 'auto' }}>
          Your request has been successfully submitted and is now being processed by our compliance team.
        </Typography>

        <Divider sx={{ my: 3 }} />

        <Box sx={{ mb: 4 }}>
          <Typography variant="body2" color="text.secondary" gutterBottom fontWeight={500}>
            Reference Number
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
            <Chip
              label={referenceId}
              color="primary"
              variant="outlined"
              sx={{
                fontSize: '1.1rem',
                fontWeight: 700,
                py: 2.5,
                px: 1,
                letterSpacing: '0.05em',
              }}
            />
            <Button
              size="small"
              variant="text"
              color={copied ? "success" : "primary"}
              onClick={handleCopy}
              startIcon={
                copied ? (
                  <CheckCircleIcon sx={{ fontSize: 16 }} />
                ) : (
                  <ContentCopyIcon sx={{ fontSize: 16 }} />
                )
              }
              sx={{
                minWidth: 80,
                fontSize: '0.75rem',
                transition: 'all 0.2s',
                ...(copied && {
                  bgcolor: 'success.lighter',
                  fontWeight: 700
                })
              }}
            >
              {copied ? 'Copied!' : 'Copy'}
            </Button>
          </Box>

          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
            Submitted on {formattedTime}
          </Typography>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button
            component={Link}
            href="/form"
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            sx={{ minWidth: 180 }}
            onClick={resetForm}
          >
            Submit Another
          </Button>
          <Button
            component={Link}
            href="/"
            variant="outlined"
            color="primary"
            startIcon={<HomeIcon />}
            onClick={resetForm}
          >
            Back to Home
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <Typography>Loading...</Typography>
      </Box>
    }>
      <SuccessContent />
    </Suspense>
  );
}
