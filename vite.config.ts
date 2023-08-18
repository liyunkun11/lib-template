import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import eslintPlugin from "vite-plugin-eslint";
import dtsPlugin from "vite-plugin-dts";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 5958,
    open: true,
    host: true,
  },
  plugins: [
    vue(),
    eslintPlugin({
      cache: false,
      include: ["src/**/*.js, src/**/*.ts, src/**/*.vue"],
      exclude: ["node_modules", "dist"],
    }),
    dtsPlugin({
      outDir: ["dist"],
    }),
    cssInjectedByJsPlugin(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
  build: {
    outDir: "dist",
    cssCodeSplit: false,
    lib: {
      entry: "src/entry.ts",
      name: "LibTemplate",
      fileName: (format) => `lib-template.${format}.js`,
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        globals: {
          vue: "Vue",
        },
      },
    },
  },
});
