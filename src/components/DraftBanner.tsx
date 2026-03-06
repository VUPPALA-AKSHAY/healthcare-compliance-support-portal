'use client';

import React from 'react';
import { Alert, AlertTitle, Button, Box, Typography } from '@mui/material';
import RestoreIcon from '@mui/icons-material/Restore';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

interface DraftBannerProps {
  timestamp: string | null;
  onRestore: () => void;
  onDismiss: () => void;
}

function formatTimestamp(ts: string | null): string {
  if (!ts) return '';
  try {
    const date = new Date(ts);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return '';
  }
}

export default function DraftBanner({ timestamp, onRestore, onDismiss }: DraftBannerProps) {
  const formattedTime = formatTimestamp(timestamp);

  return (
    <Alert
      severity="info"
      variant="outlined"
      sx={{
        mb: 3,
        borderRadius: 3,
        borderColor: 'primary.light',
        backgroundColor: 'rgba(13, 115, 119, 0.04)',
        '& .MuiAlert-icon': {
          color: 'primary.main',
        },
        animation: 'slideDown 0.4s ease-out',
        '@keyframes slideDown': {
          from: { opacity: 0, transform: 'translateY(-10px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
      }}
      action={
        <Box sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          gap: 1,
          alignItems: { xs: 'stretch', sm: 'center' },
          mt: { xs: 1, sm: 0 }
        }}>
          <Button
            size="small"
            variant="contained"
            color="primary"
            startIcon={<RestoreIcon />}
            onClick={onRestore}
            sx={{ whiteSpace: 'nowrap', py: { xs: 1, sm: 0.5 } }}
          >
            Restore
          </Button>
          <Button
            size="small"
            variant="text"
            color="inherit"
            startIcon={<DeleteOutlineIcon />}
            onClick={onDismiss}
            sx={{ whiteSpace: 'nowrap', color: 'text.secondary', py: { xs: 1, sm: 0.5 } }}
          >
            Discard
          </Button>
        </Box>
      }
      componentsProps={{
        closeButton: {
          sx: { display: 'none' }
        }
      }}
    >
      <AlertTitle sx={{ fontWeight: 700, mb: 0.5 }}>Draft Found</AlertTitle>
      <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.4 }}>
        You have an unsaved draft{formattedTime ? ` from ${formattedTime}` : ''}. Would you like to continue where you left off?
      </Typography>
    </Alert>
  );
}
