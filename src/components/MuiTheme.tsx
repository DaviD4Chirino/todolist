"use client";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const themeOptions = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#61C9A8",
    },
    secondary: {
      main: "#C2E7DA",
    },
    info: {
      main: "#2374AB",
    },
    background: {
      default: "#020122",
    },
  },
});

export default function MuiTheme({ children }: { children: any }) {
  return <ThemeProvider theme={themeOptions}>{children}</ThemeProvider>;
}
