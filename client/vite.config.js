import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: true, // accessible via LAN
    port: 5173,
    proxy: {
      "/chat": {
        target: "http://localhost:5000", // backend
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
