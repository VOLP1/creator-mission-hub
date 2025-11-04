// vitest.config.frontend.ts
import { defineConfig } from 'vitest/config'
import path from 'path'

// Frontend (React) test config — only runs .spec.tsx tests
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    // Frontend environment
    environment: 'happy-dom',
    // Only include React tests
    include: ['src/**/*.spec.tsx'],
    globals: true,
    // setupFiles: './src/setupTests.ts',
  },
})

