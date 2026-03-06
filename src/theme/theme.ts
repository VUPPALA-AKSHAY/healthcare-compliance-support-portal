'use client';

import { createTheme, alpha } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#0D7377',
      light: '#4BA3A6',
      dark: '#08494B',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#FF6B6B',
      light: '#FF9E9E',
      dark: '#CC4545',
      contrastText: '#ffffff',
    },
    background: {
      default: '#F5F7FA',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#1A2332',
      secondary: '#5A6B7F',
    },
    success: {
      main: '#2ECC71',
      light: '#A8E6CF',
    },
    warning: {
      main: '#F39C12',
    },
    error: {
      main: '#E74C3C',
    },
    divider: '#E8ECF1',
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica Neue", Arial, sans-serif',
    h1: {
      fontWeight: 800,
      fontSize: '2.25rem',
      letterSpacing: '-0.02em',
      lineHeight: 1.2,
    },
    h2: {
      fontWeight: 700,
      fontSize: '1.75rem',
      letterSpacing: '-0.01em',
      lineHeight: 1.3,
    },
    h3: {
      fontWeight: 700,
      fontSize: '1.35rem',
      letterSpacing: '-0.01em',
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.15rem',
    },
    h5: {
      fontWeight: 600,
      fontSize: '1rem',
    },
    h6: {
      fontWeight: 600,
      fontSize: '0.9rem',
    },
    body1: {
      fontSize: '0.9375rem',
      lineHeight: 1.6,
    },
    body2: {
      fontSize: '0.8125rem',
      lineHeight: 1.5,
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
      letterSpacing: '0.01em',
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          padding: '8px 20px',
          fontSize: '0.875rem',
          boxShadow: 'none',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            boxShadow: '0 4px 14px 0 rgba(0,0,0,0.1)',
            transform: 'translateY(-1px)',
          },
        },
        containedPrimary: {
          background: 'linear-gradient(135deg, #0D7377 0%, #0A9396 100%)',
          '&:hover': {
            background: 'linear-gradient(135deg, #08494B 0%, #0D7377 100%)',
          },
        },
        containedSecondary: {
          background: 'linear-gradient(135deg, #FF6B6B 0%, #FF8E8E 100%)',
          '&:hover': {
            background: 'linear-gradient(135deg, #CC4545 0%, #FF6B6B 100%)',
          },
        },
        outlined: {
          borderWidth: 2,
          '&:hover': {
            borderWidth: 2,
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 10,
            transition: 'all 0.2s ease',
            backgroundColor: '#FAFBFC',
            '&:hover': {
              backgroundColor: '#F0F4F8',
            },
            '&.Mui-focused': {
              backgroundColor: '#FFFFFF',
              boxShadow: `0 0 0 3px ${alpha('#0D7377', 0.12)}`,
            },
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.04)',
          border: '1px solid #E8ECF1',
          transition: 'all 0.3s ease',
          '&:hover': {
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
        },
        elevation1: {
          boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.04)',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 500,
        },
      },
    },
    MuiStepIcon: {
      styleOverrides: {
        root: {
          fontSize: '1.6rem',
          '&.Mui-completed': {
            color: '#2ECC71',
          },
          '&.Mui-active': {
            color: '#0D7377',
          },
        },
      },
    },
    MuiStepLabel: {
      styleOverrides: {
        label: {
          fontWeight: 500,
          '&.Mui-active': {
            fontWeight: 700,
          },
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
  },
});

export default theme;
