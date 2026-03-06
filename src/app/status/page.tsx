import React, { Suspense } from 'react';
import { Box, Container, Typography } from '@mui/material';
import Link from 'next/link';


import StatusClient from '@/components/StatusClient';

export default function StatusPage() {
  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: 'background.default' }}>
      <Box
        component="header"
        sx={{
          py: 2,
          px: 4,
          borderBottom: '1px solid',
          borderColor: 'divider',
          backgroundColor: 'rgba(255,255,255,0.95)',
          backdropFilter: 'blur(10px)',
          position: 'sticky',
          top: 0,
          zIndex: 100,
        }}
      >
        <Container maxWidth="md">
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Link href="/" style={{ display: 'flex' }}>
            </Link>
            <Typography color="text.secondary" sx={{ mx: 1 }}>
              /
            </Typography>
            <Typography variant="body1" fontWeight={600} color="text.secondary">
              Check Status
            </Typography>
          </Box>
        </Container>
      </Box>

      <Container
        maxWidth="md"
        sx={{
          py: { xs: 4, md: 8 },
          animation: 'fadeIn 0.5s ease-out',
          '@keyframes fadeIn': {
            from: { opacity: 0 },
            to: { opacity: 1 },
          },
        }}
      >
        <Suspense fallback={<Typography>Loading...</Typography>}>
          <StatusClient />
        </Suspense>
      </Container>
    </Box>
  );
}
