import { defineConfig } from "vitest/config"
import react from "@vitejs/plugin-react"
import tsConfigPaths from "vite-tsconfig-paths"
import { resolve } from "path"

export default defineConfig({
  plugins: [react(), tsConfigPaths()],
  resolve: {
    alias: [{ find: "@", replacement: resolve(__dirname, "./src") }],
  },
  test: {
    globals: true,
    environment: "jsdom",
  },
})
