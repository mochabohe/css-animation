import { defineConfig } from 'vite'

export default defineConfig({
  base: './', // For github pages deployment
  plugins: [],
  test: {
    environment: 'happy-dom',
  },
})
