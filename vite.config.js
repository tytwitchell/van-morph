import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  build: {
    rollupOptions: {
      external: ["react-icons/Ai"],
    },
  },

  targets: ["chrome87", "edge88", "firefox78", "safari14"],
});
