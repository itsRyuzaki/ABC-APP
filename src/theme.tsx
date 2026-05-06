import { createTheme } from "@mui/material/styles";

export const darkTheme = createTheme({
  palette: {
    mode: "dark",

    // Base backgrounds (important for card clarity)
    background: {
      default: "#0A0A0C", // main background
      paper: "#121214", // cards
    },

    // Primary (Neon Green)
    primary: {
      main: "#00FF88",
      light: "#33FFAA",
      dark: "#00CC6A",
      contrastText: "#000000",
    },

    // Secondary (Neon Purple)
    secondary: {
      main: "#8A2BE2",
      light: "#A259FF",
      dark: "#6A1BBF",
      contrastText: "#FFFFFF",
    },

    // Accent (Controlled Yellow)
    warning: {
      main: "#FFC857", // warm yellow (not harsh neon)
      light: "#FFD580",
      dark: "#CC9E2E",
      contrastText: "#000000",
    },

    // Semantic colors
    success: {
      main: "#22C55E",
    },
    error: {
      main: "#FF4D4F",
    },
    info: {
      main: "#38BDF8",
    },

    // Text hierarchy
    text: {
      primary: "#E6E6E6",
      secondary: "#A3A3A3",
      disabled: "#6B7280",
    },

    // Divider / borders (important for card separation)
    divider: "rgba(255,255,255,0.08)",
  },
  typography: {
    fontFamily: `'Inter', sans-serif`,

    h1: {
      fontFamily: `'Space Grotesk', sans-serif`,
      fontSize: "3rem",
      fontWeight: 700,
      letterSpacing: "-0.02em",
    },
    h2: {
      fontFamily: `'Space Grotesk', sans-serif`,
      fontSize: "2.25rem",
      fontWeight: 600,
    },
    h3: {
      fontFamily: `'Space Grotesk', sans-serif`,
      fontSize: "1.5rem",
      fontWeight: 600,
    },

    body1: {
      fontSize: "1rem",
      lineHeight: 1.6,
    },
    body2: {
      fontSize: "0.875rem",
      lineHeight: 1.5,
    },

    button: {
      textTransform: "none",
      fontWeight: 600,
      letterSpacing: "0.02em",
    },

    caption: {
      fontSize: "0.75rem",
      color: "#A3A3A3",
    },
  },

  shape: {
    borderRadius: 12, // slightly rounded, modern
  },

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundImage: `
        radial-gradient(circle at 20% 20%, rgba(138,43,226,0.08), transparent 40%),
        radial-gradient(circle at 80% 0%, rgba(0,255,136,0.06), transparent 40%)
      `,
        },
      },
    },

    // Buttons
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          padding: "10px 18px",
        },
        containedPrimary: {
          boxShadow: "0 0 12px rgba(0,255,136,0.3)",
          "&:hover": {
            boxShadow: "0 0 20px rgba(0,255,136,0.5)",
          },
        },
      },
    },

    // Cards (your key concern)
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: "#121214",
          border: "1px solid rgba(255,255,255,0.06)",
          boxShadow: "0 8px 30px rgba(0,0,0,0.6)",
          transition: "all 0.3s ease",
          "&:hover": {
            border: "1px solid rgba(0,255,136,0.4)",
            transform: "translateY(-4px)",
          },
        },
      },
    },

    // Inputs
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: "#0F0F11",
          "& fieldset": {
            borderColor: "rgba(255,255,255,0.1)",
          },
          "&:hover fieldset": {
            borderColor: "#8A2BE2",
          },
          "&.Mui-focused fieldset": {
            borderColor: "#00FF88",
          },
        },
      },
    },

    // Chips (great place to use yellow)
    MuiChip: {
      styleOverrides: {
        colorWarning: {
          backgroundColor: "rgba(255,200,87,0.15)",
          color: "#FFC857",
        },
      },
    },
  },
});

// Old Dark theme
// const darkTheme = createTheme({
//   palette: {
//     mode: "dark",
//     background: {
//       default: "#222831",
//       paper: "#222831",
//     },
//     primary: {
//       main: "#00adb5",
//       dark: "#06979c",
//       light: "#00bcc7",
//       contrastText: "#222831",
//     },
//     secondary: {
//       main: "#ffc404",
//       dark: "#ffab04",
//       light: "#ffab04",
//       contrastText: "#222831",
//     },
//   },
// });
