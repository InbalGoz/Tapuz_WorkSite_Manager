import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import rtlPlugin from "stylis-plugin-rtl";

// יוצרים cache של אמושן (Emotion) עם תמיכה ב־RTL
const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [rtlPlugin],
});

// מגדירים Theme ל־Material UI עם RTL
const theme = createTheme({
  direction: "rtl",
  typography: {
    fontFamily:
      'Arial, "Heebo", "Segoe UI", "Tahoma", "Geneva", "Verdana", "sans-serif"',
  },
  // אפשר להוסיף כאן צבעי תפוז (primary: orange) אם תרצי
});

document.body.dir = "rtl"; // חובה: קובע שה־body יהיה RTL

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </CacheProvider>
  </React.StrictMode>
);
