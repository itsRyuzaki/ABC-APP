import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api/Users': {
        target: 'http://localhost:7183',
        changeOrigin: true,
      },
      '/api/Accessories': {
        target: 'http://localhost:7283',
        changeOrigin: true,
      },
    },
  },
});
