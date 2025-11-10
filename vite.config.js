import { defineConfig } from "vitest/config";

export default defineConfig({
  base: "/front_7th_chapter2-1/", // GitHub Pages 배포를 위한 base 경로
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupTests.js",
    exclude: ["**/e2e/**", "**/*.e2e.spec.js", "**/node_modules/**"],
    poolOptions: {
      threads: {
        singleThread: true,
      },
    },
  },
});
