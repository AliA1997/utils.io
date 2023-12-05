import { ThemeOptions } from "@mui/material";

export const colorTokens = {
  grey: {
    0: "#FFFFFF",
    10: "#F6F6F6",
    50: "#F0F0F0",
    100: "#E0E0E0",
    200: "#C2C2C2",
    300: "#A3A3A3",
    400: "#858585",
    500: "#666666",
    600: "#4D4D4D",
    700: "#333333",
    800: "#1A1A1A",
    900: "#0A0A0A",
    1000: "#000000",
  },
  secondary: {
    100: 'rgb(114, 72, 238)',
    200: '#7248EE',
  },
  primary: {
    50: "#83d18d",
    100: "#7ece89",
    200: "#77cb83",
    300: "#70c77d",
    400: "#68c377",
    500: "#60bf70",
    600: "#5bb76c",
    700: "#56af68",
    800: "#51a763",
    900: "#4da05e",
  },
};

export const themeSettings = (mode: any): ThemeOptions => {
  return {
    palette: {
      primary: {
        main: colorTokens.primary[500],
      },
      secondary: {
        main: colorTokens.secondary[200],
      },
    },
    typography: {
      fontFamily: 'Roboto, sans-serif',
    },
    components: {
      // Override the default style of the AppBar component
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: colorTokens.primary[500],
          },
        },
      },
      // Override the default style of the Button component
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
          },
          containedPrimary: {
            color: '#fff',
          },
        },
      },
      // Add custom styles to the TextField component
      MuiTextField: {
        defaultProps: {
          sx: {
            backgroundColor: '#fff',
          }
        },
        styleOverrides: {
          root: {
            backgroundColor: '#fff',
            // marginBottom: 16,
          },
        },
      },
    },
  };
};
