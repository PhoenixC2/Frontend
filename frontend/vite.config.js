import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
        "/api": {
            target: "https://127.0.0.1:8080/",
            secure: false,
        }
    },
  },
});
