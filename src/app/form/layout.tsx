'use client';

import React, { useEffect } from 'react';
import { Box, Container, Typography } from '@mui/material';
import Link from 'next/link';
import { FormProvider } from '@/context/FormContext';

export default function FormLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <FormProvider>
      <Box sx={{ minHeight: '100vh', backgroundColor: 'background.default' }}>
        <Box
          component="header"
          sx={{
            py: 2,
            px: { xs: 2, md: 4 },
            borderBottom: '1px solid',
            borderColor: 'divider',
            backgroundColor: 'rgba(255,255,255,0.95)',
            backdropFilter: 'blur(10px)',
            position: 'sticky',
            top: 0,
            zIndex: 100,
          }}
        >
          <Container maxWidth="lg">
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Link href="/" style={{ display: 'flex' }}>
                </Link>
              <Typography color="text.secondary" sx={{ mx: 1 }}>
                /
              </Typography>
              <Typography variant="body1" fontWeight={600} color="text.secondary">
                New Request
              </Typography>
            </Box>
          </Container>
        </Box>

        <Container
          maxWidth="lg"
          sx={{
            py: { xs: 2, md: 3 },
            animation: 'fadeIn 0.3s ease-out',
            '@keyframes fadeIn': {
              from: { opacity: 0 },
              to: { opacity: 1 },
            },
          }}
        >
          {children}
        </Container>
      </Box>
    </FormProvider>
  );
}
