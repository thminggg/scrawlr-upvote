import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vitest/config";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/scrawlr-upvote/",
  resolve: {
    alias: {
      "@assets": path.resolve(__dirname, "./src/assets"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@contexts": path.resolve(__dirname, "./src/contexts"),
      "@utils": path.resolve(__dirname, "./src/utils"),
    },
  },
  test: {
    environment: "jsdom",
    setupFiles: "./setupTests.ts",
    globals: true,
  },
});
