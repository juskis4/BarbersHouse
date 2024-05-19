import { createContext, useState, useMemo } from "react";
import { createTheme } from "@mui/material/styles";

// Colors
export const tokens = (mode) => ({
  ...(mode === "dark"
    ? {
        // Dark mode colors
        primary: {
          main: "#141b2d",
        },
        secondary: {
          main: "#bc6c25",
        },
        text: {
          primary: "#ffffff",
          secondary: "#858585",
        },
        background: {
          default: "#1F2A40",
          paper: "#292929",
        },
        greenAccent: {
          main: "#148000",
        },
      }
    : {
        // Light mode colors
        primary: {
          main: "#6e5a50",
        },
        secondary: {
          main: "#dda15e",
        },
        text: {
          primary: "#212529",
          secondary: "#6c757d",
        },
        background: {
          default: "#F8F4E1",
          paper: "#fff",
        },
        greenAccent: {
          main: "#148000",
        },
        redAccent: {
          main: "#a60202",
        },
        blueAccent: {
          main: "#a60533",
        },
      }),
});

export const themeSettings = (mode) => {
  const colors = tokens(mode);

  return {
    palette: {
      mode: mode,
      ...colors,
    },
    typography: {
      fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
      fontSize: 12,
      h1: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 40,
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            backgroundColor: "#dda15e",
            color: "white",
            fontWeight: "bold",
            "&:hover": {
              backgroundColor: "#bc6c25",
              color: "#fefae0",
            },
          },
        },
      },
    },
  };
};

export const ColorModeContext = createContext({
  toggleColorMode: () => {},
});

// Custom hook for managing the theme
export const useMode = () => {
  const [mode, setMode] = useState("light");

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () =>
        setMode((prev) => (prev === "light" ? "dark" : "light")),
    }),
    [],
  );

  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return [theme, colorMode];
};
