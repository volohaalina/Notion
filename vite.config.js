import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true,
  },
  build: {
    outDir: "dist",
  },
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  // Handle React Router fallback for non-root URLs
  server: {
    historyApiFallback: true,
  },
});
