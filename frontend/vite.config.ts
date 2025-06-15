import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5000, // כאן משנה את פורט ה־Dev Server
    // host: '0.0.0.0', // אם את רוצה שהשרת יהיה נגיש גם ברשת פנימית
  },
});
