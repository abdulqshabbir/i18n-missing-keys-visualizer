import { defineConfig } from "vitest/config"
import react from "@vitejs/plugin-react"
import tsConfigPaths from "vite-tsconfig-paths"
import path from "path"

export default defineConfig({
  plugins: [react(), tsConfigPaths()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
  },
})
