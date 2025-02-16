import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { sentryVitePlugin } from "@sentry/vite-plugin";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    // Vercel 환경에서만 Sentry 플러그인 활성화
    process.env.VERCEL
      ? sentryVitePlugin({
          org: "min-jun-park", // Sentry 조직의 slug
          project: "baro", // Sentry 프로젝트 이름
          authToken: process.env.SENTRY_AUTH_TOKEN,
          telemetry: false, // 선택적: telemetry 비활성화
        })
      : null,
  ].filter(Boolean),
  build: {
    sourcemap: true, // 소스맵 생성 활성화
    // chunk 크기 경고 임계값 조정
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          // 벤더 청크 분리
          vendor: [
            "react",
            "react-dom",
            "react-router-dom",
            "@tanstack/react-query",
          ],
        },
      },
    },
  },
});
