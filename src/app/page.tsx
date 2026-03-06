'use client';

import React from 'react';
import {
  Box,
  Button,
  Container,
  Typography,
  Paper,
  Stack,
  Avatar,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import Link from 'next/link';

export default function HomePage() {
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', bgcolor: '#F8FAFC' }}>
      <Box
        component="header"
        sx={{
          py: 2,
          borderBottom: '1px solid',
          borderColor: 'divider',
          bgcolor: 'white',
          position: 'sticky',
          top: 0,
          zIndex: 100
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

          </Box>
        </Container>
      </Box>

      <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', py: { xs: 4, md: 6 } }}>
        <Container maxWidth="md">
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography variant="overline" color="primary" fontWeight={800} sx={{ letterSpacing: 2 }}>
              REGULATORY & COMPLIANCE
            </Typography>
            <Typography
              variant="h2"
              component="h1"
              sx={{
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                fontWeight: 900,
                color: '#1A2332',
                lineHeight: 1.1,
                mb: 2,
              }}
            >
              Request Portal
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: 'text.secondary',
                mb: 4,
                maxWidth: '600px',
                lineHeight: 1.6,
                fontSize: { xs: '1rem', md: '1.15rem' },
                fontWeight: 400,
                mx: 'auto',
              }}
            >
              Select an action below to submit a new compliance request or track the status of an existing submission.
            </Typography>

            <Box sx={{ mt: 2, mb: 4, pt: 4, borderTop: '1px solid', borderColor: 'divider' }}>
              <Typography variant="subtitle2" color="text.secondary" fontWeight={800} sx={{ mb: 3, letterSpacing: 1 }}>
                COMPLIANCE SERVICES COVERED
              </Typography>
              <Grid container spacing={1} justifyContent="center" sx={{ maxWidth: '100%', overflow: 'hidden' }}>
                {[
                  'Medical Directorship', 'OSHA Protection', 'Vaccination Tracking',
                  'Survey Readiness', 'Compliance Assessment', 'QAPI Action Plans',
                  'Emergency Prep', 'Facility Evaluation', 'Team Engagement'
                ].map((service) => (
                  <Grid key={service}>
                    <Paper
                      elevation={0}
                      sx={{
                        px: 2, py: 0.75,
                        borderRadius: 10,
                        bgcolor: 'rgba(13, 115, 119, 0.05)',
                        border: '1px solid rgba(13, 115, 119, 0.1)',
                        color: 'primary.main',
                        fontSize: '0.75rem',
                        fontWeight: 700
                      }}
                    >
                      {service}
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Box>

          <Grid container spacing={4}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Link href="/form" style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 4,
                    height: '100%',
                    borderRadius: 5,
                    border: '1px solid',
                    borderColor: 'divider',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    textDecoration: 'none',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    bgcolor: 'white',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 20px 40px rgba(13, 115, 119, 0.12)',
                      borderColor: 'primary.light',
                      '& .action-icon': {
                        bgcolor: 'primary.main',
                        color: 'white',
                      }
                    }
                  }}
                >
                  <Avatar
                    className="action-icon"
                    sx={{
                      width: 72,
                      height: 72,
                      bgcolor: 'rgba(13, 115, 119, 0.08)',
                      color: 'primary.main',
                      mb: 3,
                      transition: 'all 0.3s'
                    }}
                  >
                    <AddIcon sx={{ fontSize: 36 }} />
                  </Avatar>
                  <Typography variant="h5" fontWeight={800} gutterBottom color="text.primary">
                    Start New Request
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                    Submit a new grievance, service request, or compliance inquiry through our guided workflow.
                  </Typography>
                  <Button variant="contained" color="primary" fullWidth sx={{ py: 1.5, borderRadius: 2 }}>
                    Open Form
                  </Button>
                </Paper>
              </Link>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Link href="/status" style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 4,
                    height: '100%',
                    borderRadius: 5,
                    border: '1px solid',
                    borderColor: 'divider',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    textDecoration: 'none',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    bgcolor: 'white',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.08)',
                      borderColor: 'primary.light',
                      '& .action-icon': {
                        bgcolor: 'primary.main',
                        color: 'white',
                      }
                    }
                  }}
                >
                  <Avatar
                    className="action-icon"
                    sx={{
                      width: 72,
                      height: 72,
                      bgcolor: 'rgba(0, 0, 0, 0.05)',
                      color: 'text.primary',
                      mb: 3,
                      transition: 'all 0.3s'
                    }}
                  >
                    <SearchIcon sx={{ fontSize: 36 }} />
                  </Avatar>
                  <Typography variant="h5" fontWeight={800} gutterBottom color="text.primary">
                    Track Submission
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                    Check the real-time status of your previously submitted requests using your reference ID.
                  </Typography>
                  <Button variant="outlined" color="primary" fullWidth sx={{ py: 1.5, borderRadius: 2 }}>
                    Check Status
                  </Button>
                </Paper>
              </Link>
            </Grid>
          </Grid>
        </Container>
      </Box>



      <Box sx={{ py: 4, bgcolor: 'white', borderTop: '1px solid', borderColor: 'divider' }}>
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="caption" color="text.secondary">
              © {new Date().getFullYear()} All Rights Reserved.
            </Typography>
            <Stack direction="row" spacing={3}>
              <Typography variant="caption" sx={{ cursor: 'pointer', '&:hover': { color: 'primary.main' } }}>Privacy</Typography>
              <Typography variant="caption" sx={{ cursor: 'pointer', '&:hover': { color: 'primary.main' } }}>Terms</Typography>
              <Typography variant="caption" sx={{ cursor: 'pointer', '&:hover': { color: 'primary.main' } }}>Compliance</Typography>
            </Stack>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
