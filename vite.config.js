import { defineConfig } from 'vite'

export default defineConfig({
  base: './', // For github pages deployment
  plugins: [],
  server: {
    proxy: {
      // 本地代理：/claude-api/* → api.ai-turing.net/*
      '/claude-api': {
        target: 'https://api.ai-turing.net',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/claude-api/, ''),
      },
    },
  },
  test: {
    environment: 'happy-dom',
  },
})
