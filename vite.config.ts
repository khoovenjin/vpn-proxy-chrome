import { fileURLToPath } from "url"
import legacy from "@vitejs/plugin-legacy"
import vue from "@vitejs/plugin-vue"
import { defineConfig } from "vite"

// https://vitejs.dev/config/
// modes @see: https://vitejs.dev/guide/env-and-mode#modes
export default defineConfig(({ mode }) => ({
  base: "./",
  plugins: [vue(), legacy()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    open: mode === "development",
  },
  build: {
    assetsInlineLimit: 0,
    sourcemap: "hidden",
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
      },
      safari10: true,
    },
    rollupOptions: {
      output: {
        manualChunks: (file_path) => {
          // optimize rollup bundle size via control how chunks are split
          const isModule = /node_modules/.test(file_path)

          // dependency rename, except polyfill library: core-js-pure
          if (isModule) {
            const moduleName = file_path
              .match(/\/node_modules\/([^\\/]*)\/?/)[1]
              .replace("@", "")

            const whitelist = ["core-js-pure"]
            if (whitelist.includes(moduleName)) return
            return `modules.${moduleName}`
          }
        },
      },
    },
    test: {
      setupFiles: ["./__test__/setup.ts"],
      include: ["./__test__/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
      environment: "jsdom",
      reporters: ["verbose", "junit"],
      outputFile: {
        junit: "./.coverage/junit.xml",
      },
      coverage: {
        reportsDirectory: ".coverage",
        provider: "istanbul",
        reporter: ["text", "text-summary", "html", "lcov"],
        all: true,
        include: ["src/**/*.{js,ts,vue}"],
        exclude: [
          "src/locales/**",
          "src/**/*.d.ts",
          "src/index.ts",
          "src/types/**",
        ],
      },
    },
  },
}))
